import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Observable, pipe } from 'rxjs';

export default class BlockUIStore {
  private _mostrar: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public toggle = (): void => {
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
  public togglePipeable = <A>(source: Observable<A>): Observable<A> => {
    this.toggle();
    return source;
  }

  public mostrar = (): void => {
    this._mostrar = true;
  }

  public naoMostrar = (): void => {
    this._mostrar = false;
  }

  public get estaMostrando(): boolean {
    return this._mostrar;
  }
}
