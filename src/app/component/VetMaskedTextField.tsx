import React from 'react';

import Cleave from 'cleave.js/react';
import { CleaveOptions } from 'cleave.js/options';
import { TextField, TextFieldProps } from 'mui-rff';
import { InputProps as MuiInputProps } from '@material-ui/core';

export default function VetMaskedTextField({ mascara, InputProps, ...rest }: Props) {
  const options = typeof mascara === 'string'
    ? OPCOES_MASCARA[mascara]
    : mascara;

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

const OPCOES_MASCARA: IOpcoesMascara = {
  celular: {
    delimiters: ['(', ')', ' ', '-'],
    blocks: [0, 2, 0, 5, 4],
    numericOnly: true,
  },
  cpf: {
    delimiters: ['.', '.', '-'],
    blocks: [3, 3, 3, 2],
    numericOnly: true,
  },
  telefone: {
    delimiters: ['(', ')', ' ', '-'],
    blocks: [0, 2, 0, 4, 4],
    numericOnly: true,
  },
  cep: {
    delimiter: '-',
    blocks: [5, 3],
    numericOnly: true,
  },
};

type IOpcoesMascara = {
  celular: CleaveOptions,
  cpf: CleaveOptions,
  telefone: CleaveOptions,
  cep: CleaveOptions,
}

type Props = TextFieldProps & {
  mascara: CleaveOptions | keyof IOpcoesMascara,
  InputProps?: Partial<MuiInputProps>,
};
