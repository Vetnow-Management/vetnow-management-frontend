import {IconButton, Tooltip} from "@material-ui/core";
import React, {MouseEventHandler} from "react";
import {observer} from "mobx-react-lite";

export interface IVetIconButtonProps {
  titulo: string;
  icon: React.ReactNode
  click?: MouseEventHandler;
  cor?: string;
  apresentar?: boolean,
  posicao?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}

function VetIconButton(props: IVetIconButtonProps) {

  const {titulo, posicao, click, cor, apresentar = true, icon} = props;

  return (
    <>
      {apresentar && (
        <Tooltip title={titulo} placement={posicao}>
          <IconButton
            size="small"
            style={{color: cor}}
            onClick={click}
          >
            {icon}
          </IconButton>
        </Tooltip>
      )
      }
    </>
  )
}

export default observer(VetIconButton);
