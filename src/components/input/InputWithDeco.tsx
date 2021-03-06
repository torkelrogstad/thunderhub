import * as React from 'react';
import styled from 'styled-components';
import { unSelectedNavButton, mediaWidths } from 'src/styles/Themes';
import { SingleLine } from '../generic/Styled';
import { Price } from '../price/Price';
import { Input } from './Input';

const NoWrapText = styled.div`
  white-space: nowrap;
  font-size: 14px;
`;

const InputTitle = styled(NoWrapText)``;

const AmountText = styled(NoWrapText)`
  color: ${unSelectedNavButton};
  margin: 0 8px 0 16px;
`;

const InputTitleRow = styled.div`
  display: flex;

  @media (${mediaWidths.mobile}) {
    flex-wrap: wrap;
    margin: 8px 0;
  }
`;

const InputLine = styled(SingleLine)`
  width: 100%;
  margin: 8px 0;

  @media (${mediaWidths.mobile}) {
    flex-direction: column;
  }
`;

type InputWithDecoProps = {
  title: string;
  value?: string | number;
  noInput?: boolean;
  amount?: number;
  override?: string;
  customAmount?: string;
  color?: string;
  placeholder?: string;
  inputType?: string;
  inputCallback?: (value: string) => void;
};

export const InputWithDeco: React.FC<InputWithDecoProps> = ({
  title,
  value,
  amount,
  override,
  customAmount,
  children,
  placeholder,
  color,
  noInput,
  inputType = 'text',
  inputCallback,
}) => {
  const showAmount = !!amount || customAmount;
  let correctValue = value;

  if (inputType === 'number') {
    correctValue = value > 0 ? value : undefined;
  }

  const props = noInput ? {} : { value: correctValue };
  return (
    <InputLine>
      <InputTitleRow>
        <InputTitle>{title}</InputTitle>
        {showAmount && (
          <AmountText>
            {customAmount ? (
              customAmount
            ) : (
              <Price amount={amount} override={override} />
            )}
          </AmountText>
        )}
      </InputTitleRow>
      {!noInput && (
        <Input
          maxWidth={'500px'}
          placeholder={placeholder}
          color={color}
          withMargin={'0 0 0 8px'}
          mobileMargin={'0'}
          type={inputType}
          onChange={e => inputCallback && inputCallback(e.target.value)}
          {...props}
        />
      )}
      {children}
    </InputLine>
  );
};
