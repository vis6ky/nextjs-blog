'use client';

import { ThemeProvider, CssBaseline, useColorScheme } from '@mui/material'
import React from 'react'
import createAppTheme from './theme';

const ThemeWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const { mode } = useColorScheme();
  const theme = createAppTheme(mode === 'light' || mode === 'dark' ? mode : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeWrapper
