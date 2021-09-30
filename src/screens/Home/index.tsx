import * as React from 'react';
import {block as bem} from 'bem-cn';
import { Typography } from 'antd';

const { Title } = Typography;

const block = bem('home');

import './index.scss';

export default () => {
  return (
    <div className={block()}>
      <Title>Главная страница (статистика и показатели)</Title>
    </div>
  );
}