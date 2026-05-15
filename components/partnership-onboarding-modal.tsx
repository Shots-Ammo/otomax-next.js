"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Building2,
  Briefcase,
  Shield,
  User,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// Custom Icons to avoid lucide-react version issues
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 5 9.2 5 9.2s1.5.8 3 0C5.2 6.5 8 2.5 8 2.5s1.4 1 3 2.5c-1-3.3 3-5.5 5.5-3.5 1.4-.2 2.8-.7 4-1.5-.5 1.5-1.5 2.5-2.5 3z" />
  </svg>
);

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

interface PartnershipOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnershipOnboardingModal({ isOpen, onClose }: PartnershipOnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    partnershipType: "general",
    name: "",
    instagram: "",
    tiktok: "",
    twitter: "",
    email: "",
    countryCode: "+966",
    phone: "",
    proposal: "",
    formName: "Partnership Form"
  });

  const t = useTranslations("Onboarding");

  const totalSteps = 3;
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
    // TARGET: Partnership Form
    // URL: https://n8n.srv1587679.hstgr.cloud/webhook/partnership-form
    // ════════════════════════════════════════════════════════════
    try {
      await fetch("https://n8n.srv1587679.hstgr.cloud/webhook/partnership-form", {
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

  const titles = t.raw("partnership.titles");
  const subs = t.raw("partnership.subs");

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
                      {t("partnership.badge")}
                    </span>
                  </div>
                  <p className="text-[#7B2FFF] font-bold text-sm tracking-widest uppercase">
                    {t("common.step", { step, total: totalSteps })}
                  </p>
                  <h2 className="text-3xl font-black text-neutral-900 tracking-tight pt-2">{titles[step]}</h2>
                  <p className="text-neutral-500 font-medium">{subs[step]}</p>
                </div>

                <div className="min-h-[220px] flex items-center">
                  {step === 1 && (
                    <div className="w-full space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                        <input
                          autoFocus
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t("partnership.placeholders.name")}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] outline-none transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="relative">
                          <InstagramIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                          <input
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="Instagram"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] outline-none transition-all text-xs"
                          />
                        </div>
                        <div className="relative">
                          <TikTokIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                          <input
                            type="text"
                            name="tiktok"
                            value={formData.tiktok}
                            onChange={handleChange}
                            placeholder="TikTok"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] outline-none transition-all text-xs"
                          />
                        </div>
                        <div className="relative">
                          <TwitterIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                          <input
                            type="text"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            placeholder="Twitter"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] outline-none transition-all text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="w-full space-y-4">
                      <div className="relative">
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
                      <div className="flex gap-3">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="w-[100px] bg-neutral-50 border border-neutral-200 rounded-2xl py-4 px-3 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all appearance-none text-xs"
                        >
                          {countries.map(c => (
                            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                          ))}
                        </select>
                        <div className="relative flex-1">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t("common.placeholders.phone")}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="w-full relative">
                      <MessageSquare className="absolute left-4 top-5 text-violet-400 w-6 h-6" />
                      <textarea
                        autoFocus
                        name="proposal"
                        value={formData.proposal}
                        onChange={handleChange}
                        rows={5}
                        placeholder={t("partnership.placeholders.benefit")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-14 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all resize-none"
                      />
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
                    disabled={
                      isSubmitting ||
                      (step === 1 && !formData.name) ||
                      (step === 2 && (!formData.email || !formData.phone)) ||
                      (step === 3 && formData.proposal.length < 5)
                    }
                    className={cn(
                      "flex-[2] flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-black transition-all",
                      isSubmitting ||
                        (step === 1 && !formData.name) ||
                        (step === 2 && (!formData.email || !formData.phone)) ||
                        (step === 3 && formData.proposal.length < 5)
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
                <h2 className="text-4xl font-black text-neutral-900">{t("partnership.successTitle")}</h2>
                <p className="text-neutral-500 text-lg max-w-sm mx-auto leading-relaxed">
                  {t("partnership.successMsg")}
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-black hover:bg-[#7B2FFF] transition-all"
                >
                  {t("common.close")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
