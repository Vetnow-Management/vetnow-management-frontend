import { action, observable } from 'mobx';

interface Steps {
  label: string,
  id: number,
}

export default class StepperStore {
  public readonly stepsAvailable: Steps[] = [
    { label: 'Dados Pessoais', id: 0 },
    { label: 'Dados Empresariais', id: 1 },
    { label: 'Dados Usuário', id: 2 },
  ];

  @observable
  public currentStep: number = 0;

  @action.bound
  public proximoStep(): void {
    this.currentStep++;
  }

  @action.bound
  public voltarStep(): void {
    this.currentStep--;
  }
}
