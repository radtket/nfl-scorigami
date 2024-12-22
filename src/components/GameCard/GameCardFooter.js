import React from 'react';
import PropTypes from 'prop-types';
import {
  GAME_STATUS_IN_PROGRESS,
  GAME_STATUS_FINAL,
  GAME_STATUS_SCHEDULED,
} from '../../utils/constants';

const GameCardFooter = ({ status, gamecast }) => {
  switch (status.type.name) {
    case GAME_STATUS_IN_PROGRESS: {
      // TODO: ADD PERCENTAGE CHANGE PRGORESS BAR, https://www.covers.com/sports/nfl/matchups
      return (
        <h5 className="m-0 text-sm text-center font-normal block">
          Chance of Scorigami: <strong className="font-semibold">3.38%</strong>
        </h5>
      );
    }

    case GAME_STATUS_FINAL: {
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

    case GAME_STATUS_SCHEDULED: {
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

GameCardFooter.propTypes = {
  gamecast: PropTypes.shape({
    href: PropTypes.string,
  }).isRequired,
  status: PropTypes.shape({
    type: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default GameCardFooter;
