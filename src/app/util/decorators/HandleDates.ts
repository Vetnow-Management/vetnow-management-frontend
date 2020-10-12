import { cloneDeepWith } from 'lodash-es';
import { isValid } from "date-fns";
import { Observable } from 'rxjs';
import { Func } from '@vetnow-management/essentials';
import { map } from 'rxjs/operators';

function converterParaServidor(object: Record<string, any>): Record<string, any> {
  return cloneDeepWith(object, (value) => {
    if (isValid(value)) return new Date(value).toISOString();
  });
}

function converterDoServidor(object: Record<string, any>): Record<string, any> {
  return cloneDeepWith(object, (value) => {
    // todo: o servidor SEMPRE tem q retornar LocalDate, se retonar 'ano-mes-dia' eh uma data invalida
    if (isValid(value)) return new Date(value);
  });
}

export default function handleDates() {
  return (target: any,
          propertyKey: string,
          descriptor: PropertyDescriptor) => {
    const originalMethod: Func<any, Observable<any>> = descriptor.value;

    descriptor.value = function (...originalMethodArgs: any[]) {
      const argsTransformados: any = originalMethodArgs.map((value) => {
          if (typeof value === 'object') return converterParaServidor(value);
          return value;
        });

      return originalMethod?.apply(this, argsTransformados)
        .pipe(
          map(converterDoServidor)
        )
    }
  }
}
