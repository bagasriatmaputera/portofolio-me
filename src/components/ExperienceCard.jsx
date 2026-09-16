import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

function ExperienceCard({ role, company, period, location, description, highlights, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="relative pl-8 md:pl-10 pb-12 group last:pb-2"
    >
      {/* Timeline vertical bar */}
      <div className="absolute left-[11px] md:left-[15px] top-3 bottom-0 w-[2px] bg-primary/20 group-last:hidden" />

      {/* Timeline dot icon */}
      <div className="absolute left-0 top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-background border-2 border-primary group-hover:border-accent flex items-center justify-center transition-colors duration-200 shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-accent group-hover:scale-125 transition-transform duration-200" />
      </div>

      {/* Content Card */}
      <div className="p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/15 hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors">
            {role}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30 w-fit">
            <Calendar className="w-3.5 h-3.5" />
            {period}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-secondary font-medium mb-4">
          <span className="flex items-center gap-1.5 text-primary font-semibold">
            <Briefcase className="w-4 h-4" />
            {company}
          </span>
          {location && (
            <span className="flex items-center gap-1 text-text/60 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-text/80 leading-relaxed mb-4">
          {description}
        </p>

        {highlights && highlights.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-primary/10">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-text/85">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ExperienceCard;
