import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AICodeEditor from '@/components/codeEditor';

export default async function ProblemDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const problem = {
    id,
    title: 'Two Sum',
    difficulty: 'Easy',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
    ],
    tags: ['Array', 'Hash Table'],
  };

  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{problem.title}</span>
              <Badge variant={problem.difficulty === 'Easy' ? 'success' : problem.difficulty === 'Medium' ? 'warning' : 'destructive'}>
                {problem.difficulty}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-700 dark:text-gray-300">{problem.description}</div>
            <div>
              <div className="font-medium mb-2">Examples</div>
              <div className="space-y-2">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="rounded-lg border p-3 bg-white dark:bg-transparent">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Input: {ex.input}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Output: {ex.output}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((t, i) => (
                <span key={i} className="text-xs bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{t}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="surface rounded-xl overflow-hidden">
          <AICodeEditor />
        </div>
      </div>
    </AppShell>
  );
}

