import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type'); // problems, users, discussions, all
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Search query must be at least 2 characters',
      }, { status: 400 });
    }

    const searchTerm = query.trim().toLowerCase();
    const results: any = {};

    // Search problems
    if (!type || type === 'all' || type === 'problems') {
      const problems = await prisma.problem.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm } },
            { description: { contains: searchTerm } },
            { category: { contains: searchTerm } },
          ]
        },
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          category: true,
          tags: true,
          acceptanceRate: true,
          totalSubmissions: true,
        },
        take: limit,
        orderBy: {
          totalSubmissions: 'desc'
        }
      });
      results.problems = problems;
    }

    // Search users
    if (!type || type === 'all' || type === 'users') {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: searchTerm } },
            { name: { contains: searchTerm } },
          ]
        },
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          level: true,
          rank: true,
          reputation: true,
        },
        take: limit,
        orderBy: {
          reputation: 'desc'
        }
      });
      results.users = users;
    }

    // Search discussions
    if (!type || type === 'all' || type === 'discussions') {
      const discussions = await prisma.discussion.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm } },
            { content: { contains: searchTerm } },
          ]
        },
        select: {
          id: true,
          title: true,
          type: true,
          isAnswered: true,
          views: true,
          likes: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              name: true,
              avatar: true,
            }
          }
        },
        take: limit,
        orderBy: {
          views: 'desc'
        }
      });
      results.discussions = discussions;
    }

    // Count total results
    const totalResults = (results.problems?.length || 0) + 
                         (results.users?.length || 0) + 
                         (results.discussions?.length || 0);

    return NextResponse.json({
      success: true,
      query,
      results,
      totalResults,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
