"use client";

import React from "react";
import { SectionHeaderProps } from "./service";

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"/>
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400">
        What We Build
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"/>
    </div>
    <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.08] mb-5">
      {title}
    </h2>
    <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl mx-auto">
      {subtitle}
    </p>
  </div>
);

export default SectionHeader;