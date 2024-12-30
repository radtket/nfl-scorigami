import csv from 'csvtojson';
import * as d3 from 'd3';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CurrentGames from '../components/CurrentGames';
import ScorigamiCard from '../components/ScorigamiCard';

const Home = ({ events }) => {
  const [selectedGames, setSelectedGames] = useState([]);

  useEffect(() => {
    if (!isEmpty(selectedGames)) {
      selectedGames.forEach(([key, selected]) => {
        if (selected) {
          d3.select(`#square-${key}`).style('fill', 'red');
        }
      });
    }
  }, [selectedGames]);

  return (
    <main className="layout-wrapper layout-static">
      <div className="layout-main-container">
        <div className="layout-main">
          <ScorigamiCard />
          <CurrentGames
            events={events || []}
            selectedGames={selectedGames}
            setSelectedGames={setSelectedGames}
          />
        </div>
      </div>
    </main>
  );
};

Home.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;

export async function getStaticProps() {
  console.log(
    'zzzz',
    process.env.SCOREBOARD_URL,
    process.env.DATABASE_URL,
    process.env
  );
  return Promise.all([
    fetch(process.env.SCOREBOARD_URL).then(res => {
      return res.json();
    }),
    fetch(process.env.DATABASE_URL)
      .then(res => {
        return res.text();
      })
      .then(csvStr => {
        return csv().fromString(csvStr);
      }),
  ])
    .then(([scoreboard, elo]) => {
      return {
        props: {
          ...scoreboard,
          elo,
        },
      };
    })
    .catch(err => {
      console.error('Oh Shoot!', err);
      return {
        props: {},
      };
    });
}
