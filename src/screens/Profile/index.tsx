import * as React from 'react';
import {Card} from 'antd';
import {block as bem} from 'bem-cn';

import ProfileMainInfo from './ProfileMainInfo'

import './index.scss';
const block = bem('profile-screen');

const tabListStats = [
  {
    key: 'mainStat',
    tab: 'Главная статистика',
  },
  {
    key: 'csgo',
    tab: 'CSGO',
  },
  {
    key: 'soc',
    tab: 'Социальные сети (подключения)',
  },
];

export default function Profile(): JSX.Element {
  const [activeTabKey, setActiveTabKey] = React.useState('mainStat')

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };


  const tabContent: any = {
    mainStat: <div>test1</div>,
    csgo: <div>test2</div>,
    soc: <div>test3</div>,
  }

  return (
      <div className={block()}>
          <ProfileMainInfo className={block('profile-main-info')}/>
          <Card
            bordered={false}
            bodyStyle={{width: '100%'}}
            tabList={tabListStats}
            activeTabKey={activeTabKey}
            onTabChange={key => {
              onTabChange(key);
            }} >
          {tabContent[activeTabKey]}
          </Card>
      </div>
  );
}