import React, { ReactElement } from 'react';

import { Button, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ChillingWithDogReady } from '../../asset';
import { Divider, LandingPagePaper, WhiteSpace, WithMargin, BtnCadastro } from '../../component';
import { Environment } from '../../util';
import { useRoutes } from '../../hook';

const useStyles = makeStyles({
  leftGridBGColor: {
    backgroundColor: 'pink',
  },
  withMargin: {
    margin: '10px',
  }
});

export default function LandingPage(): ReactElement {
  const classes = useStyles();
  const { goToSignUp } = useRoutes();

  return (
    <LandingPagePaper
      renderLeftSide={ () => (
        <WithMargin margin='10px'>
          <Hidden mdUp>
            <Typography align='center'>{ Environment.APP_NAME }</Typography>
          </Hidden>
          <Hidden smDown>
            <ChillingWithDogReady/>
            <WhiteSpace spaceTop={ 50 }/>
            <Typography align='left'>
              Lorem ipsum dolor sit amet, ad duo natum doctus, et vix atqui tibique efficiantur. Cum id iudico fuisset
              apeirian, mea odio splendide ex, in his iisque oportere interesset.
            </Typography>
            <Divider/>
            <Typography align='left'>
              Munere fabellas oportere nec no, iusto choro ullamcorper pro no. Ut quo novum diceret offendit, ut
              quaerendum delicatissimi vix, id nec iudicabit ocurreret vituperata
            </Typography>
          </Hidden>
        </WithMargin>
      ) }
      renderRightSide={ () => (
        <>
          <Grid className={classes.withMargin} container item xs={10} md={ 8 } alignContent='center' justify='center' spacing={ 2 } id='GGWP'>
            <Grid item md={ 8 } xs={10}>
              <Button fullWidth
                variant='contained'
                size='large'
                color='primary'
              >
                Entrar
              </Button>
            </Grid>
            <Grid item md={ 8 } xs={10}>
              <Hidden smUp>
                <BtnCadastro
                  onClick={goToSignUp}
                  descricao='EXPERIMENTE GRÁTIS'
                />
              </Hidden>
            </Grid>
          </Grid>
        </>
      ) }
    />
  );
}
