import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 border-b border-[#D8D1C5]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4"
        >
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#5E5951] mb-2">
            Profile &amp; Academic Focus
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-[1.08] text-[#171717]">
            <span className="block">{PORTFOLIO_DATA.about.headingTop}</span>
            <span className="block text-[#BD735D]">{PORTFOLIO_DATA.about.headingAccent}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 space-y-8"
        >
          <div className="space-y-4 text-base sm:text-[17px] leading-[1.72] text-[#2F2C27] max-w-2xl">
            {PORTFOLIO_DATA.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#D8D1C5]">
            {PORTFOLIO_DATA.about.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-r border-b border-[#D8D1C5] p-4 sm:p-5 bg-[#F5F2E9]"
              >
                <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951]">
                  {fact.label}
                </p>
                <p className="mt-1.5 text-sm sm:text-[15px] font-medium text-[#171717]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
