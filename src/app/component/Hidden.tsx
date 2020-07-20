import React, { ReactElement, ReactNode } from 'react';

import { makeStyles } from '@material-ui/core/styles';

export interface HiddenProps {
  component: ReactElement | ReactNode,
  isVisible?: boolean
}

const useStyles = makeStyles({
  fadeOut: {
    opacity: 0,
    transition: 'width 0.1s 0.1s, height 0.1s 0.1s, opacity 0.1s',
  },
  fadeIn: {
    opacity: 1,
    transition: 'width 0.1s, height 0.1s, opacity 0.1s 0.1s',
  }
});

export default function Hidden({ component, isVisible }: HiddenProps): ReactElement {
  const classes = useStyles();

  function getFade(): string {
    if (isVisible) {
      return 'fadeIn';
    }

    return 'fadeOut';
  }

  return <span className={classes[getFade()]}>{component}</span>
}
