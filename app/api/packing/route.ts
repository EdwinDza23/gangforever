import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.packingItem.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Failed to fetch packing items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { item, category, assignedTo } = body;

    const packingItem = await prisma.packingItem.create({
      data: {
        item,
        category,
        assignedTo,
      },
    });

    return NextResponse.json({ item: packingItem });
  } catch (error) {
    console.error('Failed to create packing item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isPacked } = body;

    const updated = await prisma.packingItem.update({
      where: { id },
      data: { isPacked },
    });

    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error('Failed to update packing item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    await prisma.packingItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete packing item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
