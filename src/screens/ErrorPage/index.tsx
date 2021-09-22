import * as React from 'react';

import {block as bem} from 'bem-cn';

import cat from 'images/cat.gif';

const block = bem('error');

import './index.scss';

export default () => {
  return (
    <div className={block()}>
      {cat ? <img className={block('cat')} src={cat} /> : null}
    </div>
  );
}