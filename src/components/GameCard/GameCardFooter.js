import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'primereact/progressbar';
import { get, sortBy } from 'lodash';
import { Message } from 'primereact/message';
import {
  GAME_STATUS_IN_PROGRESS,
  GAME_STATUS_FINAL,
  GAME_STATUS_SCHEDULED,
  GAME_STATUS_FINAL_OVERTIME,
} from '../../utils/constants';
import getScorigamiProbability from '../../constants/getScorigamiProbability';
import data from '../../constants/data';

const { matrix, newScorigami } = data;
const GameCardFooter = ({ competitors, status, gamecast, id }) => {
  const [winner, loser] = sortBy(
    competitors.map(item => {
      return {
        ...item,
        score: parseInt(item.score, 10),
      };
    }),
    'score'
  );

  const displayValueTemplate = useCallback(value => {
    return (
      <>
        {value}/<b>100</b>
      </>
    );
  }, []);

  switch (status.type.name) {
    case GAME_STATUS_IN_PROGRESS: {
      // TODO: ADD PERCENTAGE CHANGE PRGORESS BAR, https://www.covers.com/sports/nfl/matchups
      const PROBABILITY = getScorigamiProbability({
        status,
        gamecast,
        competitors,
      });

      return (
        <>
          <h5 className="m-0 text-sm text-center font-normal block">
            Chance of Scorigami:{' '}
            <strong className="font-semibold">{PROBABILITY}%</strong>
          </h5>
          <ProgressBar
            displayValueTemplate={displayValueTemplate}
            value={67.8}
          />
        </>
      );
    }

    case GAME_STATUS_FINAL_OVERTIME:
    case GAME_STATUS_FINAL: {
      // TODO: Add a link to occurances of scorigami
      const { count } = get(matrix, [winner.score, loser.score]);

      if (count === 0 || newScorigami.includes(id)) {
        return <Message severity="success" text="New SCORIGAMI!" />;
      }

      return <Message severity="error" text={`No Scorigami (${count})`} />;
    }

    case GAME_STATUS_SCHEDULED: {
      return (
        gamecast && (
          <a
            className="m-0 text-sm text-center font-normal block p-button p-component p-button-text"
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
  id: PropTypes.string.isRequired,
  competitors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
