import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';
import { Title } from '../Title';
import type { TitleVariant } from '../Title/Title';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** 點擊時的回饋（hover、cursor） */
  interactive?: boolean;
  /** 自訂內距，預設 16px */
  padded?: boolean;
  children?: ReactNode;
}

const Container = styled.div<{
  $variant: CardVariant;
  $interactive?: boolean;
  $padded?: boolean;
}>`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.lg};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  color: ${({ theme }) => theme.semantic.text.high};
  overflow: hidden;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'elevated':
        return css`
          background: ${theme.semantic.background.bright};
          border: 1px solid ${theme.semantic.background.transparent10};
          box-shadow: ${theme.shadows.hero};
        `;
      case 'outlined':
        return css`
          background: ${theme.semantic.background.bright};
          border: 1px solid ${theme.semantic.background.transparent20};
        `;
      case 'flat':
      default:
        return css`
          background: ${theme.semantic.background.bright};
          border: 1px solid transparent;
        `;
    }
  }}

  ${({ $padded }) =>
    $padded &&
    css`
      padding: 16px;
    `}

  ${({ $interactive, theme }) =>
    $interactive &&
    css`
      cursor: pointer;
      transition:
        transform 150ms ease,
        border-color 150ms ease,
        box-shadow 150ms ease;
      &:hover {
        border-color: ${theme.semantic.primary.main};
        transform: translateY(-1px);
      }
      &:active {
        transform: translateY(0);
      }
    `}
`;

export const Card = ({
  variant = 'outlined',
  interactive,
  padded,
  children,
  ...rest
}: CardProps) => {
  return (
    <Container
      $variant={variant}
      $interactive={interactive}
      $padded={padded}
      {...rest}
    >
      {children}
    </Container>
  );
};

Card.displayName = 'Card';

// === Subcomponents ===

const HeaderRoot = styled.div<{ $divider: boolean }>`
  padding: 16px 20px;
  border-bottom: ${({ $divider, theme }) =>
    $divider ? `1px solid ${theme.semantic.background.transparent10}` : '0'};
`;

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  startContent?: ReactNode;
  /** 標題大小，預設 card */
  titleVariant?: TitleVariant;
  /** 是否顯示底部分隔線（預設 true） */
  divider?: boolean;
}

export const CardHeader = ({
  title,
  subtitle,
  actions,
  startContent,
  titleVariant = 'card',
  divider = true,
  ...rest
}: CardHeaderProps) => {
  return (
    <HeaderRoot $divider={divider} {...rest}>
      <Title
        variant={titleVariant}
        subtitle={subtitle}
        actions={actions}
        startContent={startContent}
      >
        {title}
      </Title>
    </HeaderRoot>
  );
};

CardHeader.displayName = 'CardHeader';

const BodyRoot = styled.div<{ $padded: boolean }>`
  ${({ $padded }) =>
    $padded &&
    css`
      padding: 20px;
    `}
  flex: 1;
`;

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** 預設帶內距，設 false 可貼齊邊緣（用於圖片、表格） */
  padded?: boolean;
}

export const CardBody = ({ padded = true, ...rest }: CardBodyProps) => (
  <BodyRoot $padded={padded} {...rest} />
);

CardBody.displayName = 'CardBody';

const FooterRoot = styled.div<{ $align: 'start' | 'between' | 'end' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-top: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  ${({ $align }) => {
    switch ($align) {
      case 'start':
        return css`
          justify-content: flex-start;
        `;
      case 'between':
        return css`
          justify-content: space-between;
        `;
      case 'end':
      default:
        return css`
          justify-content: flex-end;
        `;
    }
  }}
`;

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** 內容水平對齊。預設 end（靠右） */
  align?: 'start' | 'between' | 'end';
}

export const CardFooter = ({ align = 'end', ...rest }: CardFooterProps) => (
  <FooterRoot $align={align} {...rest} />
);

CardFooter.displayName = 'CardFooter';
