import React, { MouseEvent } from 'react';

import { Consumer } from '@vetnow-management/essentials';
import { Button, ButtonProps, Theme, makeStyles } from '@material-ui/core';

const COLOR_GRADIENT = '#FE6B8B';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `linear-gradient(45deg, ${COLOR_GRADIENT} 30%, ${theme.palette.secondary.main} 90%)`,
    color: 'white',
  }
}));

export default function ButtonCadastro(props: ButtonCadastroProps) {
  const classes = useStyles();
  const { descricao, onClick, ButtonProps } = props;
  return (
    <Button className={classes.root}
            onClick={onClick}
            {...ButtonProps}
    >
      {descricao}
    </Button>
  );
}

type ButtonCadastroProps = {
  descricao: string;
  onClick?: Consumer<MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>>
  ButtonProps?: ButtonProps;
};

ButtonCadastro.defaultProps = {
  ButtonProps: {
    fullWidth: true,
    variant: 'contained',
    color: 'primary',
  }
} as Partial<ButtonCadastroProps>;
