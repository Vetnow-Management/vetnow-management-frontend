import React, { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import { Badge, IconButton } from '@material-ui/core';
import { Consumer } from '@vetnow-management/essentials';
import { Notifications as NotificationsIcon } from '@material-ui/icons';

import useAppContext from '../../AppContext';

function NotificacoesBotao({ aoClickNotificacoes }: NotificacoesBotao): ReactElement {
  const { notificacoesStore: { totalNotificacoes, aoVisualizar }} = useAppContext();

  function onClick(click: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>): void {
    aoVisualizar();
    aoClickNotificacoes(click);
  }

  return (
    <IconButton color='inherit' onClick={ onClick }>
      <Badge badgeContent={totalNotificacoes} color='secondary'>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  )
}

type NotificacoesBotao = {
  aoClickNotificacoes: Consumer<React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>>;
}

export default observer(NotificacoesBotao);
