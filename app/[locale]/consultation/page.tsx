"use client";

import React, { useRef, useState } from "react";
import NavBar from "@/components/ui/navBar";
import { Footer7 } from "@/components/footer-7";
import Noura from "@/components/Noura";
import { ConsultationOnboardingModal } from "@/components/consultation-onboarding-modal";
import { motion, useInView } from "framer-motion";
import RadarOrbitalTimeline, { type TimelineItem } from "@/components/RadarOrbitalTimeline";
import {
  Map,
  Cpu,
  Rocket,
  Bot,
  Database,
  Globe,
  ChevronRight,
  CheckCircle2,
  Clock,
  Zap,
  Users,
  TrendingUp,
  MessageSquare,
  Lock,
  LineChart,
  Settings,
  Bell,
  Star,
} from "lucide-react";

/* ── Helpers ──────────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = { animate: { transition: { staggerChildren: 0.13 } } };

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Data ─────────────────────────────────────────────────── */
const whatIfs = [
  {
    question: "What if your leads were contacted within 30 seconds of signing up?",
    answer: "We build AI agents that respond to every new lead instantly — qualifying them, answering questions, and booking appointments before you even open your laptop.",
  },
  {
    question: "What if your team never had to chase a follow-up again?",
    answer: "Automated workflows handle your entire follow-up sequence — timed, personalised, and triggered by behaviour. Your team closes deals, not spreadsheets.",
  },
  {
    question: "What if your tools actually talked to each other?",
    answer: "We map your current stack, identify the gaps, and build the integrations that make your CRM, website, and communication tools work as one unified system.",
  },
  {
    question: "What if your growth didn't depend on hiring more people?",
    answer: "We architect systems that scale with demand — not headcount. AI agents, automated pipelines, and intelligent dashboards that do the heavy lifting for you.",
  },
];

const process = [
  {
    icon: <Map size={28} />,
    step: "01",
    label: "The Blueprint",
    sub: "Consultation",
    description:
      "We sit down with your ideas, map your current workflows, identify bottlenecks, and produce a clear technical roadmap — no jargon, no guesswork.",
    outcomes: ["Pain-point audit", "Technical roadmap", "Priority action plan"],
  },
  {
    icon: <Cpu size={28} />,
    step: "02",
    label: "The Architecture",
    sub: "Development",
    description:
      "Our team builds your custom AI agents, automated workflows, and high-conversion interfaces — every component tailored to your exact specification.",
    outcomes: ["Custom AI agents", "Automated workflows", "Bespoke interfaces"],
  },
  {
    icon: <Rocket size={28} />,
    step: "03",
    label: "The Reality",
    sub: "Deployment",
    description:
      "We launch your system, integrate it with your existing tools, run quality assurance, and ensure everything runs autonomously from day one.",
    outcomes: ["Full system launch", "Tool integration", "Autonomous operation"],
  },
];

const pillars = [
  {
    icon: <Bot size={26} />,
    title: "Intelligent Communication",
    tagline: "What if your business never went offline?",
    description:
      "AI Chat Agents that handle lead qualification, customer support, and appointment setting 24/7 — in Arabic and English, across every channel.",
  },
  {
    icon: <Database size={26} />,
    title: "Operational Backbone",
    tagline: "What if your CRM actually fit your business?",
    description:
      "Custom CRMs and internal tools designed around your team's real workflows — without the bloat of one-size-fits-all software.",
  },
  {
    icon: <Globe size={26} />,
    title: "Digital Storefront",
    tagline: "What if your website worked as hard as your best salesperson?",
    description:
      "High-performance websites built for speed, lead capture, and seamless integration with your automation backend.",
  },
];

const trustPoints = [
  "No templates — every engagement is built from scratch",
  "We learn your business before writing a single line of code",
  "Bilingual support in Arabic and English",
  "Ongoing post-launch support included",
];

/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
import { useTranslations } from "next-intl";

export default function ConsultationPage() {
  const t = useTranslations("Consultation");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const whatIfs = [
    {
      question: t("whatIf.questions.0.q"),
      answer: t("whatIf.questions.0.a"),
    },
    {
      question: t("whatIf.questions.1.q"),
      answer: t("whatIf.questions.1.a"),
    },
    {
      question: t("whatIf.questions.2.q"),
      answer: t("whatIf.questions.2.a"),
    },
    {
      question: t("whatIf.questions.3.q"),
      answer: t("whatIf.questions.3.a"),
    },
  ];

  const processData = [
    {
      icon: <Map size={28} />,
      step: "01",
      label: t("process.steps.0.label"),
      sub: t("process.steps.0.sub"),
      description: t("process.steps.0.desc"),
      outcomes: t.raw("process.steps.0.outcomes"),
    },
    {
      icon: <Cpu size={28} />,
      step: "02",
      label: t("process.steps.1.label"),
      sub: t("process.steps.1.sub"),
      description: t("process.steps.1.desc"),
      outcomes: t.raw("process.steps.1.outcomes"),
    },
    {
      icon: <Rocket size={28} />,
      step: "03",
      label: t("process.steps.2.label"),
      sub: t("process.steps.2.sub"),
      description: t("process.steps.2.desc"),
      outcomes: t.raw("process.steps.2.outcomes"),
    },
  ];

  const pillars = [
    {
      icon: <Bot size={26} />,
      title: t("pillars.items.0.title"),
      tagline: t("pillars.items.0.tagline"),
      description: t("pillars.items.0.desc"),
    },
    {
      icon: <Database size={26} />,
      title: t("pillars.items.1.title"),
      tagline: t("pillars.items.1.tagline"),
      description: t("pillars.items.1.desc"),
    },
    {
      icon: <Globe size={26} />,
      title: t("pillars.items.2.title"),
      tagline: t("pillars.items.2.tagline"),
      description: t("pillars.items.2.desc"),
    },
  ];

  const trustPoints = t.raw("whyOtomax.points");

  const statIcons = [<Clock size={22} />, <Users size={22} />, <Zap size={22} />, <TrendingUp size={22} />];
  const stats = t.raw("stats").map((item: any, i: number) => ({
    ...item,
    icon: statIcons[i],
  }));

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: "Platform Launch",
      date: "Jan 2024",
      content: "Initial release of the core platform with essential SaaS features and onboarding flow.",
      category: "Milestone",
      icon: Rocket,
      relatedIds: [2, 3],
      status: "completed",
      energy: 100,
    },
    {
      id: 2,
      title: "Auth & Security",
      date: "Feb 2024",
      content: "Rolled out multi-factor authentication, SSO support, and role-based access control.",
      category: "Security",
      icon: Lock,
      relatedIds: [1, 4],
      status: "completed",
      energy: 90,
    },
    {
      id: 3,
      title: "Database Scaling",
      date: "Mar 2024",
      content: "Migrated to distributed database architecture to support 10x user growth.",
      category: "Infrastructure",
      icon: Database,
      relatedIds: [1, 5],
      status: "completed",
      energy: 85,
    },
    {
      id: 4,
      title: "Analytics Dashboard",
      date: "Apr 2024",
      content: "Launched real-time analytics with custom reporting and data export capabilities.",
      category: "Product",
      icon: LineChart,
      relatedIds: [2, 6],
      status: "completed",
      energy: 78,
    },
    {
      id: 5,
      title: "Team Collaboration",
      date: "May 2024",
      content: "Introduced workspaces, shared dashboards, and team permission management.",
      category: "Product",
      icon: Users,
      relatedIds: [3, 7],
      status: "in-progress",
      energy: 65,
    },
    {
      id: 6,
      title: "API & Integrations",
      date: "Jun 2024",
      content: "Public REST API launched with 50+ third-party integrations via webhooks.",
      category: "Platform",
      icon: Settings,
      relatedIds: [4, 8],
      status: "in-progress",
      energy: 55,
    },
    {
      id: 7,
      title: "Smart Notifications",
      date: "Jul 2024",
      content: "AI-powered alerts and notification rules based on user behavior and thresholds.",
      category: "AI",
      icon: Bell,
      relatedIds: [5, 8],
      status: "pending",
      energy: 40,
    },
    {
      id: 8,
      title: "Enterprise Tier",
      date: "Aug 2024",
      content: "Dedicated infrastructure, SLA guarantees, and white-labeling for enterprise clients.",
      category: "Business",
      icon: Star,
      relatedIds: [6, 7],
      status: "pending",
      energy: 30,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-hidden">
      <NavBar />

      {/* ─── Hero with Radar ─────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-white">

        {/* Radar Background scaled down */}
        <div className="absolute inset-0 z-10 flex items-center justify-center scale-75 md:scale-90 transition-transform duration-700">
          <RadarOrbitalTimeline timelineData={timelineData} />
        </div>

        {/* Content Bubble for Hero Text */}
        {/* Content Bubble for Hero Text */}
        <div className="container mx-auto max-w-5xl text-center relative z-20 px-6 flex flex-col items-center">
          {/* Title with Glass */}
          <div className="p-6 md:p-8 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/30 shadow-2xl shadow-violet-500/5 w-fit mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter"
            >
              {t("hero.title1")}
              <br className="hidden md:block" />
              <span className="text-[#7B2FFF]">{t("hero.title2")}</span>
            </motion.h1>
          </div>

          {/* Standalone Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#7B2FFF] text-white rounded-full font-bold shadow-xl shadow-violet-500/20 hover:scale-105 transition-transform text-lg"
            >
              {t("hero.button")}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── What If? ───────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <Section className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("whatIf.title1")} <span className="text-[#7B2FFF]">{t("whatIf.title2")}</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t("whatIf.subtitle")}
            </p>
          </Section>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {whatIfs.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 group"
              >
                <p className="text-[#7B2FFF] font-black text-lg mb-3 leading-snug group-hover:text-slate-900 transition-colors duration-300 text-start">
                  {item.question}
                </p>
                <p className="text-slate-500 leading-relaxed text-sm text-start">{item.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Ideation to Actuality Process ──────────────────── */}
      <section id="process" className="py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <Section className="text-center mb-20">
            <p className="text-sm font-bold text-[#7B2FFF] uppercase tracking-widest mb-3">{t("process.tagline")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t("process.title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t("process.subtitle")}
            </p>
          </Section>

          <div className="space-y-8">
            {processData.map((phase, i) => (
              <Section key={i}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="grid md:grid-cols-[auto_1fr] gap-8 bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100"
                >
                  {/* Step Number + Icon */}
                  <div className="flex flex-col items-center md:items-start gap-3 min-w-[80px]">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#7B2FFF] text-[#7B2FFF] flex items-center justify-center shadow-sm">
                      {phase.icon}
                    </div>
                    <span className="text-xs font-black text-slate-300 tracking-widest">{phase.step}</span>
                  </div>

                  {/* Content */}
                  <div className="text-start">
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <h3 className="text-2xl font-black text-slate-900">{phase.label}</h3>
                      <span className="text-sm font-bold text-[#7B2FFF] uppercase tracking-widest">· {phase.sub}</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed mb-5">{phase.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {phase.outcomes.map((o: string) => (
                        <span key={o} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-full text-slate-600 text-xs font-semibold shadow-sm">
                          <CheckCircle2 size={13} className="text-[#7B2FFF]" /> {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Otomax ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <Section className="text-start">
              <p className="text-sm font-bold text-[#7B2FFF] uppercase tracking-widest mb-4">{t("whyOtomax.tagline")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                {t("whyOtomax.title1")}
                <br />{t("whyOtomax.title2")}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                {t("whyOtomax.desc1")}
              </p>
              <p className="text-slate-500 leading-relaxed">
                {t("whyOtomax.desc2")}
              </p>
            </Section>

            <Section>
              <div className="space-y-4">
                {trustPoints.map((point: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={16} className="text-[#7B2FFF]" />
                    </div>
                    <p className="text-slate-700 font-medium text-start">{point}</p>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ─── Social proof stat strip ────────────────────────── */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto max-w-5xl px-4">
          <Section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-11 h-11 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[#7B2FFF] shadow-sm mb-1">
                    {item.icon}
                  </div>
                  <p className="text-3xl font-black text-slate-900">{item.stat}</p>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide leading-snug">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Section>
            <div className="bg-[#1a0b2e] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              {/* Orb decorations */}
              <div className="absolute top-0 left-0 w-56 h-56 bg-violet-800/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-violet-700/15 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <p className="text-violet-300 text-sm font-bold uppercase tracking-widest mb-4">
                  <MessageSquare size={14} className="inline mr-1" /> {t("cta.tagline")}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {t("cta.title1")}
                  <br />
                  <span className="text-violet-300">{t("cta.title2")}</span>
                </h2>
                <p className="text-violet-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  {t("cta.desc")}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#1a0b2e] rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform"
                >
                  {t("cta.button")}
                </button>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <Footer7 />
      <Noura />
      <ConsultationOnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
