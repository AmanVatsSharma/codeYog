import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, username, email, password } = await request.json();

    // Validate input
    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return NextResponse.json(
        { error: 'Username must be 3-20 characters (letters, numbers, underscore only)' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters with uppercase, lowercase, and number' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
      if (existingUser.username === username.toLowerCase()) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
        level: 1,
        xp: 0,
        rank: 'Bronze',
        reputation: 0,
        streak: 0,
        longestStreak: 0,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
      }
    });

    // Create welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'welcome',
        title: 'Welcome to CodeYog!',
        message: 'Start your coding journey by solving your first problem.',
        link: '/problems',
      }
    });

    return NextResponse.json(
      {
        success: true,
        user,
        message: 'Account created successfully'
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email or username already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
