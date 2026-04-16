import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const votes = await prisma.vote.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ votes });
  } catch (error) {
    console.error('Failed to fetch votes:', error);
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, option, votedBy } = body;

    const existingVote = await prisma.vote.findFirst({
      where: { category, option },
    });

    if (existingVote) {
      if (!existingVote.votedBy.includes(votedBy)) {
        const updated = await prisma.vote.update({
          where: { id: existingVote.id },
          data: { votedBy: { push: votedBy } },
        });
        return NextResponse.json({ vote: updated });
      }
      return NextResponse.json({ vote: existingVote });
    }

    const vote = await prisma.vote.create({
      data: {
        category,
        option,
        votedBy: [votedBy],
      },
    });

    return NextResponse.json({ vote });
  } catch (error) {
    console.error('Failed to create vote:', error);
    return NextResponse.json({ error: 'Failed to create vote' }, { status: 500 });
  }
}
