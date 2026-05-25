"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  isArabic: boolean;
}

type ProjectCategory = "completed" | "ongoing";

interface ProjectItem {
  id: string;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  scope: string;
  scopeAr: string;
  image: string;
  heightClass: string;
}

// Custom Counter Hook
function useCounter(target: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime || 1);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

export default function Projects({ isArabic }: ProjectsProps) {
  const [category, setCategory] = useState<ProjectCategory>("completed");
  const [inView, setInView] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for metrics animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);



  // Animated counters
  const yearsCount = useCounter(12, 1500, inView);
  const staffCount = useCounter(60, 1500, inView);
  const projectsCount = useCounter(45, 1500, inView);

  // 9 New Completed Projects mapped to the public images
  const completedProjects: ProjectItem[] = Array.from({ length: 9 }).map((_, i) => ({
    id: `comp${i + 1}`,
    title: `Premium Project Portfolio ${i + 1}`,
    titleAr: `ملف المشاريع الفاخرة ${i + 1}`,
    location: "Al Jubail, KSA",
    locationAr: "الجبيل، المملكة العربية السعودية",
    scope: "High-end structural execution and premium architectural finishes.",
    scopeAr: "تنفيذ إنشائي عالي المستوى وتشطيبات معمارية فاخرة.",
    image: `/completed_project${i + 1}.png?v=2`,
    heightClass: "h-[450px]"
  }));

  const ongoingProjects: ProjectItem[] = Array.from({ length: 3 }).map((_, i) => ({
    id: `ong${i + 1}`,
    title: `Current Signature Development ${i + 1}`,
    titleAr: `تطوير المشاريع الحالية ${i + 1}`,
    location: "Al Jubail, KSA",
    locationAr: "الجبيل، المملكة العربية السعودية",
    scope: "Advanced structural engineering and modern luxury integration.",
    scopeAr: "هندسة إنشائية متقدمة ودمج الفخامة الحديثة.",
    image: `/current_project${i + 1}.png?v=2`,
    heightClass: "h-[450px]"
  }));

  const activeProjects = category === "completed" ? completedProjects : ongoingProjects;

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 bg-[#FBFBFA] text-[#26336D] relative overflow-hidden"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      {/* Dynamic Background Geometry */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#AB953F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-[-10%] top-[20%] w-96 h-96 bg-[#26336D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 relative z-10">
          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-[#26336D] mb-6 leading-tight">
            {isArabic ? "مشاريعنا الإنشائية" : "Our Projects Portfolio"}
          </h2>
          <p className="text-[#26336D]/60 max-w-2xl font-light text-base sm:text-lg mt-2">
            {isArabic
              ? "تفخر شركة جلف إيفينتو بسجل حافل من الإنجازات العمرانية والمشاريع التي تم تسليمها بأعلى معايير الدقة الهندسية. استعرض محفظتنا من التحف المعمارية."
              : "Explore our prestigious achievements. From luxury estates to heavy industrial complexes, built on a foundation of structural perfection and visual elegance."}
          </p>
        </div>

        {/* Categories Toggle Switch */}
        <div className="flex justify-center mb-20 relative z-10">
          <div className="flex border border-[#26336D]/10 p-1.5 bg-[#26336D]/5 rounded-xl gap-2 backdrop-blur-sm">
            <button
              onClick={() => setCategory("completed")}
              className={cn(
                "relative flex items-center gap-2 px-8 py-3 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all duration-500 outline-none overflow-hidden group",
                category === "completed" ? "text-white shadow-xl" : "text-[#26336D]/60 hover:text-[#26336D]"
              )}
            >
              {category === "completed" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#AB953F] to-[#8a7a30] rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <ClipboardCheck size={16} className="z-10" />
              <span className="z-10">{isArabic ? "المشاريع المنفذة" : "Completed Projects"}</span>
            </button>
            <button
              onClick={() => setCategory("ongoing")}
              className={cn(
                "relative flex items-center gap-2 px-8 py-3 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all duration-500 outline-none overflow-hidden group",
                category === "ongoing" ? "text-white shadow-xl" : "text-[#26336D]/60 hover:text-[#26336D]"
              )}
            >
              {category === "ongoing" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#AB953F] to-[#8a7a30] rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Calendar size={16} className="z-10" />
              <span className="z-10">{isArabic ? "المشاريع الجاري تنفيذها" : "Current Projects"}</span>
            </button>
          </div>
        </div>

        {/* Grid Image Gallery */}
        <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {activeProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05, 
                  ease: [0.25, 0.1, 0.25, 1],
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
                className={cn(
                  "gallery-item relative w-full rounded-2xl overflow-hidden break-inside-avoid group cursor-pointer border border-[#26336D]/5 bg-[#26336D]/5",
                  project.heightClass
                )}
              >
                {/* High Quality Image Background */}
                <Image
                  src={project.image}
                  alt={isArabic ? project.titleAr : project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                  priority={index < 4}
                  unoptimized
                />

                {/* Dark Elegant Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#26336D]/95 via-[#26336D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

                {/* 45 Degree Corner Ribbon */}
                <div className={cn(
                  "absolute top-6 py-1.5 w-[160px] bg-[#AB953F] text-white text-[10px] font-heading font-bold uppercase tracking-widest text-center shadow-xl z-20",
                  "transition-all duration-500 ease-out",
                  "opacity-0 group-hover:opacity-100",
                  isArabic 
                    ? "-left-12 -rotate-45" 
                    : "-right-12 rotate-45"
                )}>
                  {category === "completed"
                    ? (isArabic ? "مكتمل" : "Completed")
                    : (isArabic ? "قيد التنفيذ" : "Ongoing")}
                </div>

                {/* Kinetic Content Reveal - Bottom */}
                <div className={cn(
                  "absolute bottom-0 w-full p-8 flex flex-col justify-end transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                  "opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0"
                )}>
                  {/* Location label */}
                  <span className="text-[11px] font-heading font-semibold text-[#AB953F] uppercase tracking-widest block mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                    📍 {isArabic ? project.locationAr : project.location}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-heading text-2xl font-bold text-white mb-3 leading-snug transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-150 drop-shadow-md">
                    {isArabic ? project.titleAr : project.title}
                  </h3>

                  {/* Scope details */}
                  <div className="border-t border-white/20 pt-4 mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-200">
                    <p className="text-white/80 font-light text-sm leading-relaxed line-clamp-2">
                      {isArabic ? project.scopeAr : project.scope}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Counters & Milestones panel */}
        <div
          ref={metricsRef}
          className="mt-24 sm:mt-32 bg-white border border-[#AB953F]/10 rounded-3xl p-10 sm:p-16 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        >
          {/* Radial light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#AB953F]/5 via-transparent to-transparent pointer-events-none" />

          {/* Metric 1 */}
          <div className="flex flex-col items-center relative z-10 group">
            <span className="block font-heading text-6xl sm:text-7xl font-extrabold text-[#26336D] mb-3 transition-colors duration-500 group-hover:text-[#AB953F]">
              {yearsCount}+
            </span>
            <span className="text-xs font-heading font-bold tracking-widest text-[#AB953F] uppercase">
              {isArabic ? "عاماً من التميز بالجبيل" : "Years of Heritage in Jubail"}
            </span>
            <span className="text-[11px] text-[#26336D]/50 mt-2 font-medium block">
              {isArabic ? "منذ التأسيس عام ١٤٣٥ هـ" : "Established since 1435 H"}
            </span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center relative z-10 md:border-x md:border-[#26336D]/10 group">
            <span className="block font-heading text-6xl sm:text-7xl font-extrabold text-[#26336D] mb-3 transition-colors duration-500 group-hover:text-[#AB953F]">
              {staffCount}+
            </span>
            <span className="text-xs font-heading font-bold tracking-widest text-[#AB953F] uppercase">
              {isArabic ? "حرفياً ومهندساً متخصصاً" : "Expert Engineers & Artisans"}
            </span>
            <span className="text-[11px] text-[#26336D]/50 mt-2 font-medium block">
              {isArabic ? "قوة عاملة استثنائية متكاملة" : "Highly Skilled Elite Workforce"}
            </span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center relative z-10 group">
            <span className="block font-heading text-6xl sm:text-7xl font-extrabold text-[#26336D] mb-3 transition-colors duration-500 group-hover:text-[#AB953F]">
              {projectsCount}+
            </span>
            <span className="text-xs font-heading font-bold tracking-widest text-[#AB953F] uppercase">
              {isArabic ? "مشروعاً ناجحاً مكتملاً" : "Completed Projects Ledger"}
            </span>
            <span className="text-[11px] text-[#26336D]/50 mt-2 font-medium block">
              {isArabic ? "بدقة هندسية مطلقة ١٠٠٪" : "Engineered with 100% Precision"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
