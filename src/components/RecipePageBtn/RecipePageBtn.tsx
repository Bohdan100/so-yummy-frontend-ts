
import { FC,MouseEvent } from 'react';
import { RecipePageBtnStyle } from './RecipePageBtn.styled';

interface IProps {
  text: string;
  fn?: ()=>Promise<void> | void ;

}

const RecipePageBtn: FC<IProps> = ({ text, fn }) => {
  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (fn) {
      try {
        await fn();
      } catch (error) {
        
      }
    }
  };

  return (
    <RecipePageBtnStyle type='button' onClick={onClick}>
      {text}
    </RecipePageBtnStyle>
  );
};

export default RecipePageBtn;
