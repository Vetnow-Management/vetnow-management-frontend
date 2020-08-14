import React, { ReactElement } from 'react';
import { BlockUI } from '../index';
import { Func } from '@vetnow-management/essentials';

export default function withBlockUI<T extends Record<string, unknown>>(Component: React.ComponentType<T>): Func<React.ComponentType<T>, ReactElement> {
  function WithBlockUI(props: any): ReactElement {
    const [ isBlockingUI, setIsBlockingUI ] = React.useState<boolean>(false);

    return (
      <BlockUI isOpen={isBlockingUI}>
        <Component {...props} isBlockingUI={isBlockingUI} setIsBlockingUI={setIsBlockingUI}/>
      </BlockUI>
    );
  }

  return WithBlockUI;
}
