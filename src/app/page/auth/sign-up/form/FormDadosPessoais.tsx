import React, { ReactElement } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

import { useStores } from '../../../../hook';

function FormDadosPessoais(): ReactElement {
  const {
    cadastroStore: {
      dadosPessoais: {
        nome,
        TAMANHO_NOME,
        celular,
        cpf,
        setCampo,
        setCampoComCondicao
      },
    },
  } = useStores();

  function atingiuTamanhoMaximo(value: string): boolean {
    return value.length === TAMANHO_NOME + 1;
  }

  return (
    <Grid item container direction='row' alignItems='center' justify='center' spacing={2}>
      <Grid item md={12}>
        <TextField fullWidth
                   required
                   name='nome'
                   label='Nome e sobrenome'
                   value={nome}
                   onChange={setCampoComCondicao(atingiuTamanhoMaximo)}
        />
        <span style={{fontSize: 12, color: nome.length === TAMANHO_NOME ? 'red' : 'purple'}}>
          {nome.length === TAMANHO_NOME
            ? `Tamanho maximo: ${TAMANHO_NOME}`
            : `Tamanho: ${nome.length}`
          }
        </span>
      </Grid>
      <Grid item md={6}>
        <TextField fullWidth
                   required
                   label='Celular'
                   name='celular'
                   value={celular}
                   onChange={setCampo}
        />
      </Grid>
      <Grid item md={6}>
        <TextField fullWidth
                   required
                   name='cpf'
                   label='CPF'
                   value={cpf}
                   onChange={setCampo}
        />
      </Grid>
    </Grid>
  );
}

export default React.memo(observer(FormDadosPessoais))
