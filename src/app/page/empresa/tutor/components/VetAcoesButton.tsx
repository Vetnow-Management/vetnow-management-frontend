import {Consumer} from "@vetnow-management/essentials";
import VetIconButton from "../../../../component/VetIconButton";
import {Delete, Visibility} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import {Button, CircularProgress} from "@material-ui/core";
import {observer} from "mobx-react-lite";


interface VetAcoesButtonProps<T> {
  item: T
  excluir: Consumer<T>,
  visualizar: Consumer<T>,
}

function VetAcoesButton<T>(props: VetAcoesButtonProps<T>) {

  const {item, excluir, visualizar} = props;

  const [progress, setProgress] = React.useState(0);
  const [podeApresentarOutrasAcoes, setPodeApresentarOutrasAcoes] = useState<boolean>(true);
  const [podeApresentarConfirmacao, setPodeApresentarConfirmacao] = React.useState(false);

  useEffect(() => {

    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      setProgress(0);
      clearTimeout(timer);
    }
  }, [podeApresentarConfirmacao]);

  function realizarVisualizacao(): void {
    visualizar(item);
  }

  function realizarConfirmacao(): void {
    resetar();
    excluir(item);
  }

  function apresentarConfirmacao() {
    setPodeApresentarConfirmacao(true);
    setPodeApresentarOutrasAcoes(false);
    window.setTimeout(() => {
      resetar();
    }, 8000);
  }

  function resetar() {
    setPodeApresentarConfirmacao(false);
    setPodeApresentarOutrasAcoes(true);
  }

  function BtnExcluir() {
    return (
      <>
        {!podeApresentarConfirmacao && (
          <VetIconButton
            titulo="Excluir"
            posicao="top-start"
            cor={'#c0392b'}
            click={apresentarConfirmacao}
            icon={<Delete/>}
          />
        )}
        {podeApresentarConfirmacao && (
          <Button
            style={{backgroundColor: '#c0392b', width: 150, height: 30}}
            size={"small"}
            variant={"contained"}
            color='primary'
            onClick={realizarConfirmacao}
          >
            Confirmar
            <CircularProgress style={{marginLeft: 30, width: 15}} color={"inherit"} variant="static"
                              value={progress}/>
          </Button>
        )}
      </>
    )
  }

  return (
    <>
      <VetIconButton
        titulo="Visualizar"
        posicao="top-start"
        cor={'#e67e22'}
        click={realizarVisualizacao}
        apresentar={podeApresentarOutrasAcoes}
        icon={<Visibility/>}
      />
      <BtnExcluir/>
    </>
  );
}

export default observer(VetAcoesButton);
