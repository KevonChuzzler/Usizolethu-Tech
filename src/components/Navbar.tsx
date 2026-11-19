import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  headerRef: React.RefObject<HTMLElement | null>;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ headerRef, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200"
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Lockup */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-2.5 text-lg font-medium text-neutral-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]"
          style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M16 14L24 10V34C24 40 27.5 43.5 32 43.5C36.5 43.5 40 40 40 34V14L48 10V34C48 45 41 51.5 32 51.5C23 51.5 16 45 16 34V14Z"
              fill="var(--color-brand)"
            />
            <ellipse
              cx="32"
              cy="34"
              rx="25"
              ry="7.5"
              transform="rotate(-18 32 34)"
              stroke="#0f172a"
              strokeWidth="3.5"
              fill="none"
            />
          </svg>
          <span>{COMPANY_INFO.shortName}</span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="relative py-1 text-sm font-normal text-neutral-600 hover:text-neutral-900 transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[var(--color-brand)] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'quote')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-neutral-900 hover:bg-[var(--color-brand)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
          >
            Request Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-neutral-800 hover:text-[var(--color-brand)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-6 py-5 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="block py-3 text-base font-normal text-neutral-700 hover:text-[var(--color-brand)] border-b border-neutral-100 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'quote')}
              className="w-full py-3 px-5 text-sm font-medium text-white bg-neutral-900 hover:bg-[var(--color-brand)] transition-colors cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
