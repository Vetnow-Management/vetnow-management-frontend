import { createMuiTheme, Theme } from '@material-ui/core';
import { Environment } from '../util';

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    smMid: true;
  }
}

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    menuLateral: MenuLateral;
  }
  interface ThemeOptions {
    menuLateral: MenuLateral;
  }
  interface MenuLateral {
    width: string | number;
  }
}

const materiaUIConfig: Theme = createMuiTheme({
  palette: {
    primary: {
      main: Environment.PRIMARY_COLOR,
    },
    secondary: {
      main: Environment.SECONDARY_COLOR,
    },
    error: {
      main: Environment.ERROR_COLOR,
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      // N funciona :(
      smMid: 820,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  },
  menuLateral: {
    width: 240,
  }
});

export default materiaUIConfig;
