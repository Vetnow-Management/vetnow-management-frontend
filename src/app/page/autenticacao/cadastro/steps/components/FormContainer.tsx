import React, { ReactElement, ReactNode } from 'react';

import { Box, Paper } from '@material-ui/core';

import { WhiteSpace } from '../../../../../component';

export default function FormContainer({ children }: { children: ReactNode[] | ReactNode }): ReactElement {
  return (
    <Box width={ 1 } margin='5px'>
      <Paper elevation={ 2 } style={ { padding: '15px' } }>
        { React.Children.map(children, ((child) => (
          <>
            <WhiteSpace spaceTop={ 5 }/>
            { child }
          </>
        ))) }
      </Paper>
    </Box>
  );
}
