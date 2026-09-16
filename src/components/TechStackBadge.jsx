import React from "react";
import { motion } from "framer-motion";
import {
  SiLaravel,
  SiPhp,
  SiTypescript,
  SiJavascript,
  SiVuedotjs,
  SiReact,
  SiAngular,
  SiIonic,
  SiMysql,
  SiPostman,
  SiGit,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss,
  SiVite,
} from "react-icons/si";
import { Code2 } from "lucide-react";

const ICON_MAP = {
  SiLaravel,
  SiPhp,
  SiTypescript,
  SiJavascript,
  SiVuedotjs,
  SiReact,
  SiAngular,
  SiIonic,
  SiMysql,
  SiPostman,
  SiGit,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss,
  SiVite,
};

function TechStackBadge({ name, icon, category }) {
  const IconComponent = (icon && ICON_MAP[icon]) || Code2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary/5 hover:bg-primary/15 border border-primary/15 hover:border-accent/40 text-text transition-colors duration-200 shadow-sm hover:shadow-md cursor-default"
    >
      <span className="text-accent group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
        <IconComponent className="w-5 h-5" />
      </span>
      <span className="text-sm font-medium">{name}</span>
      {category && (
        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary/15 text-secondary font-semibold ml-1">
          {category}
        </span>
      )}
    </motion.div>
  );
}

export default TechStackBadge;
