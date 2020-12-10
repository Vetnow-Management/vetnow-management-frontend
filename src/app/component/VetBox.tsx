import {Box, createStyles, Grid, Theme} from "@material-ui/core";
import React, {ReactElement, ReactNode} from "react";
import {makeStyles} from "@material-ui/core/styles";
import VetSecaoBar from "./VetSecaoBar";

export interface VetBoxProps {
  titulo?: string,
  largura?: number | string,
  altura?: number | string,
  radius?: number,
  children?: ReactElement | ReactElement[] | ReactNode | ReactNode[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    box: {
      backgroundColor: 'white',
      padding: 5,
      boxShadow: '-4px 6px 7px -5px rgba(0,0,0,0.14)'
    }
  }),
);

export default function VetBox(props: VetBoxProps) {
  const classes = useStyles();

  const {children, titulo, largura = '100%', altura = '100%', radius = 16} = props;

  return (
    <div className={classes.root}>
      <Box className={classes.box} width={largura} height={altura} borderRadius={radius}>
        <Grid container spacing={1}>
          {titulo && (
            <Grid item xs={12}>
              <VetSecaoBar titulo={titulo}/>
            </Grid>
          )}
          <Grid item xs={12}>
            <div style={{backgroundColor: '#fafafa', borderRadius: 16, padding: 10}}>
              {children}
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

