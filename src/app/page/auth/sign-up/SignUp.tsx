import React, { ReactElement } from 'react';

import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LandingPagePaper } from '../../../component';

const useStyles = makeStyles({
  leftGridBGColor: {
    backgroundColor: 'yellow',
  },
});

export default function SignUp(): ReactElement {
  const classes = useStyles();

  return (
    <LandingPagePaper
      leftGridColor='yellow'
      renderLeftSide={() => (
        <Typography>Agora vai</Typography>
      )}
      renderRightSide={() => (
        <Typography>Form</Typography>
      )}
    />
  )
}
