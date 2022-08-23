import {extendTheme, Theme} from 'native-base';

export const themeConfig: Theme = extendTheme({
  fonts: {
    heading: 'Graphik',
    body: 'Graphik',
    mono: 'Graphik',
  },
  colors: {
    primary: {
      500: '#000db5',
    },
  },

  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
});
