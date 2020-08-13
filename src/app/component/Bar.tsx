import React from 'react';
import {Route} from 'react-router-dom';
import {
  Hidden, AppBar, Toolbar,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';
import {useRoutes} from '../hook';
import {BtnCadastro} from '.';

const COLOR_GRADIENT = '#FE6B8B';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    borderBottomWidth: 4,
    borderColor: `linear-gradient(45deg, ${COLOR_GRADIENT} 30%, ${theme.palette.secondary.main} 90%)`,
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
    background: `linear-gradient(45deg, ${COLOR_GRADIENT} 30%, ${theme.palette.secondary.main} 90%)`,
  }
}));

export default function Bar() {

  const classes = useStyles();
  const {goToSignUp} = useRoutes();

  return (
    <Route render={({history}) => {
      const {location} = history;
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" className={classes.menuButton} aria-label="menu">
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title}>
                VETNOW ADMIN
              </Typography>
              {location.pathname === "/" &&
              <Hidden xsDown>
                <div style={{width: 200}}>
                  <BtnCadastro
                    onClick={goToSignUp}
                    descricao="EXPERIMENTE GRÁTIS"
                  />
                </div>
              </Hidden>
              }
            </Toolbar>
          </AppBar>
          <div className={classes.lineBottom}/>
        </div>
      )
    }}
/>
)
}
