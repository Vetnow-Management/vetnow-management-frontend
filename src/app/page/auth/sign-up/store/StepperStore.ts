import { action, observable } from 'mobx';

interface Steps {
  label: string,
  id: number,
}

export default class StepperStore {
  public readonly stepsAvailable: Steps[] = [
    { label: 'Planos', id: 0 },
    { label: 'Chave de Acesso', id: 1 },
    { label: 'Dados Pessoais', id: 2 },
    { label: 'Dados Empresariais', id: 3 },
    { label: 'Dados de Usuario', id: 4 },
    { label: 'Dados de Pagamento', id: 5 },
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
