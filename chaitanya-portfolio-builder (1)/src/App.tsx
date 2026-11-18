/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { useActiveSection } from './hooks/useActiveSection';
import { AboutSection } from './sections/AboutSection';
import { ContactFooter } from './sections/ContactFooter';
import { EducationAchievementsSection } from './sections/EducationAchievementsSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { PythonLabSection } from './sections/PythonLabSection';
import { SkillsSection } from './sections/SkillsSection';

const SECTION_IDS = ['about', 'projects', 'skills', 'python-lab', 'education', 'contact'];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F5F2E9] text-[#171717]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#171717] focus:text-[#F5F2E9] focus:text-xs focus:uppercase focus:tracking-wider"
        >
          Skip to main content
        </a>

        <Navbar activeSection={activeSection} />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <PythonLabSection />
          <EducationAchievementsSection />
        </main>

        <ContactFooter />
      </div>
    </MotionConfig>
  );
}
