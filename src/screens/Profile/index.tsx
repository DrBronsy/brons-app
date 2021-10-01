import * as React from 'react';
import {gql, useQuery} from '@apollo/client';
import {Card} from 'antd';

import {block as bem} from 'bem-cn';

import './index.scss';

import {OwnProps} from 'components/AntdLayout';
import {User} from 'models/user';

import ProfileMainInfo from './ProfileMainInfo'

const USER = gql`
    query User {
        users {
            id
            displayName
            steam {
                steamid
                lvl
            }
        }
    }
`;

const SESSION = gql`
    query Session {
        session @client
    }
`;

function Test() {
  // const {loading, error, data} = useQuery(USER);
  const {loading, error, data} = useQuery(SESSION);
  console.log(data)
  return null
  if (error) {
    throw Error(error.toString())
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data?.users?.map(({id, displayName}: any, index: number) => (
      <div key={index}>
        <p>
          {id}: {displayName}
        </p>
      </div>
  ));
}

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
          <Test/>
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