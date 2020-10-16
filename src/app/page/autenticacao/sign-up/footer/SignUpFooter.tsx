import React, { ReactElement } from 'react';

import { useMediaQuery } from '@material-ui/core';

import { SignUpFooterProps } from './types';
import SignUpFootMobile from './SignUpFootMobile';
import SignUpFootDesktop from './SignUpFootDesktop';

export default function SignUpFooter(props: SignUpFooterProps): ReactElement {
  const canShowMobileButtons = useMediaQuery('(max-width:550px)');

  if (canShowMobileButtons) return <SignUpFootMobile {...props} />
  return <SignUpFootDesktop {...props} />
}

