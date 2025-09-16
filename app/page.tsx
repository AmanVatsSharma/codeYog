"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Code, Brain, Rocket, Goal } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function Home() {
  const { show } = useToast();
  return (
    <AppShell withSidebar={false}>
      <div className="relative overflow-hidden rounded-2xl surface elevate px-8 py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-4xl md:text-5xl font-bold tracking-tight">
              Master Coding with AI-Powered Tapasya
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }} className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              A premium, modern platform to learn, practice, and grow with interactive problems, smart insights, and collaborative learning.
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/dashboard">Start Solving</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/learning-path-tracker">Explore Learning Paths</Link>
              </Button>
              <Button variant="ghost" onClick={() => show({ title: 'Welcome to CodeYog', description: 'Explore features or jump into practice.', variant: 'success' })}>
                Show Toast
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="surface rounded-lg p-3">
                <div className="text-gray-600 dark:text-gray-300">Problems</div>
                <div className="text-xl font-semibold">1,000+</div>
              </div>
              <div className="surface rounded-lg p-3">
                <div className="text-gray-600 dark:text-gray-300">Languages</div>
                <div className="text-xl font-semibold">6+</div>
              </div>
              <div className="surface rounded-lg p-3">
                <div className="text-gray-600 dark:text-gray-300">AI Insights</div>
                <div className="text-xl font-semibold">Real-time</div>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: 0.05 }} className="relative">
            <div className="aspect-video surface rounded-xl p-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Live preview</span>
              </div>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 grid place-items-center">
                    <Code className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="font-medium">Smart Editor</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 grid place-items-center">
                    <Brain className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="font-medium">AI Feedback</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 grid place-items-center">
                    <Rocket className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-medium">Growth Paths</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[{
          title: 'Enterprise-Grade Reliability',
          desc: 'Robust UI and flows designed for scale and performance.',
          icon: <Rocket className="w-5 h-5" />
        }, {
          title: 'AI Guidance',
          desc: 'Personalized insights to accelerate your growth.',
          icon: <Brain className="w-5 h-5" />
        }, {
          title: 'Developer-Centric',
          desc: 'Keyboard-first, elegant, and consistent experiences.',
          icon: <Code className="w-5 h-5" />
        }].map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: 0.05 * i }} className="surface rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white grid place-items-center">
              {f.icon}
            </div>
            <div className="mt-3 text-lg font-semibold">{f.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}
