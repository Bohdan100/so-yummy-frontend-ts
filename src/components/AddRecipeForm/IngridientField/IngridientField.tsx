import { useState, useRef, useMemo, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/reduxHooks';

import { ReactComponent as Arrow } from '../../../images/icons/chevron-down.svg';
import { ReactComponent as CloseIcon } from '../../../images/icons/close-20.svg';

import { selectTheme } from 'redux/Theme/themeSelectors';
import { units } from 'data/unitsForAddRecipe';

import {
  IngridientItem,
  WrapperIngredient,
  InputIngredient,
  ArrowWrapper,
  SelectContentIngridients,
  SelectItem,
  WrapperAmount,
  InputAmount,
  DeleteButton,
  ErrMessage,
  WrapperUnit,
  SelectUnit,
  WrapperOptionUnit,
  SelectContentUnits,
  ArrowWrapperUnit,
} from './IngridientField.styled';

import { IIngridientForLocalStorage, IIngridientFromDB } from 'types';

interface IIngridientFieldProps {
  allIngredients: IIngridientFromDB[];
  id: string;
  dataInput: IIngridientForLocalStorage;
  onUpdateIngridient: (
    idInput: string,
    ingridientData: Omit<IIngridientForLocalStorage, 'idInput'>
  ) => void;
  onRemove: (id: string) => void;
  errorMessage: string;
}

const IngridientField: FC<IIngridientFieldProps> = ({
  allIngredients,
  id: idInput,
  dataInput,
  onUpdateIngridient,
  onRemove,
  errorMessage,
}) => {
  const theme = useAppSelector(selectTheme);
  const inputDivEl = useRef<HTMLDivElement | null>(null);
  const inputLiEl = useRef<HTMLLIElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveUnitField, setIsActiveUnitField] = useState<boolean>(false);
  const [titleIngridient, setTitleIngridient] = useState<string>(dataInput.ttl);
  const [amount, setAmount] = useState<string>(dataInput.amount);
  const [unit, setUnit] = useState<string>(dataInput.unit);
  const [filter, setFilter] = useState<string>(() => dataInput?.ttl || '');
  const { t } = useTranslation();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        (inputDivEl.current &&
          !inputDivEl.current.contains(e.target as Node)) ||
        (inputLiEl.current && !inputLiEl.current.contains(e.target as Node))
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      document.addEventListener('click', onClick);
    }
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [isActive]);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      return;
    }
    if (e.target.value === '0') {
      setAmount('');
      return;
    }
    setAmount(e.target.value);

    onUpdateIngridient(idInput, {
      amount: e.target.value,
      unit,
      id: dataInput.id,
      ttl: dataInput.ttl,
    });
  };

  const filteredAllIngridients = useMemo(() => {
    if (!filter) return allIngredients;
    const normalizeNameMeal = filter.toLowerCase();
    return allIngredients.filter(el =>
      el.ttl.toLowerCase().includes(normalizeNameMeal)
    );
  }, [allIngredients, filter]);

  return (
    <IngridientItem key={idInput} ref={inputLiEl}>
      <WrapperIngredient>
        <InputIngredient
          type="text"
          name="ingridient"
          autoComplete="off"
          placeholder={t('ingridientField.placeholder')}
          value={filter}
          onChange={e => {
            setFilter(e.target.value);
            setTitleIngridient(e.target.value);
            setIsActive(true);
          }}
        />

        {titleIngridient.length !== 0 &&
          filteredAllIngridients.length !== 0 && (
            <ArrowWrapper onClick={e => setIsActive(!isActive)}>
              <Arrow width="20px" height="20px" />
            </ArrowWrapper>
          )}

        {isActive &&
          titleIngridient.length !== 0 &&
          filteredAllIngridients.length !== 0 && (
            <SelectContentIngridients>
              {filteredAllIngridients.map(({ _id, ttl }) => (
                <SelectItem
                  key={_id}
                  onClick={e => {
                    setFilter(ttl);
                    setTitleIngridient(ttl);
                    setIsActive(false);

                    onUpdateIngridient(idInput, {
                      ttl,
                      id: _id,
                      amount,
                      unit,
                    });
                  }}
                  color={
                    titleIngridient === ttl && theme === 'light'
                      ? '#8BAA36'
                      : '#000000'
                  }
                >
                  {ttl}
                </SelectItem>
              ))}
            </SelectContentIngridients>
          )}
      </WrapperIngredient>

      <WrapperAmount>
        <InputAmount
          type="number"
          name="amount"
          autoComplete="off"
          min="1"
          value={amount}
          onChange={handleChangeAmount}
        />
        <WrapperUnit>
          <>
            <SelectUnit
              ref={inputDivEl}
              onClick={e => setIsActiveUnitField(!isActiveUnitField)}
            >
              <WrapperOptionUnit>{unit}</WrapperOptionUnit>
              <ArrowWrapperUnit>
                <Arrow width="20px" height="20px" />
              </ArrowWrapperUnit>
            </SelectUnit>
            {isActiveUnitField && (
              <SelectContentUnits>
                {units.map((value, index) => (
                  <SelectItem
                    key={value + '' + index}
                    onClick={e => {
                      setUnit(value);
                      setIsActive(false);
                      onUpdateIngridient(idInput, {
                        amount,
                        unit: value,
                        ttl: dataInput.ttl,
                        id: dataInput.id,
                      });
                    }}
                  >
                    {value}
                  </SelectItem>
                ))}
              </SelectContentUnits>
            )}
          </>
        </WrapperUnit>
      </WrapperAmount>

      <DeleteButton
        type="button"
        onClick={() => {
          onRemove(idInput);
        }}
      >
        <CloseIcon />
      </DeleteButton>
      {errorMessage && <ErrMessage>{errorMessage}</ErrMessage>}
    </IngridientItem>
  );
};

export default IngridientField;
