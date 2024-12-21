import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Card } from 'primereact/card';
import { get } from 'lodash';
import GameCard from './GameCard';

const CurrentGames = ({ events = [] }) => {
  const ref = useRef(null);

  return (
    <div className="card">
      <div className="grid">
        <div className="col-12">
          <div className="flex justify-content-between align-items-center mb-5">
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

        {events.map(({ name, id, ...rest }) => {
          const competition = get(rest, 'competitions[0]', {});
          const gamecast = get(rest, 'links', []).find(({ shortText }) => {
            return shortText === 'Gamecast';
          });

          return (
            <div key={id} className="col-12 md:col-6 mb-2">
              <GameCard gamecast={gamecast} name={name} {...competition} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentGames;
