import styled from 'styled-components';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TopBarProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** 左側內容（logo、選單觸發） */
  startContent?: ReactNode;
  /** 中央內容（搜尋框、頁籤） */
  centerContent?: ReactNode;
  /** 右側內容（通知、頭像、設定） */
  endContent?: ReactNode;
  /** 標題（與 startContent 並列） */
  title?: ReactNode;
  /** 高度 */
  height?: number;
  /** 是否 sticky */
  sticky?: boolean;
}

const Header = styled.header<{ $height: number; $sticky: boolean }>`
  position: ${({ $sticky }) => ($sticky ? 'sticky' : 'relative')};
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 16px;
  height: ${({ $height }) => $height}px;
  padding: 0 20px;
  background: ${({ theme }) => theme.semantic.background.bar};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.background.transparent10};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  color: ${({ theme }) => theme.semantic.text.high};
`;

const Start = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.semantic.text.high};
`;

const Center = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const End = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const TopBar = ({
  startContent,
  centerContent,
  endContent,
  title,
  height = 56,
  sticky = false,
  ...rest
}: TopBarProps) => {
  return (
    <Header $height={height} $sticky={sticky} {...rest}>
      {(startContent || title) && (
        <Start>
          {startContent}
          {title && <Title>{title}</Title>}
        </Start>
      )}
      <Center>{centerContent}</Center>
      {endContent && <End>{endContent}</End>}
    </Header>
  );
};

TopBar.displayName = 'TopBar';
