'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/components/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
  secondary:
    'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10',
  outline:
    'border border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-white/10',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-md',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-12 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 p-0 rounded-lg'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, children, disabled, asChild = false, ...props },
  ref
) {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all select-none',
    'focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (asChild) {
    return (
      <motion.span
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        whileHover={{ y: disabled || loading ? 0 : -1 }}
        className={baseClasses}
      >
        {leftIcon ? <span className={cn(size === 'sm' ? 'text-[0.9em]' : 'text-[1em]')}>{leftIcon}</span> : null}
        <span className="truncate">{children as React.ReactNode}</span>
        {rightIcon ? <span className={cn(size === 'sm' ? 'text-[0.9em]' : 'text-[1em]')}>{rightIcon}</span> : null}
      </motion.span>
    );
  }

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      whileHover={{ y: disabled || loading ? 0 : -1 }}
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon ? <span className={cn(size === 'sm' ? 'text-[0.9em]' : 'text-[1em]')}>{leftIcon}</span> : null}
      <span className="truncate">{children as React.ReactNode}</span>
      {rightIcon ? <span className={cn(size === 'sm' ? 'text-[0.9em]' : 'text-[1em]')}>{rightIcon}</span> : null}
    </motion.button>
  );
});

