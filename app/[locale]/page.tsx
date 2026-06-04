"use client";

import NavBar from "@/components/ui/navBar";
import { FloatingIconsHero } from "@/components/floating-icons-hero-section";
import LegacySection from "@/components/LegacySection";
import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction";
import { PropertyCard } from "@/components/card-3";
import Contact from "@/components/contact";
import HoverBrandLogo from "@/components/hover-brand-logo";
import { Footer7 } from "@/components/footer-7";
import { LanguageToggle } from "@/components/LanguageToggle";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import {
  Cpu, Globe, Layers, Zap, Shield, BarChart3, Cloud, Code2,
  Rocket, Database, Lock, LineChart, Users, Settings, Bell, Star,
} from "lucide-react";

import Noura from "@/components/Noura";
import { useTranslations } from "next-intl";

export default function Page() {
  const clientsRef = useRef(null);
  const isClientsInView = useInView(clientsRef, { once: true, margin: "-100px" });
  const t = useTranslations("Home");

  const servicesItems = [
    {
      title: t("services.websites.title"),
      description: t("services.websites.description"),
      ctaText: t("services.websites.ctaText"),
      ctaLink: "/websites",
      backgroundImage: "/ui/services_websites.png",
    },
    {
      title: t("services.consultation.title"),
      description: t("services.consultation.description"),
      ctaText: t("services.consultation.ctaText"),
      ctaLink: "/consultation",
      backgroundImage: "/ui/services_consultation.png",
    },

    {
      title: t("services.aiAgent.title"),
      description: t("services.aiAgent.description"),
      ctaText: t("services.aiAgent.ctaText"),
      ctaLink: "#agent",
      backgroundImage: "/ui/services_ai_agent.png",
    },
  
  ];

  return (
    <main className="min-h-screen relative">
      {/* Navigation */}
      <section>
        <NavBar />
      </section>

      {/* Hero */}
      <section className="relative">
        <FloatingIconsHero
          titles={t.raw("hero.titles")}
          subtitle={t("hero.subtitle")}
          ctaText={t("hero.ctaText")}
          ctaHref="#services"
          icons={[
            { id: 1, icon: Cpu, className: "top-[10%] left-[25%]" },
            { id: 2, icon: Globe, className: "top-[12%] right-[20%]" },
            { id: 3, icon: Layers, className: "top-[25%] left-[4%]" },
            { id: 4, icon: Zap, className: "top-[22%] right-[4%]" },
            { id: 5, icon: Shield, className: "bottom-[22%] left-[10%]" },
            { id: 6, icon: BarChart3, className: "bottom-[28%] right-[10%]" },
            { id: 7, icon: Cloud, className: "top-[55%] left-[12%]" },
            { id: 8, icon: Code2, className: "top-[72%] right-[32%]" },
          ]}
        />
      </section>

      {/* AI agent showcase */}
      <LegacySection />

      {/* Our Services */}
      <section>
        <StackedCardsInteraction cards={servicesItems} />
      </section>


      {/* Contact form  */}
      <section className="scale-90 origin-top -mt-10">
        <Contact />
      </section>


      {/* Footer */}
      <Footer7 />

      {/* Floating Chat Agent */}
      <Noura />
    </main >
  );
}
