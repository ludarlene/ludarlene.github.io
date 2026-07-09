import styled from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';
import { ChevronRightIcon } from '../_shared/icons';

export interface BreadcrumbItem {
  /** 標籤 */
  label: ReactNode;
  /** 連結網址（若有，項目可點擊） */
  href?: string;
  /** 點擊回呼（替代 href） */
  onClick?: () => void;
  /** 自訂 icon */
  icon?: ReactNode;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** 自訂分隔符（預設 ChevronRight） */
  separator?: ReactNode;
}

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 13px;
  color: ${({ theme }) => theme.semantic.text.middle};
`;

const Crumb = styled.span<{ $isLast: boolean; $clickable: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme, $isLast }) =>
    $isLast ? theme.semantic.text.high : theme.semantic.text.middle};
  font-weight: ${({ theme, $isLast }) =>
    $isLast ? theme.fontWeight.medium : theme.fontWeight.regular};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  &:hover {
    color: ${({ theme, $clickable }) =>
      $clickable ? theme.semantic.primary.light : undefined};
  }
`;

const CrumbLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Separator = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.semantic.text.lower};
`;

export const Breadcrumbs = ({
  items,
  separator,
  ...rest
}: BreadcrumbsProps) => {
  const sep = separator ?? <ChevronRightIcon size={14} />;

  return (
    <Nav aria-label="breadcrumb" {...rest}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        const clickable = !isLast && (!!item.href || !!item.onClick);
        const content = (
          <>
            {item.icon}
            {item.label}
          </>
        );

        return (
          <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Crumb
              $isLast={isLast}
              $clickable={clickable}
              aria-current={isLast ? 'page' : undefined}
            >
              {clickable && item.href ? (
                <CrumbLink href={item.href}>{content}</CrumbLink>
              ) : clickable && item.onClick ? (
                <CrumbLink
                  as="button"
                  onClick={item.onClick}
                  style={{ background: 'none', border: 0, padding: 0, font: 'inherit' }}
                >
                  {content}
                </CrumbLink>
              ) : (
                content
              )}
            </Crumb>
            {!isLast && <Separator aria-hidden="true">{sep}</Separator>}
          </span>
        );
      })}
    </Nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
