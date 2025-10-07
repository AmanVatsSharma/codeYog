import { NextRequest, NextResponse } from 'next/server';

// Mock contests data
const mockContests = [
  {
    id: 1,
    title: 'Weekly Contest 385',
    description: 'Sharpen your coding skills with 4 challenging problems',
    type: 'weekly',
    status: 'upcoming',
    difficulty: 'All Levels',
    startTime: '2024-02-15T14:00:00Z',
    endTime: '2024-02-15T15:30:00Z',
    duration: 90, // minutes
    problems: [
      { id: 101, title: 'Array Transformation', difficulty: 'Easy', points: 100 },
      { id: 102, title: 'String Matching', difficulty: 'Medium', points: 200 },
      { id: 103, title: 'Tree Path Sum', difficulty: 'Medium', points: 300 },
      { id: 104, title: 'Graph Connectivity', difficulty: 'Hard', points: 500 },
    ],
    participants: 4523,
    prizes: ['$500', '$300', '$200'],
    tags: ['Algorithm', 'Data Structures'],
    rules: [
      'No collaboration allowed',
      'Use any programming language',
      'Solutions will be tested against hidden test cases',
      'Plagiarism detection is enabled',
    ],
  },
  {
    id: 2,
    title: 'Biweekly Contest 125',
    description: 'Test your problem-solving speed',
    type: 'biweekly',
    status: 'live',
    difficulty: 'All Levels',
    startTime: '2024-02-10T08:00:00Z',
    endTime: '2024-02-10T09:30:00Z',
    duration: 90,
    problems: [
      { id: 201, title: 'Binary Search Variant', difficulty: 'Easy', points: 100 },
      { id: 202, title: 'Dynamic Programming', difficulty: 'Medium', points: 250 },
      { id: 203, title: 'Segment Tree Query', difficulty: 'Hard', points: 400 },
      { id: 204, title: 'Advanced Graph', difficulty: 'Hard', points: 600 },
    ],
    participants: 3891,
    prizes: ['$300', '$150', '$100'],
    tags: ['Speed Coding', 'Algorithm'],
    rules: [
      'No collaboration allowed',
      'Use any programming language',
      'Solutions will be tested against hidden test cases',
    ],
  },
  {
    id: 3,
    title: 'Algorithm Masters Championship',
    description: 'Ultimate coding challenge for experts',
    type: 'special',
    status: 'past',
    difficulty: 'Expert',
    startTime: '2024-02-01T10:00:00Z',
    endTime: '2024-02-01T14:00:00Z',
    duration: 240,
    problems: [
      { id: 301, title: 'Advanced DP', difficulty: 'Hard', points: 500 },
      { id: 302, title: 'String Algorithms', difficulty: 'Hard', points: 600 },
      { id: 303, title: 'Complex Graph', difficulty: 'Hard', points: 700 },
      { id: 304, title: 'Math & Logic', difficulty: 'Expert', points: 1000 },
    ],
    participants: 1234,
    prizes: ['$2000', '$1000', '$500', '$250', '$250'],
    tags: ['Expert', 'Championship'],
    rules: [
      'No collaboration allowed',
      'Use any programming language',
      'Solutions will be tested against hidden test cases',
      'Plagiarism detection is enabled',
    ],
    winners: [
      { rank: 1, name: 'coding_master', score: 2800, time: 180 },
      { rank: 2, name: 'algorithm_ninja', score: 2600, time: 195 },
      { rank: 3, name: 'data_wizard', score: 2400, time: 210 },
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // upcoming, live, past
    const type = searchParams.get('type'); // weekly, biweekly, special
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filtered = [...mockContests];

    // Apply filters
    if (status) {
      filtered = filtered.filter(c => c.status === status);
    }
    if (type) {
      filtered = filtered.filter(c => c.type === type);
    }

    // Sort by start time
    filtered.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    // Pagination
    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      contests: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching contests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contest = await request.json();
    
    // In production, this would save to database with proper validation
    const newContest = {
      ...contest,
      id: mockContests.length + 1,
      participants: 0,
      status: 'upcoming',
    };

    mockContests.push(newContest);

    return NextResponse.json({
      success: true,
      contest: newContest,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating contest:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contest' },
      { status: 500 }
    );
  }
}
