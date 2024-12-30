import { SCORIGAMI_CHANCES } from '../utils/constants';
import data from './data';

const { matrix } = data;
const chances = SCORIGAMI_CHANCES;
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function getProb(quarter, clock, chance) {
  const prob =
    ((Math.exp(-1 * ((((4 - quarter) * 15 + clock / 60.0) / 60.0) * 4.22)) *
      ((((4 - quarter) * 15 + clock / 60.0) / 60) * 4.22) **
        (chance.td_1pt +
          chance.fg +
          chance.td +
          chance.td_2pt +
          chance.safety)) /
      factorial(
        chance.td_1pt + chance.fg + chance.td + chance.td_2pt + chance.safety
      )) *
    chance.bin_chance;

  return prob;
}

function getScorigamiProbability(game) {
  let homeScore = null;
  let awayScore = null;
  const phase = game.status.type.name;

  game.competitors.forEach(competitor => {
    if (competitor.homeAway === 'home') {
      homeScore = parseInt(competitor.score, 10);
    } else {
      awayScore = parseInt(competitor.score, 10);
    }
  });

  let { clock } = game.status;
  let quarter;
  const overtime = false;

  switch (phase) {
    case 'STATUS_IN_PROGRESS':
    case 'STATUS_END_PERIOD':
      quarter = game.status.period;
      break;
    case 'STATUS_HALFTIME':
      quarter = 2;
      clock = 0;
      break;
    case 'STATUS_FINAL':
    case 'STATUS_FINAL_OVERTIME':
      quarter = 4;
      clock = 0;
      break;
    default:
      quarter = 1;
      clock = 900;
      break;
  }

  quarter = quarter > 4 ? 4 : quarter;

  let probability = 0.0;

  for (let i = 0; i < chances.length; i += 1) {
    const chance1 = chances[i];
    const prob1 = getProb(quarter, clock, chance1);
    const score1 = awayScore + chance1.pts;

    for (let j = 0; j < chances.length; j += 1) {
      const chance2 = chances[j];
      const prob2 = getProb(quarter, clock, chance2);
      const score2 = homeScore + chance2.pts;

      const winScore = score1 > score2 ? score1 : score2;
      const loseScore = score1 > score2 ? score2 : score1;

      if (
        !matrix[loseScore] ||
        !matrix[loseScore][winScore] ||
        matrix[loseScore][winScore].count === 0
      ) {
        if (loseScore === winScore && !overtime) {
          probability += (prob1 * prob2) / 75.0;
        } else {
          probability += prob1 * prob2;
        }
      }
    }
  }

  probability *= 100.0;

  return probability.toFixed(2);
}

export default getScorigamiProbability;
