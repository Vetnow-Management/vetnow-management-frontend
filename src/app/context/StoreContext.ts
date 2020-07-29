import React from 'react';
import { FormCadastroStore, StepperStore } from '../store';
import { IStoresContext } from '../interface';

const storesContext = React.createContext<IStoresContext>({
  stepperStore: new StepperStore(),
  cadastroStore: new FormCadastroStore(),
});

export default storesContext;
