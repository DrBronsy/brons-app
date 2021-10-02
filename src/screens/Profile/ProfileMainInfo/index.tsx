import * as React from 'react';
import * as moment from 'moment'
import {Typography, Avatar, Card, Col, Row, Space} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {block as bem} from 'bem-cn';
import cn from 'classnames';

import {User} from 'models/user';

import './index.scss';
import {gql, useQuery} from '@apollo/client';

const {Link, Text} = Typography;

const block = bem('profile-main-info');

export interface Props {
  className?: string
}

const ME = gql`
    query Session {
        session @client {
            user {
                id
                steam {
                    avatarfull
                    profileurl
                    trustRating
                    timecreated
                }
                csgoStat {
                    playtime_forever
                    total_time_played
                    playtime_2weeks
                }
                displayName
            }
        }
    }
`

export default function ProfileProfileMainInfo({className}: Props): JSX.Element {
  const {loading, data} = useQuery(ME);

  if (loading) return <div>Loading</div>;

  const {session: {user}} = data;
  const {csgoStat, steam, displayName} = user;
  const {playtime_2weeks, total_time_played, playtime_forever} = csgoStat;
  const {avatarfull, profileurl, trustRating, timecreated} = steam;

  const styleCardBody = {
    width: '100%',
    display: 'flex'
  }

  const playtimeForever = Math.round(parseInt(playtime_forever, 0) / 60);
  const playtimeReal = Math.round(parseInt(total_time_played, 0) / 60 / 60);
  const playtime2weeks = Math.round(parseInt(playtime_2weeks, 0) / 60);

  const trustRatingColorType = (rating: number) => {
    if (rating <= 30) {
      return 'danger'
    } else if (rating > 30 && rating <= 70) {
      return 'warning'
    } else if (rating > 70) {
      return 'success'
    }
  }

  console.log(moment(timecreated * 1000).format('DD.MM.YYYY'))

  return (
      <div className={cn(block(), className)}>
        <Card className={block('card')} bordered={false} bodyStyle={styleCardBody}>
          <Row gutter={24}>
            <Col flex='100px'>
              <Avatar size={160} src={avatarfull} icon={<UserOutlined />} />
            </Col>
            <Col flex='auto'>
              <Space direction='vertical'>
                <Link href={profileurl} strong={true} target='_blank' style={{fontSize: '24px'}}>{displayName}</Link>
                {trustRating && <div>
                  <Text>Рейтинг доверия: </Text><Text type={trustRatingColorType(trustRating)}>{trustRating}</Text>
                </div>}
                <Text type='secondary'>Дата создания: {moment(timecreated * 1000).format('DD.MM.YYYY')}</Text>
                {!!playtimeForever && <Text type='secondary'>Количество общих часов в CSGO: {playtimeForever}</Text>}
                {!!playtimeReal && <Text type='secondary'>Количество реальных часов в CSGO: {playtimeReal}</Text>}
                {!!playtime2weeks && <Text type='secondary'>Количество часов за последние 2 недели в CSGO: {playtime2weeks}</Text>}
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
  );
}