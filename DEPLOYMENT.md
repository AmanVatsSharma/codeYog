# CodeYog - Deployment Guide

## 🚀 Quick Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy CodeYog is to use the Vercel Platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/code-yog)

1. **Connect Your Repository**
   - Click the button above or visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

2. **Configure Environment Variables**
   ```env
   # Add these in Vercel dashboard
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

3. **Deploy**
   - Click "Deploy"
   - Your app will be live in ~2 minutes
   - Automatic deployments on every push to main branch

---

## 🔧 Manual Deployment

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- A server with at least 2GB RAM

### Build Steps

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm run start
```

The application will be available at `http://localhost:3000`

---

## 🐳 Docker Deployment

### Build Docker Image

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## ☁️ Cloud Platforms

### AWS Amplify

1. Connect your GitHub repository
2. Choose Next.js as the framework
3. Deploy automatically

### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add Next.js plugin

### Railway

1. Create new project
2. Connect GitHub repository
3. Railway auto-detects Next.js
4. Deploy

---

## 🌐 Domain Configuration

### Custom Domain on Vercel

1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate automatically provisioned

### DNS Configuration

```
Type  Name    Value
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

---

## 📊 Performance Optimization

### Caching Strategy

```javascript
// next.config.ts
export default {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

### CDN Configuration

- Enable Vercel's Edge Network (automatic)
- Or use Cloudflare for additional caching
- Enable image optimization

---

## 🔐 Security Checklist

- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up Content Security Policy
- [ ] Configure rate limiting
- [ ] Enable CORS properly
- [ ] Sanitize user inputs
- [ ] Use environment variables for secrets
- [ ] Enable DDoS protection
- [ ] Regular security updates

---

## 📈 Monitoring

### Recommended Tools

1. **Vercel Analytics** - Built-in performance monitoring
2. **Sentry** - Error tracking
3. **LogRocket** - Session replay
4. **Datadog** - Infrastructure monitoring
5. **Google Analytics** - User analytics

### Setup Vercel Analytics

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

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID}}
        vercel-project-id: ${{ secrets.PROJECT_ID}}
```

---

## 🗄️ Database Setup (Future)

### PostgreSQL on Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create database
railway up
railway add postgresql
```

### Prisma Setup

```bash
# Install Prisma
npm install @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init

# Generate client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

---

## 🧪 Testing Before Deployment

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Test production build locally
npm run start

# Check bundle size
npm run analyze
```

---

## 📝 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test code editor functionality
- [ ] Check problem submissions
- [ ] Verify contest features
- [ ] Test community interactions
- [ ] Check mobile responsiveness
- [ ] Verify dark mode
- [ ] Test accessibility features
- [ ] Monitor error logs
- [ ] Set up backups
- [ ] Configure monitoring alerts
- [ ] Update documentation

---

## 🆘 Troubleshooting

### Build Failures

**Issue**: Build fails with memory error
```bash
# Solution: Increase Node memory
NODE_OPTIONS='--max-old-space-size=4096' npm run build
```

**Issue**: Monaco Editor fails to load
```bash
# Solution: Ensure dynamic import is used
# Already implemented in code
```

### Runtime Errors

**Issue**: API routes return 404
```bash
# Verify API routes are in correct directory
# Check next.config.ts for rewrites
```

**Issue**: Environment variables not working
```bash
# Ensure NEXT_PUBLIC_ prefix for client-side vars
# Restart dev server after changes
```

---

## 📞 Support

For deployment issues:
- **Documentation**: [FEATURES.md](./FEATURES.md)
- **Email**: support@codeyog.com
- **Discord**: [Community Server](https://discord.gg/codeyog)

---

## 🎉 Success!

Your CodeYog instance is now deployed and ready to use!

Visit your deployment URL and start coding! 🚀

---

**Pro Tip**: Enable automatic deployments from your main branch for continuous delivery of new features and fixes.
