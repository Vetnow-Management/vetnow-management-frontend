import React, {ReactElement} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Button, Grid} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: 50
  }
});

export default function RecoveryPassword(): ReactElement {

  const classes = useStyles();

  return (
    <Grid>
      <h1>Recovery Password</h1>
    </Grid>
  )
}
