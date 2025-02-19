import { get } from 'lodash';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import GameCard from './GameCard';

const CurrentGames = ({ events, selectedGames, setSelectedGames }) => {
  const ref = useRef(null);

  // square-2-0
  return (
    <div className="grid">
      <div className="col-12">
        <div className="flex justify-content-between align-items-center mb-2">
          <h2>This Week's Games:</h2>
          <div>
            <Button
              className="p-button-plain"
              icon="pi pi-ellipsis-v"
              onClick={event => {
                return ref.current?.toggle(event);
              }}
              rounded
              text
              type="button"
            />
            <Menu
              ref={ref}
              model={[
                { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                { label: 'Remove', icon: 'pi pi-fw pi-minus' },
              ]}
              popup
            />
          </div>
        </div>
      </div>
      {(events || []).map(({ name, id, links, competitions, uid }) => {
        return (
          <div key={uid} className="col-12 md:col-6 mb-2">
            <GameCard
              gamecast={(links || []).find(({ shortText }) => {
                return shortText === 'Gamecast';
              })}
              id={id}
              name={name}
              {...get(competitions, 0, {})}
              selectedGames={selectedGames}
              setSelectedGames={setSelectedGames}
            />
          </div>
        );
      })}
    </div>
  );
};

CurrentGames.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedGames: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedGames: PropTypes.func.isRequired,
};

export default CurrentGames;
