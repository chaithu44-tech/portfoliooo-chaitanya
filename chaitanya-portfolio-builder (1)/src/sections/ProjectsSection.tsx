import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProjectModal } from '../components/ProjectModal';
import { PORTFOLIO_DATA, type ProjectItem } from '../data/portfolio';

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const featuredProject = PORTFOLIO_DATA.projects[0];

  return (
    <section
      id="projects"
      className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 border-b border-[#D8D1C5]"
    >
      {/* Editorial Section Header Row mirroring reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 border-b border-[#D8D1C5]">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-[1.06] text-[#171717]">
            <span className="block">{PORTFOLIO_DATA.projectsSection.headingTop}</span>
            <span className="block text-[#BD735D]">{PORTFOLIO_DATA.projectsSection.headingAccent}</span>
          </h2>
        </div>

        <div className="lg:col-span-5">
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#5E5951] max-w-md">
            {PORTFOLIO_DATA.projectsSection.summary}
          </p>
        </div>

        <div className="lg:col-span-3 lg:text-right">
          <button
            type="button"
            onClick={() => setSelectedProject(featuredProject)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#171717] hover:text-[#BD735D] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BD735D]"
          >
            <span>Inspect Flagship Case Study</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* 4-Column Responsive Showcase Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO_DATA.projects.map((project, index) => {
          const showImg = project.thumbnail && !brokenImages[project.id];
          return (
            <motion.article
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BD735D]"
                aria-label={`Open details for ${project.number} ${project.title}`}
              >
                {/* Thumbnail Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#D8D1C5] bg-[#EDE8DA]">
                  {showImg ? (
                    <>
                      <img
                        src={project.thumbnail}
                        alt={project.thumbnailAlt || project.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setBrokenImages((prev) => ({ ...prev, [project.id]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/20 to-transparent flex flex-col justify-between p-4">
                        <div className="flex items-center justify-between text-[11px] font-medium tracking-[0.12em] uppercase text-[#F5F2E9]/90">
                          <span>{project.teamType || 'Case Study'}</span>
                          <ArrowUpRight
                            className="w-4 h-4 text-[#F5F2E9] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-lg leading-snug text-[#F5F2E9]">
                            {project.title}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full p-5 flex flex-col justify-between bg-[#FAF8F2] group-hover:bg-[#EDE8DA]/70 transition-colors duration-200">
                      <div className="flex items-center justify-between text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951]">
                        <span>{project.isPlaceholder ? 'Editable Slot' : 'Featured'}</span>
                        <ArrowUpRight
                          className="w-4 h-4 text-[#BD735D] opacity-70 group-hover:opacity-100 transition-opacity"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-xl text-[#171717] leading-snug">
                          {project.title}
                        </p>
                        <p className="text-xs text-[#5E5951] mt-1.5 line-clamp-2">
                          {project.shortSubtitle}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Numbered Caption Strip matching reference */}
                <div className="mt-3.5 flex items-baseline gap-3">
                  <span className="font-serif text-2xl sm:text-[26px] leading-none text-[#BD735D] tabular-nums shrink-0">
                    {project.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#171717] group-hover:text-[#BD735D] transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#5E5951] mt-0.5 truncate">{project.category}</p>
                  </div>
                </div>
              </button>
            </motion.article>
          );
        })}
      </div>

      {/* Expanded Spotlight Summary of Project 01 directly accessible without clicking */}
      <div className="mt-10 border border-[#D8D1C5] bg-[#FAF8F2] p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#BD735D]">
              Project 01 · {featuredProject.teamType}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] mt-1.5">
              {featuredProject.title}
            </h3>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#45413B]">
              {featuredProject.description}
            </p>
            <div className="mt-5">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5E5951]">
                Technology Stack
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#171717]">
                {featuredProject.technologies?.join(' · ')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedProject(featuredProject)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-[0.08em] uppercase bg-[#171717] text-[#F5F2E9] hover:bg-[#BD735D] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
            >
              <span>Read Full Architecture Breakdown</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#D8D1C5] pt-6 lg:pt-0 lg:pl-8">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5E5951] mb-3">
              Key Engineering Deliverables
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm leading-relaxed text-[#2F2C27]">
              {featuredProject.features?.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="text-[#BD735D] font-bold mt-0.5" aria-hidden="true">
                    ·
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
