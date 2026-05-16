"use client";

import React, { useRef, useEffect } from "react";

import { IPhoneMockup } from "@/components/iphone-mockup";
import { useInView } from "framer-motion";

import {
  Zap,
  MessageSquare,
  Clock,
  Globe,
  Zap as ZapIcon,
  Users,
  Sparkles,
  Share2,
  Database,
  User,
  Mail,
  Eye
} from "lucide-react"

import { BentoGrid, BentoCard } from '@/components/bento-grid';
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const OriginalSite = () => {
  const t = useTranslations("AgentShowcase");
  const locale = useLocale();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iphoneSectionRef = useRef<HTMLDivElement>(null);
  const isIphoneInView = useInView(iphoneSectionRef, { once: true, margin: "-100px" });

  const files = t.raw("files.items");

  useEffect(() => {
    if (isIphoneInView) {
      // Wait for iPhone mock animation to complete (approx 1.2s delay for safety)
      const timer = setTimeout(() => {
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage('start-chat', '*');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isIphoneInView]);

  return (
    <div className="bg-white text-black" style={{ fontFamily: "Cairo, sans-serif" }}>

      <main>
        {/* AI AGENT SHOWCASE */}
        <section id="agent" className="pt-8 pb-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">

            {/* Grid Layout: Cards Left, iPhone Right, CTA Bottom-Left on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-16 lg:gap-x-12 lg:gap-y-0 max-w-7xl mx-auto">

              {/* LEFT SIDE: Bento Grid Cards */}
              <div className="lg:col-span-2 order-1 mt-8 lg:mt-20 flex flex-col items-center w-full max-w-[750px]">
                <BentoGrid className="grid-cols-1 md:grid-cols-3 w-full gap-6">

                  {/* Card 4 - Section Title Hero */}
                  <BentoCard
                    title={t("title")}
                    span="full"
                    centered
                    className="animate-float min-h-[80px] md:min-h-[100px] border-none bg-transparent shadow-none"
                    titleClassName="text-3xl sm:text-4xl md:text-[52px] font-black tracking-tight text-neutral-900 leading-[1.1]"
                    description=""
                  />

                  {/* Calendar Card */}
                  <BentoCard
                    title={t("appointments.title")}
                    span="half"
                    icon={<CalendarIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />}
                    description={t("appointments.desc")}
                    className="min-h-[100px] md:min-h-[85px]"
                  >
                    <Calendar
                      mode="single"
                      selected={new Date()}
                      className="absolute right-2 top-48 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_bottom,transparent_0%,#000_40%)] group-hover:scale-90 hidden sm:block"
                    />
                  </BentoCard>

                  {/* Save Files Card */}
                  <BentoCard
                    title={t("files.title")}
                    span="half"
                    icon={<FileTextIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />}
                    description={t("files.desc")}
                    className="min-h-[100px] md:min-h-[85px]"
                  >
                    <Marquee
                      pauseOnHover
                      className="[--duration:20s] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    >
                      {files.map((file: any, i: number) => (
                        <div
                          key={i}
                          className="mx-2 flex flex-col gap-2 p-4 bg-neutral-50 rounded-xl border border-neutral-100 min-w-[140px] shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center font-black text-[10px] shrink-0">
                              {file.name.includes('.') ? file.name.split('.').pop()?.toUpperCase() : 'FILE'}
                            </div>
                            <span className="text-xs font-bold text-neutral-900 truncate">{file.name}</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 line-clamp-2 leading-relaxed">{file.body}</p>
                        </div>
                      ))}
                    </Marquee>
                  </BentoCard>

                  {/* Multichannel Notification Card */}
                  <BentoCard
                    title={t("multiPlatform.title")}
                    span="half"
                    icon={<ZapIcon className="w-6 h-6 text-yellow-500" />}
                    description={t("multiPlatform.desc")}
                    className="min-h-[180px] md:min-h-[85px]"
                    notifications={[
                      {
                        id: '1',
                        type: 'message',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        ),
                        title: t("multiPlatform.notifications.whatsapp.title"),
                        subtitle: t("multiPlatform.notifications.whatsapp.subtitle"),
                        time: t("multiPlatform.notifications.whatsapp.time"),
                        color: 'bg-green-500',
                      },
                      {
                        id: '2',
                        type: 'message',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        ),
                        title: t("multiPlatform.notifications.facebook.title"),
                        subtitle: t("multiPlatform.notifications.facebook.subtitle"),
                        time: t("multiPlatform.notifications.facebook.time"),
                        color: 'bg-blue-600',
                      },
                      {
                        id: '3',
                        type: 'message',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        ),
                        title: t("multiPlatform.notifications.instagram.title"),
                        subtitle: t("multiPlatform.notifications.instagram.subtitle"),
                        time: t("multiPlatform.notifications.instagram.time"),
                        color: 'bg-pink-500',
                      },
                      {
                        id: '4',
                        type: 'message',
                        icon: <Globe className="w-4 h-4" />,
                        title: t("multiPlatform.notifications.website.title"),
                        subtitle: t("multiPlatform.notifications.website.subtitle"),
                        time: t("multiPlatform.notifications.website.time"),
                        color: 'bg-blue-400',
                      },
                      {
                        id: '5',
                        type: 'message',
                        icon: (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.195-2.76 5.023-4.54c.218-.194-.048-.302-.337-.11L9.53 13.06l-2.67-.835c-.58-.182-.59-.58.12-.857l10.424-4.017c.483-.176.905.114.72.87z" />
                          </svg>
                        ),
                        title: t("multiPlatform.notifications.telegram.title"),
                        subtitle: t("multiPlatform.notifications.telegram.subtitle"),
                        time: t("multiPlatform.notifications.telegram.time"),
                        color: 'bg-blue-500',
                      },
                      {
                        id: '6',
                        type: 'message',
                        icon: <Mail className="w-4 h-4" />,
                        title: t("multiPlatform.notifications.email.title"),
                        subtitle: t("multiPlatform.notifications.email.subtitle"),
                        time: t("multiPlatform.notifications.email.time"),
                        color: 'bg-slate-700',
                      },
                    ]}
                  />

                  {/* Card 1 - Natural Conversation */}
                  <BentoCard
                    title={t("conversation.title")}
                    span="half"
                    icon={<MessageSquare />}
                    description={t("conversation.desc")}
                    className="min-h-[100px] md:min-h-[85px]"
                  />

                  {/* Card 3 - Always Available */}
                  <BentoCard
                    title={t("available.title")}
                    span="half"
                    className="min-h-[100px] md:min-h-[85px]"
                    icon={<Clock />}
                    description={t("available.desc")}
                  />

                  {/* Integrations Card */}
                  <BentoCard
                    title={t("database.title")}
                    span="half"
                    icon={<Eye className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />}
                    description={t("database.desc")}
                    className="min-h-[100px] md:min-h-[85px]"
                  />

                </BentoGrid>
              </div>

              {/* RIGHT SIDE: iPhone Mockup */}
              <div className="lg:col-span-1 order-2 lg:row-span-2 flex flex-col justify-center items-center lg:justify-start pt-10 lg:pt-0" ref={iphoneSectionRef}>
                <div className="relative scale-[0.8] sm:scale-[0.9] md:scale-100 lg:scale-[0.85] origin-center z-10 w-fit">
                  


                  <IPhoneMockup model="15-pro" color="#000000" noGradient={true} scale={0.75} animateOnScroll={true} statusBarColor="#000000">
                    <iframe
                      ref={iframeRef}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: 'black',
                      }}
                      srcDoc={`
                        <!DOCTYPE html>
                        <html lang="${locale}">
                          <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                              body, html { margin: 0; padding: 0; width: 100%; height: 100%; background: black; overflow: hidden; }
                            </style>
                          </head>
                          <body>
                            <script src="/demo.js">${'</'}script>
                          </body>
                        </html>
                      `}
                    />
                  </IPhoneMockup>
                </div>
              </div>

              {/* CTA Button - Mobile: After iPhone, Desktop: Under Cards */}
              <div className="lg:col-span-2 order-3 flex flex-col items-center w-full relative z-10 pt-4 lg:pt-8" >
                <Link href="/ai-agent">
                  <button className="px-10 py-5 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-black text-lg shadow-xl shadow-violet-500/30 transition-all hover:scale-105 active:scale-95">
                    {t("cta")}
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OriginalSite;
