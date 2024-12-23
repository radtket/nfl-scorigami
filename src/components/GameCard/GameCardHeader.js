import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import numeral from 'numeral';
import classNames from 'classnames';
import {
  GAME_STATUS_IN_PROGRESS,
  GAME_STATUS_FINAL,
  GAME_STATUS_SCHEDULED,
} from '../../utils/constants';

const StageredListItem = ({ title, date }) => {
  return (
    <li>
      <dl className="flex align-items-center m-0">
        <dt
          className={classNames('text-900 uppercase', {
            'text-red-500': title === 'LIVE',
          })}
        >
          {title}
        </dt>
        <dd className="ml-1">-</dd>
        <dd className="ml-1 uppercase">{date}</dd>
      </dl>
    </li>
  );
};

StageredListItem.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const GameCardHeader = ({ status, date, venue, broadcast }) => {
  const { displayClock, type, period } = status;

  switch (type.name) {
    case GAME_STATUS_IN_PROGRESS: {
      return (
        <>
          <StageredListItem
            date={
              <>
                {numeral(period).format('0o')} ${displayClock}
              </>
            }
            title="LIVE"
          />
          {broadcast && <li>{broadcast}</li>}
        </>
      );
    }

    case GAME_STATUS_FINAL: {
      return (
        <StageredListItem date={format(date, 'eee MM/yy')} title="FINAL" />
      );
    }

    case GAME_STATUS_SCHEDULED: {
      return (
        <>
          <StageredListItem
            date={format(date, 'MM/yy hh:m a')}
            title={format(date, 'eee')}
          />
          <li>{venue.fullName}</li>
        </>
      );
    }

    default:
      return null;
  }
};

GameCardHeader.propTypes = {
  date: PropTypes.string.isRequired,
  status: PropTypes.shape({
    displayClock: PropTypes.string,
    period: PropTypes.number,
    type: PropTypes.shape({ name: PropTypes.string }),
  }).isRequired,
  venue: PropTypes.shape({
    fullName: PropTypes.string,
  }).isRequired,
  broadcast: PropTypes.string.isRequired,
};

export default GameCardHeader;
