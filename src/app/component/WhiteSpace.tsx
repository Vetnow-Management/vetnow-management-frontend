import React, { CSSProperties, ReactElement } from 'react';
import { Verify } from '@vetnow-management/essentials';

interface WhiteSpaceProps {
  spaceBottom?: number;
  spaceTop?: number;
}

export default function WhiteSpace({ spaceBottom, spaceTop }: WhiteSpaceProps): ReactElement<WhiteSpaceProps> {
  const style: CSSProperties = {
    width: '100%',
    marginBottom: `${spaceBottom}px`,
    marginTop: `${spaceTop}px`,
  };

  if (Verify.isNotNullOrUndefined(spaceBottom)) delete style.marginBottom;
  if (Verify.isNullOrUndefined(spaceTop)) delete style.marginTop;

  return (<div style={style}/>);
}
