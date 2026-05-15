"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  Building2,
  Zap,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
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

const timeSlots = [
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
];

interface AssessmentOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AssessmentOnboardingModal({ isOpen, onClose }: AssessmentOnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    service: "Process Assessment",
    date: "",
    time: "",
    email: "",
    countryCode: "+966",
    phone: "",
    businessInfo: "",
    formName: "Assessment Form"
  });

  const locale = useLocale();
  const t = useTranslations("Onboarding");

  const totalSteps = 5;
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

  const selectDate = (date: string) => {
    setFormData(prev => ({ ...prev, date }));
    setStep(2);
  };

  const selectTime = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
    setStep(3);
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
    // TARGET: Assessment Form
    // URL: https://n8n.srv1587679.hstgr.cloud/webhook-test/assessment-form
    // ════════════════════════════════════════════════════════════
    try {
      await fetch("https://n8n.srv1587679.hstgr.cloud/webhook-test/assessment-form", {
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

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
        dates.push({
          full: date.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
          short: date.toLocaleDateString(locale, { weekday: 'short' }),
          day: date.getDate(),
          month: date.toLocaleDateString(locale, { month: 'short' }),
          available: true
        });
      }
    }
    return dates;
  };

  const titles = t.raw("assessment.titles");
  const subs = t.raw("assessment.subs");

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
                      {t("assessment.badge")}
                    </span>
                  </div>
                  <p className="text-[#7B2FFF] font-bold text-sm tracking-widest uppercase">
                    {t("common.step", { step, total: totalSteps })}
                  </p>
                  <h2 className="text-3xl font-black text-neutral-900 tracking-tight pt-2">{titles[step]}</h2>
                  <p className="text-neutral-500 font-medium">{subs[step]}</p>
                </div>

                <div className="min-h-[200px] flex items-center">
                  {step === 1 && (
                    <div className="w-full grid grid-cols-2 gap-3">
                      {getAvailableDates().map((date, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectDate(date.full)}
                          className={cn(
                            "p-4 rounded-2xl border-2 transition-all text-left group",
                            formData.date === date.full
                              ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200"
                              : "bg-neutral-50 border-neutral-100 text-neutral-700 hover:border-violet-200"
                          )}
                        >
                          <CalendarIcon className={cn("w-5 h-5 mb-2", formData.date === date.full ? "text-violet-200" : "text-violet-400")} />
                          <span className="font-bold block">{date.short} {date.day} {date.month}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="w-full grid grid-cols-2 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => selectTime(time)}
                          className={cn(
                            "p-4 rounded-2xl border-2 transition-all text-left group",
                            formData.time === time
                              ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200"
                              : "bg-neutral-50 border-neutral-100 text-neutral-700 hover:border-violet-200"
                          )}
                        >
                          <Clock className={cn("w-5 h-5 mb-2", formData.time === time ? "text-violet-200" : "text-violet-400")} />
                          <span className="font-bold block">{time}</span>
                          <span className="text-xs opacity-60">30 min</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 3 && (
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

                  {step === 4 && (
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

                  {step === 5 && (
                    <div className="w-full relative">
                      <Building2 className="absolute left-4 top-5 text-violet-400 w-6 h-6" />
                      <textarea
                        name="businessInfo"
                        value={formData.businessInfo}
                        onChange={handleChange}
                        rows={5}
                        placeholder={t("common.placeholders.description")}
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
                  {step >= 3 && (
                    <button
                      onClick={step === totalSteps ? handleSubmit : nextStep}
                      disabled={isSubmitting || (step === 3 && !formData.email) || (step === 4 && !formData.phone)}
                      className={cn(
                        "flex-[2] bg-neutral-900 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#7B2FFF] transition-all disabled:opacity-50"
                      )}
                    >
                      {step === totalSteps
                        ? (isSubmitting ? t("common.booking") : t("common.confirm"))
                        : t("common.next")}
                    </button>
                  )}
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
                <h2 className="text-4xl font-black text-neutral-900">{t("assessment.successTitle")}</h2>
                <p className="text-neutral-500 text-lg max-w-sm mx-auto leading-relaxed">
                  {t.rich("assessment.successMsg", {
                    date: formData.date,
                    time: formData.time,
                    email: formData.email,
                    span: (chunks: any) => <span className="text-[#7B2FFF] font-bold">{chunks}</span>,
                    b: (chunks: any) => <span className="font-bold text-neutral-900">{chunks}</span>,
                  })}
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
