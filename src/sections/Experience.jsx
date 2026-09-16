import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard";
import experienceData from "../data/experience.json";
import { Briefcase } from "lucide-react";

function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Karier & Pengalaman</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text">
            Jejak Langkah Profesional
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text/70 max-w-xl mx-auto">
            Perjalanan karier dalam mengembangkan solusi teknologi digital dan membangun produk berorientasi pengguna.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative mt-8">
          {experienceData.map((exp, idx) => (
            <ExperienceCard key={exp.id} {...exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
