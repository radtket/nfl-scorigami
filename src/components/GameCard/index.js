import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import classNames from 'classnames';
import { get } from 'lodash';
import GameCardHeader from './GameCardHeader';
import GameCardFooter from './GameCardFooter';

const GameCard = ({ competitors, status, venue, gamecast, date }) => {
  return (
    <Card
      className="game-card"
      footer={<GameCardFooter {...{ status, gamecast }} />}
      title={
        <ul className="m-0 pl-0 list-none flex align-items-center justify-content-between text-xs">
          <GameCardHeader {...{ status, date, venue }} />
        </ul>
      }
    >
      <ul className="m-0 mb-0 pl-0 list-none">
        {competitors.map(({ team, records, score, uid, winner }) => {
          const record = get(records, [0, 'summary']);

          return (
            <li
              key={uid}
              className={classNames(
                'flex align-items-center justify-content-between',
                {
                  'text-500': winner === false,
                }
              )}
            >
              <div className="flex align-items-center">
                <Avatar
                  className="mr-3"
                  image={team.logo}
                  shape="circle"
                  size="large"
                />
                <dl>
                  <dd className="text-base font-semibold ml-0 mb-1">
                    {team.location}
                  </dd>
                  <dt className="text-sm">{team.name}</dt>
                </dl>
              </div>
              {status.type.name === 'STATUS_SCHEDULED' ? (
                <span className="text-sm">{record}</span>
              ) : (
                <h3 className={classNames({ winner })}>{score}</h3>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

GameCard.propTypes = {
  competitors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  date: PropTypes.string.isRequired,
  gamecast: PropTypes.shape({}).isRequired,
  status: PropTypes.shape({
    type: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  venue: PropTypes.shape({
    fullName: PropTypes.string,
  }).isRequired,
};

export default GameCard;
