import * as React from 'react';

import Routers from '../../routers';

import '../../antd/theme.less';
import './index.scss';

interface Props {
  ssr?: boolean
}

export default function App({ssr}: Props): JSX.Element {
  return (
      <div className='app-shell'>
        <Routers />
      </div>
  );
}
