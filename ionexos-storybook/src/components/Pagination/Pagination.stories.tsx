import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Data Display/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
對應 Figma：Table 的 RowsPerPage 分頁列。

**mode**：
- \`default\` 簡單版（每頁筆數、位置資訊、上下頁）
- \`page\` 完整版（含跳頁數字、首末頁按鈕）
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Pagination
        page={page}
        pageSize={pageSize}
        total={142}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s);
          setPage(1);
        }}
      />
    );
  },
};

export const PageMode: Story = {
  render: function Render() {
    const [page, setPage] = useState(5);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Pagination
        mode="page"
        page={page}
        pageSize={pageSize}
        total={142}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s);
          setPage(1);
        }}
        showFirstLastButtons
      />
    );
  },
};

export const FewPages: Story = {
  name: '少於 7 頁時所有頁碼都顯示',
  render: function Render() {
    const [page, setPage] = useState(2);
    return (
      <Pagination
        mode="page"
        page={page}
        pageSize={10}
        total={45}
        onPageChange={setPage}
      />
    );
  },
};

export const EmptyData: Story = {
  render: () => (
    <Pagination page={1} pageSize={10} total={0} />
  ),
};
