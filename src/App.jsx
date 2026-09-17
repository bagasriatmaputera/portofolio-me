import React from "react";
import useDarkMode from "./hooks/useDarkMode";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import { ArrowUp } from "lucide-react";

function App() {
  const [isDark, toggleDarkMode] = useDarkMode();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col selection:bg-accent selection:text-background">
      {/* Navigation Header */}
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-primary/10 bg-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text/70">
            <p className="flex items-center gap-1.5">
            </p>

            <div className="flex items-center gap-6">
              <span>© {new Date().getFullYear()} Bagas. All rights reserved.</span>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg border border-primary/20 bg-background/80 hover:border-accent hover:text-accent transition-all duration-200"
                aria-label="Kembali ke atas"
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

export default App;
