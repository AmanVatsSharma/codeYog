'use client';
import * as React from 'react';
import { cn } from '@/components/lib/utils';

type Tab = { id: string; label: React.ReactNode };

export function Tabs({ tabs, value, onChange, className }: { tabs: Tab[]; value: string; onChange: (id: string) => void; className?: string }) {
  return (
    <div className={cn('border-b border-gray-200 dark:border-white/10', className)}>
      <div className="-mb-px flex space-x-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              'py-2 text-sm font-medium border-b-2',
              value === t.id
                ? 'border-blue-600 text-blue-700 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

