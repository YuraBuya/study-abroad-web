import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Define query validation schema
const BrochuresQuerySchema = z.object({
  schoolId: z.string().optional(),
  slug: z.string().optional(), // This is actually the school ID
});

// GET /api/public/brochures?schoolId=... | slug=...
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate query parameters
    const queryData = BrochuresQuerySchema.safeParse({
      schoolId: searchParams.get('schoolId') || undefined,
      slug: searchParams.get('slug') || undefined,
    });
    
    if (!queryData.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: queryData.error },
        { status: 400 }
      );
    }
    
    const { schoolId, slug } = queryData.data;
    
    // Determine the school ID to use
    const id = schoolId || slug;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Either schoolId or slug parameter is required' },
        { status: 400 }
      );
    }
    
    // Fetch school to verify it exists
    const school = await prisma.school.findUnique({
      where: { id },
    });
    
    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }
    
    // For now, we'll return a mock brochure since the schema doesn't have a separate brochures table
    // In a real implementation, this would fetch from a brochures table
    const brochures = school.pdfUrl ? [
      {
        id: `brochure-${school.id}`,
        name: `${school.name} Brochure`,
        slug: school.id,
        url: school.pdfUrl,
        uploaded: school.updatedAt.toISOString(),
      }
    ] : [];
    
    // Add caching headers
    const response = NextResponse.json(brochures);
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    
    return response;
  } catch (error) {
    console.error('Error fetching brochures:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}