(function () {
  // ─── CONFIGURATION ────────────────────────────────────────────────────────
  const CONFIG = {
    chatwoot: {
      baseUrl: "https://chat.kawtheron.tech",
      inboxIdentifier: "RP3nRkBsC11LCf3aTGkjgq8u",
      accountId: "2",
    },
    i18n: {
      en: {
        botName: "Max",
        botSubtitle: "Your new Smart Assistant",
        greeting1: "Hello there ! \n I am max, your buiness's new smart assistant",
        greeting2: "Try me now. Ask me anything!",
        placeholder: "Type your message here...",
        poweredBy: "Powered by",
        errorMsg: "⚠️ Couldn't reach the server. Please try again.",
        consentPart1:
          "By chatting with our chat agents you consent to the monitoring and recording of the chat and the processing of your personal data in accordance with our ",
        consentLink: "Privacy Policy",
        consentPart2: ".",
      },
      ar: {
        botName: "ماكس",
        botSubtitle: "مساعدك الذكي",
        greeting1: "مرحباً! \n أنا ماكس، مساعدك الذكي الجديد",
        greeting2: "جربني الآن. اسألني عن أي شيء!",
        placeholder: "اكتب رسالتك هنا...",
        poweredBy: "مشغّل بواسطة",
        errorMsg: "⚠️ تعذّر الوصول إلى الخادم. يرجى المحاولة مجدداً.",
        consentPart1:
          "من خلال الدردشة مع وكلائنا، فإنك توافق على مراقبة وتسجيل الدردشة ومعالجة بياناتك الشخصية وفقًا لـ ",
        consentLink: "سياسة الخصوصية",
        consentPart2: " الخاصة بنا.",
      },
    },

    avatarImageUrl: "/ui/logo.png",

    primaryColor: "#7c3aed",
    accentColor: "#7c3aed",
    bgWidget: "#E5DDD5",
    bgHeader: "#F0F2F5",
    bgInputArea: "#F0F2F5",
    bubbleBot: "#FFFFFF",
    bubbleUser: "#7c3aed",
    bubbleUserText: "#FFFFFF",
    bubbleBotText: "#000000",
  };
  // ──────────────────────────────────────────────────────────────────────────

  const STORAGE = {
    session: "max_sess_id",
    contact: "max_cont_id",
    conversation: "max_conv_id",
  };

  function detectLang() {
    const htmlLang = (document.documentElement.lang || "").toLowerCase();
    if (htmlLang.startsWith("ar")) return "ar";
    const metaLang = document.querySelector('meta[http-equiv="content-language"]');
    if (metaLang && (metaLang.getAttribute("content") || "").toLowerCase().startsWith("ar"))
      return "ar";
    const url = window.location.href.toLowerCase();
    if (/\/ar(\/|$|\?)/.test(url) || /[?&](lang|hl)=ar/.test(url)) return "ar";
    const bLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    if (bLang.startsWith("ar")) return "ar";
    return "en";
  }

  function detectTextDir(text) {
    const rtlChars = (text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g) || [])
      .length;
    const ltrChars = (text.match(/[A-Za-z]/g) || []).length;
    return rtlChars > ltrChars ? "rtl" : "ltr";
  }

  function chatwootCreatedAt(raw) {
    return raw < 1e12 ? raw * 1000 : raw;
  }

  const lang = detectLang();
  const T = CONFIG.i18n[lang];
  const isRTL = lang === "ar";

  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@500;700&family=Cairo:wght@400;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap');

    body, html { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; }

    #otmx-widget {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      z-index: 999998;
      border: none;
      box-shadow: none;
      font-family: ${isRTL ? "'Cairo', sans-serif" : "'DM Sans', sans-serif"};
      direction: ${isRTL ? "rtl" : "ltr"};
      background: ${CONFIG.bgWidget};
      opacity: 1;
      pointer-events: all;
    }

    #otmx-header {
      background: ${CONFIG.bgHeader};
      padding: 16px 20px;
      padding-top: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      border-bottom: 1px solid rgba(0,0,0,0.06);
      gap: 10px;
    }
    #otmx-header-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
    #otmx-online-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    #otmx-online-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #22C55E;
      box-shadow: 0 0 6px rgba(34,197,94,0.7);
      flex-shrink: 0;
    }
    #otmx-bot-name {
      font-family: ${isRTL ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif"};
      font-weight: 700;
      font-size: 22px;
      color: #000000;
      line-height: 1.1;
      letter-spacing: ${isRTL ? "0" : "-0.3px"};
    }
    #otmx-bot-subtitle {
      font-size: 15px;
      color: #666666;
      font-weight: 500;
      width:100%;
    }
    #otmx-avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    }
    #otmx-avatar img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 50%;
    }

    #otmx-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background-color: ${CONFIG.bgWidget};
      background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
      background-repeat: repeat;
      background-size: 350px;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
    }
    #otmx-messages::-webkit-scrollbar { width: 4px; }
    #otmx-messages::-webkit-scrollbar-track { background: transparent; }
    #otmx-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

    .otmx-msg {
      display: flex;
      flex-direction: column;
      max-width: 82%;
      animation: otmxFadeUp 0.28s ease-out forwards;
    }
    @keyframes otmxFadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .otmx-msg.bot  { align-self: flex-start; }
    .otmx-msg.user { align-self: flex-end; }

    .otmx-bubble {
      padding: 12px 16px;
      border-radius: 18px;
      font-size: 19px;
      line-height: 1.5;
      word-wrap: break-word;
      position: relative;
    }
    .otmx-bubble[dir="rtl"] { font-family: 'IBM Plex Sans Arabic', sans-serif; }
    .otmx-bubble[dir="ltr"] { font-family: ${isRTL ? "'Cairo', sans-serif" : "'DM Sans', sans-serif"}; }

    .otmx-msg.bot .otmx-bubble {
      background: ${CONFIG.bubbleBot};
      color: ${CONFIG.bubbleBotText};
      border: 1px solid rgba(0,0,0,0.05);
      border-${isRTL ? "bottom-right" : "bottom-left"}-radius: 4px;
    }
    .otmx-msg.user .otmx-bubble {
      background: ${CONFIG.bubbleUser};
      color: ${CONFIG.bubbleUserText};
      font-weight: 400;
      border-${isRTL ? "bottom-left" : "bottom-right"}-radius: 4px;
    }

    .otmx-bubble-content { display: inline; }
    .otmx-time {
      font-size: 13px;
      white-space: nowrap;
      margin-top: 4px;
      line-height: 1;
      position: relative;
      top: 2px;
    }
    .otmx-msg.bot .otmx-time { color: rgba(0, 0, 0, 0.4); }
    .otmx-msg.user .otmx-time { color: rgba(255, 255, 255, 0.7); }

    .otmx-typing-bubble {
      display: flex;
      align-self: flex-start;
      padding: 10px 14px;
      gap: 5px;
      background: ${CONFIG.bubbleBot};
      border-radius: 16px;
      border-${isRTL ? "bottom-right" : "bottom-left"}-radius: 4px;
      border: 1px solid rgba(0,0,0,0.05);
      animation: otmxFadeUp 0.28s ease-out forwards;
      min-width: 40px;
      min-height: 32px;
      box-sizing: border-box;
    }
    .otmx-dot {
      width: 6px;
      height: 6px;
      background: ${CONFIG.accentColor};
      border-radius: 50%;
      opacity: 0.4;
      animation: otmxBounce 1.3s infinite;
    }
    .otmx-dot:nth-child(2) { animation-delay: 0.18s; }
    .otmx-dot:nth-child(3) { animation-delay: 0.36s; }
    @keyframes otmxBounce {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); }
      40%           { opacity: 1;   transform: scale(1.1); }
    }

    #otmx-input-area {
      padding: 16px 20px;
      padding-bottom: 38px;
      background: ${CONFIG.bgInputArea};
      display: flex;
      gap: 12px;
      align-items: center;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    @keyframes otmxSpin {
      100% { transform: rotate(360deg); }
    }
    #otmx-input-wrapper {
      flex: 1;
      position: relative;
      border-radius: 24px;
      padding: 2px;
      background: rgba(124, 58, 237, 0.15);
      overflow: hidden;
      display: flex;
    }
    #otmx-input-gradient {
      position: absolute;
      top: -500px;
      bottom: -500px;
      left: -500px;
      right: -500px;
      background: conic-gradient(from 0deg, transparent 0 240deg, ${CONFIG.primaryColor} 360deg);
      animation: otmxSpin 2.5s linear infinite;
      z-index: 1;
    }
    #otmx-input {
      flex: 1;
      position: relative;
      background: #FFFFFF;
      border: none;
      border-radius: 22px;
      padding: 12px 18px;
      color: #000;
      outline: none;
      font-family: inherit;
      font-size: 18px;
      resize: none;
      max-height: 120px;
      z-index: 2;
    }
    #otmx-input::placeholder { color: rgba(0,0,0,0.4); }

    #otmx-send {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: ${CONFIG.primaryColor};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 6px rgba(124, 58, 237, 0.3);
    }
    #otmx-send:hover { transform: scale(1.05); }
    #otmx-send:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

    #otmx-footer {
      display: none;
    }
  `;
  document.head.appendChild(style);

  const widget = document.createElement("div");
  widget.id = "otmx-widget";
  widget.innerHTML = `
    <div id="otmx-header">
      <div id="otmx-header-left">
        <div id="otmx-bot-name">${T.botName}</div>
        <div id="otmx-online-row">
          <div id="otmx-online-dot"></div>
          <div id="otmx-bot-subtitle">${T.botSubtitle}</div>
        </div>
      </div>
      <div id="otmx-avatar">
        <img src="${CONFIG.avatarImageUrl}" alt="${T.botName}">
      </div>
    </div>
    <div id="otmx-messages"></div>
    <div id="otmx-consent" style="padding: 8px 16px; background: #fff; font-size: 10px; color: #64748b; border-top: 1px solid rgba(0,0,0,0.06); line-height: 1.2; z-index: 10;">
      ${T.consentPart1}
      <a href="/${lang}/privacy" target="_blank" rel="noopener noreferrer" style="color: ${CONFIG.primaryColor}; font-weight: 600; text-decoration: none;">${T.consentLink}</a>
      ${T.consentPart2}
    </div>
    <div id="otmx-input-area">
      <div id="otmx-input-wrapper">
        <div id="otmx-input-gradient"></div>
        <textarea id="otmx-input" placeholder="${T.placeholder}" rows="1"></textarea>
      </div>
      <button id="otmx-send" aria-label="Send">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div> `;

  document.body.appendChild(widget);


  let isBusy = false;
  let awaitingReply = false;
  let lastUserSendAt = 0;
  let pollInterval = null;
  let lastScrollKey = "";

  let sessionId = localStorage.getItem(STORAGE.session);
  if (!sessionId) {
    sessionId = "sess_" + Math.random().toString(36).slice(2, 11);
    localStorage.setItem(STORAGE.session, sessionId);
  }

  let contactSourceId = localStorage.getItem(STORAGE.contact) || "";
  let conversationId = localStorage.getItem(STORAGE.conversation) || "";

  if (contactSourceId && /^\d+$/.test(contactSourceId)) {
    contactSourceId = "";
    localStorage.removeItem(STORAGE.contact);
  }
  if (conversationId && !/^\d+$/.test(conversationId)) {
    conversationId = "";
    localStorage.removeItem(STORAGE.conversation);
  }

  const messagesEl = document.getElementById("otmx-messages");
  const inputEl = document.getElementById("otmx-input");
  const sendBtn = document.getElementById("otmx-send");

  let showCursor = false;
  setInterval(() => {
    if (inputEl.value.length === 0 && document.activeElement !== inputEl) {
      showCursor = !showCursor;
      inputEl.placeholder = T.placeholder + (showCursor ? " |" : "");
    } else {
      inputEl.placeholder = T.placeholder;
    }
  }, 530);

  function scrollToBottom(instant) {
    setTimeout(() => {
      if (messagesEl) {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
    }, instant ? 0 : 50);
  }

  inputEl.addEventListener("focus", () => scrollToBottom(true));

  let typingEl = null;

  function showTyping() {
    if (typingEl) return;
    typingEl = document.createElement("div");
    typingEl.className = "otmx-typing-bubble";
    typingEl.innerHTML = `
      <span class="otmx-dot"></span>
      <span class="otmx-dot"></span>
      <span class="otmx-dot"></span>
    `;
    messagesEl.appendChild(typingEl);
    scrollToBottom();
  }

  function hideTyping() {
    if (typingEl) {
      typingEl.remove();
      typingEl = null;
    }
  }

  function getTime(ts) {
    const d = ts ? new Date(ts) : new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function renderBotText(raw) {
    let s = escapeHtml(raw);
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\[([^\]]+)\]\s*\(\s*([^\s)]+)\s*\)/g, (match, label, url) => {
      let href = url;
      if (/^\+[0-9]/.test(url)) href = "https://wa.me/" + url.replace(/[^0-9]/g, "");
      return `<a href="${href}" target="_blank" style="color:${CONFIG.accentColor}; font-weight:600; text-decoration:underline;">${label}</a>`;
    });
    return s.replace(/\n/g, "<br>");
  }

  function getMessageTextFromEl(el) {
    const content = el.querySelector(".otmx-bubble-content");
    return content ? content.textContent.trim() : "";
  }

  function appendMessage(text, role, options) {
    options = options || {};
    const id = options.id || "local-" + Date.now();
    if (document.querySelector('[data-message-id="' + id + '"]')) return null;

    const msgDir = detectTextDir(text);
    const el = document.createElement("div");
    el.className = "otmx-msg " + role;
    el.dataset.messageId = id;
    if (options.greeting) el.dataset.greeting = "true";

    const content =
      role === "bot" ? renderBotText(text) : escapeHtml(text).replace(/\n/g, "<br>");
    const timeStr = getTime(options.createdAt);

    el.innerHTML =
      '<div class="otmx-bubble" dir="' +
      msgDir +
      '"><span class="otmx-bubble-content">' +
      content +
      '</span><span class="otmx-time">' +
      timeStr +
      "</span></div>";

    messagesEl.appendChild(el);
    scrollToBottom(options.instantScroll);
    return el;
  }

  function removeStaleLocalUserMessages(apiMessages) {
    const apiUserTexts = new Set(
      apiMessages
        .filter(function (m) {
          return m.message_type === 0;
        })
        .map(function (m) {
          return (m.content || "").trim();
        })
    );

    messagesEl.querySelectorAll('[data-message-id^="local-"]').forEach(function (el) {
      const text = getMessageTextFromEl(el);
      if (apiUserTexts.has(text)) el.remove();
    });
  }

  function sortApiMessages(apiMessages) {
    return apiMessages
      .filter(function (m) {
        return m.message_type !== 2 && m.content != null;
      })
      .map(function (m) {
        return {
          id: String(m.id),
          role: m.message_type === 1 ? "bot" : "user",
          text: m.content || "",
          createdAt: chatwootCreatedAt(m.created_at),
        };
      })
      .sort(function (a, b) {
        return a.createdAt - b.createdAt;
      });
  }

  async function ensureChatwootContact() {
    const inbox = CONFIG.chatwoot.inboxIdentifier;
    const base = CONFIG.chatwoot.baseUrl;

    if (contactSourceId) {
      const existing = await fetch(
        base + "/public/api/v1/inboxes/" + inbox + "/contacts/" + contactSourceId,
        { method: "GET" }
      );
      if (existing.ok) return contactSourceId;
      contactSourceId = "";
      localStorage.removeItem(STORAGE.contact);
    }

    const createRes = await fetch(base + "/public/api/v1/inboxes/" + inbox + "/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: sessionId,
        name: "Max Demo Visitor",
      }),
    });

    if (!createRes.ok) throw new Error("Failed to create contact: " + createRes.status);

    const contactData = await createRes.json();
    if (!contactData.source_id) throw new Error("Chatwoot did not return source_id");

    contactSourceId = contactData.source_id;
    localStorage.setItem(STORAGE.contact, contactSourceId);
    return contactSourceId;
  }

  async function sendMessageToChatwoot(userMessage) {
    const inbox = CONFIG.chatwoot.inboxIdentifier;
    const base = CONFIG.chatwoot.baseUrl;

    await ensureChatwootContact();

    if (!conversationId) {
      const convRes = await fetch(
        base +
          "/public/api/v1/inboxes/" +
          inbox +
          "/contacts/" +
          contactSourceId +
          "/conversations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!convRes.ok) throw new Error("Failed to create conversation: " + convRes.status);
      const convData = await convRes.json();
      conversationId = String(convData.id);
      localStorage.setItem(STORAGE.conversation, conversationId);
    }

    const msgRes = await fetch(
      base +
        "/public/api/v1/inboxes/" +
        inbox +
        "/contacts/" +
        contactSourceId +
        "/conversations/" +
        conversationId +
        "/messages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userMessage }),
      }
    );

    if (!msgRes.ok) {
      localStorage.removeItem(STORAGE.contact);
      localStorage.removeItem(STORAGE.conversation);
      contactSourceId = "";
      conversationId = "";
      throw new Error("Failed to send message: " + msgRes.status);
    }

    return msgRes.json();
  }

  async function fetchChatwootMessages() {
    if (!conversationId || !contactSourceId) return;

    const inbox = CONFIG.chatwoot.inboxIdentifier;
    const base = CONFIG.chatwoot.baseUrl;

    try {
      const res = await fetch(
        base +
          "/public/api/v1/inboxes/" +
          inbox +
          "/contacts/" +
          contactSourceId +
          "/conversations/" +
          conversationId +
          "/messages"
      );

      if (res.status === 404) {
        localStorage.removeItem(STORAGE.contact);
        localStorage.removeItem(STORAGE.conversation);
        contactSourceId = "";
        conversationId = "";
        return;
      }

      if (!res.ok) return;

      const data = await res.json();
      const raw = Array.isArray(data) ? data : data.payload || [];
      removeStaleLocalUserMessages(raw);
      const sorted = sortApiMessages(raw);

      let added = false;
      sorted.forEach(function (msg) {
        if (document.querySelector('[data-message-id="' + msg.id + '"]')) return;
        appendMessage(msg.text, msg.role, { id: msg.id, createdAt: msg.createdAt });
        added = true;
      });

      if (added) {
        const last = sorted[sorted.length - 1];
        const scrollKey = sorted.length + ":" + (last ? last.id : "");
        if (scrollKey !== lastScrollKey) {
          lastScrollKey = scrollKey;
          scrollToBottom();
        }
      }

      if (awaitingReply) {
        const newBotReply = sorted.some(function (m) {
          return m.role === "bot" && m.createdAt >= lastUserSendAt - 2000;
        });
        if (newBotReply) {
          awaitingReply = false;
          hideTyping();
        }
      }
    } catch (err) {
      console.error("Max Chatwoot poll error:", err);
    }
  }

  function startPolling() {
    if (pollInterval) return;
    fetchChatwootMessages();
    pollInterval = setInterval(fetchChatwootMessages, 2000);
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || isBusy) return;

    inputEl.value = "";
    inputEl.style.height = "auto";
    inputEl.style.direction = isRTL ? "rtl" : "ltr";
    inputEl.style.textAlign = isRTL ? "right" : "left";

    const localId = "local-" + Date.now();
    appendMessage(text, "user", { id: localId });

    isBusy = true;
    sendBtn.disabled = true;
    awaitingReply = true;
    lastUserSendAt = Date.now();
    showTyping();

    try {
      const sent = await sendMessageToChatwoot(text);
      const el = document.querySelector('[data-message-id="' + localId + '"]');
      if (el) el.dataset.messageId = String(sent.id);
      startPolling();
    } catch (e) {
      console.error("Max send error:", e);
      awaitingReply = false;
      hideTyping();
      appendMessage(T.errorMsg, "bot", { id: "err-" + Date.now() });
    } finally {
      isBusy = false;
      sendBtn.disabled = false;
      if (!("ontouchstart" in window)) inputEl.focus();
    }
  }

  function startGreeting() {
    if (window.chatStarted) return;
    window.chatStarted = true;

    if (conversationId && contactSourceId) {
      fetchChatwootMessages().then(function () {
        scrollToBottom(true);
        startPolling();
      });
      if (!("ontouchstart" in window)) setTimeout(function () {
        inputEl.focus();
      }, 400);
      return;
    }

    setTimeout(function () {
      showTyping();
      setTimeout(function () {
        hideTyping();
        appendMessage(T.greeting1, "bot", { id: "greet-1", greeting: true });

        setTimeout(function () {
          showTyping();
          setTimeout(function () {
            hideTyping();
            appendMessage(T.greeting2, "bot", { id: "greet-2", greeting: true });
            if (!("ontouchstart" in window))
              setTimeout(function () {
                inputEl.focus();
              }, 400);
          }, 1500);
        }, 500);
      }, 4000);
    }, 300);
  }

  window.addEventListener("message", function (event) {
    if (event.data === "start-chat") {
      startGreeting();
    }
  });

  if (conversationId && contactSourceId) {
    startPolling();
  }

  messagesEl.addEventListener(
    "touchmove",
    function (e) {
      const atTop = messagesEl.scrollTop === 0;
      const atBottom =
        messagesEl.scrollTop + messagesEl.clientHeight >= messagesEl.scrollHeight;
      const scrollingUp = e.touches[0].clientY > (messagesEl._lastTouchY || 0);
      const scrollingDown = !scrollingUp;
      messagesEl._lastTouchY = e.touches[0].clientY;
      if ((atTop && scrollingUp) || (atBottom && scrollingDown)) e.preventDefault();
      e.stopPropagation();
    },
    { passive: false }
  );

  messagesEl.addEventListener(
    "touchstart",
    function (e) {
      messagesEl._lastTouchY = e.touches[0].clientY;
    },
    { passive: true }
  );

  inputEl.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 110) + "px";
    const dir = detectTextDir(this.value);
    this.style.direction = dir;
    this.style.textAlign = dir === "rtl" ? "right" : "left";
  });

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
})();
