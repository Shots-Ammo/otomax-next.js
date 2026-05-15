"use client";

import React from "react";
import NavBar from "@/components/ui/navBar";

import { Footer7 } from "@/components/footer-7";
import { motion } from "framer-motion";
import { OnboardingModal } from "@/components/onboarding-modal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  FileText,
  Database,
  Clock,
  Calendar,
  Zap
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function AiAgentPage() {
  const t = useTranslations("AiAgent");
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const openOnboarding = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const leftIcons = [
    { id: "msg", icon: <MessageSquare className="w-8 h-8 text-black" />, label: t("hero.messaging"), pos: "top-[20%] left-[5%] md:top-[25%] md:left-[22%]" },
    { id: "file", icon: <FileText className="w-8 h-8 text-black" />, label: t("hero.sendingFiles"), pos: "top-[45%] left-[2%] md:top-[50%] md:left-[12%]" },
    { id: "db", icon: <Database className="w-8 h-8 text-black" />, label: t("hero.database"), pos: "top-[70%] left-[5%] md:top-[75%] md:left-[8%]" },
  ];

  const rightIcons = [
    { id: "clock", icon: <Clock className="w-8 h-8 text-black" />, label: t("hero.availability"), pos: "top-[20%] right-[5%] md:top-[25%] md:right-[22%]" },
    { id: "cal", icon: <Calendar className="w-8 h-8 text-black" />, label: t("hero.booking"), pos: "top-[45%] right-[2%] md:top-[50%] md:right-[12%]" },
    { id: "zap", icon: <Zap className="w-8 h-8 text-black" />, label: t("hero.automation"), pos: "top-[70%] right-[5%] md:top-[75%] md:right-[8%]" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black" style={{ fontFamily: "Cairo, sans-serif" }} onClick={() => setActiveIcon(null)}>
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center py-0">
        <div className="w-full flex flex-col items-center">
          {/*   <div className="relative w-full h-[80vh] md:h-[calc(100dvh-70px)] bg-white border-b border-neutral-100 shadow-sm mb-12 flex items-center justify-center">
           
           Left Icons
            <div className="block">
              {leftIcons.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.2, duration: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIcon(activeIcon === item.id ? null : item.id);
                  }}
                  className={cn("absolute z-10 flex items-center gap-2 md:gap-4 group cursor-pointer", item.pos)}
                >
                  <div className={cn(
                    "w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white shadow-xl flex items-center justify-center border border-neutral-100 transition-all duration-300",
                    activeIcon === item.id ? "scale-110 border-violet-500 ring-4 ring-violet-500/10" : "group-hover:scale-110"
                  )}>
                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 md:w-8 md:h-8 text-black" })}
                  </div>
                  <div className={cn(
                    "px-3 py-1.5 md:px-4 md:py-2 bg-black text-white rounded-xl md:rounded-2xl shadow-xl transition-all transform whitespace-nowrap text-[10px] md:text-sm font-bold",
                    activeIcon === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-10px] lg:group-hover:opacity-100 lg:group-hover:translate-x-0"
                  )}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Icons 
            <div className="block">
              {rightIcons.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.2, duration: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIcon(activeIcon === item.id ? null : item.id);
                  }}
                  className={cn("absolute z-10 flex items-center gap-2 md:gap-4 flex-row-reverse group cursor-pointer", item.pos)}
                >
                  <div className={cn(
                    "w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white shadow-xl flex items-center justify-center border border-neutral-100 transition-all duration-300",
                    activeIcon === item.id ? "scale-110 border-violet-500 ring-4 ring-violet-500/10" : "group-hover:scale-110"
                  )}>
                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 md:w-8 md:h-8 text-black" })}
                  </div>
                  <div className={cn(
                    "px-3 py-1.5 md:px-4 md:py-2 bg-black text-white rounded-xl md:rounded-2xl shadow-xl transition-all transform whitespace-nowrap text-[10px] md:text-sm font-bold",
                    activeIcon === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[10px] lg:group-hover:opacity-100 lg:group-hover:translate-x-0"
                  )}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div> 

          </div>*/}


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{
                boxShadow: ["0 0 0px rgba(123, 47, 255, 0)", "0 0 40px rgba(123, 47, 255, 0.6)", "0 0 0px rgba(123, 47, 255, 0)"],
                scale: [1, 1.05, 1]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full cursor-default group relative overflow-hidden shadow-2xl shadow-violet-500/20"
            >
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
              <h1 className="text-xl md:text-4xl font-black text-center tracking-tighter text-white whitespace-nowrap relative z-10 drop-shadow-sm">
                {t("hero.title")}
              </h1>
            </motion.div>
          </motion.div>

          {/* Pricing Section */}
          <div className="w-full max-w-6xl px-4 py-20 bg-white rounded-[4rem] border border-neutral-100">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 mb-4">{t("pricing.title")}</h2>
              <p className="text-neutral-500 font-medium">{t("pricing.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Package 1: WhatsApp Core */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-xl shadow-violet-100/20 flex flex-col hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-violet-600 mb-2">{t("pricing.plans.whatsapp.name")}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-neutral-900">750</span>
                    <span className="text-neutral-500 font-bold uppercase text-sm">{t("pricing.currency")}</span>
                  </div>
                  <div className="mt-4 inline-block bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full">
                    {t("pricing.freeTrial")}
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {t.raw("pricing.plans.whatsapp.features").map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-neutral-600">
                      <Zap className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openOnboarding(t("pricing.plans.whatsapp.name"))}
                  className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-violet-600 transition-colors"
                >
                  {t("pricing.startFreeTrial")}
                </button>
              </motion.div>

              {/* Package 2: WhatsApp + Website */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 border-2 border-violet-500 shadow-2xl shadow-violet-200/40 flex flex-col relative scale-105 z-20"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs font-black px-4 py-1.5 rounded-full tracking-widest">
                  {t("pricing.mostPopular")}
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-violet-600 mb-2">{t("pricing.plans.whatsappWebsite.name")}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-neutral-900">1000</span>
                    <span className="text-neutral-500 font-bold uppercase text-sm">{t("pricing.currency")}</span>
                  </div>
                  <div className="mt-4 inline-block bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full">
                    {t("pricing.freeTrial")}
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {t.raw("pricing.plans.whatsappWebsite.features").map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-neutral-600">
                      <Zap className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openOnboarding(t("pricing.plans.whatsappWebsite.name"))}
                  className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
                >
                  {t("pricing.startFreeTrial")}
                </button>
              </motion.div>

              {/* Package 3: Full Suite */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-xl shadow-violet-100/20 flex flex-col hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-violet-600 mb-2">{t("pricing.plans.fullSuite.name")}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-neutral-900">1500</span>
                    <span className="text-neutral-500 font-bold uppercase text-sm">{t("pricing.currency")}</span>
                  </div>
                  <div className="mt-4 inline-block bg-neutral-100 text-neutral-500 text-xs font-bold px-3 py-1 rounded-full">
                    {t("pricing.enterprise")}
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {t.raw("pricing.plans.fullSuite.features").map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-neutral-600">
                      <Zap className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openOnboarding(t("pricing.plans.fullSuite.name"))}
                  className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-violet-600 transition-colors"
                >
                  {t("pricing.contactSales")}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer7 />
      <OnboardingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planName={selectedPlan}
      />
    </div>
  );
}
