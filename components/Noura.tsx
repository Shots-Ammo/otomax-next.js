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
  // ⚠️ CHATWOOT CONFIGURATION - CHANGE THESE VALUES
  chatwoot: {
    baseUrl: "https://chat.kawtheron.tech", // Your Chatwoot instance URL
    // ⚠️ IMPORTANT: For the Client API, this must be the Inbox "Website Token" / Identifier (a long hash string), NOT the numeric ID like "5".
    // You can find this in Settings -> Inboxes -> Your Inbox -> Settings -> Configuration.
    inboxIdentifier: "EiG4ScFiV7mRcXcTvmRM7GwM",
  },
  // ⚠️ END CHATWOOT CONFIGURATION

  i18n: {
    en: {
      botName: "Nourah",
      botSubtitle: "Smart Assistant",
      greeting: "Hello! I am Nourah. How may I assist you today?",
      placeholder: "Type your message here...",
      poweredBy: "Powered by",
      errorMsg: "⚠️ Couldn't reach the server. Please try again.",
      consentPart1: "By chatting with our chat agents you consent to the monitoring and recording of the chat and the processing of your personal data in accordance with our ",
      consentLink: "Privacy Policy",
      consentPart2: ".",
    },
    ar: {
      botName: "نورة",
      botSubtitle: "المساعده الذكية",
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
  // ⚠️ REMOVED: webhookUrl (no longer needed - we're using Chatwoot API instead)
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
  createdAt: number;
}

function chatwootCreatedAt(raw: number): number {
  return raw < 1e12 ? raw * 1000 : raw;
}

function sortMessagesChronologically(msgs: Message[]): Message[] {
  return [...msgs].sort((a, b) => a.createdAt - b.createdAt);
}

export default function Noura() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  /** Agent reply pending — not used for welcome greeting */
  const [isTyping, setIsTyping] = useState(false);
  const [isGreetingTyping, setIsGreetingTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [showBadge, setShowBadge] = useState(false);

  const [chatwootConversationId, setChatwootConversationId] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef("");
  /** Chatwoot `source_id` from contact create — required for all public API paths */
  const contactSourceIdRef = useRef("");
  const awaitingReplyRef = useRef(false);
  const lastUserSendAtRef = useRef(0);
  const contactEmailRef = useRef("");
  const contactPhoneRef = useRef("");
  const contactNameRef = useRef("Website Visitor");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const greetingStartedRef = useRef(false);
  const lastScrollKeyRef = useRef("");

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      const anchor = messagesEndRef.current;
      if (anchor) {
        anchor.scrollIntoView({ behavior, block: "end" });
      } else if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
  };

  const T = CONFIG.i18n[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    // 1. Session Persistence Logic
    const savedSessionId = localStorage.getItem("noura_sess_id");
    const savedSourceId = localStorage.getItem("noura_cont_id");
    const savedConvId = localStorage.getItem("noura_conv_id");

    if (savedSessionId) {
      sessionIdRef.current = savedSessionId;
    } else {
      const newId = "sess_" + Math.random().toString(36).slice(2, 11);
      sessionIdRef.current = newId;
      localStorage.setItem("noura_sess_id", newId);
    }

    // Chatwoot public API paths require source_id (UUID), not our custom identifier
    if (savedSourceId && !/^\d+$/.test(savedSourceId)) {
      contactSourceIdRef.current = savedSourceId;
    } else if (savedSourceId) {
      localStorage.removeItem("noura_cont_id");
      localStorage.removeItem("noura_conv_id");
    }

    if (savedConvId && /^\d+$/.test(savedConvId)) {
      setChatwootConversationId(savedConvId);
    } else if (savedConvId) {
      localStorage.removeItem("noura_conv_id");
    }

    // 2. Language detection
    const detectLang = () => {
      const htmlLang = (document.documentElement.lang || "").toLowerCase();
      if (htmlLang.startsWith("ar")) return "ar";
      const bLang = (navigator.language || "").toLowerCase();
      if (bLang.startsWith("ar")) return "ar";
      return "en";
    };
    setLang(detectLang());

    // 3. Notification logic
    const timer = setTimeout(() => {
      if (!isOpen) setShowBadge(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // ⚠️ Only run once on mount to preserve session across toggles

  // ─── POLLING LOGIC: Fetch messages from Chatwoot every 3 seconds ───────────
  useEffect(() => {
    if (!isOpen || !chatwootConversationId) return;

    const fetchMessages = async () => {
      const contactSourceId = contactSourceIdRef.current;
      if (!chatwootConversationId || !contactSourceId) return;
      try {
        const inboxIdentifier = CONFIG.chatwoot.inboxIdentifier;
        const conversationId = chatwootConversationId;

        const res = await fetch(
          `${CONFIG.chatwoot.baseUrl}/public/api/v1/inboxes/${inboxIdentifier}/contacts/${contactSourceId}/conversations/${conversationId}/messages`
        );

        if (res.status === 404) {
          localStorage.removeItem("noura_cont_id");
          localStorage.removeItem("noura_conv_id");
          contactSourceIdRef.current = "";
          setChatwootConversationId(null);
          return;
        }

        if (!res.ok) return;

        const data = await res.json();
        const chatwootMessages = Array.isArray(data) ? data : (data.payload || []);

        const formattedMessages: Message[] = chatwootMessages
          .filter((m: any) => m.message_type !== 2 && m.content != null)
          .map((m: any) => {
            const createdAt = chatwootCreatedAt(m.created_at);
            return {
              id: String(m.id),
              role: m.message_type === 1 ? "bot" : "user",
              text: m.content ?? "",
              timestamp: new Date(createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              dir: /[\u0600-\u06FF]/.test(m.content ?? "") ? "rtl" : "ltr",
              createdAt,
            };
          });

        const sortedApiMessages = sortMessagesChronologically(formattedMessages);

        if (sortedApiMessages.length > 0) {
          setMessages((prev) => {
            const greeting = prev.find((m) => m.id === "0");
            const apiIds = new Set(sortedApiMessages.map((m) => m.id));
            const apiUserTexts = new Set(
              sortedApiMessages
                .filter((m) => m.role === "user")
                .map((m) => m.text.trim())
            );
            // Keep optimistic messages only until Chatwoot echoes the same content
            const pendingLocal = prev.filter((m) => {
              if (m.id === "0" || apiIds.has(m.id)) return false;
              if (!String(m.id).startsWith("local-")) return false;
              return !apiUserTexts.has(m.text.trim());
            });
            const merged = sortMessagesChronologically([
              ...(greeting ? [greeting] : []),
              ...sortedApiMessages,
              ...pendingLocal,
            ]);
            return merged;
          });

          if (awaitingReplyRef.current) {
            const newBotReply = sortedApiMessages.some(
              (m) =>
                m.role === "bot" &&
                m.createdAt >= lastUserSendAtRef.current - 2000
            );
            if (newBotReply) {
              awaitingReplyRef.current = false;
              setIsTyping(false);
            }
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchMessages(); // Fetch immediately
    const interval = setInterval(fetchMessages, 2000); // Then every 2 seconds
    return () => clearInterval(interval);
  }, [isOpen, chatwootConversationId]);

  // Scroll to bottom when chat opens
  useEffect(() => {
    if (!isOpen) {
      lastScrollKeyRef.current = "";
      return;
    }
    lastScrollKeyRef.current = "";
    const timer = setTimeout(() => scrollToBottom("instant"), 120);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Scroll when messages grow or typing state changes (not on every poll tick)
  useEffect(() => {
    if (!isOpen) return;
    const lastId = messages[messages.length - 1]?.id ?? "";
    const scrollKey = `${messages.length}:${lastId}:${isTyping}:${isGreetingTyping}`;
    if (scrollKey === lastScrollKeyRef.current) return;
    lastScrollKeyRef.current = scrollKey;

    const behavior =
      messages.length <= 1 && !chatwootConversationId ? "instant" : "smooth";
    const timer = setTimeout(() => scrollToBottom(behavior), 50);
    return () => clearTimeout(timer);
  }, [isOpen, messages, isTyping, isGreetingTyping, chatwootConversationId]);

  // Welcome greeting only for new visitors (no Chatwoot conversation yet)
  useEffect(() => {
    if (!isOpen || chatwootConversationId || greetingStartedRef.current) return;
    if (messages.length > 0) return;

    greetingStartedRef.current = true;
    const timer = setTimeout(() => {
      sendBotGreeting();
    }, 300);
    return () => clearTimeout(timer);
  }, [isOpen, chatwootConversationId, messages.length]);

  useEffect(() => {
    if (isOpen && !("ontouchstart" in window)) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  const detectTextDir = (text: string): "ltr" | "rtl" => {
    const rtlChars = (text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g) || []).length;
    const ltrChars = (text.match(/[A-Za-z]/g) || []).length;
    return rtlChars > ltrChars ? "rtl" : "ltr";
  };

  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendBotGreeting = async () => {
    setIsGreetingTyping(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsGreetingTyping(false);
    const newMsg: Message = {
      id: "0",
      text: T.greeting,
      role: "bot",
      timestamp: getTime(),
      dir: detectTextDir(T.greeting),
      createdAt: 0,
    };
    setMessages([newMsg]);
  };
  const ensureChatwootContact = async (inboxIdentifier: string): Promise<string> => {
    const sessionIdentifier = sessionIdRef.current;
    if (!sessionIdentifier) throw new Error("No session ID found");

    if (contactSourceIdRef.current) {
      const existing = await fetch(
        `${CONFIG.chatwoot.baseUrl}/public/api/v1/inboxes/${inboxIdentifier}/contacts/${contactSourceIdRef.current}`,
        { method: "GET" }
      );
      if (existing.ok) return contactSourceIdRef.current;
      contactSourceIdRef.current = "";
      localStorage.removeItem("noura_cont_id");
    }

    const createRes = await fetch(
      `${CONFIG.chatwoot.baseUrl}/public/api/v1/inboxes/${inboxIdentifier}/contacts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: sessionIdentifier,
          email: contactEmailRef.current || undefined,
          name: contactNameRef.current,
        }),
      }
    );
    if (!createRes.ok) {
      throw new Error(`Failed to create contact: ${createRes.status}`);
    }

    const contactData = await createRes.json();
    const sourceId = contactData.source_id as string;
    if (!sourceId) throw new Error("Chatwoot did not return source_id");

    contactSourceIdRef.current = sourceId;
    localStorage.setItem("noura_cont_id", sourceId);
    return sourceId;
  };

  const sendMessageToChatwoot = async (
    userMessage: string
  ): Promise<{ id: number; created_at: number }> => {
    try {
      const inboxIdentifier = CONFIG.chatwoot.inboxIdentifier;
      let currentConversationId = chatwootConversationId;

      const contactSourceId = await ensureChatwootContact(inboxIdentifier);

      if (!currentConversationId) {
        const convRes = await fetch(
          `${CONFIG.chatwoot.baseUrl}/public/api/v1/inboxes/${inboxIdentifier}/contacts/${contactSourceId}/conversations`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!convRes.ok) throw new Error(`Failed to create conversation: ${convRes.status}`);
        const convData = await convRes.json();
        currentConversationId = convData.id.toString();
        setChatwootConversationId(currentConversationId);
        localStorage.setItem("noura_conv_id", currentConversationId ?? "");
      }

      const msgRes = await fetch(
        `${CONFIG.chatwoot.baseUrl}/public/api/v1/inboxes/${inboxIdentifier}/contacts/${contactSourceId}/conversations/${currentConversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: userMessage }),
        }
      );

      if (!msgRes.ok) {
        localStorage.removeItem("noura_cont_id");
        localStorage.removeItem("noura_conv_id");
        contactSourceIdRef.current = "";
        setChatwootConversationId(null);
        throw new Error(`Failed to send message: ${msgRes.status}`);
      }

      return msgRes.json();
    } catch (error) {
      console.error("Error sending to Chatwoot:", error);
      localStorage.removeItem("noura_cont_id");
      localStorage.removeItem("noura_conv_id");
      contactSourceIdRef.current = "";
      setChatwootConversationId(null);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isBusy) return;

    setInputValue("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    const now = Date.now();
    const userMsg: Message = {
      id: `local-${now}`,
      text,
      role: "user",
      timestamp: getTime(),
      dir: detectTextDir(text),
      createdAt: now,
    };

    lastUserSendAtRef.current = now;
    awaitingReplyRef.current = true;
    setMessages((prev) => sortMessagesChronologically([...prev, userMsg]));
    setIsBusy(true);
    setIsTyping(true); // awaiting agent reply only — not greeting
    scrollToBottom("smooth");

    const localId = userMsg.id;

    try {
      const sent = await sendMessageToChatwoot(text);
      const createdAt = chatwootCreatedAt(sent.created_at);
      setMessages((prev) =>
        sortMessagesChronologically(
          prev.map((m) =>
            m.id === localId
              ? {
                ...m,
                id: String(sent.id),
                createdAt,
                timestamp: new Date(createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
              : m
          )
        )
      );
    } catch (error) {
      console.error("Chat error:", error);
      awaitingReplyRef.current = false;
      setIsTyping(false);
      const errAt = Date.now();
      const errorMsg: Message = {
        id: `err-${errAt}`,
        text: T.errorMsg,
        role: "bot",
        timestamp: getTime(),
        dir: detectTextDir(T.errorMsg),
        createdAt: errAt,
      };
      setMessages((prev) => sortMessagesChronologically([...prev, errorMsg]));
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

      {/* Identifying Title (Floating Label) */}
      <AnimatePresence>
        {!isOpen && showBadge && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-5 right-20 flex items-center pointer-events-none"
          >
            <div
              className="bg-white/95 backdrop-blur-md border border-violet-100 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 overflow-hidden"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <div className="w-1 h-8 bg-violet-600 rounded-full flex-shrink-0" />
              <div className="flex flex-col items-start">
                <span className="text-[13px] font-bold text-violet-600 uppercase tracking-wider whitespace-nowrap">
                  {T.botName}
                </span>
                <span className="text-[13px] font-medium text-slate-800 whitespace-nowrap">
                  {T.botSubtitle}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative"
            >
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

              {(isGreetingTyping || isTyping) && (
                <div className="self-start flex flex-col gap-1 z-10">
                  <div className={cn("px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center", CONFIG.theme.botBubble)}>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-0 shrink-0" aria-hidden />
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