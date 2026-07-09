import styled, { css } from 'styled-components';
import type { HTMLAttributes, ElementType } from 'react';
import type { TypographyVariant } from '../../tokens/typography';

type TextColor =
  | 'high'
  | 'middle'
  | 'low'
  | 'lower'
  | 'white'
  | 'highlight'
  | 'inherit';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Typography 變體 */
  variant?: TypographyVariant;
  /** 顏色 */
  color?: TextColor;
  /** 自訂元素，預設 p */
  as?: ElementType;
  /** 文字對齊 */
  align?: 'left' | 'center' | 'right';
  /** 截斷溢出 */
  truncate?: boolean;
  /** 限制行數截斷 */
  lineClamp?: number;
}

const StyledText = styled.p<{
  $variant: TypographyVariant;
  $color: TextColor;
  $align?: 'left' | 'center' | 'right';
  $truncate?: boolean;
  $lineClamp?: number;
}>`
  margin: 0;
  text-align: ${({ $align }) => $align ?? 'inherit'};
  color: ${({ theme, $color }) =>
    $color === 'inherit' ? 'inherit' : theme.semantic.text[$color]};

  ${({ $variant, theme }) => {
    const t = theme.typography[$variant];
    return css`
      font-family: ${t.fontFamily};
      font-size: ${t.fontSize};
      font-weight: ${t.fontWeight};
      line-height: ${t.lineHeight === '100%' ? '1.5' : t.lineHeight};
      letter-spacing: ${t.letterSpacing};
    `;
  }}

  ${({ $truncate }) =>
    $truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}

  ${({ $lineClamp }) =>
    $lineClamp &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${$lineClamp};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

export const Text = ({
  variant = 'body1',
  color = 'high',
  align,
  truncate,
  lineClamp,
  as,
  ...rest
}: TextProps) => {
  return (
    <StyledText
      as={as}
      $variant={variant}
      $color={color}
      $align={align}
      $truncate={truncate}
      $lineClamp={lineClamp}
      {...rest}
    />
  );
};

Text.displayName = 'Text';
