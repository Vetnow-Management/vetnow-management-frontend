import React, { PropsWithChildren, ReactElement } from 'react';

import { Grid, GridJustification, GridSize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  GridContentAlignment,
  GridDirection,
  GridItemsAlignment,
  GridSpacing,
  GridWrap
} from '@material-ui/core/Grid/Grid';

interface CreateGridProps {
  alignContent?: GridContentAlignment;
  alignItems?: GridItemsAlignment;
  container?: boolean;
  direction?: GridDirection;
  item?: boolean;
  justify?: GridJustification;
  spacing?: GridSpacing;
  wrap?: GridWrap;
  zeroMinWidth?: boolean;
  lg?: GridSize;
  md?: GridSize;
  sm?: GridSize;
  xl?: GridSize;
  xs?: GridSize;
}

const useStyles = makeStyles({
  minHeight: { minHeight: '100vh' },
});

export default function CreateGrid(props: PropsWithChildren<CreateGridProps>): ReactElement {
  const { children } = props;

  const classes = useStyles();

  return (
    <Grid container
          item
          xs={12}
          justify='center'
          alignItems='center'
          className={classes.minHeight}
    >
      <Grid {...props}>
        { children }
      </Grid>
    </Grid>
  );
}
