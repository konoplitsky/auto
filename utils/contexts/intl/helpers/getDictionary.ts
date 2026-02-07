import 'server-only';
export type Messages = typeof import('@/public/locales/ru.json');

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  ru: () => import('@/public/locales/ru.json').then((m) => m.default),
  uz: () => import('@/public/locales/uz.json').then((m) => m.default)
};

const fallbackLocale: Locale = 'ru';

export const getDictionary = async (locale: Locale): Promise<Messages> => {
  const loader = dictionaries[locale] ?? dictionaries[fallbackLocale];
  return loader();
};
