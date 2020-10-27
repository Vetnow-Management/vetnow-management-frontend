import React, { ReactElement } from 'react';

import {
  Step,
  Stepper,
  StepLabel,
  makeStyles,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';

import { useSignUpContext } from '../context';
import { useBreakpoints } from '../../../../hook';

const useStyles = makeStyles({
  root: {
    borderRadius: 3,
    marginLeft: 15,
    marginRight: 5,
    width: '100%'
  }
});

function StepperSignUp(): ReactElement {
  const classes = useStyles();
  const match = useBreakpoints(true).up('sm')
  const {
    stepperStore: {
      currentStep,
      stepsAvailable,
    }
  } = useSignUpContext();

  function getLabel(label: string): string {
    if (match) return label;
    return '';
  }

  return (
    <Stepper id='STEPPER' className={classes.root} activeStep={currentStep} elevation={2} orientation='horizontal'>
      {stepsAvailable.map(({label, id}) => (
        <Step key={id}>
          <StepLabel>{getLabel(label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default observer(StepperSignUp)
