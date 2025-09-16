'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/components/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, LayoutDashboard, BookOpen, GraduationCap, Sun, Moon, Sparkles, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';

type Props = {
  children: React.ReactNode;
  withSidebar?: boolean;
};

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/problems', label: 'Problems', icon: BookOpen },
  { href: '/learning-path-tracker', label: 'Learning Path', icon: GraduationCap },
  { href: '/tests', label: 'Code Lab', icon: Code },
];

export function AppShell({ children, withSidebar = true }: Props) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground grid" style={{ gridTemplateRows: 'auto 1fr' }}>
      {/* Header */}
      <header className="surface elevate sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <Link href="/" className="text-lg font-semibold">CodeYog</Link>
          </div>
          <div className="flex items-center gap-2">
            {withSidebar && (
              <Button variant="ghost" size="icon" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)} className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </Button>
            <Avatar name="Alex Kumar" size={32} />
          </div>
        </div>
      </header>

      {/* Main */}
      <div className={cn('mx-auto w-full max-w-7xl grid gap-6 px-4 sm:px-6 lg:px-8 py-6', withSidebar ? 'grid-cols-1 md:grid-cols-[220px_1fr]' : 'grid-cols-1')}>
        {withSidebar && (
          <aside className={cn('md:block', open ? 'block' : 'hidden')}>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors', active ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-white/10') }>
                    <Icon className={cn('w-4 h-4', active ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500')} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="mb-4">
                <Breadcrumbs segments={pathname.split('/').filter(Boolean).reduce<{ href: string; label: string }[]>((acc, seg, idx, arr) => {
                  const href = '/' + arr.slice(0, idx + 1).join('/');
                  acc.push({ href, label: seg.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()) });
                  return acc;
                }, [{ href: '/', label: 'Home' }])} />
              </div>
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

