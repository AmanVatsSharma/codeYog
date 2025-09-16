'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/components/lib/utils';

type DropdownContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
};

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export function useDropdown() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) throw new Error('useDropdown must be used within <Dropdown>');
  return ctx;
}

export function Dropdown({ children, className, defaultOpen = false, onOpenChange }: React.PropsWithChildren<{ className?: string; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }>) {
  const [open, setOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!open) return;
      if (contentRef.current?.contains(target as Node)) return;
      if (triggerRef.current?.contains(target as Node)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className={cn('relative inline-block', className)}>{children}</div>
    </DropdownContext.Provider>
  );
}

export const DropdownTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(function DropdownTrigger(
  { className, children, ...props },
  ref
) {
  const { open, setOpen, triggerRef } = useDropdown();
  return (
    <button
      {...props}
      ref={(node) => {
        triggerRef.current = node as HTMLButtonElement;
        if (typeof ref === 'function') ref(node as HTMLButtonElement);
        // @ts-ignore
        else if (ref) (ref.current = node);
      }}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(!open);
      }}
      className={cn('inline-flex items-center justify-center h-10 px-3 rounded-lg border bg-white text-sm hover:bg-gray-50', className)}
    >
      {children}
    </button>
  );
});

export function DropdownContent({ children, className, align = 'start', sideOffset = 6 }: React.PropsWithChildren<{ className?: string; align?: 'start' | 'end'; sideOffset?: number }>) {
  const { open, contentRef, triggerRef } = useDropdown();
  const [coords, setCoords] = React.useState<{ top: number; left: number; minWidth: number }>({ top: 0, left: 0, minWidth: 0 });

  React.useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const left = align === 'end' ? rect.right : rect.left;
    setCoords({ top: rect.bottom + sideOffset + window.scrollY, left: left + window.scrollX, minWidth: rect.width });
  }, [open, align, sideOffset, triggerRef]);

  const body = typeof window !== 'undefined' ? document.body : null;

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className={cn('surface elevate absolute z-50 rounded-lg border p-1 min-w-[--trigger-w]', className)}
          style={{ position: 'absolute', top: coords.top, left: coords.left, minWidth: coords.minWidth }}
          role="menu"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return body ? createPortal(content, body) : content;
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }>(function DropdownItem(
  { className, children, inset = false, ...props },
  ref
) {
  const { setOpen } = useDropdown();
  return (
    <button
      ref={ref}
      role="menuitem"
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
      className={cn('w-full text-left text-sm px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-2', inset && 'pl-8', className)}
      {...props}
    >
      {children}
    </button>
  );
});

