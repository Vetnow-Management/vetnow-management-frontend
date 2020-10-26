import { makeAutoObservable } from 'mobx';

interface Steps {
  label: string,
  id: number,
}

export default class StepperStore {
  public readonly stepsAvailable: Steps[] = [
    { label: 'Dados Pessoais', id: 0 },
    { label: 'Dados Empresariais', id: 1 },
    { label: 'Dados de Usuario', id: 2 },
  ];

  public constructor() {
    makeAutoObservable(this);
  }

  public currentStep: number = 0;

  public proximoStep = (): void => {
    this.currentStep++;
  }

  public voltarStep = (): void => {
    this.currentStep--;
  }

  public irParaPrimeiroStep = (): void => {
    this.currentStep = 0;
  }

  public get estaNoPrimeiroStep(): boolean {
    return this.currentStep === 0;
  }

  public get estaNoUltimoStep(): boolean {
    return this.currentStep === this.stepsAvailable.length - 1;
  }
}
