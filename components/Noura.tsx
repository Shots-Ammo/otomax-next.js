"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
      botName: "Nourah",
      botSubtitle: "Otomax AI Assistant",
      greeting: "Hello! I am Nourah. How may I assist you today?",
      placeholder: "Type your message here...",
      poweredBy: "Powered by",
      errorMsg: "⚠️ Couldn't reach the server. Please try again.",
      consentPart1: "By chatting with our chat agents you consent to the monitoring and recording of the chat and the processing of your personal data in accordance with our ",
      consentLink: "Privacy Policy",
      consentPart2: ".",
    },
    ar: {
      botName: "نوره",
      botSubtitle: "مساعد أوتوماكس الذكي",
      greeting: "مرحباً! معك نوره. كيف يمكنني مساعدتك اليوم؟",
      placeholder: "اكتب رسالتك هنا...",
      poweredBy: "مشغّل بواسطة",
      errorMsg: "⚠️ تعذّر الوصول إلى الخادم. يرجى المحاولة مجدداً.",
      consentPart1: "من خلال الدردشة مع وكلائنا، فإنك توافق على مراقبة وتسجيل الدردشة ومعالجة بياناتك الشخصية وفقًا لـ ",
      consentLink: "سياسة الخصوصية",
      consentPart2: " الخاصة بنا.",
    },
  },
  avatarImageUrl: "/ui/logo.png",
  webhookUrl: "https://n8n.srv1587679.hstgr.cloud/webhook/noura",
  theme: {
    primary: "from-[#7B2FFF] via-[#00D4FF] to-[#7B2FFF]",
    botBubble: "bg-white text-slate-800 border border-slate-100 shadow-sm",
    userBubble: "bg-[#7B2FFF] text-white shadow-md",
    headerBg: "bg-violet-900",
    widgetBg: "bg-[#f8f7ff]",
    accent: "#7B2FFF",
    violet: "#7B2FFF",
  }
};

interface Message {
  id: string;
  text: string;
  role: "bot" | "user";
  timestamp: string;
  dir: "ltr" | "rtl";
}

export default function Noura() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [showBadge, setShowBadge] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = useRef("");

  const T = CONFIG.i18n[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    // Session ID initialization
    sessionIdRef.current = "sess_" + Math.random().toString(36).slice(2, 11);

    // Language detection
    const detectLang = () => {
      const htmlLang = (document.documentElement.lang || "").toLowerCase();
      if (htmlLang.startsWith("ar")) return "ar";
      const bLang = (navigator.language || "").toLowerCase();
      if (bLang.startsWith("ar")) return "ar";
      return "en";
    };
    setLang(detectLang());

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
  }, [isOpen, messages.length]);

  const detectTextDir = (text: string): "ltr" | "rtl" => {
    const rtlChars = (text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g) || []).length;
    const ltrChars = (text.match(/[A-Za-z]/g) || []).length;
    return rtlChars > ltrChars ? "rtl" : "ltr";
  };

  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendBotGreeting = async () => {
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
  };

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
    } catch (e) {
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
    // Simple markdown-like formatter
    let parts = text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g);
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
            className="text-[#7B2FFF] font-semibold underline hover:text-[#5a21c1] transition-colors"
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
            "0 15px 45px -10px rgba(123, 47, 255, 0.4)",
            "0 15px 45px -10px rgba(123, 47, 255, 0.8)",
            "0 15px 45px -10px rgba(123, 47, 255, 0.4)"
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
        <div className="absolute inset-0 rounded-full overflow-hidden bg-violet-200">
          <div className="absolute inset-[-50%] w-[200%] h-[200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#7B2FFF_360deg)]" />
        </div>

        {/* Inner violet button */}
        <div className="absolute inset-[3px] bg-violet-900 rounded-full z-10 flex items-center justify-center shadow-inner">
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "absolute bottom-20 right-0 w-[360px] h-[600px] max-h-[calc(100vh-120px)] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-slate-100",
              CONFIG.theme.widgetBg,
              isRTL ? "rtl" : "ltr"
            )}
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          >
            {/* Header */}
            <div className={cn("p-4 flex items-center justify-between border-b border-white/10", CONFIG.theme.headerBg)}>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-white leading-tight tracking-tight">
                  {T.botName}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                  <span className="text-[11px] text-violet-200/70 font-medium">
                    {T.botSubtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth relative">
              <div className="absolute inset-0 bg-[#f8f7ff] pointer-events-none" />

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[85%] flex flex-col gap-1 z-10",
                    msg.role === "user" ? "self-end" : "self-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm",
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
                    "text-[10px] text-slate-400 px-1",
                    msg.role === "user" ? "text-right" : "text-left"
                  )}>
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="self-start flex flex-col gap-1 z-10">
                  <div className={cn("px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center", CONFIG.theme.botBubble)}>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Consent Disclaimer */}
            <div className="px-4 py-2 bg-white text-[10px] text-slate-500 border-t border-slate-100 leading-tight z-10">
              {T.consentPart1}
              <a href={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline font-semibold">
                {T.consentLink}
              </a>
              {T.consentPart2}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-violet-900 border-t border-slate-100 flex gap-2 items-center">
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
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none focus:border-[#7B2FFF]/50 transition-colors resize-none overflow-hidden max-h-[120px]"
              />
              <button
                disabled={!inputValue.trim() || isBusy}
                onClick={handleSendMessage}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md",
                  inputValue.trim() && !isBusy
                    ? "bg-[#7B2FFF] text-white hover:scale-105 active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
              >
                {isBusy ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Footer */}
            <div className={cn("py-2 text-center", CONFIG.theme.headerBg)}>
              <p className="text-[10px] text-violet-200/50 tracking-wider">
                {T.poweredBy}{" "}
                <a
                  href="https://otomax.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-200 font-bold hover:text-white transition-colors"
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
