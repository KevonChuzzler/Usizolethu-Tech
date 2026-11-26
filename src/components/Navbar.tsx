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
      className="sticky top-0 z-40 w-full bg-[#141414]/92 backdrop-blur-md border-b border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Lockup */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-2.5 text-lg font-medium text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ADBE8]"
          style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
        >
          <img
            src={COMPANY_INFO.logoSrc}
            alt="Usizolethu Technologies logo"
            className="h-10 w-10 object-contain bg-white p-0.5 shrink-0"
          />
          <span>{COMPANY_INFO.shortName}</span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="relative py-1 text-sm font-normal text-neutral-300 hover:text-[#9ADBE8] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#9ADBE8] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ADBE8]"
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
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#1A1A1A] bg-[#9ADBE8] hover:bg-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ADBE8]"
          >
            Request Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-white hover:text-[#9ADBE8] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9ADBE8]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141414] border-t border-white/10 px-6 py-5 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="block py-3 text-base font-normal text-neutral-200 hover:text-[#9ADBE8] border-b border-white/10 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'quote')}
              className="w-full py-3 px-5 text-sm font-medium text-[#1A1A1A] bg-[#9ADBE8] hover:bg-white transition-colors cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
