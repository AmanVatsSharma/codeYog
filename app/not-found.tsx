import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';

export default function NotFound() {
  return (
    <AppShell withSidebar={false}>
      <div className="surface rounded-2xl p-10 text-center">
        <div className="text-4xl font-bold">404</div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Page not found.</p>
        <Link href="/" className="inline-block mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white">Go Home</Link>
      </div>
    </AppShell>
  );
}

