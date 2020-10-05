import { UnaryOperator } from '@vetnow-management/essentials';

export default function useBuilderInputName(objName: string | string[]): UnaryOperator<string> {
  return (name: string) => {
    if (typeof objName === 'string') return `${objName}.${name}`;
    return `${objName.join('.')}.${objName}`
  }
}
