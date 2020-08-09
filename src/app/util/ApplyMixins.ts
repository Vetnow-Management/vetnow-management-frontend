import { Assert } from '@vetnow-management/essentials';

// todo: mover para o @vetnow-management/essentials
export default function applyMixins(derivedCtor: any, ...baseCtors: any): void {
  baseCtors.forEach((baseCtor: any) => {
    const errorMessage = `Class ${baseCtor.name} doesn't end with Mixin`;
    Assert.endEndsWith(baseCtor.name, 'Mixin', {errorMessage});

    Object.getOwnPropertyNames(baseCtor.prototype)
      .forEach((name) => Object.defineProperty(
        derivedCtor.prototype,
        name,
        // @ts-ignore Algum erro de tipagem
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name))
      )
  });
}
