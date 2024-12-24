/* eslint-disable no-underscore-dangle */
function _1(md) {
  return md`
# NFL Scorigami Data
  `;
}

function _2(scorigamisArr, md) {
  return md`NFL score data from [FiveThirtyEight.com](https://github.com/fivethirtyeight/data/tree/master/nfl-elo). <br/>
Number of Scorigamis Counted: ** ${scorigamisArr.length} **`;
}

function _scores(d3) {
  return d3.csv('https://projects.fivethirtyeight.com/nfl-api/nfl_elo.csv');
}

function _scoresMin(scores) {
  return scores.map(
    ({ date, season, team1, team2, qb1, qb2, score1, score2 }) => {
      return {
        date,
        season: parseInt(season, 10),
        team1: team1 === 'OAK' ? 'LV' : team1,
        team2: team2 === 'OAK' ? 'LV' : team2,
        qb1,
        qb2,
        score1: parseInt(score1, 10),
        score2: parseInt(score2, 10),
      };
    }
  );
}

function _scorigamis(scoresMin) {
  return scoresMin.reduce((acc, cur) => {
    const { score1 } = cur;
    const { score2 } = cur;

    const MIN_SCORE = Math.min(score1, score2);
    const MAX_SCORE = Math.max(score1, score2);

    if (Number.isNaN(score1) || Number.isNaN(score2)) {
      return acc;
    }

    const id = `${MIN_SCORE}-${MAX_SCORE}`;

    if (!(id in acc)) {
      acc[id] = cur;
    }

    return acc;
  }, {});
}

function _scorigamisArr(scorigamis) {
  return Object.keys(scorigamis).map(val => {
    return scorigamis[val];
  });
}

function _scorigamisBySeason(scorigamisArr) {
  return scorigamisArr.reduce((acc, cur) => {
    const { season } = cur;

    acc[season] = season in acc ? 1 + acc[season] : 1;
    return acc;
  }, {});
}

function _scorigamisBySeasonArr(d3, scorigamisBySeason) {
  return d3.keys(scorigamisBySeason).map(d => {
    return { season: d, frequency: scorigamisBySeason[d] };
  });
}

function _scorigamisByTeam(scorigamisArr) {
  return scorigamisArr.reduce((acc, cur) => {
    const { team1 } = cur;
    const { team2 } = cur;

    const { score1 } = cur;
    const { score2 } = cur;

    if (!(team1 in acc)) {
      acc[team1] = {
        frequency: 0,
        wins: 0,
        loses: 0,
        ties: 0,
      };
    }

    if (!(team2 in acc)) {
      acc[team2] = {
        frequency: 0,
        wins: 0,
        loses: 0,
        ties: 0,
      };
    }

    acc[team1].frequency += 1;
    acc[team2].frequency += 1;

    if (score1 > score2) {
      acc[team1].wins += 1;
      acc[team2].loses += 1;
    } else if (score1 < score2) {
      acc[team1].loses += 1;
      acc[team2].wins += 1;
    } else {
      acc[team1].ties += 1;
      acc[team2].ties += 1;
    }

    return acc;
  }, {});
}

function _scorigamisByTeamArr(d3, scorigamisByTeam) {
  return d3
    .keys(scorigamisByTeam)
    .map(d => {
      return Object.assign(scorigamisByTeam[d], { team: d });
    })
    .sort((a, b) => {
      return a.frequency === b.frequency
        ? a.wins < b.wins
        : a.frequency < b.frequency;
    });
}

function _scorigamisArr2002(scorigamisArr) {
  return scorigamisArr.filter(val => {
    return val.season >= 2002;
  });
}

function _scorigamisByTeam2002(scorigamisArr2002) {
  return scorigamisArr2002.reduce((acc, cur) => {
    const { team1 } = cur;
    const { team2 } = cur;

    const { score1 } = cur;
    const { score2 } = cur;

    if (!(team1 in acc)) {
      acc[team1] = {
        frequency: 0,
        wins: 0,
        loses: 0,
        ties: 0,
      };
    }

    if (!(team2 in acc)) {
      acc[team2] = {
        frequency: 0,
        wins: 0,
        loses: 0,
        ties: 0,
      };
    }

    acc[team1].frequency += 1;
    acc[team2].frequency += 1;

    if (score1 > score2) {
      acc[team1].wins += 1;
      acc[team2].loses += 1;
    } else if (score1 < score2) {
      acc[team1].loses += 1;
      acc[team2].wins += 1;
    } else {
      acc[team1].ties += 1;
      acc[team2].ties += 1;
    }

    return acc;
  }, {});
}

function _scorigamisByTeamArr2002(d3, scorigamisByTeam2002) {
  return d3
    .keys(scorigamisByTeam2002)
    .map(d => {
      return Object.assign(scorigamisByTeam2002[d], { team: d });
    })
    .sort((a, b) => {
      return a.frequency === b.frequency
        ? a.wins < b.wins
        : a.frequency < b.frequency;
    });
}

function _d3(require) {
  return require('d3@5');
}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer('scores')).define('scores', ['d3'], _scores);
  main
    .variable(observer('scoresMin'))
    .define('scoresMin', ['scores'], _scoresMin);
  main
    .variable(observer('scorigamis'))
    .define('scorigamis', ['scoresMin'], _scorigamis);
  main
    .variable(observer('scorigamisArr'))
    .define('scorigamisArr', ['scorigamis'], _scorigamisArr);
  main
    .variable(observer('scorigamisBySeason'))
    .define('scorigamisBySeason', ['scorigamisArr'], _scorigamisBySeason);
  main
    .variable(observer('scorigamisBySeasonArr'))
    .define(
      'scorigamisBySeasonArr',
      ['d3', 'scorigamisBySeason'],
      _scorigamisBySeasonArr
    );
  main
    .variable(observer('scorigamisByTeam'))
    .define('scorigamisByTeam', ['scorigamisArr'], _scorigamisByTeam);
  main
    .variable(observer('scorigamisByTeamArr'))
    .define(
      'scorigamisByTeamArr',
      ['d3', 'scorigamisByTeam'],
      _scorigamisByTeamArr
    );
  main
    .variable(observer('scorigamisArr2002'))
    .define('scorigamisArr2002', ['scorigamisArr'], _scorigamisArr2002);
  main
    .variable(observer('scorigamisByTeam2002'))
    .define(
      'scorigamisByTeam2002',
      ['scorigamisArr2002'],
      _scorigamisByTeam2002
    );
  main
    .variable(observer('scorigamisByTeamArr2002'))
    .define(
      'scorigamisByTeamArr2002',
      ['d3', 'scorigamisByTeam2002'],
      _scorigamisByTeamArr2002
    );
  main.variable(observer('d3')).define('d3', ['require'], _d3);
  return main;
}
