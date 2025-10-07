import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'reputation'; // reputation, level, streak
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Build where clause for search
    const where: any = {};
    if (search) {
      where.OR = [
        { username: { contains: search.toLowerCase() } },
        { name: { contains: search } },
      ];
    }

    // Get total count
    const total = await prisma.user.count({ where });

    // Determine sort order
    const orderBy: any = {};
    switch (sortBy) {
      case 'level':
        orderBy.level = 'desc';
        break;
      case 'streak':
        orderBy.streak = 'desc';
        break;
      case 'xp':
        orderBy.xp = 'desc';
        break;
      default:
        orderBy.reputation = 'desc';
    }

    // Get users
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        bio: true,
        level: true,
        xp: true,
        rank: true,
        reputation: true,
        streak: true,
        longestStreak: true,
        location: true,
        createdAt: true,
        _count: {
          select: {
            submissions: true,
            followers: true,
            following: true,
          }
        }
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
