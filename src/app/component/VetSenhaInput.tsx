import React, { ReactElement, useState } from 'react';

import { TextField, TextFieldProps } from 'mui-rff';
import { IconButton, InputAdornment } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';

export default function VetSenhaInput(props: Omit<TextFieldProps, 'type' | 'InputProps'>): ReactElement {
  const [ estaMostrando, setEstaMostrando ] = useState<boolean>(false);

  function toggle(): void {
    setEstaMostrando((prevState) => !prevState);
  }

  return (
    <TextField type={ estaMostrando ? 'text' : 'password' }
               InputProps={{
                 endAdornment: (
                   <InputAdornment position='end'>
                     <IconButton onClick={toggle}>
                       { estaMostrando ? <VisibilityIcon /> : <VisibilityOffIcon />}
                     </IconButton>
                   </InputAdornment>
                 )
               }}
               {...props} />
  )
}
