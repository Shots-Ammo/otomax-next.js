"use client";

import { Phone, MessageCircle, MapPin } from "lucide-react";

interface FooterProps {
  isArabic: boolean;
}

export default function Footer({ isArabic }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white text-charcoal border-t border-accent/15 py-16"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Summary */}
        <div className={`md:col-span-5 flex flex-col items-start ${isArabic ? "text-right" : "text-left"}`}>
          <div className="flex items-center gap-3 group mb-6">
            <div
              className="w-8 h-8 border border-accent bg-accent/10 flex items-center justify-center relative overflow-hidden"
              style={{ transform: "rotate(45deg)" }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-4 h-4 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                style={{ transform: "rotate(-45deg)" }}
              >
                <path d="M10,10 L90,10 L90,90 L10,90 Z" />
                <path d="M30,30 L70,30 L70,70 L30,70 Z" />
                <path d="M50,10 L50,90" />
                <path d="M10,50 L90,50" />
              </svg>
            </div>
            <div className={`flex flex-col ${isArabic ? "text-right" : "text-left"}`}>
              <span className="font-heading font-semibold text-base tracking-wider leading-none text-primary">
                GULF EVENTO
              </span>
              <span className="text-[8px] font-heading tracking-widest text-accent font-medium mt-0.5 uppercase">
                Contracting Company
              </span>
            </div>
          </div>
          <p className={`text-charcoal/70 text-sm font-light leading-relaxed max-w-sm ${isArabic ? "text-right" : "text-left"}`}>
            {isArabic
              ? "شركة جلف إيفينتو للمقاولات العامة، رمز الدقة الهندسية والفخامة العمرانية في مدينة الجبيل بالمملكة العربية السعودية منذ عام ١٤٣٥ هـ."
              : "Gulf Evento General Contracting Company, Al Jubail's leading elite engineering partner since 1435 H, constructing prestigious concrete and structural masterpieces."}
          </p>
        </div>

        {/* Quick Links Tree */}
        <div className="md:col-span-3 flex flex-col items-start">
          <h3 className="font-heading text-xs font-bold text-accent uppercase tracking-widest mb-6">
            {isArabic ? "تصفح سريع" : "Navigation Ledger"}
          </h3>
          <div className="flex flex-col gap-3 font-heading text-xs font-medium uppercase tracking-wider">
            <a href="#home" className="text-charcoal/70 hover:text-primary transition-colors">
              {isArabic ? "الرئيسية" : "Home"}
            </a>
            <a href="#about" className="text-charcoal/70 hover:text-primary transition-colors">
              {isArabic ? "من نحن" : "Philosophy & About"}
            </a>
            <a href="#services" className="text-charcoal/70 hover:text-primary transition-colors">
              {isArabic ? "خدماتنا الهندسية" : "Services Ledger"}
            </a>
            <a href="#projects" className="text-charcoal/70 hover:text-primary transition-colors">
              {isArabic ? "مشاريعنا" : "Projects Portfolio"}
            </a>
          </div>
        </div>

        {/* Direct Contacts tree */}
        <div className="md:col-span-4 flex flex-col items-start">
          <h3 className="font-heading text-xs font-bold text-accent uppercase tracking-widest mb-6">
            {isArabic ? "فرع الجبيل الرئيسي" : "Jubail HQ Liaison"}
          </h3>
          <div className={`flex flex-col gap-4 font-light text-xs sm:text-sm text-charcoal/80 ${isArabic ? "text-right" : "text-left"}`}>
            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-accent" />
              <span>013-6647813</span>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-3">
              <MessageCircle size={14} className="text-accent" />
              <span>+966 50 750 6633</span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin size={14} className="text-accent mt-0.5" />
              <span>
                {isArabic
                  ? "الجبيل، المنطقة الشرقية، المملكة العربية السعودية"
                  : "Al Jubail, Eastern Province, Saudi Arabia"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Under Footer compliance and securings */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-accent/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-charcoal/50">
        <span>
          © {currentYear} Gulf Evento Contracting Company. All rights reserved.
        </span>
       <a href="https://otomax.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
       <span className="flex items-center gap-1.5 uppercase font-medium tracking-widest text-[9px] text-charcoal/60">
          {isArabic ? "مدعوم ومحمي بواسطة Otomax" : <a href="https://otomax.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Powered by Otomax</a>}
        </span>
        </a> 
      </div>
    </footer>
  );
}
