"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  FileText,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Globe,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

/* ── Custom social SVGs (lucide version safe) ─────────────── */
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.4 5 5c1 2.5 3 4 5 4-1-3.5 2-6.5 5-5 1.5.5 2.5 1.5 3 3 1-.2 2-.6 3-1.5-.5 1.5-1.5 2.5-2.5 3z" />
  </svg>
);
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

/* ── Countries ───────────────────────────────────────────── */
const countries = [
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
].sort((a, b) => a.name.localeCompare(b.name));

/* ── Time slots ─────────────────────────────────────────── */
const timeSlots = [
  "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM",
  "4:00 PM",
];

/* ── Next 10 working days (first 2 unavailable) ──────────── */
function getNextTenDays(locale: string) {
  const days: { label: string; full: string; disabled: boolean }[] = [];
  const today = new Date();
  let count = 0;
  let offset = 1;
  while (count < 10) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset++);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    days.push({
      label: d.toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric" }),
      full: d.toLocaleDateString(locale, { weekday: "long", month: "long", day: "numeric" }),
      disabled: count < 2,
    });
    count++;
  }
  return days;
}

/* ── Types ──────────────────────────────────────────────── */
interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════ */
export function ConsultationOnboardingModal({ isOpen, onClose }: ConsultationModalProps) {
  const totalSteps = 5;
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    website: "",
    clientName: "",
    email: "",
    countryCode: "+966",
    phone: "",
    date: "",
    time: "",
    formName: "Consultation Form",
  });

  const locale = useLocale();
  const t = useTranslations("Onboarding");
  const days = getNextTenDays(locale);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
  };

  const next = () => step < totalSteps && setStep(s => s + 1);
  const back = () => step > 1 && setStep(s => s - 1);

  const canNext = () => {
    if (step === 1) return formData.businessName.trim().length > 1 && formData.description.trim().length > 5;
    if (step === 2) return true; // social is optional
    if (step === 3) return !!(formData.clientName && formData.email && formData.phone);
    if (step === 4) return !!formData.date;
    return false;
  };

  const canSubmit = () => !!formData.time;

  const submit = async () => {
    setIsSubmitting(true);

    // ════════════════════════════════════════════════════════════
    // 🚀 N8N WEBHOOK INTEGRATION
    // ════════════════════════════════════════════════════════════
    // TARGET: Consultation Form
    // URL: https://n8n.srv1587679.hstgr.cloud/webhook-test/consultaion-form
    // ════════════════════════════════════════════════════════════
    try {
      await fetch("https://n8n.srv1587679.hstgr.cloud/webhook/consultation-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Form submission failed:", error);
    }
    // ----------------------------------------------

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setFormData({ businessName: "", description: "", instagram: "", twitter: "", tiktok: "", website: "", clientName: "", email: "", countryCode: "+966", phone: "", date: "", time: "", formName: "Consultation Form" });
    onClose();
  };

  if (!isOpen) return null;

  const progress = (step / totalSteps) * 100;
  const titles = t.raw("consultation.titles");
  const subs = t.raw("consultation.subs");

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
            className="h-full bg-[#7B2FFF]"
          />
        </div>

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors z-50 bg-white/80 backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-12 pt-12 md:pt-14">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                  className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 size={44} />
                </motion.div>
                <h2 className="text-3xl font-black text-neutral-900">{t("consultation.successTitle")}</h2>
                <p className="text-neutral-500 leading-relaxed px-4">
                  {t.rich("consultation.successMsg", {
                    date: formData.date,
                    time: formData.time,
                    email: formData.email,
                    span: (chunks: any) => <span className="text-[#7B2FFF] font-bold">{chunks}</span>,
                    b: (chunks: any) => <span className="font-bold text-neutral-900">{chunks}</span>,
                  })}
                </p>
                <button
                  onClick={handleClose}
                  className="w-full bg-[#7B2FFF] text-white py-4 rounded-2xl font-bold hover:bg-[#6824db] transition-all"
                >
                  {t("common.close")}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.28 }}
                className="space-y-6"
              >
                <div className="space-y-1 mb-2 text-start">
                  <span className="inline-block px-3 py-1 bg-violet-50 text-[#7B2FFF] rounded-full text-xs font-bold border border-violet-100">
                    {t("consultation.badge")}
                  </span>
                  <span className="block text-[#7B2FFF] font-bold text-sm tracking-widest uppercase pt-2">
                    {t("common.step", { step, total: totalSteps })}
                  </span>
                  <h2 className="text-3xl font-black text-neutral-900 tracking-tight pt-2">{titles[step]}</h2>
                  <p className="text-neutral-500 font-medium">{subs[step]}</p>
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                      <input
                        autoFocus
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handle}
                        placeholder={t("common.placeholders.businessName")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <FileText className="absolute left-4 top-4 text-violet-400 w-5 h-5" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handle}
                        rows={4}
                        placeholder={t("common.placeholders.description")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <InstagramIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
                      <input autoFocus type="text" name="instagram" value={formData.instagram} onChange={handle}
                        placeholder={t("common.placeholders.instagram")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <TwitterIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
                      <input type="text" name="twitter" value={formData.twitter} onChange={handle}
                        placeholder={t("common.placeholders.twitter")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <TikTokIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
                      <input type="text" name="tiktok" value={formData.tiktok} onChange={handle}
                        placeholder={t("common.placeholders.tiktok")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                      <input type="text" name="website" value={formData.website} onChange={handle}
                        placeholder={t("common.placeholders.website")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                      <input autoFocus type="text" name="clientName" value={formData.clientName} onChange={handle}
                        placeholder={t("common.placeholders.fullName")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                      <input type="email" name="email" value={formData.email} onChange={handle}
                        placeholder={t("common.placeholders.email")}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                      />
                    </div>
                    <div className="flex gap-3">
                      <select name="countryCode" value={formData.countryCode} onChange={handle}
                        className="w-[120px] shrink-0 bg-neutral-50 border border-neutral-200 rounded-xl py-4 px-3 text-neutral-900 font-semibold appearance-none outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF]"
                      >
                        {countries.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                        <input type="tel" name="phone" value={formData.phone} onChange={handle}
                          placeholder={t("common.placeholders.phone")}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                    {days.map(day => (
                      <button
                        key={day.full}
                        disabled={day.disabled}
                        onClick={() => !day.disabled && setFormData(p => ({ ...p, date: day.full }))}
                        className={cn(
                          "p-4 rounded-2xl border-2 text-left transition-all",
                          day.disabled
                            ? "bg-neutral-50 border-neutral-100 text-neutral-300 cursor-not-allowed opacity-50"
                            : formData.date === day.full
                              ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200"
                              : "bg-neutral-50 border-neutral-100 text-neutral-700 hover:border-violet-200"
                        )}
                      >
                        <Calendar className={cn("w-4 h-4 mb-1.5", day.disabled ? "text-neutral-300" : formData.date === day.full ? "text-violet-200" : "text-violet-400")} />
                        <span className="font-bold text-sm block leading-snug">{day.label}</span>
                        {day.disabled && <span className="text-[10px] font-medium opacity-60">{t("common.unavailable")}</span>}
                      </button>
                    ))}
                  </div>
                )}

                {step === 5 && (
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setFormData(p => ({ ...p, time }))}
                        className={cn(
                          "p-4 rounded-2xl border-2 text-left transition-all",
                          formData.time === time
                            ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200"
                            : "bg-neutral-50 border-neutral-100 text-neutral-700 hover:border-violet-200"
                        )}
                      >
                        <Clock className={cn("w-4 h-4 mb-1.5", formData.time === time ? "text-violet-200" : "text-violet-400")} />
                        <span className="font-bold text-sm block">{time}</span>
                        <span className="text-[11px] opacity-60">{t("common.thirtyMin")}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                  <Shield size={12} className="text-violet-400" />
                  <span>
                    {t("common.privacy")}{" "}
                    <Link href="/privacy" className="text-[#7B2FFF] hover:underline">
                      {t("common.privacyLink")}
                    </Link>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4">
                  {step > 1 ? (
                    <button onClick={back} className="flex items-center gap-2 text-neutral-400 font-bold hover:text-neutral-600 transition-colors">
                      {t("common.back")}
                    </button>
                  ) : <div />}

                  {step < totalSteps ? (
                    <button
                      onClick={next}
                      disabled={!canNext()}
                      className="bg-[#7B2FFF] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#6824db] transition-all disabled:opacity-40 disabled:grayscale"
                    >
                      {t("common.next")} <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={isSubmitting || !canSubmit()}
                      className="bg-neutral-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#7B2FFF] transition-all disabled:opacity-40"
                    >
                      {isSubmitting ? t("common.booking") : t("common.confirm")} <CheckCircle2 size={20} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
