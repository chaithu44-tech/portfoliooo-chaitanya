import { useCallback, useEffect, useState } from 'react';

export interface SkillCatalogItem {
  name: string;
  category: string;
}

export interface RoleSummary {
  id: string;
  title: string;
  focus: string;
  core_skills: string[];
  recommended_skills: string[];
  total_benchmarks: number;
}

export interface CategorizedSkillGroup {
  category: string;
  matched: string[];
  missing: string[];
}

export interface RoadmapPhase {
  phase_number: number;
  phase_title: string;
  priority: string;
  target_skills: string[];
  rationale: string;
}

export interface AnalyzeSkillsResponse {
  analysis_id: number | null;
  role_id: string;
  role_title: string;
  role_focus: string;
  selected_skills: string[];
  matched_skills: string[];
  matched_core_skills: string[];
  matched_recommended_skills: string[];
  missing_skills: string[];
  missing_core_skills: string[];
  missing_recommended_skills: string[];
  skill_coverage_percentage: number;
  weighted_readiness_percentage: number;
  readiness_tier: string;
  category_breakdown: CategorizedSkillGroup[];
  learning_roadmap: RoadmapPhase[];
  suggested_next_steps: string[];
  analyzed_at: string;
}

export interface AnalysisHistoryItem {
  id: number;
  role_id: string;
  role_title: string;
  selected_skills: string[];
  matched_count: number;
  missing_count: number;
  coverage_percentage: number;
  created_at: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  python_version: string;
  roles_loaded: number;
  database_connected: boolean;
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || '';

export function useSkillAnalyzer() {
  const [roles, setRoles] = useState<RoleSummary[]>([]);
  const [availableSkills, setAvailableSkills] = useState<SkillCatalogItem[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);

  const [selectedRoleId, setSelectedRoleId] = useState<string>('python_developer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Python',
    'Java',
    'C',
    'HTML',
    'CSS',
    'JavaScript',
    'FastAPI',
    'SQL',
  ]);

  const [result, setResult] = useState<AnalyzeSkillsResponse | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadCatalogAndHealth = useCallback(async () => {
    setIsInitializing(true);
    setError(null);
    try {
      const [rolesRes, healthRes, historyRes] = await Promise.all([
        fetch(`${API_BASE}/api/roles`),
        fetch(`${API_BASE}/api/health`),
        fetch(`${API_BASE}/api/analyses?limit=4`),
      ]);

      if (!rolesRes.ok) {
        const body = await rolesRes.json().catch(() => ({}));
        throw new Error(body.detail || `Failed to load career roles (${rolesRes.status})`);
      }

      const rolesData = (await rolesRes.json()) as {
        roles: RoleSummary[];
        available_skills: SkillCatalogItem[];
      };

      setRoles(rolesData.roles);
      setAvailableSkills(rolesData.available_skills);
      if (rolesData.roles.length > 0 && !rolesData.roles.some((r) => r.id === selectedRoleId)) {
        setSelectedRoleId(rolesData.roles[0].id);
      }

      if (healthRes.ok) {
        setHealth((await healthRes.json()) as HealthResponse);
      }
      if (historyRes.ok) {
        setHistory((await historyRes.json()) as AnalysisHistoryItem[]);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to reach Python FastAPI backend. Ensure the FastAPI server is running.',
      );
    } finally {
      setIsInitializing(false);
    }
  }, [selectedRoleId]);

  useEffect(() => {
    void loadCatalogAndHealth();
  }, [loadCatalogAndHealth]);

  const toggleSkill = useCallback((skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((item) => item !== skillName) : [...prev, skillName],
    );
  }, []);

  const clearSkills = useCallback(() => {
    setSelectedSkills([]);
    setResult(null);
  }, []);

  const loadChaitanyaPreset = useCallback(() => {
    setSelectedSkills([
      'Python',
      'Java',
      'C',
      'HTML',
      'CSS',
      'JavaScript',
      'Tailwind CSS',
      'FastAPI',
      'SQL',
      'SQLAlchemy',
      'Docker',
    ]);
  }, []);

  const analyze = useCallback(
    async (overrideRoleId?: string, overrideSkills?: string[]) => {
      const roleToAnalyze = overrideRoleId ?? selectedRoleId;
      const skillsToAnalyze = overrideSkills ?? selectedSkills;

      setIsAnalyzing(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/api/analyze-skills`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role_id: roleToAnalyze,
            selected_skills: skillsToAnalyze,
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.detail || `Analysis request failed (${response.status})`);
        }

        const data = (await response.json()) as AnalyzeSkillsResponse;
        setResult(data);

        const historyRes = await fetch(`${API_BASE}/api/analyses?limit=4`);
        if (historyRes.ok) {
          setHistory((await historyRes.json()) as AnalysisHistoryItem[]);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Python skill analysis request failed. Please verify the FastAPI backend is running.',
        );
      } finally {
        setIsAnalyzing(false);
      }
    },
    [selectedRoleId, selectedSkills],
  );

  return {
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
    retryConnection: loadCatalogAndHealth,
  };
}
