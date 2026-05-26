"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Shield, Target } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface OverviewProps {
  isArabic: boolean;
}

export default function Overview({ isArabic }: OverviewProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  const overviewText = isArabic
    ? "مرحباً بكم في شركة جلف إيفينتو للمقاولات العامة، التي تأسست في مدينة الجبيل عام ١٤٣٥ هـ. يتميز فريقنا المتخصص بالتميز في مجموعة واسعة من المشاريع، بدءاً من المباني السكنية الراقية إلى المشاريع والمرافق العامة الكبرى. وبتركيز حاسم على النمو المستقبلي والتطوير المستمر، نحن على استعداد تام لتنفيذ أضخم المشاريع الإنشائية، مدعومين بنخبة من المهندسين والفنيين ذوي المهارات العالية."
    : "Welcome to Gulf Evento General Contracting Company, established in Al Jubail in 1435 H. Our dedicated team excels in a variety of projects, from premium residential estates to majestic public structures. With an unwavering focus on future growth and technical evolution, we are fully prepared to engineer the region's largest developments, supported by our elite workforce of engineers, specialists, and technicians.";

  const features = [
    {
      id: "vision",
      title: isArabic ? "رؤيتنا" : "Vision",
      icon: Eye,
      content: isArabic
        ? "نسعى إلى كسب الثقة الكاملة لعملائنا من خلال تقديم خدمات هندسية وإنشائية لا مثيل لها، وإنجاز المهام المسندة إلينا بأعلى درجات الكفاءة والسرعة والدقة المتناهية التي تفوق التوقعات."
        : "To earn the absolute trust of our clients by delivering unmatched engineering and construction services, executing every project with strict precision, speed, and standard of luxury that exceeds expectations.",
      color: "text-accent",
    },
    {
      id: "mission",
      title: isArabic ? "رسالتنا" : "Mission",
      icon: Target,
      content: isArabic
        ? "ملتزمون بتقديم أعلى مستويات الجودة في جميع خدماتنا، وتقديم الاستشارات الصادقة والحلول المبتكرة لعملائنا لضمان استدامة واستقرار مشاريعهم."
        : "We are passionately committed to delivering the highest caliber of craftsmanship across all services, providing honest engineering advisory, and implementing innovative solutions to guarantee the longevity and luxury of our clients' assets.",
      color: "text-primary",
    },
    {
      id: "strength",
      title: isArabic ? "ركائزنا" : "Our Strength",
      icon: Shield,
      content: isArabic
        ? "تكمن قوتنا في قوتنا البشرية المتكاملة المكونة من ٦٠ حرفياً ومهندساً من ذوي المهارات الاستثنائية والخبرة الواسعة، مما يمكننا من ترك بصمة فخامة فريدة على كل معلم نقوم بتشييده."
        : "Our ultimate power lies in our highly skilled workforce of 60+ engineers, master craftsmen, and technical experts, allowing us to leave an unmistakable stamp of luxury and perfection on every structural monument we build.",
      color: "text-accent",
    },
  ];

  useEffect(() => {
    // Auto-loop logic
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Parallax Text
      gsap.to(bgTextRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
        x: isArabic ? -200 : 200,
        duration: 1,
      });

      // 2. Main Headline Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".reveal-text",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" }
      );

      tl.fromTo(
        ".overview-p",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      // 3. Stats Counter Animation
      const stats = document.querySelectorAll(".stat-value");
      stats.forEach((stat) => {
        const endValue = stat.getAttribute("data-value");
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            },
            ease: "power2.out",
          }
        );
      });

      // 4. Feature Panels Entrance
      tl.fromTo(
        ".feature-panel",
        { scale: 0.9, opacity: 0, x: isArabic ? 50 : -50 },
        { scale: 1, opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.8"
      );

      // 5. Mouse Parallax for Panels
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth) - 0.5;
        const yPos = (clientY / window.innerHeight) - 0.5;

        gsap.to(".feature-panel", {
          x: (i) => (i % 2 === 0 ? xPos * 20 : -xPos * 20),
          y: (i) => (i % 2 === 0 ? yPos * 20 : -yPos * 20),
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, [isArabic]);

  // Transition animation for active card
  useEffect(() => {
    const ctx = gsap.context(() => {
      const activePanel = document.querySelector(".active-panel");
      const logoOverlay = document.querySelector(".logo-transition-overlay");
      const goldSweep = document.querySelector(".gold-sweep");

      if (!activePanel || !logoOverlay || !goldSweep) return;

      const tl = gsap.timeline();

      // 1. Gold Sweep Entrance
      tl.to(goldSweep, {
        scaleX: 1,
        duration: 0.6,
        ease: "power4.inOut",
      });

      // 2. Logo Fade In
      tl.to(logoOverlay, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)",
      }, "-=0.3");

      // 3. SYNCHRONIZED CONTENT UPDATE
      // Update the display index precisely when the gold sweep is covering the content
      tl.call(() => {
        setDisplayIndex(activeIndex);
      }, undefined, 0.5);

      // 4. Logo Fade Out
      tl.to(logoOverlay, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power4.in",
      }, "+=0.2");

      // 5. Gold Sweep Exit
      tl.to(goldSweep, {
        scaleX: 0,
        duration: 0.6,
        ease: "power4.inOut",
      });
    });
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 sm:py-48 bg-cream relative overflow-hidden"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      {/* Architectural Background Text */}
      <div
        ref={bgTextRef}
        className={`absolute top-10 select-none pointer-events-none z-0 opacity-5 font-heading text-[20vw] font-black uppercase leading-none text-charcoal ${
          isArabic ? "-right-20" : "-left-20"
        }`}
      >
        {isArabic ? "نظرة عامة" : "Overview"}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left side: Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="relative">
              <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
                {isArabic ? "فلسفتنا" : "Philosophy & Legacy"}
              </span>
              <h2 className="font-heading text-4xl sm:text-6xl font-bold text-charcoal leading-tight">
                <span className="block overflow-hidden py-1">
                  <span className="reveal-text block">
                    {isArabic ? "نظرة عامة" : "Company"}
                  </span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="reveal-text block text-primary">
                    {isArabic ? "على الشركة" : "Overview"}
                  </span>
                </span>
              </h2>
            </div>

            <p className="overview-p text-charcoal/70 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-lg">
              {overviewText}
            </p>

            {/* Dynamic Stats */}
            <div className="flex gap-8 sm:gap-12 pt-8 border-t border-charcoal/10">
              <div >
                <span className="stat-value block font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal" data-value="1435">0</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mt-2 block">
                  {isArabic ? "عام التأسيس" : "Founded (H)"}
                </span>
              </div>
              <div >
                <span className="stat-value block font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal" data-value="60">0</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mt-2 block">
                  {isArabic ? "خبير متخصص" : "Experts"}
                </span>
              </div>
            </div>
          </div>

          {/* Right side: Auto-Looping Showcase */}
          <div className="lg:col-span-7 relative h-full flex items-center justify-center">

            {/* The Prism Card */}
            <div className="relative w-full max-w-2xl min-h-[400px] sm:min-h-[450px] lg:min-h-[auto] lg:aspect-[4/3] rounded-sm overflow-hidden shadow-2xl transition-colors duration-700 group">

              {/* Background Color Layer: Blue (Charcoal) for active state */}
              <div className="absolute inset-0 bg-charcoal z-0" />

              {/* Gold Gradient Sweep Mask */}
              <div
                className="gold-sweep absolute inset-0 z-30 scale-x-0 origin-left pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #E8D48B 40%, #D4AF37 60%, #C9A84C 100%)",
                }}
              />

              {/* Logo Overlay */}
              <div className="logo-transition-overlay absolute inset-0 z-40 flex items-center justify-center opacity-0 scale-75 pointer-events-none">
                <div className="w-24 h-24 bg-charcoal p-2 rounded-full flex items-center justify-center shadow-xl border-2 border-primary overflow-hidden">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/gulf_logo.png"
                      alt="Gulf Evento Logo"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="active-panel relative z-10 h-full w-full p-8 sm:p-12 lg:p-20 flex flex-col justify-center text-cream">
                <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-primary flex-shrink-0`}>
                    {React.createElement(features[displayIndex].icon, { size: 24 })}
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tighter">
                    {features[displayIndex].title}
                  </h3>
                </div>
                <p className="text-cream/70 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-lg">
                  {features[displayIndex].content}
                </p>

                {/* Subtle architectural line */}
                <div className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-24 h-1 bg-primary/30" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
