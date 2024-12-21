import React from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import format from 'date-fns/format';
import classNames from 'classnames';
import { get } from 'lodash';

const GameCardHeader = ({ status, date, venue }) => {
  switch (status.type.name) {
    case 'STATUS_IN_PROGRESS': {
      return (
        <>
          <li>
            <dl className="flex align-items-center m-0">
              <dt className="text-red-500">LIVE</dt>
              <dd className="ml-1">-</dd>
              <dd className="ml-1">3rd 11:48</dd>
            </dl>
          </li>
          <li>NBC</li>
        </>
      );
    }

    case 'STATUS_FINAL': {
      return (
        <li>
          <dl className="flex align-items-center m-0">
            <dt className="text-900 uppercase">FINAL</dt>
            <dd className="ml-1">-</dd>
            <dd className="ml-1 uppercase">{format(date, 'eee MM/yy')}</dd>
          </dl>
        </li>
      );
    }

    case 'STATUS_SCHEDULED': {
      return (
        <>
          <li>
            <dl className="flex align-items-center m-0">
              <dt className="text-900 uppercase">{format(date, 'eee')}</dt>
              <dd className="ml-1">-</dd>
              <dd className="ml-1 uppercase">{format(date, 'MM/yy hh:m a')}</dd>
            </dl>
          </li>

          <li>{venue.fullName}</li>
        </>
      );
    }

    default:
      return null;
  }
};

const GameCardFooter = ({ status, gamecast }) => {
  switch (status.type.name) {
    case 'STATUS_IN_PROGRESS': {
      return (
        <h5 className="m-0 text-sm text-center font-normal block">
          Chance of Scorigami: <strong className="font-semibold">3.38%</strong>
        </h5>
      );
    }

    case 'STATUS_FINAL': {
      // if (isScorigami) {
      //   return <h5 className="m-0 text-center font-normal">WOOOOO!</h5>;
      // }
      // TODO: Add a link to occurances of scorigami
      return (
        <h5 className="m-0 text-sm text-center font-normal block">
          No Scorigami (21)
        </h5>
      );
    }

    case 'STATUS_SCHEDULED': {
      return (
        gamecast && (
          <a
            className="m-0 text-sm text-center font-normal block"
            href={gamecast.href}
            rel="noreferrer"
            target="_blank"
          >
            Game Preview
          </a>
        )
      );
    }

    default:
      return null;
  }
};

const GameCard = props => {
  const { competitors, status, venue, gamecast } = props;

  return (
    <Card
      className="game-card"
      footer={<GameCardFooter {...props} gamecast={gamecast} />}
      title={
        <ul className="m-0 pl-0 list-none flex align-items-center justify-content-between text-xs">
          <GameCardHeader {...props} />
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

export default GameCard;
