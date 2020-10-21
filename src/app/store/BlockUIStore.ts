import { action, computed, observable } from 'mobx';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Observable, pipe } from 'rxjs';

export default class BlockUIStore {

  @observable
  private _mostrar: boolean = false;

  @action.bound
  public toggle(): void {
    this._mostrar = !this._mostrar;
  }

  /**
   * Metodo para ser usado dentro do {@link pipe} do RXJS
   * <p>
   *   <b>Ex:</b>
   *   <pre>
   *     ExemploRestService
   *       .getRecurso()
   *       .pipe(togglePipeable)
   *       .subscribe()
   *   </pre>
   * </p>
   */
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
