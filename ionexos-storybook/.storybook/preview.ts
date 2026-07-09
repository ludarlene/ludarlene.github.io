import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../src/tokens/theme';
import { GlobalStyle } from '../src/styles/GlobalStyle';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      // 由 theme toolbar 控制，不再用 Storybook 原生 backgrounds
      disable: true,
    },
    docs: {
      toc: true,
    },
  },
  // === Global Theme Toolbar ===
  globalTypes: {
    theme: {
      name: 'Theme',
      description: '切換亮暗主題（dark / light）',
      defaultValue: 'dark',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.theme ?? 'dark';
      const selectedTheme = mode === 'light' ? lightTheme : darkTheme;
      return React.createElement(
        ThemeProvider,
        { theme: selectedTheme },
        React.createElement(
          React.Fragment,
          null,
          React.createElement(GlobalStyle, null),
          React.createElement(Story, null),
        ),
      );
    },
  ],
};

export default preview;
