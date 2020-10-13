import { action, computed, observable } from 'mobx';
import { Observable } from 'rxjs';

export default class BlockUIStore {

  @observable
  private _mostrar: boolean = false;

  @action.bound
  public toggle(): void {
    this._mostrar = !this._mostrar;
  }

  @action.bound
  public togglePipeable<A>(source: Observable<A>): Observable<A> {
    this.toggle();
    return source;
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
