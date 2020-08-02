import React, { ReactElement, useContext, useState } from 'react';

import {
  Stepper,
  Step,
  StepLabel, Orientation,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useBreakpoints } from '../../../../hook';
import { signUpContext } from '../context';

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

export default function StepperSignUp(): ReactElement {
  const classes = useStyles();
  const match = useBreakpoints(true).up('sm')
  const {
    stepperStore: {
      currentStep,
      stepsAvailable,
    }
  } = useContext(signUpContext);

  function getOrientation(): Orientation {
    if (match) return 'vertical';
    return 'horizontal';
  }

  function getLabel(label: string): string {
    if (match) return label;
    return '';
  }

  return (
    <Stepper className={classes.root} activeStep={currentStep} orientation={getOrientation()} id='kill_me'>
      {stepsAvailable.map(({label, id}) => (
        <Step key={id}>
          <StepLabel>{getLabel(label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
