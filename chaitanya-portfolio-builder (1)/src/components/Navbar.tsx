import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'python-lab', label: 'Python Lab' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2E9]/95 backdrop-blur-sm border-b border-[#D8D1C5]">
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand mark with reference starburst symbol */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 text-[#171717] hover:text-[#BD735D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BD735D]"
          aria-label="Chelamsetty Chaitanya Portfolio Home"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-[#BD735D] shrink-0"
          >
            <path
              d="M12 1V23M1 12H23M4.22 4.22L19.78 19.78M19.78 4.22L4.22 19.78"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            {PORTFOLIO_DATA.brand.shortName}
          </span>
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative py-1 text-[13px] font-medium tracking-[0.06em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BD735D] ${
                  isActive ? 'text-[#171717]' : 'text-[#5E5951] hover:text-[#171717]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#BD735D]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={PORTFOLIO_DATA.brand.resumeUrl}
            download={PORTFOLIO_DATA.brand.resumeFileName}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-[0.08em] uppercase bg-[#171717] text-[#F5F2E9] hover:bg-[#BD735D] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Resume PDF</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[#D8D1C5] text-[#171717] hover:border-[#171717] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#D8D1C5] bg-[#F5F2E9] px-5 py-4"
        >
          <div className="flex flex-col divide-y divide-[#D8D1C5]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleNavClick}
                className={`py-3.5 text-sm font-medium tracking-[0.08em] uppercase flex items-center justify-between ${
                  activeSection === link.id ? 'text-[#BD735D]' : 'text-[#171717]'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#6A655D]" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
            <div className="pt-4">
              <a
                href={PORTFOLIO_DATA.brand.resumeUrl}
                download={PORTFOLIO_DATA.brand.resumeFileName}
                onClick={handleNavClick}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium tracking-[0.08em] uppercase bg-[#171717] text-[#F5F2E9]"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Resume PDF</span>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
