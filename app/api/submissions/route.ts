import { NextRequest, NextResponse } from 'next/server';

// Mock submissions data
const mockSubmissions = [
  {
    id: 1,
    problemId: 1,
    userId: 'user123',
    code: 'def two_sum(nums, target):\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hash_map:\n            return [hash_map[complement], i]\n        hash_map[num] = i\n    return []',
    language: 'python',
    status: 'Accepted',
    runtime: 45,
    memory: 15.2,
    testsPassed: 4,
    totalTests: 4,
    score: 100,
    submittedAt: '2024-02-10T14:30:00Z',
  },
  {
    id: 2,
    problemId: 1,
    userId: 'user123',
    code: 'def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i+1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n    return []',
    language: 'python',
    status: 'Wrong Answer',
    runtime: 1250,
    memory: 14.8,
    testsPassed: 3,
    totalTests: 4,
    score: 75,
    submittedAt: '2024-02-10T14:15:00Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get('problemId');
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let filtered = [...mockSubmissions];

    // Apply filters
    if (problemId) {
      filtered = filtered.filter(s => s.problemId === parseInt(problemId));
    }
    if (userId) {
      filtered = filtered.filter(s => s.userId === userId);
    }
    if (status) {
      filtered = filtered.filter(s => s.status === status);
    }

    // Sort by submission time (newest first)
    filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    // Pagination
    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      submissions: paginated,
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

    // In production, this would:
    // 1. Save submission to database
    // 2. Queue for evaluation
    // 3. Run test cases
    // 4. Update user statistics

    const newSubmission = {
      id: mockSubmissions.length + 1,
      problemId,
      userId,
      code,
      language,
      status: 'Pending',
      runtime: 0,
      memory: 0,
      testsPassed: 0,
      totalTests: 0,
      score: 0,
      submittedAt: new Date().toISOString(),
    };

    // Simulate async evaluation
    setTimeout(() => {
      // Run test cases and update status
      const status = Math.random() > 0.3 ? 'Accepted' : 'Wrong Answer';
      const runtime = Math.floor(Math.random() * 100) + 10;
      const memory = Math.random() * 10 + 10;
      const testsPassed = Math.floor(Math.random() * 4) + 1;
      const totalTests = 4;
      const score = (testsPassed / totalTests) * 100;
      
      // Update the submission (in production, this would update the database)
      Object.assign(newSubmission, { status, runtime, memory, testsPassed, totalTests, score });
    }, 2000);

    mockSubmissions.unshift(newSubmission);

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
