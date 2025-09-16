import * as React from 'react';
import { cn } from '@/components/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0..100
}

export function Progress({ value, className, ...props }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('w-full bg-gray-200 dark:bg-white/10 rounded-full h-2', className)} {...props}>
      <div
        className="h-2 bg-blue-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

