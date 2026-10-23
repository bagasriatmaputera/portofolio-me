import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { environment } from "../../environment/environment";

const PortfolioDataContext = createContext(null);

const PORTFOLIO_URL = `${environment.apiBaseUrl.replace(/\/$/, "")}/portfolio`;

function resolveMedia(rawPath, mediaUrl) {
  if (rawPath && rawPath.startsWith("/images/")) {
    return rawPath;
  }

  if (rawPath && /^https?:\/\//.test(rawPath)) {
    return rawPath;
  }

  return mediaUrl || rawPath || "";
}

function formatPeriod(experience, language) {
  const locale = language === "id" ? "id-ID" : "en-US";
  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const end = experience.end_date
    ? formatDate(experience.end_date)
    : language === "id"
      ? "Sekarang"
      : "Present";

  return `${formatDate(experience.start_date)} - ${end}`;
}

function mapProfile(profile) {
  if (!profile) return null;

  return {
    id: profile.profile_id,
    name: profile.name,
    title: profile.job_position,
    bio: {
      id: profile.summary ?? "",
      en: profile.summary ?? "",
    },
    photo: profile.image_url || "/images/profile/photo.jpg",
    location: profile.location ?? "",
    resumeUrl: profile.resume_url ?? "#",
    availableForWork: Boolean(profile.available_for_work),
    socials: {
      github: profile.socials?.github ?? "",
      linkedin: profile.socials?.linkedin ?? "",
      email: profile.socials?.email ?? "",
    },
  };
}

function mapProject(project) {
  return {
    id: project.project_id,
    title: project.title,
    description: project.description,
    image:
      resolveMedia(project.image, project.image_url) ||
      "/images/projects/project-placeholder.svg",
    gifImage: resolveMedia(project.gif_image, project.gif_image_url) || null,
    techStack: project.tech_stack ?? [],
    liveUrl: project.live_url ?? "",
    repoUrl: project.repo_url ?? "",
    featured: Boolean(project.featured),
    is_live: Boolean(project.is_live),
    is_repo: Boolean(project.is_repo),
    order: project.order,
  };
}

function mapExperience(experience) {
  const highlights = (experience.job_descs ?? [])
    .map((jobDesc) => jobDesc.description)
    .filter(Boolean);
  const location = experience.workplace_type
    ? `${experience.location} (${experience.workplace_type})`
    : experience.location;

  return {
    id: experience.experience_id,
    role: experience.position,
    company: experience.company_name,
    period: {
      id: formatPeriod(experience, "id"),
      en: formatPeriod(experience, "en"),
    },
    location: {
      id: location,
      en: location,
    },
    description: experience.description ?? null,
    highlights: {
      id: highlights,
      en: highlights,
    },
  };
}

export function PortfolioDataProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetch(PORTFOLIO_URL, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Portfolio API responded with ${response.status}`);
        }

        const payload = await response.json();

        if (!payload?.data) {
          throw new Error("Invalid portfolio API response");
        }

        return payload.data;
      })
      .then((data) => {
        setProfile(mapProfile(data.profile));
        setProjects((data.projects ?? []).map(mapProject));
        setExperiences((data.experiences ?? []).map(mapExperience));
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError(fetchError);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  const refetch = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  return (
    <PortfolioDataContext.Provider
      value={{ profile, projects, experiences, loading, error, refetch }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  }

  return context;
}

export default PortfolioDataContext;
