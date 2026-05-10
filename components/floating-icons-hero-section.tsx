"use client";
import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string;
}

export interface FloatingIconsHeroProps {
  titles: string[];
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  icons: IconProps[];
}

const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
          Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('absolute', iconData.className)}
    >
      <motion.div
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-card/80 backdrop-blur-md border border-border/10"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <iconData.icon className="w-8 h-8 md:w-10 md:h-10 text-foreground" />
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, titles, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  // --- Optimized Typewriter Logic Start ---
  const [displayText, setDisplayText] = React.useState("");
  const [titleIndex, setTitleIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentFullText = titles[titleIndex];

    // CALCULATE SPEEDS: 
    // Typing: Total 2000ms / string length
    // Deleting: Total 1000ms / string length
    const typeSpeed = 700 / currentFullText.length;
    const deleteSpeed = 100 / currentFullText.length;
    const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        setDisplayText(currentFullText.substring(0, displayText.length + 1));

        if (displayText === currentFullText) {
          // Pause for 2 seconds when word is complete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting phase
        setDisplayText(currentFullText.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, currentSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, titles]);
  // --- Typewriter Logic End ---

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20 pb-12 md:py-0',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto">
        {icons.map((iconData, index) => (
          <Icon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text min-h-[3.2em] leading-[1.1]">
          {displayText}
          <span className="ml-1 text-violet-600 animate-pulse">|</span>
        </h1>
        <h2 className="mt-6 max-w-lg mx-auto text-lg md:text-2xl font-bold text-foreground/80 leading-relaxed">
          {subtitle}
        </h2>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="sm:min-w-[200px] px-10 py-7 text-lg font-black bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl shadow-xl shadow-zinc-200 transition-transform duration-300 hover:scale-105 active:scale-95">
            <Link href={ctaHref as any}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';
export { FloatingIconsHero };
