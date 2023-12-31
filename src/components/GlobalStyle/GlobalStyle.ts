import { createGlobalStyle } from 'styled-components';
import { theme } from 'constants/theme';
import 'modern-normalize/modern-normalize.css';

interface GlobalStyleProps {
  theme: typeof theme;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
   
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-family: ${p => p.theme.fonts.main};   
    font-size: "16px";
    font-weight: ${p => p.theme.fontWeights[0]};
    line-height: ${p => p.theme.lineHeights.content};
    letter-spacing: ${p => p.theme.letterSpacings.content};

    color: ${p => p.theme.colors.mainWhite};
    background-color: ${p => p.theme.colors.bodyBg};

    &.open-modal{
      overflow: hidden;
    }

  }

  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  button{
    cursor: pointer;
  }
`;
