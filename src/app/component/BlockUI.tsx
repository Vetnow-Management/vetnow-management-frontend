import React, { ReactElement, ReactNode } from 'react';

import Block from 'react-block-ui';

import { Loading } from '.';

interface BlockUIProps {
  isOpen: boolean;
  children: ReactNode | ReactNode[];
  loader?: ReactElement,
}

export default function BlockUI({ isOpen, children, loader = <Loading />}: BlockUIProps): ReactElement {
  return (
    <Block blocking={isOpen} loader={loader}>
      {children}
    </Block>
  )
}
