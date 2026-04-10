"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "en" | "zh";

const translations: Record<string, Record<Locale, string>> = {
  // Nav
  "nav.compare": { en: "Compare Rates", zh: "比較匯率" },
  "nav.language": { en: "中文", zh: "EN" },

  // Home
  "home.badge": { en: "6 providers compared for you", zh: "已為你比較 6 間匯款平台" },
  "home.hero1": { en: "Send HK$10,000 overseas", zh: "匯 HK$10,000 去海外" },
  "home.hero2": { en: "Save up to ₱2,816", zh: "慳高達 ₱2,816" },
  "home.sub": { en: "Same amount, different providers, different result. See which one gives you the most.", zh: "同一筆錢，唔同平台，結果可以差好遠。即刻睇邊間最抵。" },
  "home.cta1": { en: "Compare Rates Now", zh: "即時比較匯率" },
  "home.cta2": { en: "🇵🇭 Send to Philippines", zh: "🇵🇭 匯去菲律賓" },
  "home.corridors": { en: "Popular corridors", zh: "熱門走廊" },
  "home.corridors.title": { en: "Where are you sending?", zh: "從香港匯款去邊？" },
  "home.compare": { en: "Compare rates →", zh: "比較匯率 →" },
  "home.why": { en: "Why WeeCove?", zh: "點解用 WeeCove？" },
  "home.independent": { en: "Independent", zh: "獨立" },
  "home.independent.desc": { en: "Not owned by any provider. Whoever gives you the most, ranks first.", zh: "唔屬於任何匯款公司。邊間最抵，排最高。" },
  "home.transparent": { en: "Transparent", zh: "透明" },
  "home.transparent.desc": { en: "No hidden fees. You see exactly what you pay and what arrives.", zh: "冇隱藏收費。你付幾多、到幾多，一目了然。" },
  "home.realtime": { en: "Quick", zh: "快捷" },
  "home.realtime.desc": { en: "Enter your amount, pick a country, see results instantly.", zh: "輸入金額、揀國家、即刻出結果。" },
  "home.warning": { en: "Some comparison sites are owned by money transfer companies. WeeCove is fully independent. Our only criterion: who gives you the best rate.", zh: "有啲比較網站其實係匯款公司擁有嘅。WeeCove 完全獨立。我哋只睇一樣嘢：邊間最抵。" },
  "home.providers": { en: "Data from official provider websites", zh: "資料來源：各平台官方網站" },

  // Stats
  "stats.comparisons": { en: "Comparisons", zh: "匯率比較" },
  "stats.providers": { en: "Providers", zh: "平台" },
  "stats.corridors": { en: "Corridors", zh: "走廊" },

  // Table
  "table.yousend": { en: "You send", zh: "你匯" },
  "table.savings": { en: "You save up to", zh: "最多慳" },
  "table.best": { en: "Best rate", zh: "最抵" },
  "table.sendnow": { en: "Send with this →", zh: "用呢間匯 →" },
  "table.compare": { en: "See details →", zh: "睇詳情 →" },
  "table.disclaimer": { en: "Rates shown for reference, updated regularly. WeeCove is independent, not owned by any provider.", zh: "匯率僅供參考，定期更新。WeeCove 係獨立嘅，唔屬於任何匯款公司。" },

  // Rate Alert
  "alert.title": { en: "Get notified when rates drop", zh: "匯率跌咗即刻通知你" },
  "alert.sub": { en: "We check daily. You send at the best time.", zh: "我哋每日 check。你喺最抵嗰刻先匯。" },
  "alert.placeholder": { en: "Your email", zh: "你嘅 email" },
  "alert.button": { en: "Notify me", zh: "通知我" },
  "alert.done": { en: "You're in. We'll email you when rates drop.", zh: "搞掂。匯率跌咗會 email 你。" },
  "alert.privacy": { en: "No spam. Unsubscribe anytime. WeeCove will never ask for your password, bank details, or payment information via email.", zh: "冇垃圾郵件。隨時退訂。WeeCove 絕不會透過 email 向你索取密碼、銀行資料或付款資訊。" },

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
