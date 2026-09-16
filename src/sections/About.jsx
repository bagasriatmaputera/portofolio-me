import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechStackBadge from "../components/TechStackBadge";
import profileData from "../data/profile.json";
import techStackData from "../data/techstack.json";
import { UserCheck, Terminal } from "lucide-react";

function About() {
  const categories = ["Semua", "Backend", "Frontend", "Mobile", "Styling", "Tools"];
  const [selectedCategory, setSelectedCategory] = React.useState("Semua");

  const filteredTech = selectedCategory === "Semua"
    ? techStackData
    : techStackData.filter((item) => item.category === selectedCategory);

  const metrics = [
    { value: "2+", label: "Tahun di Industri Web", color: "text-accent" },
    { value: "10+", label: "Proyek & Repositori", color: "text-primary" },
    { value: "100%", label: "Responsif & Clean Code", color: "text-primary" },
    { value: "⚡️", label: "Performa & CI/CD", color: "text-accent" },
  ];

  return (
    <section id="about" className="py-20 border-t border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-2">
            <UserCheck className="w-4 h-4" />
            <span>Tentang Saya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text">
            Membangun Pengalaman Web yang Cepat & Intuitif
          </h2>
        </motion.div>

        {/* Grid content: Bio & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-4 text-base sm:text-lg text-text/80 leading-relaxed"
          >
            <p>
              Halo! Saya adalah <strong className="text-primary font-semibold">{profileData.name}</strong>, seorang Software Engineer yang berfokus pada pengembangan aplikasi web modern, RESTful API terukur, dan antarmuka responsif.
            </p>
            <p>
              Saat ini di <strong className="text-primary font-semibold">The One Retail</strong>, saya berkontribusi dalam arsitektur web berskala ritel, integrasi queue management, serta pipeline CI/CD untuk memastikan pengiriman fitur yang stabil dan efisien.
            </p>
            <p className="text-sm sm:text-base text-secondary font-medium">
              Berdasar di {profileData.location}, saya selalu terbuka untuk kolaborasi teknis, diskusi inovasi software, dan peluang pengembangan produk digital.
            </p>
          </motion.div>

          {/* Key metrics cards with hover and stagger */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/15 hover:border-accent/40 text-center transition-colors shadow-sm hover:shadow-md"
              >
                <span className={`block text-3xl sm:text-4xl font-extrabold ${metric.color}`}>
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-text/80 mt-1 block">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 pt-10 border-t border-primary/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-accent" />
              <h3 className="text-xl sm:text-2xl font-bold text-text">Teknologi & Keahlian</h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 ${
                    selectedCategory === cat
                      ? "bg-primary text-background shadow-sm"
                      : "bg-primary/5 text-text/70 hover:bg-primary/15 hover:text-text"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Badges Grid with Layout Animation */}
          <motion.div layout className="flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech) => (
                <TechStackBadge
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  category={tech.category}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
