import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';

import { delay, repeat, takeUntil } from 'rxjs/operators';
import { Warning as WarningIcon } from '@material-ui/icons';
import { IconButton, Popover, Typography } from '@material-ui/core';

import { GitHubRestService } from '../../service/github';
import { Environment } from '../../util';
import { Subject } from 'rxjs';

const subject: Subject<boolean> = new Subject();

export default function Alerta(): ReactElement {
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement | null>(null);
  const [versaoMaisRecente, setVersaoMaisRecente ] = useState<string | null>(null);

  // if (Environment.NODE_ENV === 'production') {
  if (Environment.NODE_ENV === 'development') {
    GitHubRestService.obterTags()
      .pipe(
        // can be used to cancel
        takeUntil(subject),
        delay(10000),
        // repeat steps above
        repeat(),
      ).subscribe((res) => {
      console.log('Res: ', res);
    });
  }

  const isPopOverOpen = Boolean(anchorEl);
  const idPopOver = isPopOverOpen
    ? 'alertas-popover'
    : undefined;

  function aoAbrirPopOver(event: MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function aoFecharPopOver(): void {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton aria-describedby={idPopOver} onClick={aoAbrirPopOver}>
        <WarningIcon color='error'/>
      </IconButton>
      <Popover open={isPopOverOpen}
               id={idPopOver}
               anchorEl={anchorEl}
               onClose={aoFecharPopOver}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'center',
               }}
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'center'
               }}
      >
        <Typography>Atualize o site clicando aqui!</Typography>
      </Popover>
    </>
  )
}
