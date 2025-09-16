'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/components/lib/utils';

export function useLockBodyScroll(active: boolean) {
  React.useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export function Modal({ open, onOpenChange, title, description, className, children }: ModalProps) {
  useLockBodyScroll(open);
  const body = typeof window !== 'undefined' ? document.body : null;
  const content = (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
          <div className="absolute inset-0 grid place-items-center p-4">
            <motion.div
              className={cn('surface elevate w-full max-w-lg rounded-2xl border p-6', className)}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
            >
              {(title || description) && (
                <div className="mb-3">
                  {title && <div className="text-lg font-semibold">{title}</div>}
                  {description && <div className="text-sm text-gray-600 dark:text-gray-300">{description}</div>}
                </div>
              )}
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return body ? createPortal(content, body) : content;
}

