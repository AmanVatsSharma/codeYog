import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get('problemId');
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Build where clause
    const where: any = {};
    if (problemId) where.problemId = problemId;
    if (userId) where.userId = userId;
    if (status) where.status = status;

    // Get total count
    const total = await prisma.submission.count({ where });

    // Get submissions with pagination
    const submissions = await prisma.submission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          }
        },
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
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const submission = await request.json();
    const { problemId, userId, code, language } = submission;

    if (!problemId || !userId || !code || !language) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify user and problem exist
    const [user, problem] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.problem.findUnique({ where: { id: problemId } })
    ]);

    if (!user || !problem) {
      return NextResponse.json(
        { success: false, error: 'User or problem not found' },
        { status: 404 }
      );
    }

    // Create submission
    const newSubmission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        status: 'Pending',
        runtime: 0,
        memory: 0,
        testsPassed: 0,
        totalTests: 4,
        score: 0,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        },
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          }
        }
      }
    });

    // Simulate async evaluation (in production, use a job queue)
    setTimeout(async () => {
      try {
        const status = Math.random() > 0.3 ? 'Accepted' : 'Wrong Answer';
        const runtime = Math.floor(Math.random() * 100) + 10;
        const memory = Math.random() * 10 + 10;
        const testsPassed = Math.floor(Math.random() * 4) + 1;
        const score = (testsPassed / 4) * 100;

        await prisma.submission.update({
          where: { id: newSubmission.id },
          data: {
            status,
            runtime,
            memory: parseFloat(memory.toFixed(2)),
            testsPassed,
            score,
          }
        });

        // Update user XP and streak if accepted
        if (status === 'Accepted') {
          await prisma.user.update({
            where: { id: userId },
            data: {
              xp: { increment: 10 },
              lastActiveDate: new Date(),
            }
          });
        }

        // Update problem statistics
        await prisma.problem.update({
          where: { id: problemId },
          data: {
            totalSubmissions: { increment: 1 },
            totalAccepted: status === 'Accepted' ? { increment: 1 } : undefined,
          }
        });
      } catch (error) {
        console.error('Error updating submission:', error);
      }
    }, 2000);

    return NextResponse.json({
      success: true,
      submission: newSubmission,
      message: 'Submission received and queued for evaluation',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}
