import React, { useState, useEffect } from "react";
import useDarkMode from "./hooks/useDarkMode";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import {
  PortfolioDataProvider,
  usePortfolioData,
} from "./context/PortfolioDataContext";
import { translations } from "./data/translations";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import { AlertCircle, ArrowUp, Loader2, RefreshCw } from "lucide-react";

function MainPortfolio({ isDark, toggleDarkMode }) {
  const { language } = useLanguage();
  const { getProjectById } = usePortfolioData();
  const t = translations[language].footer;

  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const queryProj = params.get("project");
    if (queryProj) return queryProj;

    const hash = window.location.hash;
    if (hash.startsWith("#project/")) {
      return hash.replace("#project/", "");
    }
    return null;
  });

  // Synchronize URL with selected project
  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    const url = new URL(window.location.href);
    url.searchParams.set("project", projectId);
    window.history.pushState({ projectId }, "", url.toString());
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.pushState({}, "", url.pathname);

    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const queryProj = params.get("project");
      if (queryProj) {
        setSelectedProjectId(queryProj);
      } else if (window.location.hash.startsWith("#project/")) {
        setSelectedProjectId(window.location.hash.replace("#project/", ""));
      } else {
        setSelectedProjectId(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedProject = selectedProjectId
    ? getProjectById(selectedProjectId)
    : null;

  return (
    <div className="min-h-screen bg-background text-text flex flex-col selection:bg-accent selection:text-background">
      {/* Navigation Header */}
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToProjects}
          />
        ) : (
          <>
            <Hero />
            <About />
            <Experience />
            <Projects onSelectProject={handleSelectProject} />
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-primary/10 bg-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text/70">
            <p className="flex items-center gap-1.5">
              <span>BRP &lt;/&gt;</span>
            </p>

            <div className="flex items-center gap-6">
              <span>
                © {new Date().getFullYear()} Bagas Riatma Putera. {t.rights}
              </span>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg border border-primary/20 bg-background/80 hover:border-accent hover:text-accent transition-all duration-200"
                aria-label={t.backToTop}
                title={t.backToTop}
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PortfolioGate({ isDark, toggleDarkMode }) {
  const { loading, error, refetch, projects } = usePortfolioData();
  const { language } = useLanguage();
  const t = translations[language].common;

  if (loading && (!projects || projects.length === 0)) {
    return (
      <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
        <p className="text-sm text-text/70">{t.loading}</p>
      </div>
    );
  }

  if (error && (!projects || projects.length === 0)) {
    return (
      <div className="min-h-screen bg-background text-text flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex w-14 h-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-500">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-text">{t.errorTitle}</h1>
          <p className="mt-2 text-sm text-text/70">{t.errorMessage}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-accent"
          >
            <RefreshCw className="w-4 h-4" />
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  return <MainPortfolio isDark={isDark} toggleDarkMode={toggleDarkMode} />;
}

function App() {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <LanguageProvider>
      <PortfolioDataProvider>
        <PortfolioGate isDark={isDark} toggleDarkMode={toggleDarkMode} />
      </PortfolioDataProvider>
    </LanguageProvider>
  );
}

export default App;
