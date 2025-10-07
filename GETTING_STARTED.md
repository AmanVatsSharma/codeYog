# 🚀 Getting Started with CodeYog

## **Your Complete Guide to Running CodeYog Locally**

---

## 📋 **Prerequisites**

Before you begin, ensure you have:
- **Node.js 20.x or higher** ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- A code editor (VS Code recommended)

---

## ⚡ **Quick Start (5 Minutes)**

### **1. Clone or Navigate to Project**

```bash
cd /workspace
```

### **2. One-Command Setup**

```bash
npm run setup
```

This command will:
- ✅ Install all dependencies
- ✅ Generate Prisma client
- ✅ Create SQLite database
- ✅ Seed with sample data

### **3. Start Development Server**

```bash
npm run dev
```

### **4. Open Your Browser**

Visit [http://localhost:3000](http://localhost:3000)

**🎉 You're ready to go!**

---

## 🔑 **Default Test Accounts**

After seeding, you can sign in with these accounts:

### **User 1**
- Email: `alex@example.com`
- Password: `Password123!`
- Role: Regular user (Gold rank)

### **User 2**
- Email: `sarah@example.com`
- Password: `Password123!`
- Role: Advanced user (Platinum rank)

### **User 3**
- Email: `mike@example.com`
- Password: `Password123!`
- Role: Beginner user (Silver rank)

---

## 📖 **Step-by-Step Guide**

### **Step 1: Install Dependencies**

```bash
npm install
```

This installs all required packages:
- Next.js framework
- React libraries
- Prisma ORM
- Monaco Editor
- UI libraries
- And more...

### **Step 2: Set Up Environment Variables**

```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env` and update values as needed:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Add OAuth credentials
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-secret"
```

### **Step 3: Initialize Database**

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# Seed with sample data
npm run db:seed
```

You should see:
```
🌱 Starting database seed...
✅ Created 3 users
✅ Created 3 problems
✅ Created 4 achievements
✅ Created 2 discussions
✅ Created 1 contests
🎉 Database seeding completed successfully!
```

### **Step 4: Start Development**

```bash
npm run dev
```

Server starts on [http://localhost:3000](http://localhost:3000)

---

## 🎯 **What to Explore First**

### **1. Landing Page** (`/`)
- Beautiful hero section
- Feature showcase
- Call-to-action buttons

### **2. Sign In** (`/auth/signin`)
- Try logging in with test accounts
- Or create a new account at `/auth/signup`

### **3. Dashboard** (`/dashboard`)
- View your progress
- See AI recommendations
- Track your stats

### **4. Problems** (`/problems`)
- Browse coding problems
- Filter by difficulty
- Click to solve

### **5. Code Editor** (`/problems/1` or `/tests`)
- Try the Monaco Editor
- Run code in multiple languages
- Get AI analysis

### **6. Playground** (`/playground`)
- Write and execute code freely
- Test different languages
- No problem constraints

### **7. Contests** (`/contests`)
- View upcoming contests
- See leaderboards
- Register for contests

### **8. Community** (`/community`)
- Browse discussions
- Ask questions
- Share knowledge

### **9. Learn** (`/learn`)
- Explore video courses
- Watch tutorials
- Track progress

### **10. Your Profile** (`/profile/alexkumar`)
- View your profile
- See achievements
- Track submissions

---

## 🛠️ **Development Tools**

### **Database Browser**

```bash
npm run db:studio
```

Opens Prisma Studio at [http://localhost:5555](http://localhost:5555)
- View all database tables
- Edit data visually
- Run queries

### **Type Checking**

```bash
npm run type-check
```

Checks TypeScript without building.

### **Linting**

```bash
npm run lint
```

Checks code quality.

### **Format Code**

```bash
npm run format
```

Auto-formats all code files.

### **Full Check**

```bash
npm run check
```

Runs type-check + lint + build.

---

## 🔄 **Common Development Tasks**

### **Reset Database**

```bash
npm run db:reset
```

This will:
1. Delete the database
2. Recreate tables
3. Reseed with fresh data

### **Add More Sample Data**

Edit `prisma/seed.ts` and add your data, then:

```bash
npm run db:seed
```

### **View Database**

```bash
npm run db:studio
```

### **Clean Build**

```bash
rm -rf .next
npm run build
```

---

## 🌐 **Environment Modes**

### **Development Mode**

```bash
npm run dev
```

Features:
- Hot reload
- Detailed error messages
- Dev tools enabled
- Fast refresh

### **Production Mode**

```bash
npm run build
npm run start
```

Features:
- Optimized bundles
- Minified code
- Production performance
- No dev tools

---

## 🐛 **Troubleshooting**

### **Port Already in Use**

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### **Database Issues**

```bash
# Reset everything
npm run db:reset

# Or manually
rm prisma/dev.db
npx prisma db push
npm run db:seed
```

### **Build Fails**

```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### **Monaco Editor Not Loading**

- Ensure you're using dynamic import
- Check browser console for errors
- Try disabling browser extensions

---

## 📱 **Testing on Mobile**

### **Local Network Testing**

```bash
# Find your local IP
# On Mac/Linux:
ifconfig | grep "inet "
# On Windows:
ipconfig

# Start server
npm run dev

# Visit from mobile device
http://YOUR_IP:3000
```

### **Responsive Testing**

- Use browser DevTools
- Toggle device toolbar
- Test all breakpoints:
  - Mobile: 375px, 414px
  - Tablet: 768px, 1024px
  - Desktop: 1280px, 1920px

---

## 🎨 **Customization**

### **Change Brand Colors**

Edit `app/globals.css`:

```css
:root {
  --primary: 59 130 246; /* Change this */
}
```

### **Update Logo**

Replace files in `public/logo/` with your branding.

### **Modify Theme**

Edit `components/providers/theme-provider.tsx` for theme options.

---

## 📚 **Learning Resources**

### **Project Documentation**
1. `README.md` - Overview
2. `COMPLETE_FEATURES.md` - All features
3. `DEVELOPER_GUIDE.md` - Development guide
4. `DEPLOYMENT.md` - Deploy to production
5. `PROJECT_COMPLETION.md` - Completion report

### **External Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🎯 **Next Steps**

### **After Getting Started**

1. ✅ **Explore All Pages** - Visit every route
2. ✅ **Try Code Editor** - Solve a problem
3. ✅ **Check Admin Panel** - See platform management
4. ✅ **Browse Community** - Read discussions
5. ✅ **View Leaderboard** - See rankings
6. ✅ **Customize Settings** - Make it yours

### **To Deploy**

1. Read `DEPLOYMENT.md`
2. Set up production database
3. Configure environment variables
4. Deploy to Vercel/Railway
5. Set up custom domain

### **To Contribute**

1. Read `DEVELOPER_GUIDE.md`
2. Check open issues
3. Create feature branch
4. Make changes
5. Submit pull request

---

## 💡 **Pro Tips**

### **Development**
- Use `Cmd/Ctrl + K` to open command palette
- Enable auto-save in your editor
- Use Prisma Studio to view data
- Check browser console for errors

### **Database**
- Run `npm run db:studio` in separate terminal
- Backup database before major changes
- Use transactions for related operations

### **Performance**
- Keep bundle sizes small
- Lazy load heavy components
- Use pagination for long lists
- Optimize images

---

## 🎊 **You're All Set!**

CodeYog is now running on your machine! 

### **Quick Commands Reference**

```bash
npm run dev          # Start development
npm run build        # Build for production
npm run start        # Start production server
npm run db:studio    # Open database browser
npm run db:seed      # Seed database
npm run db:reset     # Reset database
npm run setup        # Full setup (first time)
npm run check        # Run all checks
```

---

## 🆘 **Need Help?**

- 📖 Check documentation in the project
- 🐛 Report issues on GitHub
- 💬 Ask in community Discord
- 📧 Email: dev@codeyog.com

---

## 🎉 **Happy Coding!**

**Welcome to CodeYog - Where Code Meets Mastery** 🧘‍♂️💻

Start your coding journey at [http://localhost:3000](http://localhost:3000)

---

**Built with ❤️ using Next.js, React, TypeScript, Prisma, and Monaco Editor**
