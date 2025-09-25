import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Get all schools
export async function GET(request: NextRequest) {
  try {
    // Check authorization (in a real app, you'd use a more secure method)
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token !== process.env.NEXT_PUBLIC_ADMIN_PASS) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const schools = await prisma.school.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}