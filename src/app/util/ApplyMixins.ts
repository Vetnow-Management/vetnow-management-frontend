import { Assert } from '@cade-tecnologia/essentials';

// todo: mover para o @cade-tecnologia/essentials
export default function applyMixins(derivedCtor: any, ...baseCtors): void {
  baseCtors.forEach((baseCtor) => {
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
