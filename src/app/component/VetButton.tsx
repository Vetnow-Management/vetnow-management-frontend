import React, { ReactElement, ReactNode } from 'react';

import { Button, makeStyles, ButtonProps as MuiButtonProps } from '@material-ui/core';

function useStyle(dangerColor: boolean) {
  return makeStyles((theme) => ({
    dangerColor: {
      color: dangerColor ? theme.palette.error.main : '',
    }
  }))()
}

export default function VetButton(props: VetButtonProps): ReactElement {
  const {
    ButtonProps,
    children,
    dangerColor = false,
  } = props;
  const classes = useStyle(dangerColor);

  return (
    <Button className={classes.dangerColor} {...ButtonProps}>
      {children}
    </Button>
  )
}

type VetButtonProps = {
  /** @default false*/
  dangerColor?: boolean;

  ButtonProps?: MuiButtonProps;
  children?: ReactNode;
};
