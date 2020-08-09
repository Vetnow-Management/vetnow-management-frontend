import React, { PropsWithChildren, ReactElement, useState } from 'react';
import { ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import { ArrowRightAlt, Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from './index';
import { Runnable, RunnableImpl } from '@vetnow-management/essentials';

const useStyles = makeStyles({
  paper: {
    padding: '15px 20px',
    cursor: 'pointer'
  },
});

export interface IHugeButton {
  onClick?: Runnable,
}

export default function HugeButton(props: PropsWithChildren<IHugeButton>): ReactElement {
  const classes = useStyles();
  const [elevation, setElevation] = useState<number>(1);

  const { children, onClick = RunnableImpl } = props;

  function onMouseOver(): void {
    setElevation(6);
  }

  function onMouseOut(): void {
    setElevation(1);
  }

  function getColor(): 'primary' | 'inherit' {
    if (elevation > 1) return 'primary';

    return 'inherit';
  }

  return (
    <ButtonBase onMouseOver={ onMouseOver }
                onMouseOut={ onMouseOut }
                onClick={() => onClick()}
    >
      <Paper elevation={ elevation }
             className={ classes.paper }
      >
        <Grid container
              justify='center'
        >
          <Grid container spacing={ 5 }>
            <Grid item xs={ 3 }>
              <Home color={ getColor() as any }/>
            </Grid>
            <Grid container xs={6} item alignItems='stretch'>
              <Typography align='center' color={ getColor() as any }>{children}</Typography>
            </Grid>
            <Grid item xs={ 3 }>
              <Hidden component={ <ArrowRightAlt color='primary'/> } isVisible={ elevation > 1 }/>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ButtonBase>
  );
}
