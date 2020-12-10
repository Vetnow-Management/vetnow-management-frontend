import React, {ReactElement, useEffect} from "react";
import {Button, CircularProgress, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Consumer} from "@vetnow-management/essentials";

const useStyles = makeStyles({
  root: {},
  progress: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',

  },
})

interface VetExcluirButtonProps<T> {
  item?: T,
  descricao: string,
  confirmar: Consumer<T> | any
}

export default function VetConfirmacaoButton<T>(props: VetExcluirButtonProps<T>): ReactElement {

  const {confirmar, descricao, item} = props;

  const [progress, setProgress] = React.useState(0);
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

  function realizarConfirmacao(item: T): void {
    confirmar(item);
    setPodeApresentarConfirmacao(false);
  }

  function apresentarConfirmacao() {
    setPodeApresentarConfirmacao(true);
    window.setTimeout(() => {
      setPodeApresentarConfirmacao(false);
    }, 8000);
  }

  function AguardarConfirmacao(): ReactElement {
    return (
      <Button
        style={{width: 150, height: 30}}
        // size={"small"}
        color='primary'
        variant={"contained"}
        onClick={() => apresentarConfirmacao()}
      >
        {descricao}
      </Button>
    )
  }

  function RealizarConfirmacao(): ReactElement {
    return (
      <Button
        style={{width: 150, height: 30}}
        // size={"small"}
        variant={"contained"}
        color='secondary'
        onClick={() => realizarConfirmacao(item!)}
      >
        <Typography>Confirmar</Typography>
        <CircularProgress style={{marginLeft: 30, width: 15}} color={"inherit"} variant="static"
                          value={progress}/>
      </Button>
    )
  }

  return (
    <>
      {!podeApresentarConfirmacao && <AguardarConfirmacao/>}
      {podeApresentarConfirmacao && <RealizarConfirmacao/>}
    </>
  );
}
