import * as React from 'react';
import bemCn from 'bem-cn';

import './index.scss';

export interface OwnProps {
}

export interface Props extends OwnProps {
  children?: JSX.Element
}

const bem = bemCn('header');

export default function Header({children}: Props): JSX.Element {
  return (
      <div className={bem()}>
        Header
      </div>
  );
}