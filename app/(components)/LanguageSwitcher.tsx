import { setLocaleAction } from '@/app/actions/locale';
import { ActionIcon, Menu } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useIntl } from 'react-intl';

const LANGUAGES = [
  { value: 'ru', label: 'Русский' },
  { value: 'uz', label: 'Oʻzbekcha' }
] as const;

export const LanguageSwitcher = () => {
  const intl = useIntl();

  const handleLanguageChange = async (newLocale: Locale) => {
    await setLocaleAction(newLocale);
  };

  return (
    <Menu position='bottom-end' withArrow shadow='md'>
      <Menu.Target>
        <ActionIcon
          variant='subtle'
          size='lg'
          aria-label={intl.formatMessage({ id: 'language.toggle' })}
        >
          <IconLanguage size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {LANGUAGES.map((language) => (
          <Menu.Item
            key={language.value}
            onClick={() => handleLanguageChange(language.value)}
            style={{
              fontWeight: language.value === intl.locale ? 600 : 400,
              backgroundColor:
                language.value === intl.locale ? 'var(--mantine-color-teal-light)' : undefined
            }}
          >
            {language.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
