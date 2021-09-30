import * as React from 'react';
import {connect} from 'react-redux';
import {gql, useQuery} from '@apollo/client';
import moment from 'moment';
import {Card} from 'antd';

import {block as bem} from 'bem-cn';

import './index.scss';

import {State as StoreTree} from 'store/index';
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

function Test() {
  const {loading, error, data} = useQuery(USER, {ssr: true});
  if (error) {
    throw Error(error.toString())
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data.users === null) {
    return null
  }
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

export interface Props extends OwnProps {
  children?: JSX.Element
  user: User;
}

function Profile({user}: Props): JSX.Element {
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
          <ProfileMainInfo className={block('profile-main-info')} user={user}/>
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

export default connect(
    (state: StoreTree, ownProps: OwnProps) => ({
      ...ownProps,
      csrf: state.session.csrf,
      user: state.session.user,
    }),
    (dispatch) => ({}),
)(Profile);