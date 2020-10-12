import React, { ReactElement, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  footerStyle: {
    backgroundColor: "#ffffff",
    fontSize: "20px",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: 13,
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%"
  },
  phantomStyle: {
    display: "block",
    padding: "20px",
    height: "60px",
    width: "100%"
  }
});

export default function VetFooter({ children }: VetFooterProp): ReactElement {
  const classes = useStyle();

  return (
    <div>
      <div className={classes.phantomStyle}/>
      <div className={classes.footerStyle}>
        {children}
      </div>
    </div>
  )
}

type VetFooterProp = {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[]
}
