'use server';

import { cookies } from 'next/headers';

export const setLocaleAction = async (locale: Locale) => {
  const cookieStore = await cookies();

  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax'
  });
};
