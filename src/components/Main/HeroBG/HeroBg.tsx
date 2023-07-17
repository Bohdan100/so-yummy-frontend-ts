import { FC } from 'react';
import LeafsLeft from './LeafsLeft';
import LeafsRight from './LeafsRight';

const HeroBg: FC = () => {
  return (
    <>
      <LeafsRight />
      <LeafsLeft />
    </>
  );
};

export default HeroBg;
