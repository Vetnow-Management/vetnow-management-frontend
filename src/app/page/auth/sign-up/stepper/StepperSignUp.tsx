import React, { ReactElement, useState } from 'react';

import {
  Stepper,
  Step,
  StepLabel, useMediaQuery, Orientation,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ChillingWithDogReady } from '../../../../asset';
import { useBreakpoints } from '../../../../hook';

export interface Steps {
  label: string,
  id: number,
}

interface StepperSignUpProps {
  currentStepper: number,
  steps: Steps[]
}

const useStyles = makeStyles({
  root: {
    backgroundColor: 'pink'
  }
});

export default function StepperSignUp({ currentStepper, steps }: StepperSignUpProps): ReactElement {
  const classes = useStyles();
  const match = useBreakpoints().up('sm')
  const [ _, setSize ] = useState<number>(0);

  window.addEventListener('resize', () => {
    setSize(window.innerHeight);
  });

  function getOrientation(): Orientation {
    if (match) return 'vertical';
    return 'horizontal';
  }

  function getLabel(label: string): string {
    if (match) return label;
    return '';
  }

  return (
    <Stepper className={classes.root} activeStep={currentStepper} orientation={getOrientation()} id='kill_me'>
      {steps.map(({label, id}) => (
        <Step key={id}>
          <StepLabel>{getLabel(label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
