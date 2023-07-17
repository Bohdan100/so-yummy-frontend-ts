import { FC } from 'react';
import { SkewBtn } from './ButtonSkew.styled';

export interface IButnSkewProps {
  type: 'submit' | 'reset' | 'button';
  fn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  location?: string;
  styled?: string;
}

const ButnSkew: FC<IButnSkewProps> = ({ type, fn, text, location, styled }) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!fn) return;
    fn(e);
  };
  return (
    <SkewBtn type={type} onClick={onClick} location={location} styled={styled}>
      {text}
    </SkewBtn>
  );
};

export default ButnSkew;
