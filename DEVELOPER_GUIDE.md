# CodeYog - Developer Guide

## 🛠️ **For Developers**

This guide will help you understand, maintain, and extend the CodeYog platform.

---

## 📁 **Project Structure**

```
code-yog/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── problems/             # Problem CRUD
│   │   ├── submissions/          # Code submissions
│   │   ├── contests/             # Contest management
│   │   ├── users/                # User management
│   │   ├── search/               # Universal search
│   │   ├── bookmarks/            # Bookmarking
│   │   ├── notifications/        # Notifications
│   │   ├── stats/                # Statistics
│   │   └── execute/              # Code execution
│   ├── (pages)/                  # Application pages
│   │   ├── dashboard/            # User dashboard
│   │   ├── problems/             # Problem browser
│   │   ├── contests/             # Contest platform
│   │   ├── community/            # Discussion forum
│   │   ├── learn/                # Learning resources
│   │   ├── leaderboard/          # Rankings
│   │   ├── playground/           # Code sandbox
│   │   ├── profile/              # User profiles
│   │   ├── settings/             # User settings
│   │   └── auth/                 # Auth pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React Components
│   ├── ui/                       # UI Primitives
│   │   ├── button.tsx            # Button component
│   │   ├── card.tsx              # Card component
│   │   ├── badge.tsx             # Badge component
│   │   ├── input.tsx             # Input component
│   │   ├── modal.tsx             # Modal component
│   │   ├── toast.tsx             # Toast notifications
│   │   ├── tabs.tsx              # Tab component
│   │   ├── progress.tsx          # Progress bars
│   │   └── ...                   # Other UI components
│   ├── layout/                   # Layout Components
│   │   └── AppShell.tsx          # Main app layout
│   ├── MonacoCodeEditor.tsx      # Code editor
│   ├── NotificationsPanel.tsx    # Notifications
│   └── SearchModal.tsx           # Search modal
├── lib/                          # Utilities
│   ├── prisma.ts                 # Database client
│   └── auth/                     # Auth configuration
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Seed data
│   └── dev.db                    # SQLite database
├── public/                       # Static assets
├── .env                          # Environment variables
└── package.json                  # Dependencies
```

---

## 🔧 **Adding New Features**

### 1. Adding a New Page

```typescript
// app/my-feature/page.tsx
"use client";
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';

export default function MyFeaturePage() {
  return (
    <AppShell>
      <Card>
        {/* Your content */}
      </Card>
    </AppShell>
  );
}
```

### 2. Adding a New API Route

```typescript
// app/api/my-feature/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.myModel.findMany();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
```

### 3. Adding a Database Model

```prisma
// prisma/schema.prisma
model MyModel {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  
  @@index([userId])
}
```

Then run:
```bash
npx prisma db push
npx prisma generate
```

### 4. Creating a Reusable Component

```typescript
// components/ui/my-component.tsx
import { cn } from '@/components/lib/utils';

interface MyComponentProps {
  variant?: 'default' | 'primary';
  children: React.ReactNode;
}

export function MyComponent({ variant = 'default', children }: MyComponentProps) {
  return (
    <div className={cn(
      'rounded-lg p-4',
      variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-100'
    )}>
      {children}
    </div>
  );
}
```

---

## 🔌 **API Integration Guide**

### Using APIs in Components

```typescript
"use client";
import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/my-endpoint');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <div>{/* Render data */}</div>;
}
```

---

## 🎨 **Styling Guidelines**

### Using Tailwind Classes

```tsx
// Good: Use Tailwind utilities
<div className="flex items-center space-x-4 p-6 rounded-lg surface">
  {/* Content */}
</div>

// Better: Use the cn() utility for conditional classes
<div className={cn(
  'flex items-center p-6 rounded-lg',
  isActive ? 'bg-blue-600 text-white' : 'surface'
)}>
  {/* Content */}
</div>
```

### Custom Utilities
- `.surface` - Glassmorphism background
- `.elevate` - Shadow elevation
- `.fade-in` - Fade in animation
- `.skip-link` - Accessibility skip link

### Color System
```tsx
import { colorToBg, colorToText, colorToBorder } from '@/components/lib/utils';

<div className={colorToBg('blue', 500)}>Blue background</div>
<span className={colorToText('red', 600)}>Red text</span>
<div className={colorToBorder('green', 300)}>Green border</div>
```

---

## 🔐 **Authentication**

### Protecting Routes

```typescript
// app/protected/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  return <div>Protected content</div>;
}
```

### Client-Side Auth

```typescript
"use client";
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') return <div>Please sign in</div>;

  return <div>Hello, {session?.user?.name}</div>;
}
```

---

## 💾 **Database Operations**

### Common Prisma Queries

```typescript
import { prisma } from '@/lib/prisma';

// Create
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    username: 'username',
    password: hashedPassword,
  }
});

// Read
const users = await prisma.user.findMany({
  where: { level: { gte: 10 } },
  include: { achievements: true },
  orderBy: { reputation: 'desc' },
  take: 10,
});

// Update
await prisma.user.update({
  where: { id: userId },
  data: { xp: { increment: 10 } },
});

// Delete
await prisma.user.delete({
  where: { id: userId }
});

// Complex query with relations
const problem = await prisma.problem.findUnique({
  where: { id: problemId },
  include: {
    submissions: {
      where: { userId },
      orderBy: { submittedAt: 'desc' },
      take: 5,
    },
    _count: {
      select: {
        submissions: true,
        bookmarks: true,
      }
    }
  }
});
```

---

## 🧪 **Testing**

### Adding Tests

```bash
# Install testing libraries
npm install -D jest @testing-library/react @testing-library/jest-dom

# Create test file
# components/__tests__/Button.test.tsx
```

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 📊 **Monitoring & Analytics**

### Adding Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking with Sentry

```bash
npm install @sentry/nextjs

# Follow Sentry setup wizard
npx @sentry/wizard@latest -i nextjs
```

---

## 🔄 **State Management**

### Using React Hooks

```typescript
// Simple state
const [count, setCount] = useState(0);

// Complex state
const [user, setUser] = useState<User | null>(null);

// Effect hook
useEffect(() => {
  fetchData();
}, [dependency]);

// Custom hooks
function useUserData(userId: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    }
    fetchUser();
  }, [userId]);

  return { user, loading };
}
```

---

## 🎨 **Theme System**

### Using Themes

```typescript
"use client";
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### Custom Theme Values

```css
/* globals.css */
:root {
  --primary: 59 130 246; /* blue-500 */
  --background: 255 255 255;
}

.dark {
  --primary: 99 102 241; /* indigo-500 */
  --background: 10 10 10;
}
```

---

## 🚀 **Performance Optimization**

### Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <ComponentLoader />,
  ssr: false, // Disable SSR if needed
});
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/image.png"
  alt="Description"
  width={500}
  height={300}
  priority // For above-the-fold images
/>
```

### Caching

```typescript
// API route with caching
export async function GET(request: NextRequest) {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
    }
  });
}
```

---

## 🔨 **Common Tasks**

### Adding a New Problem

```typescript
const problem = await prisma.problem.create({
  data: {
    title: 'My Problem',
    slug: 'my-problem',
    description: 'Problem description...',
    difficulty: 'Medium',
    category: 'Arrays',
    tags: JSON.stringify(['Array', 'Hash Table']),
    // ... other fields
  }
});
```

### Processing a Submission

```typescript
// Create submission
const submission = await prisma.submission.create({
  data: {
    userId,
    problemId,
    code,
    language,
    status: 'Pending',
  }
});

// Execute code
const result = await fetch('/api/execute', {
  method: 'POST',
  body: JSON.stringify({ language, code, stdin: testInput }),
});

// Update submission
await prisma.submission.update({
  where: { id: submission.id },
  data: {
    status: passed ? 'Accepted' : 'Wrong Answer',
    runtime: executionTime,
    testsPassed: passed,
    score: calculateScore(passed, total),
  }
});

// Update user XP
if (passed) {
  await prisma.user.update({
    where: { id: userId },
    data: { xp: { increment: 10 } }
  });
}
```

### Creating Achievements

```typescript
// Check if user unlocked achievement
const problemCount = await prisma.submission.count({
  where: {
    userId,
    status: 'Accepted'
  }
});

if (problemCount >= achievement.requirement) {
  await prisma.userAchievement.create({
    data: {
      userId,
      achievementId: achievement.id,
    }
  });
  
  // Send notification
  await prisma.notification.create({
    data: {
      userId,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: `You earned "${achievement.name}"`,
    }
  });
}
```

---

## 🐛 **Debugging**

### Database Debugging

```bash
# Open Prisma Studio
npm run db:studio

# View database in browser
# Navigate to http://localhost:5555
```

### Logging

```typescript
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Production logging (use external service)
import * as Sentry from '@sentry/nextjs';
Sentry.captureException(error);
```

---

## 📦 **Deployment Checklist**

### Pre-Deployment
- [ ] Run `npm run build` successfully
- [ ] Test all major features
- [ ] Check mobile responsiveness
- [ ] Verify dark mode
- [ ] Test authentication flows
- [ ] Verify API endpoints
- [ ] Check accessibility
- [ ] Review security measures

### Environment Variables
```env
# Production .env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-strong-secret"
GITHUB_ID="prod-github-id"
GITHUB_SECRET="prod-github-secret"
```

### Database Migration
```bash
# Switch to PostgreSQL for production
# Update DATABASE_URL in .env

# Push schema
npx prisma db push

# Or use migrations
npx prisma migrate deploy
```

---

## 🔐 **Security Best Practices**

1. **Never commit .env files**
2. **Use strong NEXTAUTH_SECRET**
3. **Validate all user inputs**
4. **Use Prisma parameterized queries**
5. **Implement rate limiting**
6. **Keep dependencies updated**
7. **Use HTTPS in production**
8. **Sanitize user-generated content**
9. **Implement CORS properly**
10. **Regular security audits**

---

## 🎯 **Performance Tips**

1. **Use Server Components** when possible
2. **Implement pagination** for large lists
3. **Lazy load** heavy components
4. **Optimize images** with Next.js Image
5. **Use React.memo** for expensive renders
6. **Implement virtual scrolling** for long lists
7. **Cache API responses** appropriately
8. **Minimize bundle size** with code splitting
9. **Use loading states** for better UX
10. **Optimize database queries** with proper indexes

---

## 🧩 **Extending the Platform**

### Adding OAuth Providers

```typescript
// lib/auth/auth.config.ts
import LinkedInProvider from 'next-auth/providers/linkedin';

export const authOptions = {
  providers: [
    // ... existing providers
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
  ],
};
```

### Adding Real-Time Features

```bash
npm install socket.io socket.io-client
```

```typescript
// lib/socket.ts
import { Server } from 'socket.io';

export function initSocket(server) {
  const io = new Server(server);
  
  io.on('connection', (socket) => {
    console.log('Client connected');
    
    socket.on('submit-code', (data) => {
      // Handle real-time code submission
      io.emit('submission-update', result);
    });
  });
}
```

### Adding Email Notifications

```bash
npm install nodemailer
```

```typescript
// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
});

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: 'CodeYog <noreply@codeyog.com>',
    to,
    subject,
    html,
  });
}
```

---

## 🧪 **Development Workflow**

### Daily Development

```bash
# Start dev server
npm run dev

# In another terminal, watch database
npm run db:studio

# After schema changes
npx prisma db push
npx prisma generate

# Before committing
npm run lint
npm run build
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit
git add .
git commit -m "feat: add my feature"

# Push and create PR
git push origin feature/my-feature
```

---

## 📚 **Useful Resources**

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)

### Tools
- **Prisma Studio**: Visual database editor
- **Next.js DevTools**: Browser extension
- **React DevTools**: Component inspector
- **Tailwind IntelliSense**: VSCode extension

---

## 🆘 **Troubleshooting**

### Common Issues

**Build Fails**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Database Issues**
```bash
# Reset database
rm prisma/dev.db
npx prisma db push
npm run db:seed
```

**Type Errors**
```bash
# Regenerate Prisma client
npx prisma generate
```

**Monaco Editor Not Loading**
```typescript
// Ensure dynamic import with ssr: false
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});
```

---

## 🎓 **Learning Path for Contributors**

### Beginner
1. Understand Next.js App Router
2. Learn Prisma basics
3. Explore existing components
4. Make small UI improvements

### Intermediate
5. Add new API endpoints
6. Create database models
7. Build new pages
8. Implement features

### Advanced
9. Optimize performance
10. Add real-time features
11. Implement complex algorithms
12. Architecture decisions

---

## 💡 **Tips & Tricks**

### TypeScript
- Use proper types, avoid `any`
- Create interfaces for complex objects
- Use utility types (`Partial`, `Pick`, `Omit`)

### React
- Use `"use client"` only when needed
- Prefer Server Components for data fetching
- Memoize expensive computations
- Use proper dependency arrays in useEffect

### Tailwind
- Use the `cn()` utility for conditional classes
- Prefer Tailwind classes over custom CSS
- Use design system colors
- Maintain consistency

### Database
- Always index foreign keys
- Use transactions for related operations
- Implement soft deletes when needed
- Consider data retention policies

---

## 🚀 **Ready to Contribute!**

CodeYog is built with modern best practices and is ready for:
- ✅ Feature additions
- ✅ Bug fixes
- ✅ Performance improvements
- ✅ Documentation updates
- ✅ UI/UX enhancements

**Join us in building the ultimate coding platform!** 🎉

---

## 📞 **Get Help**

- **GitHub Issues**: Report bugs
- **Discord**: Join developer community
- **Email**: dev@codeyog.com

---

**Happy Coding!** 💻✨
