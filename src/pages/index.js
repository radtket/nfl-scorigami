import { get } from 'lodash';
import { Card } from 'primereact/card';

export default function Home(props) {
  return (
    <main>
      <div className="grid">
        {get(props, 'events', []).map(({ name, id }) => {
          return (
            <div key={id} className="col-12 md:col-6 lg:col-3">
              <Card title={name}>
                <p className="m-0">{name}</p>
              </Card>
            </div>
          );
        })}
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
