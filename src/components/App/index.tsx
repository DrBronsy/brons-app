import * as React from 'react';

import Routers from '../../routers';

import '../../antd/theme.less';
import './index.scss';

export default function App(): JSX.Element {
  return (
      <div className='app-shell'>
        <Routers />
      </div>
  );
}