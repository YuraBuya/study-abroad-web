import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapSchoolToDTO } from '@/lib/mappers';
import { z } from 'zod';

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
    
    // Build where clause
    const where: any = {
      status: 'active', // Only return active schools
    };
    
    // Add type filter if provided
    if (type) {
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
        { name: { contains: q, mode: 'insensitive' } },
        { nameKorean: { contains: q, mode: 'insensitive' } },
        { location: { contains: q, mode: 'insensitive' } },
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * pageSize;
    
    // Fetch schools
    const [schools, total] = await Promise.all([
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
    
    // Map to DTOs
    const items = schools.map(mapSchoolToDTO);
    
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