'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Could log error to external service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <AppShell withSidebar={false}>
          <div className="surface rounded-2xl p-10 text-center">
            <div className="text-2xl font-bold">Something went wrong</div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Please try again.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={() => reset()} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Retry</button>
              <Link href="/" className="px-4 py-2 rounded-lg border">Go Home</Link>
            </div>
          </div>
        </AppShell>
      </body>
    </html>
  )
}

