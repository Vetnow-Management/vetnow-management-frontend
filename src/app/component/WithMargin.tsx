import React, { PropsWithChildren, ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface WithMarginProps {
  margin: string;
}

function useStyles(margin: string) {
  return makeStyles({
    withMargin: {
      margin
    }
  })();
}
export default function WithMargin({ children, margin }: PropsWithChildren<WithMarginProps>): ReactElement {
  const classes = useStyles(margin);

  return (
   <div className={classes.withMargin}>
     {children}
   </div>
 )
}
