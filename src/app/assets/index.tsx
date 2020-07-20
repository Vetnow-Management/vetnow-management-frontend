import React, { ReactElement } from 'react';

import ChillingWithDog from './chilling_with_dog.svg';

export { default as CautiousDog } from './cautious_dog.svg';
export { default as ModernWoman } from './modern_woman.svg';

export function ChillingWithDogReady(): ReactElement {
  return (
    <img src={ ChillingWithDog } alt='homem no sofa com um gato' style={{
      maxWidth: '100%',
      height: 'auto',
      width: '100%',
    }}/>
  );
}

export { ChillingWithDog };
