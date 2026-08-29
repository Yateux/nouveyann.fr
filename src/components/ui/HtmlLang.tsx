"use client";

import { useEffect } from "react";
import { htmlLang, type Locale } from "@/i18n/config";

export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = htmlLang[locale];
    return () => {
      document.documentElement.lang = previous;
    };
  }, [locale]);

  return null;
}
