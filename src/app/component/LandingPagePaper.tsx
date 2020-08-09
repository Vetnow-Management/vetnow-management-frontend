import React, {ReactElement} from 'react';

import {Grid, GridSize, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {ClassNameMap} from '@material-ui/core/styles/withStyles';
import {Supplier} from '@vetnow-management/essentials';

function useStyles(leftGridColor: string): ClassNameMap<"grow" | "leftGridBGColor" | "root"> {
  return makeStyles({
    grow: {
      flexGrow: 1,
    },
    root: {
      flexGrow: 1,
      minHeight: '100vh',
      maxWidth: '100%',
      padding: 10,
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
  smLeftSide: GridSize,
  smRightSide: GridSize,
}

export default function LandingPagePaper(props: ILandingPagePaper): ReactElement {
  const {
    renderLeftSide,
    renderRightSide,
    smLeftSide,
    smRightSide,
    leftGridColor = 'pink',
  } = props;

  const classes = useStyles(leftGridColor);

  return (
    <Grid container className={classes.root} alignItems='center' justify='center'>
      <Paper elevation={6} variant='elevation'>
        <Grid item container direction='row'>
          <Grid item xs={12} sm={smLeftSide} className={classes.leftGridBGColor}>
            {renderLeftSide()}
          </Grid>
          <Grid item
                container
                sm={smRightSide}
                xs={12}
                justify='center'
          >
            {renderRightSide()}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

LandingPagePaper.defaultProps = {
  smLeftSide: 4,
  smRightSide: 8,
}
