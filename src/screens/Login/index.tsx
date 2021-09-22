declare const CONFIG: any;

import * as React from 'react';

import {block as bem} from 'bem-cn';

import SteamLoginPulseButton from 'components/SteamLoginPulseButton';

const block = bem('login');

import './index.scss';

export default () => {
  return (
    <div className={block()}>
      <SteamLoginPulseButton />
    </div>
  );
}