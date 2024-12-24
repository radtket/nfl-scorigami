'client only';

import React, { useState } from 'react';
import './Scoreboard.css';
import { createKey } from 'next/dist/shared/lib/router/router';

const initalState = {
  inputCon: 'flex',
  scoreBoard: 'none',
  team1Input: '',
  team2Input: '',
  scores: [
    { name: '', score: '' },
    { name: '', score: '' },
  ],
};

const Input = ({ onChange, idx, value }) => {
  const TEAM_NUMNER = idx + 1;
  const label = createKey(['input', TEAM_NUMNER]);
  return (
    <div key={createKey(['input-group', label, idx])} className="input-group">
      <label htmlFor={label}>Team {TEAM_NUMNER} Name:</label>
      <input name={label} onChange={onChange} type="text" value={value} />
    </div>
  );
};

const ScoreBoard = () => {
  const [state, setState] = useState({
    ...initalState,
  });
  // const inputCon = document.querySelector('.input-container');
  // const scoreBoard = document.querySelector('.score-container');
  // const team1Input = document.getElementById('team1');
  // const team1NameElem = document.getElementById('team1Name');
  // const team1ScoreElem = document.getElementById('team1Score');
  // const team2Input = document.getElementById('team2');
  // const team2NameElem = document.getElementById('team2Name');
  // const team2ScoreElem = document.getElementById('team2Score');

  function addScore(points, team) {
    const scoreElem = team === 'team1' ? team1ScoreElem : team2ScoreElem;
    const currentScore = parseInt(scoreElem.textContent);
    scoreElem.textContent = currentScore + points;
  }

  return (
    <div className="main">
      <div className="container">
        <h1>Scoreboard App</h1>

        <div className="input-container">
          <h3>Fill the team name and start!</h3>
          <div className="team-input">
            <Input
              idx={0}
              onChange={({ target }) => {
                setState(prev => {
                  const scores = [...prev.scores];
                  scores[0].name = target.value;

                  return { ...prev, scores };
                });
              }}
              value={state.scores[0].name}
            />
            <Input
              idx={1}
              onChange={({ target }) => {
                setState(prev => {
                  const copy = { ...prev };
                  copy.scores[1].name = target.value;

                  return copy;
                });
              }}
              value={state.scores[1].name}
            />
          </div>
          <button
            onClick={() => {
              if (
                state.scores.some(({ name }) => {
                  return name.trim() === '';
                })
              ) {
                alert('Please enter team names for both teams.');
                return;
              }
              setState(prev => {
                return {
                  ...prev,
                  inputCon: 'none',
                  scoreBoard: 'flex',
                  scores: prev.scores.map(({ name }, idx) => {
                    return {
                      name,
                      score: 0,
                    };
                  }),
                };
              });
            }}
            type="button"
          >
            Start Game
          </button>
        </div>

        <div className="score-container" style={{ display: 'none' }}>
          <div className="score-board">
            <div className="team-1">
              <h1 id="team1Name">1</h1>
              <div id="team1Score">0</div>
              <div className="buttons">
                {[-1, 1, 2, 3].map((points, idx) => {
                  const ammount = idx === 0 ? '-' : '+'.concat(points);
                  return (
                    <button
                      key={createKey(['team1Button', ammount, idx])}
                      onClick={() => {
                        addScore(ammount, 'team1');
                      }}
                      type="button"
                    >
                      {ammount}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="team-2">
              <h1 id="team2Name">2</h1>
              <div id="team2Score">0</div>
              {[-1, 1, 2, 3].map((points, idx) => {
                const ammount = idx === 0 ? '-' : '+'.concat(points);
                return (
                  <button
                    key={createKey(['team2Button', ammount, idx])}
                    onClick={() => {
                      addScore(ammount, 'team2');
                    }}
                    type="button"
                  >
                    {ammount}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              setState(prev => {
                return {
                  ...prev,
                  team1ScoreElem: '0',
                  team2ScoreElem: '0',
                };
              });
            }}
          >
            Reset Score
          </button>
          <button
            onClick={() => {
              setState(initalState);
            }}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
