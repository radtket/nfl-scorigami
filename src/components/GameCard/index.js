import classNames from 'classnames';
import { get, sortBy } from 'lodash';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { GAME_STATUS_SCHEDULED } from '../../utils/constants';
import GameCardFooter from './GameCardFooter';
import GameCardHeader from './GameCardHeader';

const GameCard = ({
  competitors,
  status,
  venue,
  gamecast,
  date,
  id,
  broadcast,

  selectedGames,
  setSelectedGames,
}) => {
  const key = useMemo(() => {
    const [y, x] = sortBy(competitors, 'score');

    return `${x.score}-${y.score}`;
  }, [competitors]);

  const isScheduled = useMemo(() => {
    return !status.type || status.type.name === GAME_STATUS_SCHEDULED;
  }, [status.type]);

  const props = useMemo(() => {
    if (isScheduled) {
      return {};
    }

    return {
      onClick: () => {
        setSelectedGames(prev => {
          return prev.includes(key)
            ? prev.filter(item => {
                return item !== key;
              })
            : [...prev, key];
        });
      },
    };
  }, [key, setSelectedGames, isScheduled]);

  return (
    <Card
      className={classNames('game-card', {
        'game-card--selectable': !isScheduled,
        'game-card--selected': selectedGames.includes(key),
      })}
      footer={<GameCardFooter {...{ status, gamecast, competitors, id }} />}
      {...props}
      title={
        <>
          <div className="game-details">
            <span>Game Details</span>
          </div>
          <ul className="m-0 pl-0 list-none flex align-items-center justify-content-between text-xs">
            <GameCardHeader {...{ status, date, venue, broadcast }} />
          </ul>
        </>
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
                  className="p-overlay-badge mr-3"
                  image={team.logo}
                  size="large"
                />

                <dl>
                  <dd className="text-base font-semibold ml-0 mb-1">
                    {team.location}
                  </dd>
                  <dt className="text-sm">{team.name}</dt>
                </dl>
              </div>
              {status.type.name === GAME_STATUS_SCHEDULED ? (
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
  id: PropTypes.string.isRequired,
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
  broadcast: PropTypes.string.isRequired,
  selectedGames: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedGames: PropTypes.func.isRequired,
};

export default GameCard;
