import "i18next";
import { ParseKeys, TOptions } from "i18next";
import { defaultNS, resources } from "./i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["vi"];
  }
}

type TranslationKey = ParseKeys<"translation", TOptions, undefined>;
