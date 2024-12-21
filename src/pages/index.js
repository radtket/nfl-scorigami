import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import { get } from 'lodash';
import { Button } from '@nextui-org/button';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home(props) {
  return (
    <main className="dark text-foreground bg-background">
      <Button>Click me</Button>
      {get(props, 'events', []).map(({ name, id }) => {
        return <h1 key={id}>{name}</h1>;
      })}
    </main>
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
