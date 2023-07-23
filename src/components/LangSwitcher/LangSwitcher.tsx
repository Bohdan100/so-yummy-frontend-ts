import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UA, GB } from 'country-flag-icons/react/1x1';
import { Flag, Container, Title, Button, Box } from './LangSwitcher.styled';

interface IFlags {
  en: JSX.Element;
  uk: JSX.Element;
}
interface ILocales {
  en: { title: string };
  uk: { title: string };
}

const LangSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const locales: ILocales = {
    en: { title: 'EN' },
    uk: { title: 'UK' },
  };

  const flags: IFlags = {
    en: <GB style={{ borderRadius: '50%' }} />,
    uk: <UA style={{ borderRadius: '50%' }} />,
  };

  const langToggler = () => {
    i18n.resolvedLanguage === 'en'
      ? i18n.changeLanguage('uk')
      : i18n.changeLanguage('en');
  };

  return (
    <Container>
      <Button type="submit" onClick={langToggler}>
        <Box>
          <Flag>{flags[i18n.resolvedLanguage as keyof IFlags]}</Flag>
          <Title>
            {locales[i18n.resolvedLanguage as keyof ILocales].title}
          </Title>
        </Box>
      </Button>
    </Container>
  );
};

export default LangSwitcher;
