import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UA, GB } from 'country-flag-icons/react/1x1';
import { Flag, Container, Title, Button, Box } from './LangSwitcher.styled';

export interface ILangSwitcherProps {
  position?: 'absolute';
}

const LangSwitcher: FC<ILangSwitcherProps> = ({ position }) => {
  const { i18n } = useTranslation();

  const locales = {
    en: { title: 'EN' },
    uk: { title: 'UK' },
  };

  const flags: { en: JSX.Element; uk: JSX.Element } = {
    en: <GB style={{ borderRadius: '50%' }} />,
    uk: <UA style={{ borderRadius: '50%' }} />,
  };

  const langToggler = () => {
    i18n.language === 'en'
      ? i18n.changeLanguage('uk')
      : i18n.changeLanguage('en');
  };

  return (
    // TODO - фелиться TS
    <Container position={position}>
      <Button type="submit" onClick={langToggler}>
        <Box>
          <Flag>{flags[i18n.language]}</Flag>
          <Title>{locales[i18n.language].title}</Title>
        </Box>
      </Button>
    </Container>
  );
};

export default LangSwitcher;
