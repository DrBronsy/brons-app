import * as React from 'react'
import {Link} from 'react-router-dom'
import { Layout, Menu, Space, Avatar, Dropdown } from 'antd';

import bemCn from 'bem-cn';
import cn from 'classnames';

import './index.scss';
import {gql, useQuery} from "@apollo/client";

export interface Props {
  children?: JSX.Element
}

const { Header, Content, Footer, Sider } = Layout;

const menu = (
    <Menu>
      <Menu.Item key='0'>
        <Link to='/profile'>Профиль</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='1'>
        <a href='/logout'>Выход</a>
      </Menu.Item>
    </Menu>
);

const bem = bemCn('main-layout');

const ME = gql`
    query Session {
        session @client {
            user {
                steam {
                    avatarfull
                }
            }
        }
    }
`

export default function AntdLayout({children}: Props): JSX.Element {
  const {loading, data} = useQuery(ME);

  if (loading) return <div>Loading</div>;

  const {session: {user: {steam: {avatarfull}}}} = data;

  const [collapsed, setCollapsed] = React.useState(true);

  const onCollapse = (collapse: boolean): void => {
    setCollapsed(collapse);
  };

  return (
      <Layout style={{ minHeight: '100vh' }}>
        {/*<Sider collapsible={true} collapsed={collapsed} onCollapse={onCollapse}>*/}
        {/*  <div className='logo' />*/}
        {/*  <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' />*/}
        {/*</Sider>*/}
          <Header style={{ padding: 0, boxShadow: '0 2px 8px 0 rgb(0 0 0 / 65%)'}}>
            <div className={cn(bem('content-layout'), bem('header'))}>
              <Space align='center'>
                <div className={bem('avatar-wrap')}>
                  <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
                    <Avatar className={bem('avatar')} size='large' src={avatarfull}/>
                  </Dropdown>
                </div>
              </Space>
            </div>
          </Header>
          <Content style={{ margin: '40px 0 0' }}>
            <div className={bem('content-layout')}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <div className={bem('content-layout')}>
              Brons.app ©2021 Created by Brons <a href='https://twitch.tv/dronsy'>https://twitch.tv/dronsy</a>
            </div>
          </Footer>
      </Layout>
  );
}