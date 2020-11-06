import React, { ReactElement } from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import { VetLoading } from './index';

const useStyle = makeStyles({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
});

export default function LoadingCentralizado(): ReactElement {
  const classes = useStyle();

  return (
    <Grid className={classes.content} container item xs={12} alignItems='center' justify='center'>
      <VetLoading type='ball-scale' />
    </Grid>
  )
}
