import type { ReactNode } from 'react'
import Link from 'next/link'

interface HeaderProps {
  /** Show the immersion banner below header (learning mode) */
  variant?: 'learning' | 'meta' | 'home'
}

export function Header({ variant = 'home' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Te Ataarangi — Whakahoki ki te whārangi matua"
        >
          {/* Small kōwhaiwhai-inspired mark */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="flex-shrink-0"
          >
            <rect x="0" y="0" width="8" height="8" rx="1" fill="#2D6A4F" />
            <rect x="10" y="0" width="14" height="8" rx="1" fill="#57CC99" />
            <rect x="0" y="10" width="24" height="4" rx="1" fill="#FFD166" opacity="0.7" />
            <rect x="0" y="16" width="16" height="8" rx="1" fill="#F77F00" />
          </svg>
          <span className="font-semibold text-text-primary group-hover:text-accent transition-colors">
            Te Ataarangi
          </span>
        </Link>

        {/* Navigation */}
        <nav aria-label={variant === 'learning' ? 'Ara whakaahua' : 'Main navigation'}>
          {variant === 'learning' ? (
            // Learning mode — Māori only nav
            <ul className="flex items-center gap-1" lang="mi">
              <li>
                <NavLink href="/whiti">Ngā Whiti</NavLink>
              </li>
              <li>
                <NavLink href="/rakau">Rākau</NavLink>
              </li>
              <li>
                <NavLink href="/waiata">Waiata</NavLink>
              </li>
            </ul>
          ) : (
            // Home / meta — bilingual nav
            <ul className="flex items-center gap-1">
              <li>
                <NavLink href="/whiti" lang="mi">Ngā Whiti</NavLink>
              </li>
              <li>
                <NavLink href="/rakau" lang="mi">Rākau</NavLink>
              </li>
              <li>
                <NavLink href="/nga-ture">Ngā Ture</NavLink>
              </li>
              <li>
                <NavLink href="/about">Mō Mātou</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}

function NavLink({
  href,
  children,
  lang,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  href: any
  children: ReactNode
  lang?: string
}) {
  return (
    <Link
      href={href}
      lang={lang}
      className="px-3 py-1.5 rounded text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
    >
      {children}
    </Link>
  )
}
