import { Award, Compass, Lightbulb, Sparkles, Users, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const STRENGTH_ICONS = [Compass, Zap, Users, Sparkles, Lightbulb];

export function EducationAchievementsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 border-b border-[#D8D1C5]"
    >
      {/* Part 1: Education & Academic Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-14 border-b border-[#D8D1C5]">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#5E5951] mb-2">
            Academic Timeline
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-[1.06] text-[#171717]">
            <span>EDUCATION &amp; </span>
            <span className="text-[#BD735D]">ACADEMICS</span>
          </h2>
          <div className="mt-6 space-y-1.5">
            <p className="text-base sm:text-lg font-medium text-[#171717]">
              {PORTFOLIO_DATA.education.institution}
            </p>
            <p className="text-sm sm:text-[15px] text-[#2F2C27]">
              {PORTFOLIO_DATA.education.degree}
            </p>
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#BD735D] pt-1">
              {PORTFOLIO_DATA.education.status}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#5E5951] mb-3">
            Academic Performance
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[#D8D1C5]">
            {PORTFOLIO_DATA.education.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-r border-b border-[#D8D1C5] p-5 bg-[#FAF8F2]"
              >
                <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#5E5951]">
                  {metric.label}
                </p>
                <p className="font-serif text-3xl sm:text-[34px] text-[#171717] tabular-nums mt-2 leading-none">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: Achievements & Personal Strengths */}
      <div className="pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Achievements (2 editorial cards mirroring reference testimonial cards) */}
        <div className="lg:col-span-7">
          <div className="flex items-baseline justify-between mb-5">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717]">
              Achievements &amp; <span className="text-[#BD735D]">Milestones</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PORTFOLIO_DATA.achievements.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="border border-[#D8D1C5] bg-[#FAF8F2] p-6 flex flex-col justify-between"
              >
                <div>
                  <Award className="w-5 h-5 text-[#BD735D] mb-4" aria-hidden="true" />
                  <h4 className="font-serif text-xl leading-snug text-[#171717]">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-[#45413B]">
                    {item.description}
                  </p>
                </div>
                <p className="mt-5 pt-4 border-t border-[#D8D1C5] text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951]">
                  {item.subtitle}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Personal Strengths */}
        <div className="lg:col-span-5">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] mb-5">
            Personal <span className="text-[#BD735D]">Strengths</span>
          </h3>

          <ul className="divide-y divide-[#D8D1C5] border-t border-b border-[#D8D1C5]">
            {PORTFOLIO_DATA.strengths.map((strength, idx) => {
              const Icon = STRENGTH_ICONS[idx % STRENGTH_ICONS.length];
              return (
                <li key={strength.name} className="py-3.5 flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-full border border-[#D8D1C5] bg-[#FAF8F2] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#BD735D]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#171717]">{strength.name}</p>
                    <p className="text-xs text-[#5E5951] mt-0.5">{strength.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
