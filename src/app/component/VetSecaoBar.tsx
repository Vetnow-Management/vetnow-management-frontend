import React, {ReactElement} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    container: {
      display: 'flex',
      width: '100%',
      marginTop: 10
    },
    bar: {
      width: 8,
      height: 25,
      marginRight: 10,
      backgroundColor: theme.palette.secondary.main
    },
    secao: {
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  })
))

interface VetSecaoBarProps {
  titulo: string
}

export default function VetSecaoBar(props: VetSecaoBarProps): ReactElement {

  const classes = useStyles();

  const {titulo} = props;

  return (
    <div className={classes.container}>
      <div className={classes.bar}/>
      <Typography className={classes.secao}>{titulo}</Typography>
    </div>
  );
}
