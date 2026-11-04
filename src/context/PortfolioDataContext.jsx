import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { environment } from "../../environment/environment";
import fallbackProfile from "../data/profile.json";
import fallbackProjects from "../data/projects.json";
import fallbackExperience from "../data/experience.json";

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

  // Fallback format compatibility
  if (profile.photo && profile.bio && !profile.profile_id) {
    return profile;
  }

  return {
    id: profile.profile_id || "profile-default",
    name: profile.name,
    title: profile.job_position || profile.title,
    bio:
      typeof profile.summary === "object"
        ? profile.summary
        : {
            id: profile.summary ?? "",
            en: profile.summary ?? "",
          },
    photo: profile.image_url || profile.photo || "/images/profile/photo.jpg",
    location: profile.location ?? "",
    resumeUrl: profile.resume_url || profile.resumeUrl || "#",
    availableForWork: Boolean(
      profile.available_for_work ?? profile.availableForWork
    ),
    socials: {
      github: profile.socials?.github ?? "",
      linkedin: profile.socials?.linkedin ?? "",
      email: profile.socials?.email ?? "",
      instagram: profile.socials?.instagram ?? "",
      tiktok: profile.socials?.tiktok ?? "",
    },
  };
}

function mapProject(project) {
  const rawGallery = project.media_gallery ?? project.mediaGallery ?? [];
  const gallery = rawGallery.map((item) => {
    if (typeof item === "string") {
      const resolved = resolveMedia(item, item);
      return {
        image: resolved,
        imageUrl: resolved,
        caption: { id: "", en: "" },
      };
    }
    const img = item.image || item.url || item.imageUrl || "";
    const resolved = resolveMedia(img, item.image_url || img);
    return {
      image: resolved,
      imageUrl: item.image_url || resolved,
      caption: item.caption ?? {
        id: item.caption_id || "",
        en: item.caption_en || "",
      },
    };
  });

  return {
    id: project.project_id || project.id,
    title: project.title,
    description: project.description,
    image:
      resolveMedia(project.image, project.image_url) ||
      "/images/projects/project-placeholder.svg",
    gifImage:
      resolveMedia(
        project.gif_image || project.gifImage,
        project.gif_image_url
      ) || null,
    techStack: project.tech_stack || project.techStack || [],
    liveUrl: project.live_url || project.liveUrl || "",
    repoUrl: project.repo_url || project.repoUrl || "",
    featured: Boolean(project.featured),
    is_live: Boolean(project.is_live ?? (project.live_url || project.liveUrl)),
    is_repo: Boolean(project.is_repo ?? (project.repo_url || project.repoUrl)),
    order: project.order ?? 0,
    mediaGallery: gallery,
    problemSolution:
      project.problem_solution ??
      project.problem_and_solution ??
      project.problemSolution ??
      null,
    challengesLearnings:
      project.challenges_learnings ??
      project.challenges_and_learnings ??
      project.challengesLearnings ??
      null,
  };
}

function mapExperience(experience) {
  // Fallback format compatibility
  if (experience.company && experience.period) {
    return experience;
  }

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
  const [profile, setProfile] = useState(() => mapProfile(fallbackProfile));
  const [projects, setProjects] = useState(() =>
    (fallbackProjects ?? []).map(mapProject)
  );
  const [experiences, setExperiences] = useState(() =>
    (fallbackExperience ?? []).map(mapExperience)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiveApi, setIsLiveApi] = useState(false);
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
        if (data.profile) {
          setProfile(mapProfile(data.profile));
        }
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects.map(mapProject));
        }
        if (Array.isArray(data.experiences) && data.experiences.length > 0) {
          setExperiences(data.experiences.map(mapExperience));
        }
        setIsLiveApi(true);
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          console.warn(
            "Portfolio API request failed; continuing with fallback dataset:",
            fetchError
          );
          setIsLiveApi(false);
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

  const getProjectById = useCallback(
    (id) => {
      if (!id) return null;
      return (
        projects.find(
          (p) =>
            String(p.id) === String(id) || String(p.project_id) === String(id)
        ) || null
      );
    },
    [projects]
  );

  return (
    <PortfolioDataContext.Provider
      value={{
        profile,
        projects,
        experiences,
        loading,
        error,
        isLiveApi,
        refetch,
        getProjectById,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error(
      "usePortfolioData must be used within a PortfolioDataProvider"
    );
  }

  return context;
}

export default PortfolioDataContext;
