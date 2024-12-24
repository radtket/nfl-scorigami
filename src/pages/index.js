import { get } from 'lodash';
import CurrentGames from '../components/CurrentGames';
import ScorigamiCard from '../components/ScorigamiCard';

const Home = props => {
  return (
    <main className="layout-wrapper layout-static">
      <div className="layout-main-container">
        <div className="layout-main">
          <ScorigamiCard />
          <CurrentGames events={get(props, 'events', [])} />
        </div>
      </div>
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  return Promise.all([
    fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
    ).then(res => {
      return res.json();
    }),
    fetch('https://projects.fivethirtyeight.com/nfl-api/nfl_elo.csv')
      .then(res => {
        return res.text();
      })
      .then(text => {
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        const eloData = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        });
        return eloData;
      }),
  ])
    .then(([scoreboard, zzz]) => {
      console.log({ zzz });
      return {
        props: {
          ...scoreboard,
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
