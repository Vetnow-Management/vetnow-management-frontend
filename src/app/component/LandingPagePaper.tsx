import React, { PropsWithChildren, ReactElement } from 'react';

import { Grid, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Consumer, Supplier } from '@cade-tecnologia/essentials';

function useStyles(leftGridColor: string): ClassNameMap<"grow" | "leftGridBGColor" | "root"> {
  return makeStyles({
    grow: {
      flexGrow: 1,
    },
    root: {
      flexGrow: 1,
      minHeight: '100vh', maxWidth: '100%'
    },
    leftGridBGColor: {
      backgroundColor: leftGridColor,
    },
  })();
}

interface ILandingPagePaper {
  leftGridColor?: string,
  renderLeftSide: Supplier<ReactElement>,
  renderRightSide: Supplier<ReactElement>,
}

export default function LandingPagePaper(props: ILandingPagePaper): ReactElement {
  const {
    renderLeftSide,
    renderRightSide,
    leftGridColor = 'pink',
  } = props;

  const classes = useStyles(leftGridColor);

  return (
    <Grid container className={ classes.root } alignItems='center' justify='center'>
      <Paper elevation={ 6 } variant='elevation'>
        <Grid item container direction='row'>
          <Grid item md={4} xs={12} className={classes.leftGridBGColor}>
            {renderLeftSide()}
          </Grid>
          <Grid item
                container
                xs={12}
                md={8}
                justify='center'
          >
            {renderRightSide()}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
