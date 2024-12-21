import React from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';

const GameCard = props => {
  const { name, competitors } = props;

  if (name === 'Houston Texans at Kansas City Chiefs') {
    console.log(props);
  }

  return (
    <Card title={name}>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>F</th>
          </tr>
        </thead>
        {competitors.map(
          ({ team, records, score, uid, linescores = [], ...rest }) => {
            return (
              <tr key={uid}>
                <td>
                  <div className="flex align-items-center">
                    <Avatar
                      className="mr-3"
                      image={team.logo}
                      shape="circle"
                      size="large"
                    />
                    <dl>
                      <dd className="ml-0 mb-1">{team.location}</dd>
                      <dt className="font-medium text-xl">{team.name}</dt>
                    </dl>
                  </div>
                </td>

                {linescores.map(({ value }, idx) => {
                  return <td key={`${team}-${value}-${idx}`}>{value}</td>;
                })}
              </tr>
            );
          }
        )}
      </table>
    </Card>
  );
};

export default GameCard;
