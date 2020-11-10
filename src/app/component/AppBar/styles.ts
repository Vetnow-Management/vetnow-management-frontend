import { createStyles, makeStyles, Theme } from '@material-ui/core';

const COLOR_GRADIENT = '#FE6B8B';

export const useBarStyle = makeStyles((theme: Theme) => createStyles({
  root: {
    borderBottomWidth: 4,
    borderColor: `linear-gradient(45deg, ${ COLOR_GRADIENT } 30%, ${ theme.palette.secondary.main } 90%)`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    margin: 0,
    fontSize: 20,
    color: '#FFFF',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  lineBottom: {
    height: 4,
    background: `linear-gradient(45deg, ${ COLOR_GRADIENT } 30%, ${ theme.palette.secondary.main } 90%)`,
  },

  appBar: {
    borderBottom: `1px solid ${ theme.palette.divider }`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
}));
