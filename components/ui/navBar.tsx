"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("aiAgent"), href: "/#agent" },
    { name: t("services"), href: "/#services" },
    { name: t("partnerships"), href: "/partnerships" },
    { name: t("contactUs"), href: "/#contact" },
  ];

  return (
    <div className="bg-white text-black" style={{ fontFamily: "Cairo, sans-serif" }}>
      <header className="sticky top-0 z-[9999] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="container mx-auto flex items-center justify-between p-4 px-6">
          {/* Logo & Mobile Toggle Group */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-900 z-[10001]"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity z-[10001]">
              <div className="w-8 h-8 md:w-10 md:h-10">
                <img src="/otomax_logo.png" alt="Otomax Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter">OTOMAX</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex gap-4 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-base font-bold px-4 py-2 rounded-lg border-2 border-transparent hover:border-violet-500 hover:text-violet-600 transition-all duration-300 ease-in-out"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions: Language + CTA */}
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageToggle />
            <Link
              href="/consultation"
              className="hidden md:flex bg-violet-600 text-white px-6 py-2.5 rounded-full font-bold text-base hover:bg-violet-500 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-violet-200"
            >
              {t("bookConsultation")}
            </Link>
          </div>
        </nav>

      </header>
      
      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10002] lg:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed top-0 h-screen w-[85%] max-w-[320px] bg-white z-[10003] shadow-2xl p-8 pt-10 flex flex-col gap-8 lg:hidden overflow-y-auto",
                isRTL ? "right-0" : "left-0"
              )}
            >
              <div className={cn("flex items-center justify-between mb-2", isRTL ? "flex-row" : "flex-row-reverse")}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-gray-50 text-gray-900"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
                <span className="text-xl font-black tracking-tighter">OTOMAX</span>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-4 hover:text-violet-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto flex flex-col gap-4">
                <Link
                  href="/consultation"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-violet-600 text-white py-5 rounded-2xl font-black text-center shadow-xl shadow-violet-100 hover:bg-violet-500 transition-colors"
                >
                  {t("bookConsultation")}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
