import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Check admin password
    const authHeader = request.headers.get('authorization');
    const password = authHeader?.replace('Bearer ', '');
    
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASS) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For this demo, we'll handle form data as JSON
    // In a real implementation, you'd use formidable to handle file uploads
    const { name, nameKorean, location, type, logo, pdfFileName } = await request.json();

    // Validate required fields
    if (!name || !location || !type) {
      return NextResponse.json(
        { error: 'Name, location, and type are required' },
        { status: 400 }
      );
    }

    // Validate school type
    const validTypes = ['LANGUAGE_INSTITUTE', 'UNIVERSITY', 'GRADUATE_SCHOOL'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid school type' },
        { status: 400 }
      );
    }

    // Create new school entry in database
    const newSchool = await prisma.school.create({
      data: {
        name,
        nameKorean: nameKorean || null,
        location,
        logo: logo || '/images/default-logo.svg',
        pdfUrl: pdfFileName ? `/pdfs/${pdfFileName}` : '/pdfs/sample.txt',
        type: type as 'LANGUAGE_INSTITUTE' | 'UNIVERSITY' | 'GRADUATE_SCHOOL'
      }
    });

    return NextResponse.json(
      { message: 'School added successfully', school: newSchool },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { error: 'Failed to add school' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let whereClause = {};
    if (type) {
      whereClause = { type: type as 'LANGUAGE_INSTITUTE' | 'UNIVERSITY' | 'GRADUATE_SCHOOL' };
    }

    const schools = await prisma.school.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ schools }, { status: 200 });

  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}