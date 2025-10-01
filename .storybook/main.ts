import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async config => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@types': path.resolve(__dirname, '../src/types'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@mocks': path.resolve(__dirname, '../src/mocks'),
      };
    }

    if (!config.css) {
      config.css = {};
    }
    config.css.postcss = {
      plugins: [tailwindcss, autoprefixer],
    };

    return config;
  },
};
export default config;
