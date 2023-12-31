import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { selectTheme } from 'redux/Theme/themeSelectors';
import { setTheme } from 'redux/Theme/themeSlice';
import { TogglerWrapper, Checkbox, Label, Ball } from './ThemeToggler.styled';

const ThemeToggler = () => {
  const dispatch = useAppDispatch();
  const themeFromGlobalState = useAppSelector(selectTheme);

  const handleToggler = () => {
    const newTheme = themeFromGlobalState === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };
  return (
    <TogglerWrapper>
      <Checkbox
        type="checkbox"
        checked={themeFromGlobalState === 'dark'}
        id="theme-toggler"
        onChange={handleToggler}
      />
      <Label mode={themeFromGlobalState} htmlFor="theme-toggler">
        <Ball />
      </Label>
    </TogglerWrapper>
  );
};

export default ThemeToggler;
