import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json({ achievements });
  } catch (error) {
    console.error('Failed to fetch achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { badge, earnedBy } = body;

    const achievement = await prisma.achievement.create({
      data: {
        badge,
        earnedBy,
      },
    });

    return NextResponse.json({ achievement });
  } catch (error) {
    console.error('Failed to create achievement:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}
