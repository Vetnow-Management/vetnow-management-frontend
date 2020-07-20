import React, { CSSProperties } from 'react';

import { Grid } from '@material-ui/core';
import { Environment } from '../util';

interface Props {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  marginTop: string,
  marginBottom: string,
}

const style: CSSProperties = {
  width: 'inherit',

  backgroundColor: Environment.PRIMARY_COLOR,
  border: `1px solid ${Environment.PRIMARY_COLOR}`,
  borderRadius: '20px',
  height: '3px',
};

export default function Divider({ size, marginBottom, marginTop }: Props) {
  return (
    <>
      <div style={ { width: '100%', marginTop } }/>
      <Grid item container xs={ size }>
        <hr style={ style }/>
      </Grid>
      <div style={ { width: '100%', marginBottom } }/>
    </>
  );
}

Divider.defaultProps = {
  size: 12,
  marginTop: '0px',
  marginBottom: '0px',
};
