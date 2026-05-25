"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Phone, MessageCircle, MapPin, Send, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactProps {
  isArabic: boolean;
}

type FormStep = 1 | 2 | 3;

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick, disabled, type = "button" }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX * 0.3); // Magnetic pull strength
    y.set(mouseY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default function Contact({ isArabic }: ContactProps) {
  const [step, setStep] = useState<FormStep>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [projectScale, setProjectScale] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const services = [
    { id: "concrete", name: isArabic ? "الهياكل الخرسانية" : "Concrete Structures" },
    { id: "finishing", name: isArabic ? "التشطيبات الراقية" : "Architectural Finishing" },
    { id: "design", name: isArabic ? "التصميم المعماري" : "Architectural Design" },
    { id: "mep", name: isArabic ? "الأنظمة الميكانيكية والكهربائية (HVAC/إطفاء)" : "MEP Systems (HVAC/Fire/Plumbing)" },
  ];

  const scales = [
    { id: "residential", name: isArabic ? "فيلا سكنية فاخرة" : "Luxury Residential Estate" },
    { id: "commercial", name: isArabic ? "مجمع / مبنى تجاري" : "Commercial Complex" },
    { id: "industrial", name: isArabic ? "مستودع / منشأة صناعية" : "Industrial Infrastructure" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance (staggered lines/fade)
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Contact cards stagger
      if (contactCardsRef.current) {
        gsap.fromTo(
          contactCardsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
            },
          }
        );
      }

      // Form entrance (slide in depending on layout dir)
      gsap.fromTo(
        formRef.current,
        { x: isArabic ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isArabic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  const getWhatsAppURL = () => {
    const text = isArabic
      ? `مرحباً شركة جلف إيفينتو، لقد قمت بتعبئة مخطط المشروع عبر الموقع للتواصل معي:\nالاسم: ${name}\nالهاتف: ${phone}\nنوع الخدمة: ${selectedService}\nحجم المشروع: ${projectScale}`
      : `Hello Gulf Evento, I have completed your luxury project planner online:\nName: ${name}\nPhone: ${phone}\nService: ${selectedService}\nScale: ${projectScale}`;
    return `https://wa.me/966507506633?text=${encodeURIComponent(text)}`;
  };

  // Framer Motion variants for form steps
  const stepVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? (isArabic ? -30 : 30) : (isArabic ? 30 : -30),
      scale: 0.95
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 30 }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? (isArabic ? -30 : 30) : (isArabic ? 30 : -30),
      scale: 0.95,
      transition: { duration: 0.3 }
    })
  };

  const [direction, setDirection] = useState(1);

  const nextStep = () => {
    setDirection(1);
    setStep((s) => (s + 1) as FormStep);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => (s - 1) as FormStep);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-charcoal text-cream relative overflow-hidden"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetrical typography & Direct Inquiries */}
          <div className="lg:w-1/2 flex flex-col items-start pr-0 lg:pr-12">
            <div ref={headerRef} className="mb-16">
              <div className="overflow-hidden mb-4">
                <span className="inline-block text-xs font-heading font-bold tracking-[0.2em] text-accent uppercase px-4 py-1.5 border border-accent/30 rounded-full">
                  {isArabic ? "تواصل معنا" : "Direct Inquiries"}
                </span>
              </div>
              <h2 className="font-heading text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                {isArabic ? "لنبني معاً" : "Let's Build"}
                <br />
                <span className="text-primary italic font-light">{isArabic ? "إرثاً لا يُنسى" : "Your Legacy."}</span>
              </h2>
              <p className="text-cream/70 font-light text-base sm:text-lg leading-relaxed max-w-lg">
                {isArabic
                  ? "ابدأ مناقشة فخامة مشروعك القادم اليوم. تواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني أو تفضل بزيارة مكتبنا الرئيسي بمدينة الجبيل."
                  : "Initiate your premium architectural development today. Connect directly with our Jubail engineering headquarters via phone, messaging, or email."}
              </p>
            </div>

            {/* Direct Details Grid - Modernized */}
            <div ref={contactCardsRef} className="flex flex-col gap-4 w-full max-w-md">
              <a
                href="tel:0136647813"
                className="flex items-center gap-6 group p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm rounded-3xl w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  <Phone size={24} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-heading font-semibold tracking-widest text-cream/50 uppercase mb-1">
                    {isArabic ? "الهاتف الرئيسي للمكتب" : "Jubail Office Landline"}
                  </span>
                  <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    013-6647813
                  </span>
                </div>
              </a>

              <a
                href="https://wa.me/966507506633"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 group p-5 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm rounded-3xl w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle size={24} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-heading font-semibold tracking-widest text-cream/50 uppercase mb-1">
                    {isArabic ? "محادثة مباشرة واتساب" : "Direct WhatsApp Liaison"}
                  </span>
                  <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    +966 50 750 6633
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-6 p-5 bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl w-full">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-heading font-semibold tracking-widest text-cream/50 uppercase mb-1">
                    {isArabic ? "المقر الرئيسي" : "Headquarters"}
                  </span>
                  <span className="text-sm text-cream/90 font-light leading-relaxed">
                    {isArabic
                      ? "مدينة الجبيل، المنطقة الشرقية، المملكة العربية السعودية"
                      : "Al Jubail, Eastern Province, Saudi Arabia"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Form Modal-Style */}
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0 relative z-20">
            <div 
              ref={formRef}
              className="bg-white text-charcoal rounded-[2.5rem] p-8 sm:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative overflow-hidden lg:-ml-12"
            >
              {/* Form internal subtle gradient */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col min-h-[420px] justify-between relative z-10">
                    <div>
                      {/* Interactive Progress Indicators */}
                      <div className="flex items-center justify-between mb-10">
                        <span className="font-heading font-bold text-sm text-primary uppercase tracking-widest">
                          {isArabic ? "مخطط المشروع الفاخر" : "Luxury Project Planner"}
                        </span>
                        <div className="flex gap-2">
                          {[1, 2, 3].map((i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "h-1 rounded-full transition-all duration-500",
                                step >= i ? "bg-primary w-6" : "bg-charcoal/10 w-2"
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Step Contents */}
                      <div className="relative overflow-visible min-h-[220px]">
                        <AnimatePresence custom={direction} mode="wait">
                          {step === 1 && (
                            <motion.div
                              key="step1"
                              custom={direction}
                              variants={stepVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="flex flex-col gap-6 w-full absolute"
                            >
                              <h3 className="font-heading text-xl font-bold text-charcoal uppercase tracking-wider mb-2">
                                {isArabic ? "١. نوع الخدمة الهندسية" : "1. Engineering Domain"}
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {services.map((srv) => (
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    key={srv.id}
                                    onClick={() => setSelectedService(srv.name)}
                                    className={cn(
                                      "p-5 border rounded-2xl transition-all duration-300 font-heading text-xs uppercase tracking-wider",
                                      isArabic ? "text-right" : "text-left",
                                      selectedService === srv.name
                                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                                        : "border-charcoal/10 bg-cream text-charcoal hover:border-primary/50"
                                    )}
                                  >
                                    {srv.name}
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {step === 2 && (
                            <motion.div
                              key="step2"
                              custom={direction}
                              variants={stepVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="flex flex-col gap-6 w-full absolute"
                            >
                              <h3 className="font-heading text-xl font-bold text-charcoal uppercase tracking-wider mb-2">
                                {isArabic ? "٢. نطاق وحجم المشروع" : "2. Project Scale"}
                              </h3>
                              <div className="grid grid-cols-1 gap-4">
                                {scales.map((scl) => (
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    key={scl.id}
                                    onClick={() => setProjectScale(scl.name)}
                                    className={cn(
                                      "p-5 border rounded-2xl transition-all duration-300 font-heading text-xs uppercase tracking-wider",
                                      isArabic ? "text-right" : "text-left",
                                      projectScale === scl.name
                                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                                        : "border-charcoal/10 bg-cream text-charcoal hover:border-primary/50"
                                    )}
                                  >
                                    {scl.name}
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {step === 3 && (
                            <motion.div
                              key="step3"
                              custom={direction}
                              variants={stepVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="flex flex-col gap-6 w-full absolute"
                            >
                              <h3 className="font-heading text-xl font-bold text-charcoal uppercase tracking-wider mb-2">
                                {isArabic ? "٣. بيانات التواصل" : "3. Contact Information"}
                              </h3>
                              <div className="flex flex-col gap-5">
                                <div className="relative group">
                                  <input
                                    required
                                    type="text"
                                    placeholder={isArabic ? "الاسم الكريم بالكامل" : "Full Name"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-cream/50 border-b-2 border-charcoal/10 px-4 py-4 focus:border-primary outline-none text-charcoal text-base transition-colors placeholder:text-charcoal/30"
                                  />
                                </div>
                                <div className="relative group">
                                  <input
                                    required
                                    type="email"
                                    placeholder={isArabic ? "البريد الإلكتروني" : "Email Address"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-cream/50 border-b-2 border-charcoal/10 px-4 py-4 focus:border-primary outline-none text-charcoal text-base transition-colors placeholder:text-charcoal/30"
                                  />
                                </div>
                                <div className="relative group">
                                  <input
                                    type="tel"
                                    placeholder={isArabic ? "رقم الجوال (اختياري)" : "Phone Number (Optional)"}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-cream/50 border-b-2 border-charcoal/10 px-4 py-4 focus:border-primary outline-none text-charcoal text-base transition-colors placeholder:text-charcoal/30"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Step Navigation Controls */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-charcoal/5">
                      {step > 1 ? (
                        <MagneticButton
                          onClick={prevStep}
                          className="flex items-center gap-2 text-charcoal/50 hover:text-charcoal transition-colors font-heading font-bold text-xs tracking-wider uppercase px-4 py-2 z-10"
                        >
                          {isArabic ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                          {isArabic ? "رجوع" : "Back"}
                        </MagneticButton>
                      ) : (
                        <div />
                      )}

                      {step < 3 ? (
                        <MagneticButton
                          disabled={step === 1 ? !selectedService : !projectScale}
                          onClick={nextStep}
                          className={cn(
                            "flex items-center gap-3 px-8 py-4 font-heading font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 z-10 relative",
                            (step === 1 ? selectedService : projectScale)
                              ? "bg-charcoal text-white shadow-xl hover:shadow-2xl hover:bg-black"
                              : "bg-charcoal/5 text-charcoal/30 cursor-not-allowed"
                          )}
                        >
                          {isArabic ? "التالي" : "Next"}
                          {isArabic ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                        </MagneticButton>
                      ) : (
                        <MagneticButton
                          type="submit"
                          disabled={!name || !email}
                          className={cn(
                            "flex items-center gap-3 px-8 py-4 font-heading font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 z-10 relative",
                            name && email
                              ? "bg-primary text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:bg-primary/90 cursor-pointer"
                              : "bg-charcoal/5 text-charcoal/30 cursor-not-allowed"
                          )}
                        >
                          {isArabic ? "إرسال الطلب" : "Submit Request"}
                          <Send size={16} />
                        </MagneticButton>
                      )}
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center text-center py-12 min-h-[420px] relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 size={80} className="text-primary mb-8" />
                    </motion.div>
                    
                    <h3 className="font-heading text-3xl font-bold text-charcoal mb-4 uppercase tracking-wide">
                      {isArabic ? "تم استلام الطلب" : "Request Received"}
                    </h3>
                    <p className="text-charcoal/60 max-w-sm font-light text-base mb-10 leading-relaxed">
                      {isArabic
                        ? `شكراً لك يا ${name}. لقد قمنا بتسجيل طلبك لخدمات (${selectedService}). للتواصل المباشر والسريع، يمكنك إرسال الطلب فوراً عبر واتساب.`
                        : `Thank you, ${name}. Your request for ${selectedService} is logged. For immediate support, launch your details directly into our WhatsApp hub.`}
                    </p>

                    <div className="flex flex-col gap-4 w-full max-w-xs">
                      <MagneticButton
                        onClick={() => window.open(getWhatsAppURL(), "_blank")}
                        className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-xs tracking-wider uppercase py-4 rounded-full shadow-lg shadow-emerald-500/20 transition-colors z-10"
                      >
                        <MessageCircle size={18} />
                        {isArabic ? "تواصل واتساب فوراً" : "Launch WhatsApp"}
                      </MagneticButton>
                      
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setStep(1);
                          setName("");
                          setEmail("");
                          setPhone("");
                          setSelectedService("");
                          setProjectScale("");
                        }}
                        className="text-xs font-bold text-charcoal/40 hover:text-primary transition-colors underline underline-offset-4 mt-2 z-10 relative"
                      >
                        {isArabic ? "إنشاء طلب جديد" : "Start New Project"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

