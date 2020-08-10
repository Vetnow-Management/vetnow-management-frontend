import React from 'react';
import { Button, Theme, createStyles, makeStyles } from '@material-ui/core';

const COLOR_GRADIENT = '#FE6B8B';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    background: `linear-gradient(45deg, ${COLOR_GRADIENT} 30%, ${theme.palette.secondary.main} 90%)`,
  },
}));

interface Props {
  onClick?: any,
  descricao: string,
}
export default function ButtonCadastro(props: Props) {
  const classes = useStyles();
  const { descricao, onClick } = props;
  return (
    <Button
      fullWidth
      className={classes.root}
      variant='contained'
      color='primary'
      onClick={onClick}
    >
      {descricao}
    </Button>
  );
}
