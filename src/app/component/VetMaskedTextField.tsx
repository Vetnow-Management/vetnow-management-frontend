import React from 'react';

import Cleave from 'cleave.js/react';
import { CleaveOptions } from 'cleave.js/options';
import { TextField, TextFieldProps } from 'mui-rff';
import { InputProps as MuiInputProps } from '@material-ui/core';

export default function VetMaskedTextField({ options, InputProps, ...rest }: Props) {
  return (
    <TextField
      { ...rest }
      InputProps={ {
        ...InputProps,
        inputComponent: ({ inputRef, ...rest }) => (
          <Cleave
            htmlRef={ inputRef }
            options={ options }
            { ...rest }
          />
        )
      } }
    />
  );
}

type Props = TextFieldProps & { options: CleaveOptions, InputProps?: Partial<MuiInputProps> };
