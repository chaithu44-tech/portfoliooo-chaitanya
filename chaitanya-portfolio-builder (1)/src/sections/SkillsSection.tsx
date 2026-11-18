import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 border-b border-[#D8D1C5]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Editorial Statement Column mirroring reference SKILLS & EXPERTISE */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#5E5951] mb-2">
            Core Technical Foundation
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-[1.06] text-[#171717]">
            <span className="block">{PORTFOLIO_DATA.skillsSection.headingTop}</span>
            <span className="block text-[#BD735D]">{PORTFOLIO_DATA.skillsSection.headingAccent}</span>
          </h2>

          <div className="mt-8 border-t border-[#D8D1C5] pt-6">
            <span
              className="font-serif text-5xl leading-none text-[#BD735D] block select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-serif text-xl sm:text-2xl leading-[1.42] text-[#171717] mt-1 max-w-md">
              {PORTFOLIO_DATA.skillsSection.quote}
            </p>
            <p className="mt-4 text-sm text-[#5E5951] leading-relaxed max-w-md">
              Python and FastAPI anchor my backend work — powering typed APIs, automated document parsing, and deterministic analytical workflows.
            </p>
          </div>
        </motion.div>

        {/* Right Categorized Skills Grid (No invented percentages) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[#D8D1C5]">
          {PORTFOLIO_DATA.skillsSection.categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="border-r border-b border-[#D8D1C5] p-6 sm:p-7 bg-[#F5F2E9] flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#BD735D]">
                  {category.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#5E5951]">
                  {category.description}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-[#D8D1C5] pt-4">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm sm:text-[15px]"
                  >
                    <span
                      className={
                        item.highlight
                          ? 'font-semibold text-[#171717]'
                          : 'font-medium text-[#2F2C27]'
                      }
                    >
                      {item.name}
                    </span>
                    {item.highlight && (
                      <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#BD735D]">
                        Primary Stack
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
