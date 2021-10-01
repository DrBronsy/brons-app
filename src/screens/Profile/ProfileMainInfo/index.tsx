import * as React from 'react';
import * as moment from 'moment'
import {Typography, Avatar, Card, Col, Row, Space} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {block as bem} from 'bem-cn';
import cn from 'classnames';

import {User} from 'models/user';

import './index.scss';

const {Link, Text} = Typography;

const block = bem('profile-main-info');

export interface Props {
  className?: string
}

export default function Profile({className}: Props): JSX.Element {

  const styleCardBody = {
    width: '100%',
    display: 'flex'
  }

  return null

  const playtimeForever = Math.round(parseInt(user.csgoStat.playtime_forever, 0) / 60);
  const playtimeReal = Math.round(parseInt(user.csgoStat.total_time_played, 0) / 60 / 60);
  const playtime2weeks = Math.round(parseInt(user.csgoStat.playtime_2weeks, 0) / 60);

  const trustRatingColorType = (rating: number) => {
    if (rating <= 30) {
      return 'danger'
    } else if (rating > 30 && rating <= 70) {
      return 'warning'
    } else if (rating > 70) {
      return 'success'
    }
  }

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
                {csgoStat && <Text type='secondary'>Количество общих часов в CSGO: {playtimeForever}</Text>}
                {csgoStat && <Text type='secondary'>Количество реальных часов в CSGO: {playtimeReal}</Text>}
                {csgoStat && <Text type='secondary'>Количество часов за последние 2 недели в CSGO: {playtime2weeks}</Text>}
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
  );
}