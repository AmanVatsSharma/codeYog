import * as React from 'react';
import { cn } from '@/components/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200 dark:bg-white/10', className)}
      {...props}
    />
  );
}

