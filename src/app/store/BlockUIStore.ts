import { action, computed, observable } from 'mobx';

export default class BlockUIStore {

  @observable
  private _mostrar: boolean = false;

  @action.bound
  public toggle(): void {
    this._mostrar = !this._mostrar;
  }

  @action.bound
  public mostrar(): void {
    this._mostrar = true;
  }

  @action.bound
  public naoMostrar(): void {
    this._mostrar = false;
  }

  @computed
  public get estaMostrando(): boolean {
    return this._mostrar;
  }
}
