import * as React from 'react';
import { cn } from '@/components/lib/utils';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name?: string;
  size?: number;
}

export function Avatar({ className, name, size = 32, src, alt, ...props }: AvatarProps) {
  const initials = React.useMemo(() => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    const a = parts[0]?.[0] || '';
    const b = parts[1]?.[0] || '';
    return (a + b).toUpperCase() || a.toUpperCase() || '?';
  }, [name]);

  const dim = `${size}px`;
  return src ? (
    <img
      src={src}
      alt={alt || name || 'avatar'}
      className={cn('rounded-full object-cover border border-white/10', className)}
      style={{ width: dim, height: dim }}
      {...props}
    />
  ) : (
    <div
      className={cn('rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200 grid place-items-center font-semibold', className)}
      style={{ width: dim, height: dim }}
    >
      {initials}
    </div>
  );
}

