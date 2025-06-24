import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      // You can customize the color palette here. For example:
      // colors: {
      //   'brand-blue-dark': '#1e3a8a',
      //   'brand-blue-light': '#3b82f6',
      //   'brand-yellow': '#facc15'
      // }
    }
  },
  plugins: []
};

export default config;
