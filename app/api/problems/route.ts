import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, this would be replaced with actual database calls
const mockProblems = [
  {
    id: 1,
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] == 6',
      },
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
      'So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x. Can we change our array somehow so that this search becomes faster?',
      'The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?',
    ],
    testCases: [
      { input: '[2,7,11,15], 9', expected: '[0,1]', hidden: false },
      { input: '[3,2,4], 6', expected: '[1,2]', hidden: false },
      { input: '[3,3], 6', expected: '[0,1]', hidden: false },
      { input: '[1,5,3,7,9], 12', expected: '[2,4]', hidden: true },
      { input: '[0,4,3,0], 0', expected: '[0,3]', hidden: true },
    ],
    tags: ['Array', 'Hash Table', 'Two Pointers'],
    category: 'Arrays & Hashing',
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Apple'],
    similarProblems: ['Three Sum', 'Two Sum II', '4Sum', 'Two Sum Less Than K'],
    acceptanceRate: 89.2,
    totalSubmissions: 15420,
    totalAccepted: 13754,
    likes: 8934,
    dislikes: 234,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01',
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    slug: 'add-two-numbers',
    difficulty: 'Medium',
    description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807',
      },
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 ≤ Node.val ≤ 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.',
    ],
    hints: [
      'Think about how you would add two numbers on paper.',
      'How would you handle the carry?',
    ],
    testCases: [
      { input: '[2,4,3], [5,6,4]', expected: '[7,0,8]', hidden: false },
      { input: '[0], [0]', expected: '[0]', hidden: false },
      { input: '[9,9,9,9,9,9,9], [9,9,9,9]', expected: '[8,9,9,9,0,0,0,1]', hidden: true },
    ],
    tags: ['Linked List', 'Math', 'Recursion'],
    category: 'Linked Lists',
    companies: ['Amazon', 'Microsoft', 'Apple'],
    similarProblems: ['Multiply Strings', 'Add Binary', 'Sum of Two Integers'],
    acceptanceRate: 72.8,
    totalSubmissions: 8934,
    totalAccepted: 6504,
    likes: 5234,
    dislikes: 456,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-28',
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    constraints: [
      '0 ≤ s.length ≤ 5 * 10⁴',
      's consists of English letters, digits, symbols and spaces.',
    ],
    hints: [
      'Use a sliding window approach.',
      'Keep track of characters using a hash set or hash map.',
    ],
    testCases: [
      { input: '"abcabcbb"', expected: '3', hidden: false },
      { input: '"bbbbb"', expected: '1', hidden: false },
      { input: '"pwwkew"', expected: '3', hidden: false },
      { input: '""', expected: '0', hidden: true },
    ],
    tags: ['Hash Table', 'String', 'Sliding Window'],
    category: 'Strings',
    companies: ['Amazon', 'Bloomberg', 'Adobe'],
    similarProblems: ['Longest Substring with At Most Two Distinct Characters'],
    acceptanceRate: 68.5,
    totalSubmissions: 12456,
    totalAccepted: 8532,
    likes: 7234,
    dislikes: 321,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-30',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filtered = [...mockProblems];

    // Apply filters
    if (difficulty) {
      filtered = filtered.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    if (category) {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (tag) {
      filtered = filtered.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      problems: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const problem = await request.json();
    
    // In production, this would save to database
    const newProblem = {
      ...problem,
      id: mockProblems.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalSubmissions: 0,
      totalAccepted: 0,
      likes: 0,
      dislikes: 0,
      acceptanceRate: 0,
    };

    mockProblems.push(newProblem);

    return NextResponse.json({
      success: true,
      problem: newProblem,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating problem:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create problem' },
      { status: 500 }
    );
  }
}
