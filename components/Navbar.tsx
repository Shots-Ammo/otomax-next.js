"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavbarProps {
  isArabic: boolean;
  setIsArabic: (val: boolean) => void;
}

export default function Navbar({ isArabic, setIsArabic }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: isArabic ? "الرئيسية" : "Home", href: "#home" },
    { name: isArabic ? "من نحن" : "About Us", href: "#about" },
    { name: isArabic ? "خدماتنا" : "Our Services", href: "#services" },
    { name: isArabic ? "مشاريعنا" : "Our Projects", href: "#projects" },
    { name: isArabic ? "اتصل بنا" : "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
          isScrolled
            ? "bg-cream/95 backdrop-blur-md py-4 shadow-md border-accent/10"
            : "bg-cream/80 py-6 border-transparent"
        )}
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
              <Image
                src="/gulf_logo.png"
                alt="Gulf Evento Logo"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div className={`flex flex-col ${isArabic ? "text-right" : "text-left"}`}>
              <span className="font-heading font-semibold text-base sm:text-lg tracking-wider leading-none text-primary">
                GULF EVENTO
              </span>
              <span className="text-[8px] sm:text-[9px] font-heading tracking-widest text-accent font-medium mt-0.5 uppercase">
                Contracting Company
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "font-heading text-sm font-semibold tracking-wide relative py-1 transition-colors duration-300 group hover:text-primary",
                  "text-charcoal"
                )}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent scale-x-0 origin-right transition-transform duration-300 hover:origin-left hover:scale-x-100 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Action Tools */}
          <div className="hidden md:flex items-center gap-8">
            {/* Language pill toggle */}
            <button
              onClick={() => setIsArabic(!isArabic)}
              aria-label="Toggle Language"
              className="relative flex items-center h-8 rounded-full bg-[#26336D]/8 border border-[#26336D]/15 p-0.5 cursor-pointer select-none shadow-inner"
              style={{ width: "120px", direction: "ltr" }}
            >
              {/* Sliding pill indicator */}
              <motion.span
                animate={{ x: isArabic ? 60 : 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute top-0.5 bottom-0.5 left-0.5 w-[56px] rounded-full bg-[#C9A84C] shadow-md z-10"
              />
              {/* English half */}
              <span
                className="relative z-20 flex-1 text-center text-[10px] font-heading font-bold tracking-wider uppercase transition-colors duration-300"
                style={{ color: isArabic ? "var(--color-charcoal)" : "#FBFBFA" }}
              >
                English
              </span>
              {/* Arabic half */}
              <span
                className="relative z-20 flex-1 text-center text-[10px] font-heading font-bold tracking-wider transition-colors duration-300"
                style={{ color: isArabic ? "#FBFBFA" : "var(--color-charcoal)" }}
              >
                عربي
              </span>
            </button>

            {/* Call button */}
            <a
              href="tel:0136647813"
              className="flex items-center gap-2 border bg-[#C9A84C] border-[#C9A84C] text-[#FBFBFA] text-xs tracking-wider uppercase font-semibold px-4 py-2 transition-all duration-300 hover:bg-transparent hover:text-[#26336D] hover:border-[#26336D]"
            >
              <Phone size={13} />
              {isArabic ? "اتصل" : "Call Now"}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile language pill toggle */}
            <button
              onClick={() => setIsArabic(!isArabic)}
              aria-label="Toggle Language"
              className="relative flex items-center h-7 rounded-full bg-[#26336D]/8 border border-[#26336D]/15 p-0.5 cursor-pointer select-none shadow-inner"
              style={{ width: "104px", direction: "ltr" }}
            >
              <motion.span
                animate={{ x: isArabic ? 52 : 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute top-0.5 bottom-0.5 left-0.5 w-[48px] rounded-full bg-[#C9A84C] shadow-md z-10"
              />
              <span
                className="relative z-20 flex-1 text-center text-[9px] font-heading font-bold tracking-wider uppercase transition-colors duration-300"
                style={{ color: isArabic ? "var(--color-charcoal)" : "#FBFBFA" }}
              >
                English
              </span>
              <span
                className="relative z-20 flex-1 text-center text-[9px] font-heading font-bold tracking-wider transition-colors duration-300"
                style={{ color: isArabic ? "#FBFBFA" : "var(--color-charcoal)" }}
              >
                عربي
              </span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-accent hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-0 pt-24 pb-8 bg-cream/95 backdrop-blur-md z-40 border-b border-accent/20 flex flex-col items-center md:hidden px-6"
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            <div className="flex flex-col items-center gap-5 w-full mt-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-lg font-semibold text-charcoal hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full h-[1px] bg-accent/10 my-2"
              />

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                href="tel:0136647813"
                className="flex items-center justify-center gap-2 border border-primary bg-primary text-cream w-full py-3 font-semibold text-sm tracking-wider uppercase hover:bg-transparent hover:text-accent hover:border-accent transition-all duration-300"
              >
                <Phone size={14} />
                {isArabic ? "اتصل بنا الآن" : "Call Jubail HQ"}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
