import React, { ReactElement } from 'react';

import Loader, { LoaderType } from 'react-loaders';
import { Environment } from '../../util';

interface LoadingProps {
  type?: LoaderType,
  color?: string,
  active?: boolean,
}

export default function VetLoading({
                                  type = 'ball-pulse',
                                  color = Environment.PRIMARY_COLOR,
                                  active = true,
                                }: LoadingProps): ReactElement<LoadingProps> {
  // @ts-ignore: mas funciona
  return <Loader type={type} active={active} color={color} />;
}
