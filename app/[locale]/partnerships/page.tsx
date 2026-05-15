"use client";

import React, { useState } from "react";
import NavBar from "@/components/ui/navBar";
import { Footer7 } from "@/components/footer-7";
import Noura from "@/components/Noura";
import { PartnershipOnboardingModal } from "@/components/partnership-onboarding-modal";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CheckCircle2, ArrowRight, Rocket, ShieldCheck, Gift } from "lucide-react";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.2 }
    }
};

import { useTranslations } from "next-intl";

export default function PartnershipsPage() {
    const t = useTranslations("Partnerships");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const howItWorksSteps = t.raw("howItWorks.steps");
    const stepIcons = [ShieldCheck, Rocket, Gift];

    return (
        <main className="min-h-screen flex flex-col bg-white overflow-hidden">
            {/* Navigation */}
            <NavBar />

            {/* Hero Section */}
            <section className="relative pt-24 md:pt-36 pb-20 md:pb-24 px-6">
                <div className="container mx-auto max-w-5xl text-center relative z-10">

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter"
                    >
                        {t("hero.title1")} <br className="hidden md:block" />
                        <span className="text-violet">
                            {t("hero.title2")}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                    >
                        {t("hero.desc")}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="w-full sm:w-auto px-10 py-5 bg-[#7B2FFF] text-white rounded-full font-black shadow-xl shadow-violet-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {t("hero.button")}
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Commission Models */}
            <section id="models" className="py-24 bg-slate-50 relative">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("models.title")}</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">{t("models.subtitle")}</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {/* Per Client Commission */}
                        <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative group overflow-hidden text-start">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                            <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center text-slate-50 mb-6 relative z-10">
                                <DollarSign size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t("models.perClient.title")}</h3>
                            <p className="text-slate-600">
                                {t("models.perClient.desc")}
                            </p>
                        </motion.div>

                        {/* Monthly Recurring Income */}
                        <motion.div variants={fadeIn} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative group overflow-hidden text-start">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                            <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center text-slate-50 mb-6 relative z-10">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t("models.recurring.title")}</h3>
                            <p className="text-slate-600">
                                {t("models.recurring.desc")}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("howItWorks.title")}</h2>
                        <p className="text-slate-500">{t("howItWorks.subtitle")}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connection line (desktop) */}
                        <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-[2px] bg-slate-100 -z-10" />

                        {howItWorksSteps.map((step: any, i: number) => {
                            const Icon = stepIcons[i];
                            return (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ delay: i * 0.2 }} 
                                    className="text-center group"
                                >
                                    <div className="w-16 h-16 bg-white border-2 border-[#7B2FFF] text-[#7B2FFF] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-[#7B2FFF] group-hover:text-white transition-all">
                                        {step.num}
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                                    <p className="text-slate-500 px-4">
                                        {step.desc}
                                    </p>
                                    <Icon className="mx-auto mt-6 text-slate-200" size={32} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Call‑to‑Action */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2d1259] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t("cta.title")}</h2>
                            <p className="text-violet-200 text-lg mb-10 max-w-2xl mx-auto">
                                {t("cta.desc")}
                            </p>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="px-10 py-5 bg-white text-[#1a0b2e] rounded-full font-black text-lg shadow-xl hover:scale-105 transition-transform"
                            >
                                {t("cta.button")}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer7 />

            {/* Floating Chat Agent */}
            <Noura />

            {/* Onboarding Modal */}
            <PartnershipOnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
