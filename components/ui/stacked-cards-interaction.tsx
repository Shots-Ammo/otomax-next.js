"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "framer-motion";

import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

const Card = ({
  className,
  title,
  description,
  ctaText,
  ctaLink,
  backgroundImage,
}: {
  className?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full max-w-[350px] sm:w-[350px] h-[450px] sm:h-[400px] overflow-hidden bg-white rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col mx-auto sm:mx-0",
        className
      )}
    >
      <div 
        className="flex-1 flex flex-col justify-center px-6 sm:px-8 text-center relative overflow-hidden"
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="px-6 py-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/50">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight whitespace-nowrap">{title}</h3>
          </div>
          <div className="px-6 py-4 bg-white/90 backdrop-blur-md rounded-[2rem] shadow-xl border border-white/40 max-w-[95%]">
            <p className="text-gray-900 text-sm sm:text-base leading-relaxed font-bold italic">"{description}"</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-8 border-t border-gray-50 bg-white mt-auto">
        <Link
          href={ctaLink}
          className="block w-full py-4 rounded-2xl bg-violet-600 text-white text-center font-black hover:bg-violet-700 transition shadow-xl shadow-violet-200 active:scale-[0.95]"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export interface CardData {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

const StackedCardsInteraction = ({
  cards,
  spreadDistance = 40,
  rotationAngle = 5,
}: {
  cards: CardData[];
  spreadDistance?: number;
  rotationAngle?: number;
}) => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [cardsOrder, setCardsOrder] = useState<CardData[]>(cards);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setCardsOrder(cards);
  }, [cards]);

  const handleNext = () => {
    // Move the top card to the back
    setCardsOrder((prev) => {
      const newOrder = [...prev];
      const topCard = newOrder.shift();
      if (topCard) newOrder.push(topCard);
      return newOrder;
    });
  };

  const handlePrev = () => {
    // Move the back card to the front
    setCardsOrder((prev) => {
      const newOrder = [...prev];
      const backCard = newOrder.pop();
      if (backCard) newOrder.unshift(backCard);
      return newOrder;
    });
  };

  const handleCardClick = (clickedTitle: string) => {
    setCardsOrder((prev) => {
      const index = prev.findIndex((c) => c.title === clickedTitle);
      if (index <= 0) return prev;

      const newOrder = [...prev];
      const clickedCard = newOrder.splice(index, 1)[0];
      newOrder.unshift(clickedCard);
      return newOrder;
    });
  };

  return (
    <div id="services" ref={sectionRef} className="relative w-full h-full flex flex-col items-center justify-center py-20 bg-gray-50 overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-bold text-gray-900 mb-16 text-center"
      >
        {t("services.title")}
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center overflow-visible"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 w-full max-w-5xl scale-[0.75] min-[400px]:scale-[0.85] sm:scale-100 origin-center px-4">
        <button
          onClick={handlePrev}
          className="z-50 p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 border border-gray-100 transition-all active:scale-95 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label="Previous card"
        >
          {isRTL ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
        </button>

        <div className="relative w-[350px] md:w-[510px] h-[400px] flex justify-center">
          <div className="relative w-[350px] h-full">
            <AnimatePresence>
              {cardsOrder.map((card, index) => {
                const isFirst = index === 0;

                let xOffset = 0;
                let rotation = 0;

                if (index > 0) {
                  // Alternate sides: left, right, left, right...
                  const direction = index % 2 === 1 ? -1 : 1;
                  const step = Math.ceil(index / 2);
                  xOffset = spreadDistance * step * direction;
                  rotation = rotationAngle * step * direction;
                }

                return (
                  <motion.div
                    key={card.title} // Use unique title as key
                    layout
                    className={cn(
                      "absolute cursor-pointer",
                      isFirst ? "z-50" : "z-0"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      x: xOffset,
                      rotate: rotation,
                      zIndex: cardsOrder.length - index,
                      scale: isFirst ? 1 : 1 - (index * 0.04), // scale down background cards slightly
                      opacity: 1,
                      y: isFirst ? 0 : index * 8, // lower background cards
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      type: "spring",
                      bounce: 0.3,
                    }}
                    onClick={() => handleCardClick(card.title)}
                  >
                    <Card
                      className={isFirst ? "shadow-2xl ring-1 ring-black/5" : "hover:brightness-95 transition-all"}
                      title={card.title}
                      description={card.description}
                      ctaText={card.ctaText}
                      ctaLink={card.ctaLink}
                      backgroundImage={card.backgroundImage}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="z-50 p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 border border-gray-100 transition-all active:scale-95 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label="Next card"
        >
          {isRTL ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
        </button>
        </div>
      </motion.div>

    </div>
  );
};

export { StackedCardsInteraction, Card };
