import { FC } from 'react';
import { createPortal } from 'react-dom';
import { BgContainerRight } from './LeafsRight.styled';
const heroRoot = document.querySelector('#hero-bg') as HTMLDivElement;

const LeafsRight: FC = () => {
  return createPortal(<BgContainerRight />, heroRoot);
};

export default LeafsRight;
