import { useEffect } from 'react';
import { Check, Layers, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
          className="fixed inset-0 z-50 bg-[#171717]/65 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#F5F2E9] border border-[#D8D1C5] text-[#171717] p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#D8D1C5] pb-5">
              <div>
                <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#BD735D]">
                  Project {project.number}
                  {project.teamType ? ` · ${project.teamType}` : ''}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] mt-1.5"
                >
                  {project.title}
                </h3>
                <p className="text-sm text-[#5E5951] mt-1">{project.category}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 inline-flex items-center justify-center border border-[#D8D1C5] text-[#171717] hover:border-[#171717] hover:bg-[#EDE8DA] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {project.thumbnail && (
              <div className="mt-6 aspect-[16/9] w-full overflow-hidden border border-[#D8D1C5] bg-[#171717]">
                <img
                  src={project.thumbnail}
                  alt={project.thumbnailAlt || project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#5E5951]">
                  Overview
                </h4>
                <p className="mt-2 text-base leading-relaxed text-[#171717]">
                  {project.description}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div className="border-t border-[#D8D1C5] pt-5">
                  <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#5E5951]">
                    Key Implemented Capabilities
                  </h4>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#171717]">
                        <Check className="w-4 h-4 text-[#BD735D] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && project.technologies.length > 0 && (
                <div className="border-t border-[#D8D1C5] pt-5">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#5E5951]">
                    <Layers className="w-3.5 h-3.5 text-[#BD735D]" aria-hidden="true" />
                    <span>Technology Stack</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#171717]">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              )}

              {project.isPlaceholder && project.placeholderNote && (
                <div className="border border-[#D8D1C5] bg-[#EDE8DA]/60 p-4 text-sm text-[#5E5951]">
                  {project.placeholderNote}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
