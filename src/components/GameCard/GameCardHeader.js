import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import {
  GAME_STATUS_IN_PROGRESS,
  GAME_STATUS_FINAL,
  GAME_STATUS_SCHEDULED,
} from '../../utils/constants';

const GameCardHeader = ({ status, date, venue }) => {
  switch (status.type.name) {
    case GAME_STATUS_IN_PROGRESS: {
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

    case GAME_STATUS_FINAL: {
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

    case GAME_STATUS_SCHEDULED: {
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

GameCardHeader.propTypes = {
  date: PropTypes.string.isRequired,
  status: PropTypes.shape({
    type: PropTypes.shape({ name: PropTypes.string }),
  }).isRequired,
  venue: PropTypes.shape({
    fullName: PropTypes.string,
  }).isRequired,
};

export default GameCardHeader;
