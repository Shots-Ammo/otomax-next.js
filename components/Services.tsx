"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  Sparkles,
  Compass,
  Flame,
  Wrench,
  Zap,
  Wind,
  X,
  Phone,
  MessageCircle,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  isArabic: boolean;
}

interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  longDesc: string;
  longDescAr: string;
  index: number;
}

export default function Services({ isArabic }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const servicesList: ServiceItem[] = [
    {
      id: "concrete",
      icon: Layers,
      index: 0,
      title: "Concrete Structure",
      titleAr: "الهياكل الخرسانية",
      desc: "High-performance reinforced concrete structures engineered with rigorous precision, ensuring structural integrity that endures for generations.",
      descAr: "هياكل خرسانية مسلحة عالية الأداء تم تصميمها وتنفيذها بدقة هندسية صارمة لضمان المتانة والأمان الذي يدوم لأجيال متعاقبة.",
      longDesc: "Our concrete construction team delivers premium structural frameworks for luxury residential villas, high-rise buildings, and heavy commercial infrastructure. We use advanced grade-mix formulations, precise formworks, and strict reinforcement alignments compliant with Saudi Aramco and local building standards.",
      longDescAr: "يقدم فريق الخرسانة لدينا هياكل إنشائية متفوقة للفيلات السكنية الفاخرة، والأبنية الشاهقة، والمشاريع التجارية الكبرى. نستخدم تركيبات خلطة متطورة، وقوالب صب دقيقة، ومحاذاة صارمة لحديد التسليح متوافقة مع معايير أرامكو السعودية والكود السعودي للبناء.",
    },
    {
      id: "finishing",
      icon: Sparkles,
      index: 1,
      title: "Architectural Finishing",
      titleAr: "التشطيبات المعمارية",
      desc: "Meticulous interior and exterior craftsmanship. From bespoke plasterwork to fine stone cladding, we execute details that define luxury.",
      descAr: "حرفية متناهية في التشطيبات الداخلية والخارجية. من الجبسيات الفاخرة المخصصة إلى تكسية الحجر الطبيعي النبيل، نصنع التفاصيل الفخمة.",
      longDesc: "We transform raw structures into breathtaking masterpieces. Our finishing division specializes in luxury marble floor installations, micro-cement finishes, premium dry-wall textures, acoustic ceilings, and custom-designed structural facades that stand as visual testaments of status and quality.",
      longDescAr: "نحول الهياكل الخام إلى تحف فنية مذهلة. يتخصص قسم التشطيبات لدينا في تركيب الرخام الفاخر، تشطيبات المايكروسمنت، محارة الجبسيات الراقية، الأسقف الصوتية، والواجهات الخارجية المصممة خصيصاً لتكون شاهداً بصرياً على الفخامة والجودة.",
    },
    {
      id: "design",
      icon: Compass,
      index: 2,
      title: "Architectural Design",
      titleAr: "التصميم المعماري",
      desc: "Visionary spatial planning. We translate conceptual dreams into high-performance architectural blueprints, harmonizing layout with majestic aesthetics.",
      descAr: "تخطيط مساحات مبتكر ورؤية مستقبلية. نترجم مخططات أحلامك إلى خرائط تفصيلية عالية الأداء تجمع بين انسيابية الحركة والجمال البصري المهيب.",
      longDesc: "Combining functional flow with luxury spatial dynamics, our design architects construct photorealistic 3D visual models and blueprints. We plan layouts to maximize ambient natural light, passive cooling, spatial flexibility, and seamless indoor-outdoor luxury integration.",
      longDescAr: "بالجمع بين انسيابية المساحة والأنماط المعمارية الراقية، يقوم مهندسونا بتصميم نماذج ثلاثية الأبعاد ورسومات هندسية دقيقة. نخطط المساحات للاستفادة القصوى من الضوء الطبيعي، التبريد الذكي، مرونة المساحة، ودمج الفراغات الداخلية بالخارجية بانسيابية.",
    },
    {
      id: "firefighting",
      icon: Flame,
      index: 3,
      title: "Fire Fighting Works",
      titleAr: "أنظمة مكافحة الحريق",
      desc: "Comprehensive fire suppression systems. We design and integrate state-of-the-art alarms and automated sprinklers to protect luxury assets.",
      descAr: "أنظمة مكافحة وإخماد الحرائق الشاملة. نقوم بتصميم ودمج إنذارات متطورة وشبكات رش آلية لحماية أرواح عملائنا وممتلكاتهم الثمينة.",
      longDesc: "We engineer, install, and certify complete fire safety networks under strict Civil Defense (Fanan) compliance. This includes high-pressure automated fire sprinkler networks, clean-agent gas suppression (FM-200), addressable fire detection loops, and integrated emergency ventilation control systems.",
      longDescAr: "نقوم بهندسة وتركيب واختبار شبكات السلامة من الحرائق بالامتثال التام لمتطلبات الدفاع المدني السعودي. يشمل ذلك شبكات رشاشات الحريق الآلية ذات الضغط العالي، أنظمة الإخماد بالغاز النظيف (FM-200)، لوحات إنذار معنونة، وأنظمة تهوية طوارئ متكاملة.",
    },
    {
      id: "plumbing",
      icon: Wrench,
      index: 4,
      title: "Plumbing Infrastructure",
      titleAr: "أعمال السباكة والهيدروليك",
      desc: "Advanced hydraulic and fluid engineering. We implement pristine water distribution systems, industrial drainage, and premium sanitary infrastructure.",
      descAr: "هندسة هيدروليكية متطورة لشبكات المياه. نقوم بتركيب شبكات توزيع مياه نقية، شبكات تصريف صناعية، وبنية تحتية صحية ممتازة.",
      longDesc: "We design and deploy absolute water networks using heavy-gauge PPR and PEX technologies. Our systems guarantee zero-leak, high-pressure distribution, solar water heating systems, commercial grease traps, and state-of-the-art water filtration and recycling infrastructures.",
      longDescAr: "نصمم وننفذ شبكات إمداد مياه خالية من التسريب باستخدام تقنيات PPR و PEX عالية الجودة. تضمن أنظمتنا ضغط مياه متوازن ومستدام، سخانات مياه شمسية، مصائد شحوم تجارية، وأنظمة فلترة مياه وتنقية متقدمة للغاية.",
    },
    {
      id: "electrical",
      icon: Zap,
      index: 5,
      title: "Electrical Networks",
      titleAr: "الشبكات والأنظمة الكهربائية",
      desc: "Sophisticated high-voltage power networks and smart automation. From custom illumination designs to automated building grids, we deliver efficiency.",
      descAr: "شبكات طاقة وأنظمة تحكم ذكية متطورة. من التصاميم الضوئية الفاخرة إلى لوحات التوزيع الآلية، نضمن موثوقية وأمان وكفاءة مطلقة.",
      longDesc: "Our licensed electrical specialists deliver stable energy solutions. We install industrial distribution panels (MDBs), lighting control automations (KNX/smart-home grids), surge protections, backup generators, and fiber-optic communication infrastructures designed for digital supremacy.",
      longDescAr: "يقوم متخصصو الكهرباء لدينا بتنفيذ حلول طاقة مستقرة وآمنة. نركب لوحات التوزيع الرئيسية والصناعية (MDBs)، أنظمة التحكم في الإضاءة الذكية (KNX)، مانعات الصواعق والحماية من التذبذب، مولدات طوارئ، وشبكات ألياف ضوئية فائقة السرعة.",
    },
    {
      id: "ac",
      icon: Wind,
      index: 6,
      title: "Central Air Conditioning",
      titleAr: "التكييف المركزي والتهوية",
      desc: "Advanced HVAC and climate engineering. Custom cooling systems designed to sustain whisper-quiet, pristine indoor climates in extreme desert conditions.",
      descAr: "هندسة تكييف مركزي متكاملة (HVAC). أنظمة تبريد مصممة خصيصاً لتوفير هواء نقي وجو هادئ فائق الفخامة في أصعب ظروف المناخ الصحراوي.",
      longDesc: "We engineer heavy-duty chilled water and VRF (Variable Refrigerant Flow) central cooling networks. Our HVAC designs maintain strict moisture control, multi-stage HEPA air filtrations, customized thermal sheet ductwork fabrication, and energy-management panels optimizing operational cost.",
      longDescAr: "نقوم بهندسة أنظمة تبريد بالماء المثلج (Chillers) وتدفق التبريد المتغير (VRF) للخدمة الشاقة. تضمن أنظمتنا التحكم الصارم بالرطوبة، فلاتر هواء HEPA متعددة المراحل، تصنيع مجاري هواء معزولة حرارياً، ولوحات ذكية لتوفير استهلاك الطاقة.",
    },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Clip-path text reveal on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".reveal-line",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "expo.out",
        }
      );

      // 2. Cards staggered entrance with 3D tilt
      tl.fromTo(
        ".service-card",
        {
          opacity: 0,
          y: 80,
          rotateX: -20,
          scale: 1,
          transformOrigin: "center bottom",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.1,
          stagger: {
            amount: 0.9,
            from: "start",
          },
          ease: "back.out(1.4)",
        },
        "-=0.6"
      );

      // 3. Floating ambient glows
      gsap.to(".bg-glow-1", {
        x: 60,
        y: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".bg-glow-2", {
        x: -50,
        y: 60,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
      gsap.to(".bg-glow-3", {
        x: 40,
        y: 30,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // 4. Subtle magnetic parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xNorm = (clientX / innerWidth - 0.5) * 2;
        const yNorm = (clientY / innerHeight - 0.5) * 2;

        gsap.to(".parallax-grid", {
          x: xNorm * 12,
          y: yNorm * 12,
          duration: 1.8,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, [isArabic]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-32 sm:py-48 bg-charcoal text-cream relative overflow-hidden"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      {/* === Atmospheric Depth Layer === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Ambient glow orbs */}
        <div className="bg-glow-1 absolute top-[5%] left-[-8%] w-[550px] h-[550px] bg-accent/20 rounded-full blur-[100px]" />
        <div className="bg-glow-2 absolute bottom-[5%] right-[-8%] w-[500px] h-[500px] bg-accent/25 rounded-full blur-[120px]" />
        <div className="bg-glow-3 absolute top-[50%] left-[40%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px]" />

        {/* Subtle grid texture parallax layer */}
        <div
          className="parallax-grid absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(171,149,63,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(171,149,63,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top edge gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-charcoal/80 to-transparent" />
        {/* Bottom edge gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-charcoal/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* === Cinematic Header — Asymmetric === */}
        <div
          ref={headerRef}
          className="flex flex-col items-start mb-24 relative"
          style={{ textAlign: isArabic ? "right" : "left" }}
        >
          {/* Eyebrow label */}
          <span className="reveal-line inline-block font-heading text-[10px] sm:text-xs font-bold tracking-[0.35em] text-cream uppercase mb-6 border border-accent/30 px-4 py-2 rounded-full">
            {isArabic ? "ما نقدمه" : "What We Deliver"}
          </span>

          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-cream leading-[1.05] max-w-3xl">
            <span className="reveal-line block">
              {isArabic ? "خدماتنا في قطاع" : "Our services in the"}
            </span>
            <span className="reveal-line block text-cream">
              {isArabic ? "المقاولات العامة" : "general contracting sector"}
            </span>
          </h2>

          {/* Decorative counter pill — offset */}
          <div className={`reveal-line absolute top-0 hidden lg:flex flex-col items-center justify-center w-24 h-24 rounded-full border border-accent/20 bg-white/5 backdrop-blur-sm ${isArabic ? "left-0" : "right-0"}`}>
            <span className="font-heading text-2xl font-extrabold text-cream">07</span>
            <span className="font-heading text-[9px] uppercase tracking-widest text-cream/40">
              {isArabic ? "خدمات" : "Services"}
            </span>
          </div>
        </div>

        {/* === The Service Grid === */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 perspective-[1200px]"
        >
          {servicesList.map((service) => {
            const ServiceIcon = service.icon;
            const isHovered = hoveredId === service.id;
            // Staggered vertical offsets for asymmetric feel
            const offsetClass =
              service.index % 3 === 1
                ? "md:translate-y-10"
                : service.index % 3 === 2
                ? "md:-translate-y-5"
                : "";

            const isLastItem = service.index === 6;
            const gridClasses = isLastItem
              ? "lg:col-start-2 lg:col-span-1"
              : "";

            return (
              <motion.div
                key={service.id}
                onClick={() => setSelectedService(service)}
                onHoverStart={() => setHoveredId(service.id)}
                onHoverEnd={() => setHoveredId(null)}
                onViewportEnter={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
                    setHoveredId(service.id);
                  }
                }}
                onViewportLeave={() => {
                  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
                    if (hoveredId === service.id) setHoveredId(null);
                  }
                }}
                viewport={{ margin: "-30% 0px -30% 0px", amount: 0.3 }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={`service-card group relative cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm ${offsetClass} ${gridClasses}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Clip-path gold sweep on hover */}
                <motion.div
                  className="absolute inset-0 z-0 rounded-2xl"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: isHovered ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
                  transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    background: "linear-gradient(135deg, #C9A84C 0%, #E8D48B 50%, #C9A84C 100%)",
                  }}
                />

                {/* Hover border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl z-0"
                  animate={{
                    boxShadow: isHovered
                      ? "0 0 0 1.5px rgba(171,149,63,0.7), 0 25px 60px rgba(171,149,63,0.2)"
                      : "0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Card inner content */}
                <div className="relative z-10 flex flex-col h-full p-8 sm:p-10 min-h-[300px]">
                  {/* Index label */}
                  <div className="absolute top-5 right-5 font-heading text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-charcoal/40 transition-colors duration-500">
                    S–0{service.index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/5 group-hover:bg-charcoal/20 flex items-center justify-center text-cream group-hover:text-charcoal mb-8 transition-all duration-500 flex-shrink-0">
                    <motion.div
                      animate={{ rotate: isHovered ? 12 : 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ServiceIcon size={24} />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-cream group-hover:text-charcoal transition-colors duration-500 uppercase tracking-tight mb-3 leading-snug">
                    {isArabic ? service.titleAr : service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-cream/55 group-hover:text-charcoal/80 font-light text-sm sm:text-base leading-relaxed mb-8 flex-1 transition-colors duration-500">
                    {isArabic ? service.descAr : service.desc}
                  </p>

                  {/* Footer CTA */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10 group-hover:border-charcoal/20 transition-colors duration-500">
                    <span className="text-[10px] font-heading font-bold text-cream group-hover:text-charcoal uppercase tracking-widest transition-colors duration-500">
                      {isArabic ? "التفاصيل" : "View Details"}
                    </span>
                    <motion.div
                      className="w-9 h-9 rounded-full border border-white/15 group-hover:border-charcoal/30 flex items-center justify-center text-cream/50 group-hover:text-charcoal transition-colors duration-500"
                      animate={{ rotate: isHovered ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <ArrowUpRight size={15} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === Detail Modal === */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-charcoal/75 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Panel */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="relative w-full max-w-2xl bg-charcoal border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl z-10 overflow-hidden"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {/* Modal glow orb */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/15 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setSelectedService(null)}
                className={`absolute top-6 p-2 rounded-full border border-white/10 text-white/50 hover:border-accent hover:text-cream transition-all duration-300 ${
                  isArabic ? "left-6" : "right-6"
                }`}
              >
                <X size={16} />
              </button>

              <div className="flex flex-col gap-8 relative z-10">
                {/* Service header */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center text-cream flex-shrink-0">
                    {selectedService && <selectedService.icon size={30} />}
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-cream uppercase tracking-tight">
                      {isArabic ? selectedService.titleAr : selectedService.title}
                    </h3>
                    <span className="text-[10px] font-heading font-semibold tracking-widest text-cream uppercase">
                      {isArabic ? "تفاصيل الخدمة" : "Service Intelligence"}
                    </span>
                  </div>
                </div>

                {/* Long description */}
                <p className="text-cream/70 leading-relaxed font-light text-base sm:text-lg">
                  {isArabic ? selectedService.longDescAr : selectedService.longDesc}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <a
                    href={`https://wa.me/966507506633?text=${encodeURIComponent(
                      isArabic
                        ? `مرحباً جلف إيفينتو، أود الاستفسار عن خدماتكم في: ${selectedService.titleAr}`
                        : `Hello Gulf Evento, I am interested in your services for: ${selectedService.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-charcoal font-heading font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-full transition-all duration-300 shadow-lg shadow-accent/20"
                  >
                    <MessageCircle size={16} />
                    {isArabic ? "تواصل عبر واتساب" : "WhatsApp Inquiry"}
                  </a>
                  <a
                    href="tel:0136647813"
                    className="flex items-center justify-center gap-2 border border-white/20 text-cream hover:bg-white/10 font-heading font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-full transition-all duration-300"
                  >
                    <Phone size={16} />
                    {isArabic ? "اتصال مباشر" : "Direct Call"}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
