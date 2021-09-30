import * as React from 'react';

import {block as bem} from 'bem-cn';

const block = bem('error');

import './index.scss';

export default () => {
  return (
    <div className={block()}>
      <p>404</p>
    </div>
  );
}