import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        github: true,
        linkedin: true,
        twitter: true,
        level: true,
        xp: true,
        rank: true,
        reputation: true,
        streak: true,
        longestStreak: true,
        preferredLanguage: true,
        createdAt: true,
        _count: {
          select: {
            submissions: true,
            followers: true,
            following: true,
            discussions: true,
            comments: true,
            achievements: true,
          }
        },
        achievements: {
          include: {
            achievement: true,
          },
          orderBy: {
            unlockedAt: 'desc'
          },
          take: 10,
        },
        submissions: {
          select: {
            id: true,
            status: true,
            language: true,
            score: true,
            submittedAt: true,
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
              }
            }
          },
          orderBy: {
            submittedAt: 'desc'
          },
          take: 20,
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate problem solving statistics
    const acceptedSubmissions = user.submissions.filter(s => s.status === 'Accepted');
    const uniqueProblems = new Set(acceptedSubmissions.map(s => s.problem.id));
    const solvedProblems = uniqueProblems.size;

    const difficultyBreakdown = acceptedSubmissions.reduce((acc, sub) => {
      const difficulty = sub.problem.difficulty.toLowerCase();
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const languageBreakdown = user.submissions.reduce((acc, sub) => {
      acc[sub.language] = (acc[sub.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        stats: {
          solvedProblems,
          totalSubmissions: user._count.submissions,
          acceptanceRate: user._count.submissions > 0 
            ? (acceptedSubmissions.length / user._count.submissions * 100).toFixed(1)
            : 0,
          difficultyBreakdown,
          languageBreakdown,
        }
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const updates = await request.json();

    // Don't allow updating sensitive fields via this endpoint
    const { password, email, ...safeUpdates } = updates;

    const user = await prisma.user.update({
      where: { username: username.toLowerCase() },
      data: safeUpdates,
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        location: true,
        website: true,
      }
    });

    return NextResponse.json({
      success: true,
      user,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
