'use client';
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";



interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const Footer7 = ({
  logo = {
    url: "https://www.otomax.tech",
    src: "/otomax_logo.png",
    alt: "Otomax Logo",
    title: "Otomax",
  },
}: {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}) => {
  const t = useTranslations("Footer");

  const sections = [
    {
      title: t("services"),
      links: [
        { name: t("aiAgent"), href: "/ai-agent" },
        { name: t("websites"), href: "/websites" },
        { name: t("What we can do"), href: "/consultation" },
      ],
    },
    {
      title: t("otomax"),
      links: [
        { name: t("privacyPolicy"), href: "/privacy" },
        { name: t("termsAndConditions"), href: "/terms" },
      ],
    },
  ];

  const legalLinks = [
    { name: t("termsAndConditions"), href: "/terms" },
    { name: t("privacyPolicy"), href: "/privacy" },
  ];
  return (
    <div className="scale-[0.9] origin-top -mb-[5%] w-full bg-white border-t border-neutral-100 mt-20">
      <footer className="py-16 md:py-24 px-6 md:px-0">
        <div className="container mx-auto">
          <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-6 lg:max-w-sm">
              {/* Logo */}
              <div className="flex items-center gap-3" dir="ltr">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <h2 className="text-2xl font-black tracking-tighter uppercase">{logo.title}</h2>
              </div>
              <p className="text-base text-neutral-500 leading-relaxed font-medium">
                {t("description")}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="flex flex-col gap-4">
                  <h3 className="text-lg font-black text-neutral-900 uppercase tracking-wider">{section.title}</h3>
                  <ul className="flex flex-col gap-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          href={link.href as any} 
                          className="text-neutral-500 hover:text-violet-600 font-bold transition-colors text-sm md:text-base"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-neutral-400">
            
            <div className="flex items-center gap-8">
              {legalLinks.map((link, idx) => (
                <Link key={idx} href={link.href as any} className="hover:text-neutral-900 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
