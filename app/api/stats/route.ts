import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // platform, user, problem

    if (type === 'platform') {
      // Get platform-wide statistics
      const [totalUsers, totalProblems, totalSubmissions, totalContests] = await Promise.all([
        prisma.user.count(),
        prisma.problem.count(),
        prisma.submission.count(),
        prisma.contest.count(),
      ]);

      const activeUsers = await prisma.user.count({
        where: {
          lastActiveDate: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      });

      // Get language distribution
      const submissions = await prisma.submission.groupBy({
        by: ['language'],
        _count: {
          language: true
        },
        orderBy: {
          _count: {
            language: 'desc'
          }
        },
        take: 5
      });

      const languageDistribution = submissions.map(s => ({
        language: s.language,
        count: s._count.language
      }));

      return NextResponse.json({
        success: true,
        stats: {
          totalUsers,
          activeUsers,
          totalProblems,
          totalSubmissions,
          totalContests,
          languageDistribution,
        }
      });
    }

    if (type === 'user' && userId) {
      // Get user-specific statistics
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          _count: {
            select: {
              submissions: true,
              achievements: true,
              discussions: true,
              comments: true,
              followers: true,
              following: true,
              bookmarks: true,
            }
          }
        }
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }

      // Get accepted submissions
      const acceptedSubmissions = await prisma.submission.count({
        where: {
          userId,
          status: 'Accepted'
        }
      });

      // Get submissions by language
      const languageStats = await prisma.submission.groupBy({
        by: ['language'],
        where: { userId },
        _count: {
          language: true
        },
        orderBy: {
          _count: {
            language: 'desc'
          }
        }
      });

      // Get recent activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentSubmissions = await prisma.submission.count({
        where: {
          userId,
          submittedAt: {
            gte: thirtyDaysAgo
          }
        }
      });

      return NextResponse.json({
        success: true,
        stats: {
          level: user.level,
          xp: user.xp,
          rank: user.rank,
          reputation: user.reputation,
          streak: user.streak,
          longestStreak: user.longestStreak,
          totalSubmissions: user._count.submissions,
          acceptedSubmissions,
          acceptanceRate: user._count.submissions > 0 
            ? ((acceptedSubmissions / user._count.submissions) * 100).toFixed(1)
            : 0,
          recentSubmissions,
          achievements: user._count.achievements,
          discussions: user._count.discussions,
          comments: user._count.comments,
          followers: user._count.followers,
          following: user._count.following,
          bookmarks: user._count.bookmarks,
          languageStats: languageStats.map(l => ({
            language: l.language,
            count: l._count.language
          })),
        }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request. Specify type parameter.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
