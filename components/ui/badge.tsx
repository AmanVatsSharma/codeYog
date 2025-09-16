import * as React from 'react';
import { cn } from '@/components/lib/utils';

type Variant = 'default' | 'success' | 'warning' | 'destructive' | 'outline';

const classes: Record<Variant, string> = {
  default: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300',
  destructive: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300'
};

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', classes[variant], className)}
      {...props}
    />
  );
}

