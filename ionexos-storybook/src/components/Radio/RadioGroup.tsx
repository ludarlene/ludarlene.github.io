import styled from 'styled-components';
import { createContext, useContext, useId } from 'react';
import type { ReactNode, ChangeEvent } from 'react';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroup = () => useContext(RadioGroupContext);

export interface RadioGroupProps {
  /** Group 名稱（用於 input[type=radio] 的 name） */
  name?: string;
  /** 受控值 */
  value?: string;
  /** 預設值（非受控） */
  defaultValue?: string;
  /** 值變更回呼 */
  onChange?: (value: string) => void;
  /** 整組停用 */
  disabled?: boolean;
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  children: ReactNode;
}

const Wrapper = styled.div<{ $direction: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ $direction }) =>
    $direction === 'horizontal' ? 'row' : 'column'};
  gap: ${({ $direction }) => ($direction === 'horizontal' ? '24px' : '12px')};
  font-family: ${({ theme }) => theme.fontFamily.primary};
`;

export const RadioGroup = ({
  name: nameProp,
  value,
  defaultValue,
  onChange,
  disabled,
  direction = 'vertical',
  children,
}: RadioGroupProps) => {
  const autoId = useId();
  const name = nameProp ?? autoId;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: value ?? defaultValue,
        onChange: (v: string) => onChange?.(v),
        disabled,
      }}
    >
      <Wrapper
        $direction={direction}
        role="radiogroup"
        onChange={handleChange as any}
      >
        {children}
      </Wrapper>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';
