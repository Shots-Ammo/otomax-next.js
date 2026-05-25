import type { Metadata } from "next";
import { Outfit, Inter, Cairo } from "next/font/google";
import "./globals.css";
import Noura from '@/components/get_bot';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gulf Evento | Premier General Contracting & Architectural Engineering",
  description: "Established in Al Jubail in 1435 H, Gulf Evento delivers elite structural concrete, custom architectural finishes, complex electrical networks, HVAC climate control, and luxury engineering solutions across Saudi Arabia.",
  keywords: ["Gulf Evento", "Contracting Al Jubail", "Saudi Arabia Construction", "Architectural Finishing Jubail", "Structural Concrete", "Luxury Architecture Saudi"],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html
      lang={locale || "en"}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${outfit.variable} ${inter.variable} ${cairo.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-sans min-h-full bg-cream text-charcoal flex flex-col">
        {children}
        <Noura />
      </body>
    </html>
  );
}
