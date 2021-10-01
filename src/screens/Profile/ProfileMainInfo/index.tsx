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
    query session {
        session {
            user {
                id
                steam {
                    avatarfull
                    profileurl
                    trustRating
                    timecreated
                }
                displayName
            }
            csrf
        }
    }
`;

export default function ProfileProfileMainInfo({className}: Props): JSX.Element {
  const {loading, error, data} = useQuery(ME);

  console.log(data)

  const styleCardBody = {
    width: '100%',
    display: 'flex'
  }

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
      <div className={cn(block(), className)}>test</div>
  );
}