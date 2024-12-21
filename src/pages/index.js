import { get } from 'lodash';

export default function Page(props) {
  return (
    <div>
      <h1>Page</h1>
      {get(props, 'events', []).map(({ name, id }) => {
        return <h1 key={id}>{name}</h1>;
      })}
    </div>
  );
}

export async function getStaticProps() {
  const props = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
  ).then(res => {
    return res.json();
  });

  return {
    props,
  };
}
