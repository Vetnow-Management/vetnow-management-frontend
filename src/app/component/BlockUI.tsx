import React, { ReactElement, ReactNode } from 'react';

import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

interface BlockUIProps {
  isOpen: boolean;
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function BlockUI({ isOpen, children }: BlockUIProps): ReactElement {
  const classes = useStyles();

  return (
    <>
      {children}
      <Backdrop open={isOpen} className={classes.backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}
