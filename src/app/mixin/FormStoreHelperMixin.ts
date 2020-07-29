import { action } from 'mobx';
import { Supplier, Function, Consumer, ConsumerImpl } from '@cade-tecnologia/essentials';
import { ChangeEvent } from 'react';

type TargetType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// todo: Mover para o @cade-tecnologia/react-library
export default abstract class FormStoreHelperMixin {

  @action.bound
  public setCampo({ target }: TargetType): void {
    this[target.name] = target.value;
  }

  @action.bound
  public setCampoComCondicao(condicao: Supplier<boolean> | Function<string, boolean>): Consumer<TargetType> {
    return (event) => {
      if (condicao(event.target.value)) {
        return ConsumerImpl(null);
      }
      return this.setCampo(event)
    }
  }

  @action.bound
  public limparCampos(): void {
    Object.keys(this)
      .forEach((atributo) => {
        if (typeof this[atributo] === 'string') {
          this[atributo] = ''
        } else {
          throw new Error('Ver como tratar outros tipo')
        }
      })
  }
}
