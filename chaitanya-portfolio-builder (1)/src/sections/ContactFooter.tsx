import { useState } from 'react';
import { Check, Copy, Download, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export function ContactFooter() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [socialNotice, setSocialNotice] = useState<'LinkedIn' | 'GitHub' | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard may be restricted in some sandbox contexts; mailto remains active
    }
  };

  const handleSocialClick = (platform: 'LinkedIn' | 'GitHub', url: string | null) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    setSocialNotice((prev) => (prev === platform ? null : platform));
  };

  return (
    <footer id="contact" className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-20 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-12 border-b border-[#D8D1C5]">
        {/* Left: Editorial Heading & Actions */}
        <div className="lg:col-span-7">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.04] text-[#171717]">
            <span className="block">{PORTFOLIO_DATA.contact.headingTop}</span>
            <span className="block text-[#BD735D]">{PORTFOLIO_DATA.contact.headingAccent}</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#45413B] max-w-lg">
            {PORTFOLIO_DATA.contact.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PORTFOLIO_DATA.contact.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.1em] uppercase bg-[#171717] text-[#F5F2E9] hover:bg-[#BD735D] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Email Me</span>
            </a>

            <a
              href={PORTFOLIO_DATA.brand.resumeUrl}
              download={PORTFOLIO_DATA.brand.resumeFileName}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.1em] uppercase border border-[#171717] text-[#171717] hover:bg-[#EDE8DA] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download Resume</span>
            </a>

            <button
              type="button"
              onClick={() => handleSocialClick('LinkedIn', PORTFOLIO_DATA.contact.linkedinUrl)}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium tracking-[0.1em] uppercase border border-[#D8D1C5] text-[#171717] hover:border-[#171717] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#5E5951]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => handleSocialClick('GitHub', PORTFOLIO_DATA.contact.githubUrl)}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium tracking-[0.1em] uppercase border border-[#D8D1C5] text-[#171717] hover:border-[#171717] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#5E5951]" aria-hidden="true" />
            </button>
          </div>

          {socialNotice && (
            <div
              role="status"
              className="mt-4 border border-[#D8D1C5] bg-[#FAF8F2] px-4 py-3 text-xs sm:text-sm text-[#45413B] max-w-lg"
            >
              <strong className="text-[#171717]">{socialNotice} profile link placeholder:</strong> Add your actual{' '}
              {socialNotice} URL in <code className="font-mono text-xs">src/data/portfolio.ts</code> when ready. You can reach me directly via email or phone anytime.
            </div>
          )}
        </div>

        {/* Right: Direct Contact Details matching reference footer */}
        <div className="lg:col-span-5 space-y-5 lg:pt-2">
          <div className="flex items-start justify-between gap-4 border-b border-[#D8D1C5] pb-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#BD735D] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951]">
                  Email
                </p>
                <a
                  href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                  className="text-sm sm:text-base font-medium text-[#171717] hover:text-[#BD735D] transition-colors break-all"
                >
                  {PORTFOLIO_DATA.contact.email}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider border border-[#D8D1C5] text-[#5E5951] hover:text-[#171717] hover:border-[#171717] transition-colors shrink-0"
              aria-label="Copy email address"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3 h-3 text-[#BD735D]" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" aria-hidden="true" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-start gap-3 border-b border-[#D8D1C5] pb-4">
            <Phone className="w-4 h-4 text-[#BD735D] shrink-0 mt-1" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951]">
                Phone
              </p>
              <a
                href={`tel:+91${PORTFOLIO_DATA.contact.phone}`}
                className="text-sm sm:text-base font-medium text-[#171717] hover:text-[#BD735D] transition-colors tabular-nums"
              >
                +91 {PORTFOLIO_DATA.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#BD735D] shrink-0 mt-1" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951]">
                Location
              </p>
              <p className="text-sm sm:text-base font-medium text-[#171717]">
                {PORTFOLIO_DATA.contact.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Editorial Copyright Row */}
      <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#5E5951]">
        <p>© 2026 {PORTFOLIO_DATA.brand.fullName}. All rights reserved.</p>
        <p>B.Tech Artificial Intelligence &amp; Machine Learning · Jain Deemed-to-be University</p>
      </div>
    </footer>
  );
}
