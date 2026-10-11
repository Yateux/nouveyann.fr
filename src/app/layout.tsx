import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { isPlaceholder, siteConfig } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

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
  // Small labels only, never the first thing on screen: no need to fetch it
  // ahead of the text and the captures.
  preload: false,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1218" },
  ],
  colorScheme: "light dark",
};

// Runs before the first paint, so the page never flashes the wrong theme: the
// visitor's saved choice if there is one, otherwise the system setting. The
// key matches THEME_STORAGE_KEY in ThemeToggle. The same goes for the
// "pause animations" choice (MOTION_STORAGE_KEY in lib/motion). Last, the
// document language: the server marks every page as French, so English pages
// are corrected here, before anything reads them.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;if(localStorage.getItem("motion")==="reduce"){document.documentElement.dataset.motion="reduce"}}catch(e){}if(/^\\/en(\\/|$)/.test(location.pathname)){document.documentElement.lang="en"}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      // Smooth scrolling is for in-page jumps only: with this attribute Next
      // switches it off while navigating, so a new page opens at the top
      // instead of scrolling up to it.
      data-scroll-behavior="smooth"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
      // The theme script sets data-theme before React takes over.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        {children}

        <Analytics />
      </body>
    </html>
  );
}
