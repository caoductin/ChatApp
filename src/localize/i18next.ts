import i18next from "i18next";
import vi from "./language/vi.json";
import en from "./language/en.json";
import { useTranslation, initReactI18next } from "react-i18next";

export const defaultNS = "translation";

export const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
} as const;

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  defaultNS,
  resources,
});
