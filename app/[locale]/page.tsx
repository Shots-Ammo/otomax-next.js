"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params?.locale as string;
  const isArabic = locale === "ar";

  const handleLanguageToggle = (val: boolean) => {
    const newLocale = val ? "ar" : "en";
    if (pathname) {
      const segments = pathname.split("/");
      if (segments[1] === "ar" || segments[1] === "en") {
        segments[1] = newLocale;
        router.push(segments.join("/"));
      } else {
        router.push(`/${newLocale}`);
      }
    } else {
      router.push(`/${newLocale}`);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isArabic ? "font-arabic" : ""}`}>
      {/* Premium Glassmorphic Header Menu */}
      <Navbar isArabic={isArabic} setIsArabic={handleLanguageToggle} />

      {/* Main Core Editorial Layout */}
      <main className="flex-1">
        {/* Kinetic Hero Section */}
        <Hero isArabic={isArabic} />

        {/* Dynamic Philosophy Overview */}
        <Overview isArabic={isArabic} />

        {/* Detailed Services Ledger */}
        <Services isArabic={isArabic} />

        {/* Landmark Projects Showcase */}
        <Projects isArabic={isArabic} />

        {/* Multi-step Project Planner Contact Form */}
        <Contact isArabic={isArabic} />
      </main>

      {/* Elegant Footer */}
      <Footer isArabic={isArabic} />
    </div>
  );
}
