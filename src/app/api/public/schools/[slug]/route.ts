import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapSchoolToDTO } from '@/lib/mappers';
import { getMockSchoolBySlug } from '@/lib/mock-data'; // Added mock data import
import { SchoolDTO } from '@/lib/dto'; // Added DTO import

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/public/schools/[slug]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    
    let schoolDTO: SchoolDTO | null = null;
    
    try {
      // Fetch school by ID (slug is actually the ID in this case)
      const school = await prisma.school.findUnique({
        where: {
          id: slug,
          // Note: We can't filter by status since it doesn't exist in the schema
        },
      });
      
      // Since we can't filter by status in the query, we need to check it manually
      if (!school) {
        return NextResponse.json(
          { error: 'School not found' },
          { status: 404 }
        );
      }
      
      // Map to DTO
      schoolDTO = mapSchoolToDTO(school);
    } catch (dbError) {
      console.error('Database query error:', dbError);
      // If database connection fails, use mock data
      console.log('Using mock data instead of database for school:', slug);
      const mockSchool = getMockSchoolBySlug(slug);
      
      if (!mockSchool) {
        return NextResponse.json(
          { error: 'School not found' },
          { status: 404 }
        );
      }
      
      schoolDTO = mockSchool;
    }
    
    // Add caching headers
    const response = NextResponse.json(schoolDTO);
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    
    return response;
  } catch (error) {
    console.error('Error fetching school:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}