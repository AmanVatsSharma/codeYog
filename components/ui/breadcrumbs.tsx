import Link from 'next/link';

export function Breadcrumbs({ segments }: { segments: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 dark:text-gray-300">
      <ol className="flex items-center gap-2">
        {segments.map((seg, idx) => (
          <li key={seg.href} className="flex items-center">
            {idx > 0 && <span className="mx-2 text-gray-400">/</span>}
            {idx < segments.length - 1 ? (
              <Link href={seg.href} className="hover:underline">
                {seg.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-900 dark:text-gray-100">{seg.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

