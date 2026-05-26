"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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

  // Detailed Completed Projects matching the screenshots exactly
  const completedProjects: ProjectItem[] = [
    {
      id: "comp1",
      title: "Al Bandariyah Electromechanical Project",
      titleAr: "مشروع إلكتروميكانيك البندرية",
      location: "Al Khobar, KSA",
      locationAr: "الخبر، المملكة العربية السعودية",
      scope: "Turnkey electromechanical installations, power supply grids, and systems control.",
      scopeAr: "أعمال الإلكتروميكانيك المتكاملة وتصميم وتشييد لوحات وشبكات التوزيع الكهربائي.",
      image: "/completed_project1.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "comp2",
      title: "Al Ajlan Group Warehouses",
      titleAr: "مستودعات مجموعة العجلان",
      location: "Riyadh / Jubail, KSA",
      locationAr: "الرياض / الجبيل، المملكة العربية السعودية",
      scope: "Heavy-duty concrete framework skeleton & complete electrical & plumbing systems.",
      scopeAr: "تشييد الهيكل الخرساني المسلح عالي التحمل وتصميم وتمديد الشبكات الإلكتروميكانيكية.",
      image: "/completed_project2.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "comp3",
      title: "Al Khorayef Dammam Water Network",
      titleAr: "مشروع مياه الخريف بالدمام",
      location: "Dammam, KSA",
      locationAr: "الدمام، المملكة العربية السعودية",
      scope: "Industrial plumbing, water supply lines, electromechanical pumps & instrumentation.",
      scopeAr: "أعمال الإلكتروميكانيك الشاملة لشبكات المياه وتصميم وتمديد البنية التحتية والمضخات.",
      image: "/completed_project3.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "comp4",
      title: "Al Saif Transport Warehouses",
      titleAr: "مستودعات شركة السيف للنقليات",
      location: "Al Jubail, KSA",
      locationAr: "الجبيل، المملكة العربية السعودية",
      scope: "Heavy-load structural concrete execution, full MEP grid works & turnkey architectural finishing.",
      scopeAr: "الهيكل الخرساني بالكامل، وتمديد الأنظمة الإلكتروميكانيكية المتطورة وتشطيب متكامل من الألف إلى الياء.",
      image: "/completed_project4.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "comp5",
      title: "Balhmer Gate Commercial Tower",
      titleAr: "مشروع بوابة بالحمر الإداري",
      location: "Dammam, KSA",
      locationAr: "الدمام، المملكة العربية السعودية",
      scope: "Elite structural concrete works, premium architectural finishes & complete MEP systems.",
      scopeAr: "أعمال التشطيبات المعمارية الفاخرة للواجهات والداخلي بالإضافة إلى الأنظمة الإلكتروميكانيكية المتكاملة.",
      image: "/completed_project5.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "comp6",
      title: "Al Ahsa Mall Commercial Project",
      titleAr: "مشروع الأحساء مول التجاري",
      location: "Al Ahsa, KSA",
      locationAr: "الأحساء، المملكة العربية السعودية",
      scope: "Turnkey architectural finishes, structural masonry reinforcement & complete electromechanical grids.",
      scopeAr: "تشطيبات معمارية متكاملة، تحسينات إنشائية هيكلية وتصميم وتمديد الأنظمة الإلكتروميكانيكية.",
      image: "/completed_project6.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "comp7",
      title: "Al Mohammadiyah Residential Buildings",
      titleAr: "مجموعة عمارات المحمدية السكنية",
      location: "Al Jubail, KSA",
      locationAr: "الجبيل، المملكة العربية السعودية",
      scope: "Luxury structural concrete frames, custom external masonry cladding & full electromechanical networks.",
      scopeAr: "تنفيذ الهياكل الخرسانية الفاخرة، التشطيبات والكسوة المعمارية الراقية والشبكات الإلكتروميكانيكية.",
      image: "/completed_project7.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "comp8",
      title: "Nawat Corporate Tower",
      titleAr: "برج نواة الإداري (Nawat Tower)",
      location: "Jubail Industrial City, KSA",
      locationAr: "مدينة الجبيل الصناعية، المملكة العربية السعودية",
      scope: "Total Mechanical, Electrical & Plumbing (MEP) infrastructure engineering & building automation.",
      scopeAr: "أعمال الإلكتروميكانيك MEP بالكامل للبنية التحتية للبرج الإداري وتصميم الشبكات الذكية.",
      image: "/completed_project8.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "comp9",
      title: "Badr Villas Housing Complex",
      titleAr: "مجمع فيلات بدر السكني بالمدينة المنورة",
      location: "Madinah, KSA",
      locationAr: "المدينة المنورة، المملكة العربية السعودية",
      scope: "High-performance reinforced concrete structures & premium turnkey architectural finishes.",
      scopeAr: "أعمال الهيكل الخرساني والإنشائي المتين بالإضافة إلى تشطيبات معمارية فاخرة ومتكاملة للفيلات.",
      image: "/completed_project9.png?v=2",
      heightClass: "h-[450px]"
    }
  ];

  // Detailed Ongoing Projects
  const ongoingProjects: ProjectItem[] = [
    {
      id: "ong1",
      title: "Signature Bay View Business Park",
      titleAr: "مجمع غلف إيفينتو للأعمال",
      location: "Jubail Industrial City, KSA",
      locationAr: "مدينة الجبيل الصناعية، المملكة العربية السعودية",
      scope: "Ongoing civil excavation, heavy-grade deep foundation concrete & architectural design planning.",
      scopeAr: "أعمال الحفر المدني وتأسيس القواعد الخرسانية العميقة والتصميم الإنشائي المعماري الجاري.",
      image: "/current_project1.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "ong2",
      title: "Al Mutrafiah Executive Villas District",
      titleAr: "فلل حي المطرفية للقياديين",
      location: "Al Mutrafiah District, Jubail",
      locationAr: "حي المطرفية، الجبيل",
      scope: "Ongoing structural concrete framing, customized masonry finishing & site logistics management.",
      scopeAr: "تشييد الهياكل الخرسانية، أعمال البناء والكسوة المعمارية واللوجستية الجارية في الموقع.",
      image: "/current_project2.png?v=2",
      heightClass: "h-[450px]"
    },
    {
      id: "ong3",
      title: "Jubail Logistics Center Expansion",
      titleAr: "توسعة مركز الجبيل اللوجستي",
      location: "Jubail Support Area",
      locationAr: "منطقة الدعم بالجبيل",
      scope: "Ongoing electromechanical infrastructure installation, plumbing grids & steel framework alignment.",
      scopeAr: "توسعة الشبكات الإلكتروميكانيكية، أعمال السباكة الصناعية والحديد الإنشائي الجارية.",
      image: "/current_project3.png?v=2",
      heightClass: "h-[450px]"
    }
  ];

  const activeProjects = category === "completed" ? completedProjects : ongoingProjects;

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 bg-[#FBFBFA] text-[#26336D] relative overflow-hidden"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      {/* Dynamic Background Geometry */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-[-10%] top-[20%] w-96 h-96 bg-[#26336D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 relative z-10">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-[#26336D] mb-4 sm:mb-6 leading-tight">
            {isArabic ? "مشاريعنا الإنشائية" : "Our Projects Portfolio"}
          </h2>
          <p className="text-[#26336D]/60 max-w-2xl font-light text-sm sm:text-base lg:text-lg mt-2 px-2">
            {isArabic
              ? "تفخر شركة جلف إيفينتو بسجل حافل من الإنجازات العمرانية والمشاريع التي تم تسليمها بأعلى معايير الدقة الهندسية. استعرض محفظتنا من التحف المعمارية."
              : "Explore our prestigious achievements. From luxury estates to heavy industrial complexes, built on a foundation of structural perfection and visual elegance."}
          </p>
        </div>

        {/* Categories Toggle Switch */}
        <div className="flex justify-center mb-12 sm:mb-20 relative z-10">
          <div className="flex border border-[#26336D]/10 p-1.5 bg-[#26336D]/5 rounded-xl gap-2 backdrop-blur-sm">
            <button
              onClick={() => setCategory("completed")}
              className={cn(
                "relative flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-3 font-heading font-bold text-[10px] sm:text-sm uppercase tracking-wider rounded-lg transition-all duration-500 outline-none overflow-hidden group",
                category === "completed" ? "text-white shadow-xl" : "text-[#26336D]/60 hover:text-[#26336D]"
              )}
            >
              {category === "completed" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#C9A84C] to-[#B8963A] rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <ClipboardCheck size={16} className="z-10" />
              <span className="z-10">{isArabic ? "المشاريع المنفذة" : "Completed Projects"}</span>
            </button>
            <button
              onClick={() => setCategory("ongoing")}
              className={cn(
                "relative flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-3 font-heading font-bold text-[10px] sm:text-sm uppercase tracking-wider rounded-lg transition-all duration-500 outline-none overflow-hidden group",
                category === "ongoing" ? "text-white shadow-xl" : "text-[#26336D]/60 hover:text-[#26336D]"
              )}
            >
              {category === "ongoing" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#C9A84C] to-[#B8963A] rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Calendar size={16} className="z-10" />
              <span className="z-10">{isArabic ? "المشاريع الجاري تنفيذها" : "Current Projects"}</span>
            </button>
          </div>
        </div>

        {/* Grid Image Gallery */}
        <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="wait">
            {activeProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.04, 
                  ease: [0.25, 0.1, 0.25, 1],
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onViewportEnter={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
                    setHoveredCard(project.id);
                  }
                }}
                onViewportLeave={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
                    if (hoveredCard === project.id) setHoveredCard(null);
                  }
                }}
                viewport={{ margin: "-30% 0px -30% 0px", amount: 0.3 }}
                className="project-card group flex flex-col h-full w-full rounded-2xl overflow-hidden border border-[#26336D]/10 bg-white shadow-md transition-all duration-500 cursor-pointer hover:shadow-[0_0_25px_rgba(201,168,76,0.3),0_8px_30px_rgba(0,0,0,0.08)]"
              >
                {/* High Quality Image Container */}
                <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden bg-[#26336D]/5 flex-shrink-0">
                  <Image
                    src={project.image}
                    alt={isArabic ? project.titleAr : project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain bg-white p-2"
                    priority={index < 3}
                    unoptimized
                  />

                  {/* Status Badge - Top Right Sash Ribbon */}
                  <AnimatePresence>
                    {hoveredCard === project.id && (
                      <motion.div
                        initial={{ y: -60, x: 0 }}
                        animate={{ y: 0, x: 0 }}
                        exit={{ y: 0, x: 120, transition: { duration: 0.3, ease: "easeIn" } }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={cn(
                          "absolute top-5 -right-12 w-40 h-8 flex items-center justify-center shadow-md z-20",
                          "rotate-45 project-card-ribbon",
                          category === "completed"
                            ? "bg-[#C9A84C]"
                            : "bg-[#C9A84C]"
                        )}
                      >
                        <span className="text-white text-[10px] font-heading font-bold uppercase tracking-widest w-full text-center block">
                          {category === "completed"
                            ? (isArabic ? "مكتمل" : "COMPLETED")
                            : (isArabic ? "قيد التنفيذ" : "ONGOING")}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Content - Permanently Visible & Highly Readable */}
                <div className="p-4 sm:p-6 flex flex-col flex-1 bg-white">
                  {/* Location label */}
                  <span className="text-[10px] sm:text-[11px] font-heading font-semibold text-[#C9A84C] uppercase tracking-widest block mb-2">
                    📍 {isArabic ? project.locationAr : project.location}
                  </span>
                  
                  {/* Title - Now in golden color for emphasis */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#C9A84C] mb-3 leading-snug">
                    {isArabic ? project.titleAr : project.title}
                  </h3>

                  {/* Scope details */}
                  <div className="border-t border-[#26336D]/10 pt-3 sm:pt-4 mt-auto">
                    <p className="text-[#26336D]/70 font-light text-xs sm:text-sm leading-relaxed line-clamp-3">
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
          className="mt-16 sm:mt-24 lg:mt-32 bg-white border border-[#C9A84C]/10 rounded-3xl p-8 sm:p-10 lg:p-16 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center"
        >
          {/* Radial light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C9A84C]/5 via-transparent to-transparent pointer-events-none" />

          {/* Metric 1 */}
          <div className="flex flex-col items-center relative z-10 group">
            <span className="block font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#26336D] mb-3 transition-colors duration-500 group-hover:text-[#C9A84C]">
              {yearsCount}+
            </span>
            <span className="text-[10px] sm:text-xs font-heading font-bold tracking-widest text-[#C9A84C] uppercase">
              {isArabic ? "عاماً من التميز بالجبيل" : "Years of Heritage in Jubail"}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#26336D]/50 mt-2 font-medium block">
              {isArabic ? "منذ التأسيس عام ١٤٣٥ هـ" : "Established since 1435 H"}
            </span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center relative z-10 md:border-x md:border-[#26336D]/10 group">
            <span className="block font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#26336D] mb-3 transition-colors duration-500 group-hover:text-[#C9A84C]">
              {staffCount}+
            </span>
            <span className="text-[10px] sm:text-xs font-heading font-bold tracking-widest text-[#C9A84C] uppercase">
              {isArabic ? "حرفياً ومهندساً متخصصاً" : "Expert Engineers & Artisans"}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#26336D]/50 mt-2 font-medium block">
              {isArabic ? "قوة عاملة استثنائية متكاملة" : "Highly Skilled Elite Workforce"}
            </span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center relative z-10 group">
            <span className="block font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#26336D] mb-3 transition-colors duration-500 group-hover:text-[#C9A84C]">
              {projectsCount}+
            </span>
            <span className="text-[10px] sm:text-xs font-heading font-bold tracking-widest text-[#C9A84C] uppercase">
              {isArabic ? "مشروعاً ناجحاً مكتملاً" : "Completed Projects Ledger"}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#26336D]/50 mt-2 font-medium block">
              {isArabic ? "بدقة هندسية مطلقة ١٠٠٪" : "Engineered with 100% Precision"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
