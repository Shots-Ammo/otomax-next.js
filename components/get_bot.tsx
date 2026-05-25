"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { Send, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CustomChatIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-6l-4 4.5v-4.5H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
  </svg>
);

// ─── CONFIGURATION ────────────────────────────────────────────────────────
const CONFIG = {
    i18n: {
      en: {
        botName: "Gulf Evento",
        botSubtitle: "Smart Assistant",
        greeting: "Hello! I am Gulf Evento. How may I assist you today?",
        placeholder: "Type your message here...",
        poweredBy: "Powered by",
        errorMsg: "⚠️ Couldn't reach the server. Please try again.",
        consentPart1: "By chatting with our chat agents you consent to the monitoring and recording of the chat and the processing of your personal data in accordance with our ",
        consentLink: "Privacy Policy",
        consentPart2: ".",
      },
      ar: {
        botName: "غلف إيفنتو",
        botSubtitle: "مساعد ذكي",
        greeting: "مرحباً! معك غلف إيفنتو. كيف يمكنني مساعدتك اليوم؟",
        placeholder: "اكتب رسالتك هنا...",
        poweredBy: "مشغّل بواسطة",
        errorMsg: "⚠️ تعذّر الوصول إلى الخادم. يرجى المحاولة مجدداً.",
        consentPart1: "من خلال الدردشة مع وكلائنا، فإنك توافق على مراقبة وتسجيل الدردشة ومعالجة بياناتك الشخصية وفقًا لـ ",
        consentLink: "سياسة الخصوصية",
        consentPart2: " الخاصة بنا.",
      },
    },
    webhookUrl: "https://n8n.srv1587679.hstgr.cloud/webhook/gulfevento",
    theme: {
    primary: "#AB953F", // Gold (Main)
    charcoal: "#26336D", // Deep Blue (Accent)
    cream: "#FBFBFA", // Cream
    botBubble: "bg-white text-[#26336D] border border-[#AB953F]/20 shadow-sm",
    userBubble: "bg-gradient-to-br from-[#AB953F] to-[#8a7a30] text-white shadow-md",
    headerBg: "bg-gradient-to-r from-[#AB953F] to-[#8a7a30]",
    widgetBg: "bg-[#FBFBFA]",
    accent: "#26336D",
  }
};

interface Message {
  id: string;
  text: string;
  role: "bot" | "user";
  timestamp: string;
  dir: "ltr" | "rtl";
}

const detectTextDir = (text: string): "ltr" | "rtl" => {
  const rtlChars = (text.match(/[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/g) || []).length;
  const ltrChars = (text.match(/[A-Za-z]/g) || []).length;
  return rtlChars > ltrChars ? "rtl" : "ltr";
};

const getTime = () => {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function Noura() {
  const params = useParams();
  const locale = params?.locale as string;
  const lang: "en" | "ar" = locale === "ar" ? "ar" : "en";

  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showBadge, setShowBadge] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = useRef("");

  const T = CONFIG.i18n[lang];
  const isRTL = lang === "ar";

  const sendBotGreeting = useCallback(async () => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsTyping(false);
    const newMsg: Message = {
      id: Date.now().toString(),
      text: T.greeting,
      role: "bot",
      timestamp: getTime(),
      dir: detectTextDir(T.greeting)
    };
    setMessages([newMsg]);
  }, [T.greeting]);

  useEffect(() => {
    // Persistent Session ID via localStorage
    let sessId = localStorage.getItem("gulf_evento_sess_id");
    if (!sessId) {
      sessId = "sess_" + Math.random().toString(36).slice(2, 11);
      localStorage.setItem("gulf_evento_sess_id", sessId);
    }
    sessionIdRef.current = sessId;

    // Notification logic
    const timer = setTimeout(() => {
      if (!isOpen) setShowBadge(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        sendBotGreeting();
      }, 500);
      return () => clearTimeout(timer);
    }
    if (isOpen && !('ontouchstart' in window)) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen, messages.length, sendBotGreeting]);

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isBusy) return;

    setInputValue("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      role: "user",
      timestamp: getTime(),
      dir: detectTextDir(text)
    };

    setMessages(prev => [...prev, userMsg]);
    setIsBusy(true);
    setIsTyping(true);

    try {
      const res = await fetch(CONFIG.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionIdRef.current,
          lang
        }),
      });
      const data = await res.json();

      setIsTyping(false);

      if (data.replies && Array.isArray(data.replies)) {
        for (let i = 0; i < data.replies.length; i++) {
          if (i > 0) {
            await new Promise(r => setTimeout(r, 500));
            setIsTyping(true);
            const delays = [1500, 2000, 2500];
            const randomDelay = delays[Math.floor(Math.random() * delays.length)];
            await new Promise(r => setTimeout(r, randomDelay));
            setIsTyping(false);
          }
          const botMsg: Message = {
            id: Date.now().toString() + i,
            text: data.replies[i],
            role: "bot",
            timestamp: getTime(),
            dir: detectTextDir(data.replies[i])
          };
          setMessages(prev => [...prev, botMsg]);
        }
      } else {
        const reply = data.output || data.reply || T.errorMsg;
        const botMsg: Message = {
          id: Date.now().toString() + "_bot",
          text: reply,
          role: "bot",
          timestamp: getTime(),
          dir: detectTextDir(reply)
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch {
      setIsTyping(false);
      const errorMsg: Message = {
        id: Date.now().toString() + "_err",
        text: T.errorMsg,
        role: "bot",
        timestamp: getTime(),
        dir: detectTextDir(T.errorMsg)
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsBusy(false);
    }
  };

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/\[(.+?)\]\((.+?)\)/);
      if (linkMatch) {
        let href = linkMatch[2];
        if (/^\+[0-9]/.test(href)) href = "https://wa.me/" + href.replace(/[^0-9]/g, "");
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#26336D] font-bold underline hover:text-[#1a234b] transition-colors"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[10001] font-sans">
      {/* Launcher */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 15px 45px -10px rgba(38, 51, 109, 0.4)",
            "0 15px 45px -10px rgba(38, 51, 109, 0.8)",
            "0 15px 45px -10px rgba(38, 51, 109, 0.4)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowBadge(false);
        }}
        className={cn(
          "relative w-[72px] h-[72px] rounded-full flex items-center justify-center cursor-pointer border-none shadow-2xl z-50"
        )}
      >
        {/* Animated Border Container */}
        <div className="absolute inset-0 rounded-full overflow-hidden bg-[#AB953F]/20">
          <div className="absolute inset-[-50%] w-[200%] h-[200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#AB953F_360deg)]" />
        </div>

        {/* Inner Gold button */}
        <div className="absolute inset-[3px] bg-gradient-to-br from-[#AB953F] to-[#8a7a30] rounded-full z-10 flex items-center justify-center shadow-inner">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="text-white w-9 h-9" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <CustomChatIcon className="text-white w-9 h-9" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showBadge && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm z-20"
          >
            1
          </motion.div>
        )}
      </motion.button>

      {/* Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "absolute bottom-20 right-0 w-[380px] h-[650px] max-h-[calc(100vh-120px)] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-[#AB953F]/30",
              CONFIG.theme.widgetBg,
              isRTL ? "rtl" : "ltr"
            )}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          >
            {/* Header */}
            <div className={cn("p-5 flex items-center justify-between border-b border-white/20", CONFIG.theme.headerBg)}>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
                  {T.botName}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  </span>
                  <span className="text-xs text-white/90 font-medium tracking-wide">
                    {T.botSubtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scroll-smooth relative bg-gradient-to-b from-white to-[#FBFBFA]">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={cn(
                      "max-w-[85%] flex flex-col gap-1.5 z-10",
                      msg.role === "user" ? "self-end" : "self-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm",
                        msg.role === "user"
                          ? cn("rounded-br-none", CONFIG.theme.userBubble)
                          : cn("rounded-bl-none", CONFIG.theme.botBubble)
                      )}
                      style={{ direction: msg.dir }}
                    >
                      <div className="whitespace-pre-wrap">
                        {msg.role === "bot" ? renderText(msg.text) : msg.text}
                      </div>
                    </div>
                    <span className={cn(
                      "text-[11px] text-slate-400 px-1 font-medium",
                      msg.role === "user" ? "text-right" : "text-left"
                    )}>
                      {msg.timestamp}
                    </span>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="self-start flex flex-col gap-1 z-10"
                  >
                    <div className={cn("px-4 py-3.5 rounded-2xl rounded-bl-none flex gap-1.5 items-center", CONFIG.theme.botBubble)}>
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-2 h-2 rounded-full bg-[#26336D]/60" 
                      />
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-[#26336D]/60" 
                      />
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-[#26336D]/60" 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} className="h-1" />
            </div>



            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-3 items-end shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
              <textarea
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={T.placeholder}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-[#26336D] text-[15px] outline-none focus:border-[#AB953F] focus:ring-2 focus:ring-[#AB953F]/20 transition-all resize-none overflow-hidden max-h-[120px] shadow-inner"
              />
              <motion.button
                whileHover={inputValue.trim() && !isBusy ? { scale: 1.05 } : {}}
                whileTap={inputValue.trim() && !isBusy ? { scale: 0.95 } : {}}
                disabled={!inputValue.trim() || isBusy}
                onClick={handleSendMessage}
                className={cn(
                  "w-[46px] h-[46px] shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md",
                  inputValue.trim() && !isBusy
                    ? "bg-[#26336D] text-[#AB953F] hover:shadow-lg hover:shadow-[#26336D]/20"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                )}
              >
                {isBusy ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#AB953F]" />
                ) : (
                  <Send className="w-5 h-5 ml-0.5" />
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <div className={cn("py-2.5 text-center bg-slate-50 border-t border-slate-100")}>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                {T.poweredBy}{" "}
                <a
                  href="https://otomax.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#26336D] font-bold hover:text-[#AB953F] transition-colors"
                >
                  Otomax
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
