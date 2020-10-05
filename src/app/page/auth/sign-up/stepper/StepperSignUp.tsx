import React, { ReactElement } from 'react';

import {
  Stepper,
  Step,
  StepLabel, Orientation,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useBreakpoints } from '../../../../hook';
import { useSignUpContext } from '../context';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '3px',
    '& .Veterinario-MuiStepIcon-active, .Veterinario-MuiStepIcon-completed': {
      color: theme.palette.secondary.main,
    },
    '& .Veterinario-MuiStepConnector-lineVertical': {
      minHeight: 0,
    }
  }
}));

export default function StepperSignUp(): ReactElement {
  const classes = useStyles();
  const match = useBreakpoints(true).up('sm')
  const {
    stepperStore: {
      currentStep,
      stepsAvailable,
    }
  } = useSignUpContext();

  function getOrientation(): Orientation {
    if (match) return 'vertical';
    return 'horizontal';
  }

  function getLabel(label: string): string {
    if (match) return label;
    return '';
  }

  return (
    <Stepper id='STEPPER' className={classes.root} activeStep={currentStep} orientation={getOrientation()}>
      {stepsAvailable.map(({label, id}) => (
        <Step key={id}>
          <StepLabel>{getLabel(label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
