import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CircularStamp } from '../components/CircularStamp';
import { PORTFOLIO_DATA } from '../data/portfolio';

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 28]);
  const circleY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 14]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 pt-5 sm:pt-7 pb-10 sm:pb-14 border-b border-[#D8D1C5]"
    >
      {/* Subtle Top Editorial Sub-strip echoing reference top bar descriptors */}
      <div className="flex items-center justify-between text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951] pb-4 border-b border-[#D8D1C5]">
        <span>AI &amp; ML Student · Software Developer</span>
        <a
          href="#python-lab"
          className="inline-flex items-center gap-2 text-[#171717] hover:text-[#BD735D] transition-colors whitespace-nowrap"
        >
          <span>Bengaluru, India</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#BD735D]" aria-hidden="true" />
        </a>
      </div>

      {/* Main Hero Frame with flanking vertical labels */}
      <div className="relative pt-4 sm:pt-6">
        {/* Left Vertical Label (desktop) */}
        <div
          className="hidden xl:flex items-center gap-4 absolute -left-8 top-12 bottom-6 vertical-label-left text-[10px] font-medium tracking-[0.22em] uppercase text-[#5E5951] select-none"
          aria-hidden="true"
        >
          <span>{PORTFOLIO_DATA.hero.verticalLeft[0]}</span>
          <span className="inline-block h-8 w-px bg-[#D8D1C5]" />
          <span>{PORTFOLIO_DATA.hero.verticalLeft[1]}</span>
        </div>

        {/* Right Vertical Label (desktop) */}
        <div
          className="hidden xl:flex items-center gap-4 absolute -right-8 top-12 bottom-6 vertical-label-right text-[10px] font-medium tracking-[0.22em] uppercase text-[#5E5951] select-none"
          aria-hidden="true"
        >
          <span>{PORTFOLIO_DATA.hero.verticalRight[0]}</span>
          <span className="inline-block h-8 w-px bg-[#D8D1C5]" />
          <span>{PORTFOLIO_DATA.hero.verticalRight[1]}</span>
        </div>

        {/* Oversized Condensed PORTFOLIO Display Typography */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-0 overflow-hidden"
        >
          <h1
            className="font-display text-[#171717] uppercase text-center leading-[0.86] tracking-[-0.015em] select-none w-full"
            style={{ fontSize: 'clamp(4.2rem, 17.6vw, 14.5rem)' }}
          >
            {PORTFOLIO_DATA.hero.displayTitle}
          </h1>
        </motion.div>

        {/* Two-column Composition interlocking with PORTFOLIO */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end mt-4 lg:-mt-16 xl:-mt-20">
          {/* LEFT COLUMN: Editorial Introduction */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pt-24 xl:pt-28 pb-2"
          >
            <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#171717]">
              {PORTFOLIO_DATA.hero.greeting}
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl xl:text-[3.5rem] font-normal leading-[1.02] tracking-[-0.015em] text-[#171717] mt-2">
              <span className="block">{PORTFOLIO_DATA.brand.firstName}</span>
              <span className="block">{PORTFOLIO_DATA.brand.lastName}</span>
            </h2>

            <p className="mt-3 text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase text-[#BD735D]">
              {PORTFOLIO_DATA.brand.roleLine}
            </p>

            <p className="mt-5 text-[15px] sm:text-base leading-[1.68] text-[#45413B] max-w-md">
              {PORTFOLIO_DATA.hero.intro}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs sm:text-[13px] font-medium tracking-[0.08em] uppercase bg-[#171717] text-[#F5F2E9] hover:bg-[#BD735D] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-[13px] font-medium tracking-[0.08em] uppercase border border-[#171717] text-[#171717] hover:bg-[#EDE8DA] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
              >
                <span>Let&apos;s Connect</span>
              </a>
            </div>

            {/* Signature-style name element */}
            <div className="mt-7 pt-2">
              <p
                className="font-serif italic text-2xl sm:text-[26px] text-[#5E5951] tracking-tight select-none"
                aria-label="Signature: Chelamsetty Chaitanya"
              >
                Chaitanya Chelamsetty
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Actual Portrait over Terracotta Circle */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex items-end justify-center lg:justify-end min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]"
          >
            {/* Large Terracotta Circle Graphic behind portrait */}
            <motion.div
              style={{ y: circleY }}
              className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-14 w-[280px] h-[280px] sm:w-[370px] sm:h-[370px] lg:w-[410px] lg:h-[410px] rounded-full bg-[#BD735D] z-0"
              aria-hidden="true"
            />

            {/* Circular Stamp overlapping right edge of terracotta circle */}
            <div className="hidden sm:block absolute bottom-12 right-2 lg:right-4 z-20">
              <CircularStamp />
            </div>

            {/* Authentic Uploaded Photograph */}
            <motion.div
              style={{ y: portraitY }}
              className="relative z-10 w-[290px] sm:w-[370px] lg:w-[430px] flex items-end justify-center lg:mr-14"
            >
              {!imageError ? (
                <img
                  src={PORTFOLIO_DATA.brand.portraitSrc}
                  alt={PORTFOLIO_DATA.brand.portraitAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto max-h-[540px] object-contain object-bottom drop-shadow-[0_12px_24px_rgba(23,23,23,0.12)]"
                />
              ) : (
                <div className="w-[320px] h-[380px] bg-[#EDE8DA] border border-[#D8D1C5] flex flex-col items-center justify-center p-6 text-center">
                  <span className="font-serif text-3xl text-[#171717]">CC</span>
                  <span className="text-xs uppercase tracking-[0.14em] text-[#5E5951] mt-2">
                    {PORTFOLIO_DATA.brand.fullName}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile/Tablet readable vertical descriptors strip */}
        <div className="mt-6 pt-4 border-t border-[#D8D1C5] flex flex-wrap items-center justify-between gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951] xl:hidden">
          <span>Artificial Intelligence</span>
          <span aria-hidden="true">·</span>
          <span>Software Development</span>
          <span aria-hidden="true">·</span>
          <span>Full-Stack Development</span>
        </div>
      </div>
    </section>
  );
}
