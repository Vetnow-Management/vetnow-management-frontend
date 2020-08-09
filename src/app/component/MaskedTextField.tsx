import React from 'react';

import Cleave from 'cleave.js/react';
import { TextField, TextFieldProps } from 'mui-rff';
import { CleaveOptions } from 'cleave.js/options';

type Props = TextFieldProps & { options: CleaveOptions };

export default function MaskedTextField({ options, ...rest }: Props) {
  return (
    <TextField
      { ...rest }
      InputProps={ {
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
