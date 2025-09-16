"use client";
import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Tag, Sparkles } from 'lucide-react';

const ProblemsPage = () => {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'] },
    { id: 2, title: 'Binary Tree Inorder Traversal', difficulty: 'Medium', tags: ['Tree', 'DFS'] },
    { id: 3, title: 'Word Ladder II', difficulty: 'Hard', tags: ['Graph', 'BFS'] },
    { id: 4, title: 'Valid Anagram', difficulty: 'Easy', tags: ['String', 'Hash Table'] },
    { id: 5, title: 'Longest Substring Without Repeating', difficulty: 'Medium', tags: ['String', 'Sliding Window'] },
  ];

  const filtered = problems.filter(p =>
    (difficulty === 'All' || p.difficulty === difficulty) &&
    (query.trim() === '' || p.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <UICard>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <div className="font-semibold">Browse Problems</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search problems..." className="pl-9 w-64" />
                </div>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} className="h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm">
                  {['All', 'Easy', 'Medium', 'Hard'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <Button variant="ghost" leftIcon={<Filter className="w-4 h-4" />}>Filters</Button>
              </div>
            </div>
          </CardContent>
        </UICard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <UICard key={p.id} className="hover:border-blue-300 transition-colors cursor-pointer">
              <CardContent>
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-gray-900">{p.title}</div>
                  <Badge variant={p.difficulty === 'Easy' ? 'success' : p.difficulty === 'Medium' ? 'warning' : 'destructive'}>{p.difficulty}</Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tags.map((t, i) => (
                    <span key={i} className="text-xs bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
              </CardContent>
            </UICard>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default ProblemsPage;