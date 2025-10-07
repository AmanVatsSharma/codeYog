import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample users
  const hashedPassword = await bcrypt.hash('Password123!', 12);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alex@example.com' },
      update: {},
      create: {
        email: 'alex@example.com',
        username: 'alexkumar',
        name: 'Alex Kumar',
        password: hashedPassword,
        bio: 'Software engineer passionate about algorithms and problem-solving',
        location: 'San Francisco, CA',
        level: 12,
        xp: 2850,
        rank: 'Gold',
        reputation: 2850,
        streak: 7,
        longestStreak: 23,
        github: 'alexkumar',
      },
    }),
    prisma.user.upsert({
      where: { email: 'sarah@example.com' },
      update: {},
      create: {
        email: 'sarah@example.com',
        username: 'sarahchen',
        name: 'Sarah Chen',
        password: hashedPassword,
        bio: 'Competitive programmer and algorithm enthusiast',
        location: 'Beijing, China',
        level: 15,
        xp: 4650,
        rank: 'Platinum',
        reputation: 5420,
        streak: 45,
        longestStreak: 67,
      },
    }),
    prisma.user.upsert({
      where: { email: 'mike@example.com' },
      update: {},
      create: {
        email: 'mike@example.com',
        username: 'mikejohnson',
        name: 'Mike Johnson',
        password: hashedPassword,
        bio: 'Full-stack developer learning competitive programming',
        location: 'London, UK',
        level: 8,
        xp: 1240,
        rank: 'Silver',
        reputation: 1240,
        streak: 3,
        longestStreak: 15,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create sample problems
  const problems = await Promise.all([
    prisma.problem.upsert({
      where: { slug: 'two-sum' },
      update: {},
      create: {
        title: 'Two Sum',
        slug: 'two-sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        difficulty: 'Easy',
        category: 'Arrays & Hashing',
        tags: JSON.stringify(['Array', 'Hash Table', 'Two Pointers']),
        companies: JSON.stringify(['Amazon', 'Google', 'Facebook', 'Microsoft']),
        examples: JSON.stringify([
          {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
          }
        ]),
        constraints: JSON.stringify([
          '2 ≤ nums.length ≤ 10⁴',
          '-10⁹ ≤ nums[i] ≤ 10⁹',
          'Only one valid answer exists.',
        ]),
        hints: JSON.stringify([
          'Use a hash map to store complements',
          'Iterate through the array once',
        ]),
        testCases: JSON.stringify([
          { input: '[2,7,11,15], 9', expected: '[0,1]', hidden: false },
          { input: '[3,2,4], 6', expected: '[1,2]', hidden: false },
        ]),
        starterCode: JSON.stringify({
          python: 'def two_sum(nums, target):\n    # Write your solution here\n    pass',
          javascript: 'function twoSum(nums, target) {\n    // Write your solution here\n}',
        }),
        acceptanceRate: 89.2,
        totalSubmissions: 15420,
        totalAccepted: 13754,
        likes: 8934,
        dislikes: 234,
      },
    }),
    prisma.problem.upsert({
      where: { slug: 'add-two-numbers' },
      update: {},
      create: {
        title: 'Add Two Numbers',
        slug: 'add-two-numbers',
        description: 'You are given two non-empty linked lists representing two non-negative integers.',
        difficulty: 'Medium',
        category: 'Linked Lists',
        tags: JSON.stringify(['Linked List', 'Math', 'Recursion']),
        companies: JSON.stringify(['Amazon', 'Microsoft', 'Apple']),
        examples: JSON.stringify([
          {
            input: 'l1 = [2,4,3], l2 = [5,6,4]',
            output: '[7,0,8]',
            explanation: '342 + 465 = 807',
          }
        ]),
        constraints: JSON.stringify([
          'The number of nodes is in range [1, 100]',
        ]),
        hints: JSON.stringify([
          'Think about how you add numbers on paper',
          'Handle carry properly',
        ]),
        testCases: JSON.stringify([
          { input: '[2,4,3], [5,6,4]', expected: '[7,0,8]', hidden: false },
        ]),
        starterCode: JSON.stringify({
          python: 'def add_two_numbers(l1, l2):\n    # Write your solution here\n    pass',
        }),
        acceptanceRate: 72.8,
        totalSubmissions: 8934,
        totalAccepted: 6504,
        likes: 5234,
        dislikes: 456,
      },
    }),
    prisma.problem.upsert({
      where: { slug: 'longest-substring' },
      update: {},
      create: {
        title: 'Longest Substring Without Repeating Characters',
        slug: 'longest-substring',
        description: 'Given a string s, find the length of the longest substring without repeating characters.',
        difficulty: 'Medium',
        category: 'Strings',
        tags: JSON.stringify(['Hash Table', 'String', 'Sliding Window']),
        companies: JSON.stringify(['Amazon', 'Bloomberg', 'Adobe']),
        examples: JSON.stringify([
          {
            input: 's = "abcabcbb"',
            output: '3',
            explanation: 'The answer is "abc", with the length of 3.',
          }
        ]),
        constraints: JSON.stringify([
          '0 ≤ s.length ≤ 5 * 10⁴',
        ]),
        hints: JSON.stringify([
          'Use sliding window approach',
          'Keep track of characters using hash set',
        ]),
        testCases: JSON.stringify([
          { input: '"abcabcbb"', expected: '3', hidden: false },
        ]),
        starterCode: JSON.stringify({
          python: 'def length_of_longest_substring(s):\n    # Write your solution here\n    pass',
        }),
        acceptanceRate: 68.5,
        totalSubmissions: 12456,
        totalAccepted: 8532,
        likes: 7234,
        dislikes: 321,
      },
    }),
  ]);

  console.log(`✅ Created ${problems.length} problems`);

  // Create sample achievements
  const achievements = await Promise.all([
    prisma.achievement.upsert({
      where: { name: 'First Steps' },
      update: {},
      create: {
        name: 'First Steps',
        description: 'Solve your first problem',
        icon: 'target',
        category: 'problem_solving',
        requirement: 1,
        points: 10,
      },
    }),
    prisma.achievement.upsert({
      where: { name: 'Week Warrior' },
      update: {},
      create: {
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: 'zap',
        category: 'streak',
        requirement: 7,
        points: 50,
      },
    }),
    prisma.achievement.upsert({
      where: { name: 'Problem Solver' },
      update: {},
      create: {
        name: 'Problem Solver',
        description: 'Solve 50 problems',
        icon: 'code',
        category: 'problem_solving',
        requirement: 50,
        points: 100,
      },
    }),
    prisma.achievement.upsert({
      where: { name: 'Contest Winner' },
      update: {},
      create: {
        name: 'Contest Winner',
        description: 'Win a contest',
        icon: 'trophy',
        category: 'contest',
        requirement: 1,
        points: 200,
      },
    }),
  ]);

  console.log(`✅ Created ${achievements.length} achievements`);

  // Create sample discussions
  const discussions = await Promise.all([
    prisma.discussion.create({
      data: {
        authorId: users[0].id,
        type: 'question',
        title: 'Best approach for solving Dynamic Programming problems?',
        content: 'I struggle with DP problems. What are the key patterns I should know?',
        tags: JSON.stringify(['Dynamic Programming', 'Algorithms', 'Patterns']),
        difficulty: 'Hard',
        views: 1234,
        likes: 45,
      },
    }),
    prisma.discussion.create({
      data: {
        authorId: users[1].id,
        problemId: problems[0].id,
        type: 'article',
        title: 'Complete Guide to Hash Tables',
        content: 'Hash tables are one of the most important data structures...',
        tags: JSON.stringify(['Hash Table', 'Data Structures', 'Tutorial']),
        difficulty: 'Medium',
        views: 5678,
        likes: 234,
        isAnswered: true,
      },
    }),
  ]);

  console.log(`✅ Created ${discussions.length} discussions`);

  // Create sample contests
  const contests = await Promise.all([
    prisma.contest.create({
      data: {
        title: 'Weekly Contest 385',
        slug: 'weekly-contest-385',
        description: 'Sharpen your coding skills with 4 challenging problems',
        type: 'weekly',
        status: 'upcoming',
        difficulty: 'All Levels',
        startTime: new Date(Date.now() + 86400000), // Tomorrow
        endTime: new Date(Date.now() + 86400000 + 5400000), // 90 min later
        duration: 90,
        problems: JSON.stringify([
          { id: problems[0].id, title: problems[0].title, difficulty: 'Easy', points: 100 },
        ]),
        prizes: JSON.stringify(['$500', '$300', '$200']),
        rules: JSON.stringify(['No collaboration', 'Any language allowed']),
        participants: 0,
      },
    }),
  ]);

  console.log(`✅ Created ${contests.length} contests`);

  // Create sample learning paths
  const learningPaths = await Promise.all([
    prisma.learningPath.create({
      data: {
        name: 'Data Structures Mastery',
        slug: 'data-structures-mastery',
        description: 'Master fundamental and advanced data structures',
        difficulty: 'Intermediate',
        duration: '4-6 months',
        totalConcepts: 12,
        color: 'blue',
        prerequisites: JSON.stringify(['Basic Programming']),
        concepts: JSON.stringify([
          {
            id: 'arrays',
            name: 'Arrays & Strings',
            status: 'completed',
            problems: 25,
          },
          {
            id: 'trees',
            name: 'Binary Trees',
            status: 'in-progress',
            problems: 30,
          },
        ]),
      },
    }),
  ]);

  console.log(`✅ Created ${learningPaths.length} learning paths`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
