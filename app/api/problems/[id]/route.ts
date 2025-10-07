import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mock problem data as fallback
const mockProblem = {
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
  ],
  constraints: [
    '2 ≤ nums.length ≤ 10⁴',
    '-10⁹ ≤ nums[i] ≤ 10⁹',
    '-10⁹ ≤ target ≤ 10⁹',
    'Only one valid answer exists.',
  ],
  hints: [
    'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
    'So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x.',
    'The second train of thought is, without changing the array, can we use additional space somehow?',
  ],
  testCases: [
    { id: 1, input: '[2,7,11,15], 9', expected: '[0,1]', hidden: false },
    { id: 2, input: '[3,2,4], 6', expected: '[1,2]', hidden: false },
    { id: 3, input: '[3,3], 6', expected: '[0,1]', hidden: false },
    { id: 4, input: '[1,5,3,7,9], 12', expected: '[2,4]', hidden: true },
  ],
  tags: ['Array', 'Hash Table'],
  category: 'Arrays & Hashing',
  companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'],
  similarProblems: ['Three Sum', 'Two Sum II', '4Sum'],
  acceptanceRate: 89.2,
  totalSubmissions: 15420,
  totalAccepted: 13754,
  likes: 8934,
  dislikes: 234,
  starterCode: {
    python: 'def two_sum(nums, target):\n    # Write your solution here\n    pass',
    javascript: 'function twoSum(nums, target) {\n    // Write your solution here\n}',
    java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n    }\n}',
    cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n    }\n};',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Try to find by ID or slug
    const problem = await prisma.problem.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id },
        ]
      },
      include: {
        _count: {
          select: {
            submissions: true,
            bookmarks: true,
            discussions: true,
          }
        }
      }
    });

    if (!problem) {
      return NextResponse.json(
        { success: false, error: 'Problem not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const formattedProblem = {
      ...problem,
      tags: JSON.parse(problem.tags),
      companies: JSON.parse(problem.companies),
      examples: JSON.parse(problem.examples),
      constraints: JSON.parse(problem.constraints),
      hints: JSON.parse(problem.hints),
      testCases: JSON.parse(problem.testCases),
      starterCode: JSON.parse(problem.starterCode),
    };

    return NextResponse.json({
      success: true,
      problem: formattedProblem,
    });
  } catch (error) {
    console.error('Error fetching problem:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problem' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();
    
    // In production, update in database
    const updatedProblem = {
      ...mockProblem,
      ...updates,
      id: parseInt(id),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      problem: updatedProblem,
    });
  } catch (error) {
    console.error('Error updating problem:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update problem' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // In production, delete from database
    return NextResponse.json({
      success: true,
      message: `Problem ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting problem:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete problem' },
      { status: 500 }
    );
  }
}
