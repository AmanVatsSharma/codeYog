'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = [
  { label: 'Go to Dashboard', href: '/dashboard', category: 'Navigation' },
  { label: 'Browse Problems', href: '/problems', category: 'Navigation' },
  { label: 'View Contests', href: '/contests', category: 'Navigation' },
  { label: 'Community Forum', href: '/community', category: 'Navigation' },
  { label: 'Learning Path', href: '/learning-path-tracker', category: 'Navigation' },
  { label: 'Video Tutorials', href: '/learn', category: 'Navigation' },
  { label: 'Code Playground', href: '/playground', category: 'Tools' },
  { label: 'Leaderboard', href: '/leaderboard', category: 'Social' },
  { label: 'My Profile', href: '/profile/alexkumar', category: 'Account' },
  { label: 'Settings', href: '/settings', category: 'Account' },
  { label: 'Admin Dashboard', href: '/admin/dashboard', category: 'Admin' },
  { label: 'Code Lab', href: '/tests', category: 'Tools' },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 grid place-items-start p-4 pt-24">
            <motion.div className="surface elevate w-full max-w-xl rounded-2xl border p-4" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}>
              <input autoFocus placeholder="Type a command... (Ctrl/Cmd+K)" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-transparent" />
              <div className="mt-3 max-h-80 overflow-auto">
                {results.length === 0 ? (
                  <div className="text-sm text-gray-500">No results</div>
                ) : (
                  <ul className="space-y-1">
                    {results.map((r) => (
                      <li key={r.href}>
                        <button
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                          onClick={() => {
                            router.push(r.href);
                            setOpen(false);
                          }}
                        >
                          {r.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

