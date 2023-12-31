import styled from 'styled-components';

export const SocLinkList = styled.ul<{ location: string }>`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    gap: 18px;
  }

  svg {
    fill: ${p => p.theme.colors.footerSMlinks};
    transition: ${p => p.theme.transitions.main};

    :hover {
      fill: ${p =>
        p.location === 'footer'
          ? p => p.theme.colors.footerSMlinksHover
          : p => p.theme.colors.footerSMlinksHoverAddRecipePge};
    }
  }
`;
