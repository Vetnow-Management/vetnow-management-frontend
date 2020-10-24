import { Verify } from '@vetnow-management/essentials';

// todo: mover pro esseatials
export default function deepFreeze<T extends Record<any, any>>(obj: T): T {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const podeExecutarRecursividade = Object.prototype.hasOwnProperty.call(obj, prop)
      && Verify.isNotNullOrUndefined(obj[prop])
      && (typeof obj[prop] === 'object' || typeof obj[prop] === 'function')
      && !Object.isFrozen(obj[prop]);

    if (podeExecutarRecursividade) deepFreeze(obj[prop]);
  });

  return obj;
}
