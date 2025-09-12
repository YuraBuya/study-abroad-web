import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DELETE - Delete a specific school
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authorization
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token !== process.env.NEXT_PUBLIC_ADMIN_PASS) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { id } = params;

    // Check if school exists
    const existingSchool = await prisma.school.findUnique({
      where: { id }
    });

    if (!existingSchool) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    // Delete the school
    await prisma.school.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'School deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting school:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get a specific school
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authorization
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token !== process.env.NEXT_PUBLIC_ADMIN_PASS) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { id } = params;

    const school = await prisma.school.findUnique({
      where: { id }
    });

    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(school);
  } catch (error) {
    console.error('Error fetching school:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}