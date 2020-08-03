import React from 'react';

import Cleave from "cleave.js/react";
import { TextField } from "@material-ui/core";
import { TextFieldProps } from '@material-ui/core/TextField/TextField';
import { CleaveOptions } from 'cleave.js/options';

type Props = TextFieldProps & {options: CleaveOptions};

function CleaveAdapter(propsAdapter: any) {
  const { options, inputRef, ...rest } = propsAdapter;
  return <Cleave ref={ inputRef }
                 options={options}
                 {...rest}
  />;
}

export default function MaskedTextField(props: Props) {
  const { options } = props;
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: CleaveAdapter,
        inputProps: {options},
      }}
    />
  );
}
