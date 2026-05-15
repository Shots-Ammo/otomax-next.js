"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CreditCard, AlertCircle, ChevronRight, Shield } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface CrmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CrmOnboardingModal({ isOpen, onClose }: CrmModalProps) {
  const t = useTranslations("Onboarding");
  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const totalSteps = 4;
  const currentStep = 1; // Always stays on step 1 — credentials always fail

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Always reject — show the error and shake the card
    setError(true);
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  const handleClose = () => {
    setEmail("");
    setClientId("");
    setError(false);
    setShaking(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={
          shaking
            ? { opacity: 1, scale: 1, y: 0, x: [0, -10, 10, -8, 8, -4, 4, 0] }
            : { opacity: 1, scale: 1, y: 0, x: 0 }
        }
        exit={{ opacity: 0, scale: 0.95, y: 24 }}
        transition={shaking ? { duration: 0.45, ease: "easeInOut" } : { duration: 0.25 }}
        className="relative w-full max-w-lg bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-neutral-100 z-10">
          <motion.div
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className="h-full bg-[#7B2FFF]"
          />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 transition-colors z-30"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12 pt-10">

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i === 0 ? "bg-[#7B2FFF]" : "bg-slate-100"
                  }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-violet-50 text-[#7B2FFF] rounded-full text-xs font-bold border border-violet-100 mb-3">
              CRM Onboarding · Step {currentStep} of {totalSteps}
            </span>
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight mb-1">
              Verify Your Account
            </h2>
            <p className="text-neutral-500 font-medium">
              Enter your registered email and Client ID to continue.
            </p>
          </div>

          {/* Error banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5 mb-5 overflow-hidden"
              >
                <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-red-600 text-sm font-semibold leading-snug">
                  Email or Client ID are incorrect. Please enter the correct credentials to continue.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
              <input
                autoFocus
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(false); }}
                placeholder="your@email.com"
                required
                className={`w-full bg-neutral-50 border rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none transition-all
                  ${error
                    ? "border-red-300 focus:ring-2 focus:ring-red-100 focus:border-red-400"
                    : "border-neutral-200 focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF]"
                  }`}
              />
            </div>

            {/* Client ID */}
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
              <input
                type="text"
                value={clientId}
                onChange={e => { setClientId(e.target.value); setError(false); }}
                placeholder="OX26xxxxxxx"
                required
                className={`w-full bg-neutral-50 border rounded-2xl py-4 pl-12 pr-4 text-neutral-900 font-semibold outline-none transition-all tracking-widest
                  ${error
                    ? "border-red-300 focus:ring-2 focus:ring-red-100 focus:border-red-400"
                    : "border-neutral-200 focus:ring-2 focus:ring-[#7B2FFF]/20 focus:border-[#7B2FFF]"
                  }`}
              />
            </div>


            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#7B2FFF] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#6824db] transition-all mt-2 shadow-md shadow-violet-100"
            >
              Verify & Continue
            </button>
          </form>

          {/* Privacy Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium justify-center">
              <Shield size={12} className="text-violet-400" />
              <span>
                {t("common.privacy")}{" "}
                <Link href="/privacy" className="text-[#7B2FFF] hover:underline">
                  {t("common.privacyLink")}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
