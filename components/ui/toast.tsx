'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/components/lib/utils';

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  durationMs?: number;
};

type ToastContextValue = {
  toasts: Toast[];
  show: (toast: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const show = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const next: Toast = { id, variant: 'default', durationMs: 3500, ...toast };
    setToasts((prev) => [...prev, next]);
    if (next.durationMs && next.durationMs > 0) {
      setTimeout(() => dismiss(id), next.durationMs);
    }
    return id;
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const body = typeof window !== 'undefined' ? document.body : null;

  const stack = (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 w-[min(360px,90vw)]">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'surface elevate border rounded-lg p-3 pointer-events-auto',
                t.variant === 'success' && 'border-green-200 bg-green-50',
                t.variant === 'warning' && 'border-yellow-200 bg-yellow-50',
                t.variant === 'destructive' && 'border-red-200 bg-red-50'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  {t.title && <div className="text-sm font-medium text-gray-900">{t.title}</div>}
                  {t.description && <div className="text-xs text-gray-700 dark:text-gray-300 mt-0.5">{t.description}</div>}
                </div>
                <button onClick={() => dismiss(t.id)} className="text-xs text-gray-500 hover:text-gray-900">Dismiss</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <ToastContext.Provider value={{ toasts, show, dismiss }}>
      {children}
      {body ? createPortal(stack, body) : stack}
    </ToastContext.Provider>
  );
}

