import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            category: true,
            tags: true,
            acceptanceRate: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      bookmarks,
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, problemId, notes } = await request.json();

    if (!userId || !problemId) {
      return NextResponse.json(
        { success: false, error: 'User ID and Problem ID are required' },
        { status: 400 }
      );
    }

    // Check if bookmark already exists
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId
        }
      }
    });

    if (existing) {
      // Update notes if bookmark exists
      const updated = await prisma.bookmark.update({
        where: { id: existing.id },
        data: { notes },
        include: {
          problem: {
            select: {
              id: true,
              title: true,
              difficulty: true,
            }
          }
        }
      });

      return NextResponse.json({
        success: true,
        bookmark: updated,
        message: 'Bookmark updated',
      });
    }

    // Create new bookmark
    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        problemId,
        notes,
      },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      bookmark,
      message: 'Problem bookmarked',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create bookmark' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookmarkId = searchParams.get('id');
    const userId = searchParams.get('userId');
    const problemId = searchParams.get('problemId');

    if (bookmarkId) {
      await prisma.bookmark.delete({
        where: { id: bookmarkId }
      });
    } else if (userId && problemId) {
      await prisma.bookmark.delete({
        where: {
          userId_problemId: {
            userId,
            problemId
          }
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Bookmark ID or User ID + Problem ID required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Bookmark removed',
    });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete bookmark' },
      { status: 500 }
    );
  }
}
