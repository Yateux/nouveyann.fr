import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { isPlaceholder, siteConfig } from "@/data/site";

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

const display = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono-face",
  display: "swap",
});

export const revalidate = 86_400;

const HOME_TITLE = "Yann Nouve, développeur web freelance en Île-de-France";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: HOME_TITLE,
    template: "%s | Yann Nouve",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "développeur freelance Île-de-France",
    "développeur web freelance",
    "développeur Next.js freelance",
    "développeur React freelance",
    "freelance React Native",
    "création de site web freelance",
  ],
  alternates: {
    canonical: "/",
    languages: { fr: "/", en: "/en" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: HOME_TITLE,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    ...(isPlaceholder(siteConfig.xHandle)
      ? {}
      : { creator: `@${siteConfig.xHandle}` }),
    title: HOME_TITLE,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f3f4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>

        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Aller au contenu
        </a>

        {children}
      </body>
    </html>
  );
}
