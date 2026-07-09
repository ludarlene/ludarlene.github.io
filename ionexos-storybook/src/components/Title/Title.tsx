import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode, ElementType } from 'react';
import type { TypographyVariant } from '../../tokens/typography';

export type TitleVariant =
  | 'page'
  | 'section'
  | 'card';

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  /** 標題層級樣式 */
  variant?: TitleVariant;
  /** 主要標題 */
  children?: ReactNode;
  /** 副標題（描述） */
  subtitle?: ReactNode;
  /** 右側操作區（按鈕、Tab、Status 等） */
  actions?: ReactNode;
  /** 左側裝飾（icon、avatar、badge 等） */
  startContent?: ReactNode;
  /** 自訂渲染元素，預設 h1 / h2 / h3 視 variant 而定 */
  as?: ElementType;
}

const variantTypography: Record<TitleVariant, TypographyVariant> = {
  page: 'h3',
  section: 'h5',
  card: 'h6',
};

const Wrapper = styled.div<{ $hasSubtitle: boolean }>`
  display: flex;
  align-items: ${({ $hasSubtitle }) => ($hasSubtitle ? 'flex-start' : 'center')};
  gap: 16px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
`;

const StartContent = styled.div`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleEl = styled.h2<{ $variant: TitleVariant }>`
  margin: 0;
  color: ${({ theme }) => theme.semantic.text.high};
  ${({ $variant, theme }) => {
    const t = theme.typography[variantTypography[$variant]];
    return css`
      font-size: ${t.fontSize};
      font-weight: ${t.fontWeight};
      line-height: ${t.lineHeight};
      letter-spacing: ${t.letterSpacing};
    `;
  }}
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.semantic.text.middle};
  line-height: 1.5;
`;

const Actions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const Title = ({
  variant = 'section',
  children,
  subtitle,
  actions,
  startContent,
  as,
  ...rest
}: TitleProps) => {
  const hasSubtitle = !!subtitle;
  const Tag = (as ??
    (variant === 'page' ? 'h1' : variant === 'section' ? 'h2' : 'h3')) as ElementType;

  return (
    <Wrapper $hasSubtitle={hasSubtitle} {...rest}>
      {startContent && <StartContent>{startContent}</StartContent>}
      <Body>
        <TitleEl as={Tag} $variant={variant}>
          {children}
        </TitleEl>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Body>
      {actions && <Actions>{actions}</Actions>}
    </Wrapper>
  );
};

Title.displayName = 'Title';
