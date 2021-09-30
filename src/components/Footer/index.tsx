import * as React from 'react';

import './index.scss';

export interface OwnProps {
}

export interface Props extends OwnProps {
  children?: JSX.Element
}

export default function Header({children}: Props): JSX.Element {
  return (
      <div />
  );
}