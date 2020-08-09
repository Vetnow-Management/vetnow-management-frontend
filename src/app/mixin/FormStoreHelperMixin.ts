import { action } from 'mobx';
import { Consumer, ConsumerImpl, Func, Supplier, Verify } from '@vetnow-management/essentials';
import Target from '../Type/Target';

export interface CondicaoReturn {
  podeAtribuir: boolean,
  valorTratado?: string,
}

// todo: Mover para o @vetnow-management/react-library
export default abstract class FormStoreHelperMixin {

  @action.bound
  public setCampo({ target: { value, name } }: Target): void {
    if (Object.prototype.hasOwnProperty.call(this, name)) {
      // @ts-ignore: Arrumar no futuro
      this[name] = value;
    }
  }

  @action.bound
  public setCampoComCondicao(condicao: Supplier<CondicaoReturn> | Func<string, CondicaoReturn>): Consumer<Target> {
    return (event) => {
      const { podeAtribuir, valorTratado } = condicao(event.target.value);
      const valorTarget: Target | null = Verify.isNotNullOrUndefined(valorTratado)
        ? {
          target: {
            name: event.target.name,
            value: valorTratado as string,
          }
        }
        : null;

      if (podeAtribuir) {
        return this.setCampo(valorTarget ?? event)
      }
      return ConsumerImpl(null);
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
