"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isArabic: boolean;
}

export default function Hero({ isArabic }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Set initial states to prevent jump/FOUC
      gsap.set(".reveal-text", { yPercent: 100, opacity: 0 });
      // gsap.set(".hero-sub-content", { y: 20, opacity: 0 });
      gsap.set(image1Ref.current, { x: isArabic ? -100 : 100, opacity: 0, scale: 0.8 });
      gsap.set(image3Ref.current, { x: isArabic ? 100 : -100, opacity: 0, scale: 0.8 });

      // Kinetic Typography reveal
      tl.to(
        ".reveal-text",
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "expo.out"
        },
        "-=0.8"
      );

      // Subtext and CTAs
      tl.to(
        ".hero-sub-content",
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
        "-=1"
      );

      // Image Entrance - Sliding in from sides
      tl.to(
        image1Ref.current,
        { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" },
        "-=1.2"
      );

      tl.to(
        image3Ref.current,
        { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" },
        "-=1.5"
      );

      // 2. Mouse-driven Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth) - 0.5;
        const yPos = (clientY / window.innerHeight) - 0.5;

        gsap.to(image1Ref.current, {
          x: xPos * 30,
          y: yPos * 30,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(image3Ref.current, {
          x: -xPos * 50,
          y: -yPos * 50,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(titleRef.current, {
          x: xPos * 10,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 3. ScrollTrigger Parallax
      gsap.to(image1Ref.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -150,
        rotate: -5,
      });

      gsap.to(image3Ref.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        rotate: 5,
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [isArabic]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-cream select-none py-20"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      {/* Background Elements: Grid-like structure */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Asymmetric Image Panels */}
      <div
        ref={image1Ref}
        className={`absolute z-10 w-full max-w-[450px] aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl top-[15%] hidden lg:block ${
          isArabic ? "left-[-5%]" : "right-[-5%]"
        }`}
      >
        <img
          src="/1.webp"
          alt="Architectural Detail 1"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
      </div>

      <div
        ref={image3Ref}
        className={`absolute z-10 w-full max-w-[380px] aspect-square overflow-hidden rounded-full shadow-2xl bottom-[10%] hidden lg:block border-[12px] border-white/10 ${
          isArabic ? "right-[-5%]" : "left-[-5%]"
        }`}
      >
        <img
          src="/photonumber3.webp"
          alt="Architectural Detail 3"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/40" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Left Side: Text Content */}
        <div className="lg:col-span-8 flex flex-col items-start text-left" style={{ textAlign: isArabic ? 'right' : 'left' }}>

          {/* Kinetic Typography Headline */}
          <div ref={titleRef} className="relative mb-8">
            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-charcoal leading-[1.1]">
              <span className="block overflow-hidden py-1">
               <span className="reveal-text inline-block tracking-normal translate-y-0 opacity-0 text-3xl font-bold">
                  {isArabic ? "صناعة التميز في" : "Crafting Excellence In"}
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="reveal-text block whitespace-normal md:whitespace-nowrap text-primary font-extrabold translate-y-0 opacity-0">
                  {isArabic ? "المقاولات العامة" : "General Contracting"}
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="reveal-text whitespace-normal md:whitespace-nowrap block translate-y-0 opacity-0">
                  {isArabic ? "والهندسة المعمارية" : "& Architecture"}
                </span>
              </span>
            </h1>
          </div>

          {/* Description & Actions */}
          
        </div>

        {/* Right Side: Empty for layout balance or supplementary elements */}
        <div className="lg:col-span-4 hidden lg:block relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
