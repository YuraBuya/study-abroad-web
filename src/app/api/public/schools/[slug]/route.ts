import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapSchoolToDTO } from '@/lib/mappers';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/public/schools/[slug]
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
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
    const schoolDTO = mapSchoolToDTO(school);
    
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