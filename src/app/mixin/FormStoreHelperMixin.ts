import { action } from 'mobx';
import { Supplier, Func, Consumer, ConsumerImpl } from '@cade-tecnologia/essentials';
import Target from '../Type/Target';

// todo: Mover para o @cade-tecnologia/react-library
export default abstract class FormStoreHelperMixin {

  @action.bound
  public setCampo({ target: { value, name } }: Target): void {
    if (Object.prototype.hasOwnProperty.call(this, name)) {
      // @ts-ignore: Arrumar no futuro
      this[name] = value;
    }
  }

  @action.bound
  public setCampoComCondicao(condicao: Supplier<boolean> | Func<string, boolean>): Consumer<Target> {
    return (event) => {
      if (condicao(event.target.value)) {
        return ConsumerImpl(null);
      }
      return this.setCampo(event)
    }
  }

  // @action.bound
  // public limparCampos(): void {
  //   const warn = (msg: string): void => {
  //     // eslint-disable-next-line no-console
  //     console.warn(msg);
  //   }
  //
  //   Object.keys(this)
  //     .forEach((atributo) => {
  //       debugger
  //       // @ts-ignore: Arrumar no futuro
  //       switch (typeof this[atributo]) {
  //         case 'string': {
  //           debugger
  //           // @ts-ignore: Arrumar no futuro
  //           this[atributo] = ''
  //           break;
  //         }
  //         case 'object': {
  //           // @ts-ignore: Arrumar no futuro
  //           if (Verify.isNotNullOrUndefined(this[atributo].limparCampos)) {
  //           // @ts-ignore: Arrumar no futuro
  //             this[atributo].limparCampos();
  //             break;
  //           }
  //           warn(`Objeto ${atributo} nao implementa limparCampos, seus atributos nao serao limpos`);
  //           break;
  //         }
  //         default: {
  //           // @ts-ignore: Arrumar no futuro
  //           warn(`Tipo nao suportado: ${typeof this[atributo]} | atributo: ${atributo}`);
  //         }
  //       }
  //     })
  // }
}
