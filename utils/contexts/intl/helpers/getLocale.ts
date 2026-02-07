import { cookies } from 'next/headers';

export const getLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value;

  if (locale === 'ru' || locale === 'uz') {
    return locale;
  }

  return 'ru';
};
