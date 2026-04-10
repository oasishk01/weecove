"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "en" | "zh";

const translations: Record<string, Record<Locale, string>> = {
  // Nav
  "nav.compare": { en: "Compare Rates", zh: "比較匯率" },
  "nav.language": { en: "中文", zh: "EN" },

  // Home
  "home.badge": { en: "Did you know choosing wrong costs you money?", zh: "你知唔知揀錯匯款方法可以蝕幾多？" },
  "home.hero1": { en: "Send HK$10,000 to Philippines", zh: "匯 HK$10,000 去菲律賓" },
  "home.hero2": { en: "Wrong choice costs ₱2,816", zh: "揀錯蝕 ₱2,816" },
  "home.sub": { en: "Compare 6 providers instantly. Find the cheapest way to send money from Hong Kong.", zh: "即時比較 6 間匯款平台嘅匯率同手續費。搵到最平嘅匯款方法。" },
  "home.cta1": { en: "Compare Rates Now", zh: "即時比較匯率" },
  "home.cta2": { en: "🇵🇭 Send to Philippines", zh: "🇵🇭 匯去菲律賓" },
  "home.corridors": { en: "Popular corridors", zh: "熱門走廊" },
  "home.corridors.title": { en: "Where are you sending?", zh: "從香港匯款去邊？" },
  "home.compare": { en: "Compare rates →", zh: "比較匯率 →" },
  "home.why": { en: "Why WeeCove?", zh: "點解用 WeeCove？" },
  "home.independent": { en: "Independent", zh: "獨立" },
  "home.independent.desc": { en: "Not owned by any money transfer company. Rankings based purely on data: whoever delivers the most money, ranks highest.", zh: "唔屬於任何匯款公司。排名純粹基於數據：邊間畀你收到最多錢，排最高。" },
  "home.transparent": { en: "Transparent", zh: "透明" },
  "home.transparent.desc": { en: "Real exchange rates and fees shown. No more hidden costs behind 'zero fee' marketing.", zh: "顯示真實匯率同手續費。唔好再被「零手續費」呃。" },
  "home.realtime": { en: "Updated", zh: "定期更新" },
  "home.realtime.desc": { en: "Rates checked regularly. Enter your amount and instantly see the difference.", zh: "匯率定期更新。輸入金額即刻睇到每間嘅差別。" },
  "home.warning": { en: "Did you know? Some comparison sites (like Exiap) are owned by money transfer companies. WeeCove is fully independent. Our only ranking criterion: who delivers the most money.", zh: "你知道嗎？某些匯款比較網站（例如 Exiap）實際上係被匯款公司擁有嘅。WeeCove 係完全獨立嘅。我哋嘅排名只基於一個標準：邊間畀你收到最多錢。" },
  "home.providers": { en: "Data from official provider websites", zh: "資料來源：各平台官方網站" },

  // Stats
  "stats.comparisons": { en: "Comparisons", zh: "匯率比較" },
  "stats.providers": { en: "Providers", zh: "平台" },
  "stats.corridors": { en: "Corridors", zh: "走廊" },

  // Table
  "table.yousend": { en: "You send", zh: "你匯" },
  "table.savings": { en: "Choose the best, receive more", zh: "揀最平可以多收" },
  "table.best": { en: "Best rate", zh: "最佳匯率" },
  "table.sendnow": { en: "Send now →", zh: "立即匯款 →" },
  "table.compare": { en: "Compare →", zh: "比較 →" },
  "table.yearloss": { en: "/year lost", zh: "/年蝕" },
  "table.disclaimer": { en: "Rates are indicative and updated regularly. WeeCove is independent and not owned by any money transfer provider.", zh: "匯率僅供參考，定期更新。WeeCove 係獨立嘅，唔屬於任何匯款公司。" },

  // Clock
  "clock.checked": { en: "Last checked", zh: "上次更新" },
};

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback(
    (key: string) => translations[key]?.[locale] || key,
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <button
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      className="text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-600 px-2.5 py-1.5 rounded-md transition-colors"
    >
      {locale === "en" ? "中文" : "EN"}
    </button>
  );
}
