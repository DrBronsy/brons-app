import * as React from 'react';

import {block as bem} from 'bem-cn';

const block = bem('profile');

import './index.scss';

export default () => {
  return (
    <div className={block()}>
      <p>test</p>
    </div>
  );
}