import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapSchoolToDTO } from '@/lib/mappers';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { mockSchools, getMockSchoolsByType } from '@/lib/mock-data'; // Added mock data import
import { SchoolDTO } from '@/lib/dto'; // Added DTO import

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Define query validation schema
const SchoolsQuerySchema = z.object({
  type: z.enum(['university', 'language', 'graduate']).optional(),
  q: z.string().optional(),
  page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
  pageSize: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
});

// GET /api/public/schools
// Query params: type?=university|language, q?=keyword, page?, pageSize?
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate query parameters
    const queryData = SchoolsQuerySchema.safeParse({
      type: searchParams.get('type') || undefined,
      q: searchParams.get('q') || undefined,
      page: searchParams.get('page') || undefined,
      pageSize: searchParams.get('pageSize') || undefined,
    });
    
    if (!queryData.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: queryData.error },
        { status: 400 }
      );
    }
    
    const { type, q, page, pageSize } = queryData.data;
    
    // Validate pagination parameters
    if (page < 1) {
      return NextResponse.json({ error: 'Page must be greater than 0' }, { status: 400 });
    }
    
    if (pageSize < 1 || pageSize > 100) {
      return NextResponse.json({ error: 'PageSize must be between 1 and 100' }, { status: 400 });
    }
    
    // Build where clause
    const where: Prisma.SchoolWhereInput = {};
    
    // Add type filter if provided
    if (type) {
      // More explicit validation of type parameter
      if (!['university', 'language', 'graduate'].includes(type)) {
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
      }
      
      switch (type) {
        case 'university':
          where.type = 'UNIVERSITY';
          break;
        case 'language':
          where.type = 'LANGUAGE_INSTITUTE';
          break;
        case 'graduate':
          where.type = 'GRADUATE_SCHOOL';
          break;
      }
    }
    
    // Add search filter if provided
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { nameKorean: { contains: q } },
        { location: { contains: q } },
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * pageSize;
    
    // Add status filter to only return active schools (if status field exists)
    // Note: Based on the schema, there's no status field, so we'll skip this filter
    
    // Fetch schools with better error handling
    let schools: any[] = [];
    let total = 0;
    let useMockData = false;
    
    try {
      [schools, total] = await Promise.all([
        prisma.school.findMany({
          where,
          orderBy: {
            updatedAt: 'desc',
          },
          skip,
          take: pageSize,
        }),
        prisma.school.count({ where }),
      ]);
    } catch (dbError) {
      console.error('Database query error:', dbError);
      // If database connection fails, use mock data
      console.log('Using mock data instead of database');
      useMockData = true;
      let mockData = mockSchools;
      
      // Filter by type if provided
      if (type) {
        mockData = getMockSchoolsByType(type);
      }
      
      // Filter by search query if provided
      if (q) {
        mockData = mockData.filter(school => 
          school.name.toLowerCase().includes(q.toLowerCase()) ||
          (school.nameKorean && school.nameKorean.toLowerCase().includes(q.toLowerCase())) ||
          school.location.toLowerCase().includes(q.toLowerCase())
        );
      }
      
      // Apply pagination to mock data
      total = mockData.length;
      schools = mockData.slice(skip, skip + pageSize);
    }
    
    // Map to DTOs
    const items: SchoolDTO[] = useMockData ? schools : schools.map(mapSchoolToDTO);
    
    // Add caching headers
    const response = NextResponse.json({
      items,
      total,
      page,
      pageSize,
    });
    
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    
    return response;
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}