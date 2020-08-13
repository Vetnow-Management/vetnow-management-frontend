import React, { ReactElement, useEffect, useState } from 'react';

import { Paper, Box, Typography, Grid } from '@material-ui/core';
import { Consumer, Runnable, RunnableImpl } from '@vetnow-management/essentials';
import { makeStyles } from '@material-ui/core/styles';
import { useSignUpContext } from '../context';

const useStyles = makeStyles({
  root: {
    padding: '10px',
    minHeight: '180px',
  },
  rootOpcaoB: {
    padding: '22px',
  },
  selected: {
    backgroundColor: '#e0e0e0',
  }
});

type UseStateType = 'free' | 'pago';

function later(delay: number, value: string): Promise<string> {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}

export default function PlanosStep(): ReactElement {
  const [elevationOpcaoFree, setElevationOpcaoFree] = useState<number>(1);
  const [elevationOpcaoPaga, setElevationOpcaoPaga] = useState<number>(5);
  const [selected, setSelected] = useState<UseStateType>('pago');
  const { formularioCadastro: { setField } } = useSignUpContext();
  const classes = useStyles();

  function raiseElevation(func: Consumer<number>): Runnable {
    return () => func(5);
  }

  function lowerElevation(func: Consumer<number>): Runnable {
    return () => func(1)
  }

  function onClickToggleSelect(option: UseStateType): Runnable {
    return () => {
      if (selected === option) return;
      if (selected === 'pago') {
        setSelected('free');
        setElevationOpcaoFree(5)
        setElevationOpcaoPaga(1);
      }
      if (selected === 'free') {
        setSelected('pago');
        setElevationOpcaoPaga(5);
        setElevationOpcaoFree(1)
      }
    }
  }

  useEffect(() => {
    if (setField) setField()('empresa.chave.tipo', selected);
  }, [selected]);

  return (
    <Grid item container direction='row' alignItems='center' justify='center' spacing={ 2 }>
      <Grid item xs={12} md={6}>
        <Box width={ 1 } margin='5px'>
          <Paper classes={{ root: classes.root }}
                 className={selected === 'free' ? classes.selected : ''}
                 elevation={elevationOpcaoFree}
                 onMouseEnter={raiseElevation(setElevationOpcaoFree)}
                 onMouseLeave={selected === 'free' ? RunnableImpl : lowerElevation(setElevationOpcaoFree)}
                 onClick={onClickToggleSelect('free')}
          >
            <Typography variant='h3'>Testar sistema</Typography>
            <hr/>
            <Typography component='p'>Testar o sistema gratuitamente pro uma semana</Typography>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box width={ 1 } margin='5px'>
          <Paper className={selected === 'pago' ? classes.selected : ''}
                 classes={{ root: classes.root }}
                 elevation={elevationOpcaoPaga}
                 onMouseEnter={raiseElevation(setElevationOpcaoPaga)}
                 onMouseLeave={selected === 'pago' ? RunnableImpl : lowerElevation(setElevationOpcaoPaga)}
                 onClick={onClickToggleSelect('pago')}
          >
            <Typography variant='h3'>Sistema Pago</Typography>
            <hr/>
            <Typography component='p'>Comprar uma licença do sistema</Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  )
}
