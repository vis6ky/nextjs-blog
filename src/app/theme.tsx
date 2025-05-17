'use client';
import { Theme } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  }); 

const createAppTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      background: {
        default: mode === 'dark' ? '#303030' : '#fafafa',
        paper: mode === 'dark' ? '#424242' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f0f0f0' : '#171717',
      },
    },
    typography: {
      fontFamily: `${roboto.style.fontFamily}, Arial, sans-serif`,
    },
  });
}


export default createAppTheme;