import { createMuiTheme, Theme } from '@material-ui/core';
import { Environment } from '../util';

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    smMid: true;
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
  }
});

export default materiaUIConfig;
