import { AlertCircle, ArrowRight, Check, History, Loader2, RefreshCw, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useSkillAnalyzer } from '../hooks/useSkillAnalyzer';

export function PythonLabSection() {
  const prefersReducedMotion = useReducedMotion();
  const {
    roles,
    availableSkills,
    health,
    history,
    selectedRoleId,
    setSelectedRoleId,
    selectedSkills,
    setSelectedSkills,
    toggleSkill,
    clearSkills,
    loadChaitanyaPreset,
    result,
    isInitializing,
    isAnalyzing,
    error,
    analyze,
    retryConnection,
  } = useSkillAnalyzer();

  const activeRole = roles.find((r) => r.id === selectedRoleId);

  return (
    <section
      id="python-lab"
      className="max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 border-b border-[#D8D1C5]"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 border-b border-[#D8D1C5]">
        <div className="lg:col-span-6">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#5E5951] mb-2">
            Live Python 3.11 + FastAPI Microservice
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-[1.06] text-[#171717]">
            <span>PYTHON POWERED — </span>
            <span className="text-[#BD735D]">SKILL GAP ANALYZER</span>
          </h2>
        </div>

        <div className="lg:col-span-6 lg:text-right">
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#5E5951] max-w-xl lg:ml-auto">
            Requests sent from this interface are validated with Pydantic, evaluated by Python career-benchmark logic, and persisted via SQLAlchemy + SQLite.
          </p>
          {health && (
            <p className="mt-2 font-mono text-xs text-[#5E5951] tabular-nums">
              Python {health.python_version} · FastAPI · {health.roles_loaded} Career Benchmarks ·{' '}
              {health.database_connected ? 'SQLite Connected' : 'Stateless Mode'}
            </p>
          )}
        </div>
      </div>

      {/* Backend Error Banner with Explicit Retry */}
      {error && (
        <div
          role="alert"
          className="mt-6 border border-[#BD735D] bg-[#FAF8F2] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#BD735D] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#171717]">
                Python FastAPI Backend Connection Issue
              </p>
              <p className="text-sm text-[#5E5951] mt-0.5">{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={retryConnection}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-[0.08em] uppercase border border-[#171717] text-[#171717] hover:bg-[#EDE8DA] transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Main Interactive Two-Column Tool */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT PANE: Steps 1, 2 & 3 */}
        <div className="lg:col-span-6 space-y-8">
          {/* STEP 1 — SELECT CAREER ROLE */}
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-3">
              <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#171717]">
                Step 1 · Select Career Role
              </h3>
              <span className="font-mono text-xs text-[#5E5951] tabular-nums">
                {roles.length} Roles
              </span>
            </div>

            {isInitializing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((slot) => (
                  <div
                    key={slot}
                    className="h-24 border border-[#D8D1C5] bg-[#EDE8DA]/50 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Target career role">
                {roles.map((role) => {
                  const isSelected = role.id === selectedRoleId;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`text-left p-4 border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D] ${
                        isSelected
                          ? 'bg-[#171717] text-[#F5F2E9] border-[#171717]'
                          : 'bg-[#FAF8F2] text-[#171717] border-[#D8D1C5] hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif text-lg leading-tight">{role.title}</span>
                        <span
                          className={`font-mono text-[11px] tabular-nums shrink-0 ${
                            isSelected ? 'text-[#BD735D]' : 'text-[#5E5951]'
                          }`}
                        >
                          {role.total_benchmarks} skills
                        </span>
                      </div>
                      <p
                        className={`mt-1.5 text-xs leading-relaxed line-clamp-2 ${
                          isSelected ? 'text-[#F5F2E9]/80' : 'text-[#5E5951]'
                        }`}
                      >
                        {role.focus}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* STEP 2 — SELECT CURRENT SKILLS */}
          <div className="border-t border-[#D8D1C5] pt-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#171717]">
                Step 2 · Select Current Skills ({selectedSkills.length})
              </h3>
              <div className="flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={loadChaitanyaPreset}
                  className="font-medium text-[#BD735D] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
                >
                  Load Resume Skills
                </button>
                <button
                  type="button"
                  onClick={clearSkills}
                  className="font-medium text-[#5E5951] hover:text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {availableSkills.map((skill) => {
                const active = selectedSkills.includes(skill.name);
                return (
                  <button
                    key={skill.name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleSkill(skill.name)}
                    className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-[13px] font-medium border inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D] ${
                      active
                        ? 'bg-[#BD735D] text-[#F5F2E9] border-[#BD735D]'
                        : 'bg-[#FAF8F2] text-[#171717] border-[#D8D1C5] hover:border-[#171717]'
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                    <span>{skill.name}</span>
                  </button>
                );
              })}
            </div>

            {activeRole && (
              <p className="mt-3 text-xs text-[#5E5951]">
                Target benchmark for <strong className="text-[#171717]">{activeRole.title}</strong> includes{' '}
                {activeRole.core_skills.length} core skills and {activeRole.recommended_skills.length} recommended skills.
              </p>
            )}
          </div>

          {/* STEP 3 — ANALYZE BUTTON */}
          <div className="border-t border-[#D8D1C5] pt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => analyze()}
              disabled={isAnalyzing || isInitializing || roles.length === 0}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase bg-[#171717] text-[#F5F2E9] hover:bg-[#BD735D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BD735D]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Analyzing via FastAPI...</span>
                </>
              ) : (
                <>
                  <span>ANALYZE MY SKILLS</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>

            <span className="font-mono text-[11px] text-[#5E5951] whitespace-nowrap">
              POST /api/analyze-skills
            </span>
          </div>

          {/* Recent Persisted SQLite Runs */}
          {history.length > 0 && (
            <div className="border-t border-[#D8D1C5] pt-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#5E5951] mb-3">
                <History className="w-3.5 h-3.5 text-[#BD735D]" aria-hidden="true" />
                <span>Recent SQLite Analysis Runs</span>
              </div>
              <div className="divide-y divide-[#D8D1C5] border border-[#D8D1C5] bg-[#FAF8F2]">
                {history.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedRoleId(item.role_id);
                      setSelectedSkills(item.selected_skills);
                      void analyze(item.role_id, item.selected_skills);
                    }}
                    className="w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left text-xs hover:bg-[#EDE8DA]/60 transition-colors"
                  >
                    <span className="font-medium text-[#171717] truncate">
                      {item.role_title}{' '}
                      <span className="text-[#5E5951] font-normal">
                        · {item.matched_count} matched, {item.missing_count} gaps
                      </span>
                    </span>
                    <span className="font-mono text-[#BD735D] tabular-nums shrink-0">
                      {item.coverage_percentage}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANE: STEP 4 — DISPLAY PYTHON RESULTS */}
        <div className="lg:col-span-6">
          <div className="border border-[#D8D1C5] bg-[#FAF8F2] p-6 sm:p-8">
            {!result ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 mx-auto border border-[#D8D1C5] bg-[#F5F2E9] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-[#BD735D]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-serif text-2xl text-[#171717]">
                    Ready for Python Analysis
                  </p>
                  <p className="mt-2 text-sm text-[#5E5951] max-w-md mx-auto leading-relaxed">
                    Choose a target engineering role and your current skills, then select{' '}
                    <strong className="text-[#171717]">ANALYZE MY SKILLS</strong> to execute live gap computation and roadmap generation on the FastAPI backend.
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                key={`${result.role_id}-${result.analysis_id ?? result.analyzed_at}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Result Header & Coverage Score */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D8D1C5] pb-5">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#BD735D]">
                      Step 4 · {result.readiness_tier}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] mt-1">
                      {result.role_title}
                    </h3>
                    <p className="text-xs text-[#5E5951] mt-1">{result.role_focus}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#5E5951]">
                      Skill Coverage
                    </p>
                    <p className="font-serif text-4xl text-[#171717] tabular-nums leading-none mt-1">
                      {result.skill_coverage_percentage}%
                    </p>
                    <p className="font-mono text-[11px] text-[#5E5951] tabular-nums mt-1">
                      Weighted core: {result.weighted_readiness_percentage}%
                    </p>
                  </div>
                </div>

                {/* Coverage Progress Track */}
                <div>
                  <div className="w-full h-2 bg-[#EDE8DA] overflow-hidden">
                    <div
                      className="h-full bg-[#BD735D] transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, result.skill_coverage_percentage))}%` }}
                    />
                  </div>
                </div>

                {/* Matched vs Missing Skills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-[#D8D1C5] pb-6">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171717] mb-2.5">
                      Matched Skills ({result.matched_skills.length})
                    </p>
                    {result.matched_skills.length > 0 ? (
                      <ul className="space-y-1.5 text-sm text-[#2F2C27]">
                        {result.matched_skills.map((skill) => (
                          <li key={skill} className="flex items-center justify-between gap-2">
                            <span>{skill}</span>
                            <span className="text-[11px] uppercase tracking-wider text-[#5E5951]">
                              {result.matched_core_skills.includes(skill) ? 'Core' : 'Recommended'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#5E5951]">
                        No benchmark skills matched yet.
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#BD735D] mb-2.5">
                      Missing Skills ({result.missing_skills.length})
                    </p>
                    {result.missing_skills.length > 0 ? (
                      <ul className="space-y-1.5 text-sm text-[#2F2C27]">
                        {result.missing_skills.map((skill) => (
                          <li key={skill} className="flex items-center justify-between gap-2">
                            <span>{skill}</span>
                            <span className="text-[11px] uppercase tracking-wider text-[#BD735D]">
                              {result.missing_core_skills.includes(skill) ? 'Core Gap' : 'Recommended'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#2F2C27]">
                        Full coverage achieved across all role benchmarks.
                      </p>
                    )}
                  </div>
                </div>

                {/* Recommended Learning Sequence */}
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171717] mb-3">
                    Recommended Learning Sequence
                  </p>
                  <div className="space-y-3">
                    {result.learning_roadmap.map((phase) => (
                      <div
                        key={phase.phase_number}
                        className="border border-[#D8D1C5] bg-[#F5F2E9] p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#171717]">
                            Phase 0{phase.phase_number} · {phase.phase_title}
                          </span>
                          <span className="text-[11px] font-medium uppercase tracking-wider text-[#BD735D]">
                            {phase.priority}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm font-medium text-[#171717]">
                          {phase.target_skills.join(' · ')}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#5E5951]">
                          {phase.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Next Steps */}
                <div className="border-t border-[#D8D1C5] pt-5">
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171717] mb-2.5">
                    Suggested Next Steps
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed text-[#2F2C27]">
                    {result.suggested_next_steps.map((step) => (
                      <li key={step} className="flex items-start gap-2.5">
                        <span className="text-[#BD735D] font-bold mt-0.5" aria-hidden="true">
                          →
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
