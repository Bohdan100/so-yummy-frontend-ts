import { FC } from 'react';
import { createPortal } from 'react-dom';
import { BgContainer } from './LeafsLeft.styled';
const heroRoot = document.querySelector('#hero-bg') as HTMLDivElement;

const LeafsLeft: FC = () => {
  return createPortal(<BgContainer />, heroRoot);
};

export default LeafsLeft;
