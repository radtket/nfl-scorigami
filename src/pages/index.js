import { Card, CardBody } from '@nextui-org/react';
import { get } from 'lodash';

export default function Home(props) {
  return (
    <main className="dark text-foreground bg-background">
      {get(props, 'events', []).map(({ name, id }) => {
        return (
          <Card key={id}>
            <CardBody>
              <p>{name}</p>
            </CardBody>
          </Card>
        );
      })}
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
