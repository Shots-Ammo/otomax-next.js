"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Shield,
  Zap,
  Layout,
  MessageCircle,
  Database,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const countries = [
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
].sort((a, b) => a.name.localeCompare(b.name));

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export function OnboardingModal({ isOpen, onClose, planName }: OnboardingModalProps) {
  const t = useTranslations("Onboarding");
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    service: "AI Agent",
    plan: planName,
    name: "",
    email: "",
    countryCode: "+966",
    phone: "",
    website: "",
    message: "",
    formName: "AI Agent Setup Form"
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, plan: planName }));
  }, [planName]);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: onlyNums }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ════════════════════════════════════════════════════════════
    // 🚀 N8N WEBHOOK INTEGRATION
    // ════════════════════════════════════════════════════════════
    // TARGET: AI Agent Setup Form
    // URL: https://n8n.srv1587679.hstgr.cloud/webhook/ai-agent-form
    // ════════════════════════════════════════════════════════════
    try {
      await fetch("https://n8n.srv1587679.hstgr.cloud/webhook/ai-agent-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Form submission failed:", error);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  const titles = t.raw("agent.titles");
  const subs = t.raw("agent.subs");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 24 }}
        className="relative w-full max-w-xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[95dvh] flex flex-col"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-neutral-100 z-50">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-violet-600"
          />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors z-50 bg-white/80 backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-12 pt-12 md:pt-14">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2 text-start">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-violet-50 text-[#7B2FFF] rounded-full text-xs font-bold border border-violet-100">
                      {t("agent.badge")}
                    </span>
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">
                      {planName}
                    </span>
                  </div>
                  <p className="text-[#7B2FFF] font-bold text-sm tracking-widest uppercase">
                    {t("common.step", { step, total: totalSteps })}
                  </p>
                  <h2 className="text-3xl font-black text-neutral-900 tracking-tight pt-2">{titles[step]}</h2>
                  <p className="text-neutral-500 font-medium">{subs[step]}</p>
                </div>

                <div className="min-h-[140px] flex items-center">
                  {step === 1 && (
                    <div className="w-full relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                      <input
                        autoFocus
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("common.placeholders.fullName")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] outline-none transition-all"
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="w-full relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                      <input
                        autoFocus
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("common.placeholders.email")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] outline-none transition-all"
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="w-full flex gap-3">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-[120px] bg-neutral-50 border border-neutral-200 rounded-2xl py-4 px-3 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all appearance-none"
                      >
                        {countries.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                        <input
                          autoFocus
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t("common.placeholders.phone")}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="w-full space-y-4">
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder={t("common.placeholders.website") + " (" + t("common.optional") + ")"}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] outline-none transition-all"
                        />
                      </div>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-5 text-violet-400 w-6 h-6" />
                        <textarea
                          autoFocus
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder={t("common.placeholders.description")}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-14 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                  <Shield size={12} className="text-violet-400" />
                  <span>
                    {t("common.privacy")}{" "}
                    <Link href="/privacy" className="text-[#7B2FFF] hover:underline">
                      {t("common.privacyLink")}
                    </Link>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 border-neutral-100 text-neutral-400 font-bold hover:bg-neutral-50 transition-all"
                    >
                      {t("common.back")}
                    </button>
                  )}
                  <button
                    onClick={step === totalSteps ? handleSubmit : nextStep}
                    disabled={isSubmitting || (step === 1 && !formData.name) || (step === 2 && !formData.email) || (step === 3 && !formData.phone)}
                    className={cn(
                      "flex-[2] flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-black transition-all",
                      isSubmitting || (step === 1 && !formData.name) || (step === 2 && !formData.email)
                        ? "bg-neutral-100 text-neutral-400"
                        : "bg-[#7B2FFF] text-white hover:bg-[#6824db] shadow-lg shadow-violet-200"
                    )}
                  >
                    {step === totalSteps
                      ? (isSubmitting ? t("common.booking") : t("common.confirm"))
                      : t("common.next")}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-8"
              >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black text-neutral-900">{t("agent.successTitle")}</h2>
                <p className="text-neutral-500 text-lg max-w-sm mx-auto leading-relaxed">
                  {t.rich("agent.successMsg", {
                    email: formData.email,
                    b: (chunks) => <span className="font-bold text-neutral-900">{chunks}</span>,
                  })}
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-black hover:bg-[#7B2FFF] transition-all"
                >
                  {t("agent.cta")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
