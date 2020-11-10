import React, { ReactElement } from 'react';

import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Runnable, Verify } from '@vetnow-management/essentials';
import {
  List,
  Paper,
  Divider,
  Popover,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';

import useAppContext from '../../AppContext';

const useStyle = makeStyles({
  conteudo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }
});

function Notificacoes(props: NotificacoesProps): ReactElement | null {
  const classes = useStyle();
  const { anchorEl, aoFecharNotificacoes } = props;
  const { notificacoesStore: { notificacoes } } = useAppContext();
  const notificacoesEstaAberto = Boolean(anchorEl);

  if (Verify.isEmpty(notificacoes)) return null;

  function addDivider(index: number): ReactElement | null {
    // nao pode adicionar divider no ultimo item da lista
    if (notificacoes.length !== index + 1) return <Divider/>;
    return null;
  }

  return (
    <Popover open={ notificacoesEstaAberto }
             id='id_notificacoes-appbar'
             anchorEl={ anchorEl }
             onClose={ aoFecharNotificacoes }
             anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'center'
             } }
             transformOrigin={ {
               vertical: 'top',
               horizontal: 'center',
             } }
    >
      <Paper elevation={ 3 }>
        <List>
          { notificacoes.map((notificacao, index) => (
            <>
              <ListItem className={ classes.conteudo } key={ notificacao.id }>
                <Typography variant='body1' gutterBottom>{ notificacao.titulo }</Typography>
                <Typography variant='body2' gutterBottom>{ notificacao.conteudo }</Typography>
                {notificacao.renderComponent && notificacao.renderComponent()}
                <Typography variant='caption' color='textSecondary'>
                  { format(new Date(), 'd MMMM, yyyy') }
                </Typography>
              </ListItem>
              {addDivider(index)}
            </>
          )) }
        </List>
      </Paper>
    </Popover>
  );
}

type NotificacoesProps = {
  anchorEl: null | HTMLElement;
  aoFecharNotificacoes: Runnable;
};

export default observer(Notificacoes);
