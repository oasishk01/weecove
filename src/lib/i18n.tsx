"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "en" | "zh";

const translations: Record<string, Record<Locale, string>> = {
  // Nav
  "nav.compare": { en: "Compare Rates", zh: "比較匯率" },
  "nav.language": { en: "中文", zh: "EN" },

  // Home
  "home.badge": { en: "We compare, so you don't have to", zh: "我哋幫你比較，你唔使逐間查" },
  "home.hero1": { en: "Send more money home", zh: "匯更多錢返屋企" },
  "home.hero2": { en: "We found you ₱2,816 more", zh: "我哋幫你多收 ₱2,816" },
  "home.sub": { en: "Compare 6 providers in seconds. See exactly how much your family receives.", zh: "幾秒比較 6 間平台。即刻睇到屋企人收到幾多。" },
  "home.cta1": { en: "Compare Rates Now", zh: "即時比較匯率" },
  "home.cta2": { en: "🇵🇭 Send to Philippines", zh: "🇵🇭 匯去菲律賓" },
  "home.corridors": { en: "Popular corridors", zh: "熱門走廊" },
  "home.corridors.title": { en: "Where are you sending?", zh: "從香港匯款去邊？" },
  "home.compare": { en: "Compare rates →", zh: "比較匯率 →" },
  "home.why": { en: "Why WeeCove?", zh: "點解用 WeeCove？" },
  "home.independent": { en: "Independent", zh: "獨立" },
  "home.independent.desc": { en: "Not owned by any money transfer company. Rankings based purely on data: whoever delivers the most money, ranks highest.", zh: "唔屬於任何匯款公司。排名純粹基於數據：邊間畀你收到最多錢，排最高。" },
  "home.transparent": { en: "Transparent", zh: "透明" },
  "home.transparent.desc": { en: "Real exchange rates and fees shown. See exactly what you pay and what your family receives.", zh: "顯示真實匯率同手續費。清楚睇到你付幾多、屋企人收到幾多。" },
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
  "table.savings": { en: "Your family receives more with the right choice", zh: "揀啱嘅話，屋企人多收" },
  "table.best": { en: "Best value for you", zh: "最抵之選" },
  "table.sendnow": { en: "Send now →", zh: "立即匯款 →" },
  "table.compare": { en: "Learn more →", zh: "了解更多 →" },
  "table.saveyear": { en: "/year saved", zh: "/年慳到" },
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
