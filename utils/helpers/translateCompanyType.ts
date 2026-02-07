const COMPANY_TYPE_MAP: Record<string, Record<string, string>> = {
  ru: {
    ООО: 'ООО',
    ОАО: 'ОАО',
    ЗАО: 'ЗАО',
    АО: 'АО',
    ИП: 'ИП'
  },
  uz: {
    ООО: 'MCHJ',
    ОАО: 'OAJ',
    ЗАО: 'YoAJ',
    АО: 'AJ',
    ИП: 'YaTT'
  }
};

export const translateCompanyName = (name: string | undefined, locale: string): string => {
  if (!name) return '';

  const map = COMPANY_TYPE_MAP[locale] || COMPANY_TYPE_MAP.ru;

  let result = name;

  Object.entries(COMPANY_TYPE_MAP.ru).forEach(([ruType]) => {
    const translatedType = map[ruType] || ruType;
    result = result.replace(new RegExp(`^${ruType}\\s`, 'g'), `${translatedType} `);
    result = result.replace(new RegExp(`«${ruType}\\s`, 'g'), `«${translatedType} `);
  });

  return result;
};
