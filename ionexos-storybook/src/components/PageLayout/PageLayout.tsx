import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';

export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** SideNav 內容（會放在左側） */
  sideNav?: ReactNode;
  /** TopBar 內容（會放在頂部） */
  topBar?: ReactNode;
  /** 主內容區 */
  children?: ReactNode;
  /** 全寬模式（取消內距） */
  fluid?: boolean;
}

const Root = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.semantic.background.default};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  color: ${({ theme }) => theme.semantic.text.high};
`;

const SideArea = styled.div`
  flex-shrink: 0;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const TopArea = styled.div`
  flex-shrink: 0;
`;

const Content = styled.main<{ $fluid: boolean }>`
  flex: 1;
  overflow: auto;
  ${({ $fluid }) =>
    $fluid
      ? css`
          padding: 0;
        `
      : css`
          padding: 24px;
        `}
`;

export const PageLayout = ({
  sideNav,
  topBar,
  children,
  fluid = false,
  ...rest
}: PageLayoutProps) => {
  return (
    <Root {...rest}>
      {sideNav && <SideArea>{sideNav}</SideArea>}
      <Main>
        {topBar && <TopArea>{topBar}</TopArea>}
        <Content $fluid={fluid}>{children}</Content>
      </Main>
    </Root>
  );
};

PageLayout.displayName = 'PageLayout';

// === PageHeader (對應 Figma：page-level Title block) ===
export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** 麵包屑（可放 Breadcrumbs） */
  breadcrumbs?: ReactNode;
  /** 右側操作 */
  actions?: ReactNode;
  /** 左側裝飾（icon、avatar、back button） */
  startContent?: ReactNode;
}

const HeaderRoot = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const HeaderStart = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const TitleEl = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.semantic.text.high};
  letter-spacing: 0.5px;
  line-height: 1.3;
`;

const DescEl = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.semantic.text.middle};
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  actions,
  startContent,
  ...rest
}: PageHeaderProps) => {
  return (
    <HeaderRoot {...rest}>
      {breadcrumbs}
      <HeaderRow>
        <HeaderStart>
          {startContent}
          <Titles>
            {title && <TitleEl>{title}</TitleEl>}
            {description && <DescEl>{description}</DescEl>}
          </Titles>
        </HeaderStart>
        {actions && <Actions>{actions}</Actions>}
      </HeaderRow>
    </HeaderRoot>
  );
};

PageHeader.displayName = 'PageHeader';

// === PageSection ===
export interface PageSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** 內邊距間距，預設 24px */
  spacing?: number;
}

const SectionRoot = styled.section<{ $spacing: number }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: ${({ $spacing }) => $spacing}px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
`;

const SectionDesc = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.semantic.text.middle};
  margin-top: 2px;
`;

export const PageSection = ({
  title,
  description,
  actions,
  spacing = 32,
  children,
  ...rest
}: PageSectionProps) => {
  return (
    <SectionRoot $spacing={spacing} {...rest}>
      {(title || actions) && (
        <SectionHeader>
          <div>
            {title && <SectionTitle>{title}</SectionTitle>}
            {description && <SectionDesc>{description}</SectionDesc>}
          </div>
          {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
        </SectionHeader>
      )}
      {children}
    </SectionRoot>
  );
};

PageSection.displayName = 'PageSection';

// === PageGrid (responsive grid) ===
export interface PageGridProps extends HTMLAttributes<HTMLDivElement> {
  /** 欄數（也可傳入 string css 值） */
  columns?: number | string;
  /** 間距 */
  gap?: number;
}

const GridRoot = styled.div<{ $columns: string; $gap: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  gap: ${({ $gap }) => $gap}px;
`;

export const PageGrid = ({
  columns = 12,
  gap = 16,
  ...rest
}: PageGridProps) => {
  const cols =
    typeof columns === 'number'
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns;
  return <GridRoot $columns={cols} $gap={gap} {...rest} />;
};

PageGrid.displayName = 'PageGrid';
