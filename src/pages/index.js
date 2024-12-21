import { get } from 'lodash';
import CurrentGames from '../components/CurrentGames';
import ScorigamiCard from '../components/ScorigamiCard';

export default function Home(props) {
  console.log({ props });
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
}

export async function getStaticProps() {
  return Promise.all([
    fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
    ).then(res => {
      return res.json();
    }),
  ])
    .then(([scoreboard]) => {
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
