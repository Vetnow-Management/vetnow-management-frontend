import { createMuiTheme, Theme } from '@material-ui/core';
import { Environment } from '../util';

const materiaUIConfig: Theme = createMuiTheme({
  palette: {
    primary: {
      main: Environment.PRIMARY_COLOR,
    },
    secondary: {
      main: Environment.SECONDARY_COLOR,
    },
  },
});

export default materiaUIConfig;
