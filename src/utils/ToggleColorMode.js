import React, { createContext, useMemo, useState } from 'react';
import {
  themeProvider,
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

export const ColorModeContext = createContext();
function ToggleColorMode({ children }) {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;
