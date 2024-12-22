import React, { useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { join } from 'lodash';
import classNames from 'classnames';
import {
  SINGLE_SELECT_OPTIONS,
  MULTI_SELECT_OPTIONS,
} from '../constants/modes';
import data from '../constants/data';
import { createKey } from '../constants/utils';

const { maxpts, matrix } = data;

const ScorigamiCard = () => {
  const [multiSelect, setMultiSelect] = useState([]);
  const [singleSelect, setSingleSelect] = useState(SINGLE_SELECT_OPTIONS[1]);

  return (
    <div className="card">
      <div className="grid">
        <div className="col-12">
          <Toolbar
            end={
              <Dropdown
                className="w-full md:w-14rem"
                onChange={e => {
                  return setSingleSelect(e.value);
                }}
                optionLabel="name"
                options={SINGLE_SELECT_OPTIONS}
                value={singleSelect}
              />
            }
            start={
              <SelectButton
                multiple
                onChange={e => {
                  return setMultiSelect(e.value);
                }}
                optionLabel="name"
                options={MULTI_SELECT_OPTIONS}
                value={multiSelect}
              />
            }
          />
        </div>
        <div className="col-12">
          <div className="sectionContainer" id="tableContainer">
            <div id="loadingTableDiv">
              <img
                alt="Loading"
                className="hidden"
                id="loadingTable"
                src="../images/loading.gif"
              />
            </div>

            <table id="scoreTable">
              <tbody>
                <tr>
                  <td className="axisLabel" colSpan={75} id="hAxisLabel">
                    Winning Team Score
                  </td>
                  <td className="axisLabel" id="vAxisLabel" rowSpan={76}>
                    <div className="vertical">Losing Team Score</div>
                  </td>
                </tr>

                <tr>
                  {Array.from({ length: maxpts + 1 }).map((_, ROW_INDEX) => {
                    if (ROW_INDEX > maxpts) {
                      // eslint-disable-next-line jsx-a11y/control-has-associated-label
                      return (
                        <th>
                          <span className="sr-only">N/A</span>
                        </th>
                      );
                    }

                    return (
                      <th
                        key={createKey(['colHeader_', ROW_INDEX])}
                        id={`colHeader_${ROW_INDEX}`}
                      >
                        {ROW_INDEX}
                      </th>
                    );
                  })}
                </tr>

                {matrix.map((row, ROW_INDEX) => {
                  return (
                    <tr
                      key={createKey(['tr', ROW_INDEX])}
                      id={`row_${ROW_INDEX}`}
                    >
                      {row.map(({ count }, CELL_INDEX) => {
                        const id = `${ROW_INDEX}-${CELL_INDEX}`;

                        if (count > 0) {
                          return (
                            <td
                              className={classNames('green', {
                                special: ROW_INDEX === CELL_INDEX,
                              })}
                              id={join(['cell', id], '_')}
                            >
                              <div id={join(['hover', id], '_')}>
                                <div id={join(['count', id], '_')}>{count}</div>
                              </div>
                            </td>
                          );
                        }

                        if (CELL_INDEX < ROW_INDEX) {
                          return (
                            <td className="black">
                              <span className="sr-only">N/A</span>
                            </td>
                          );
                        }

                        return (
                          <td className="blank" id={join(['cell', id], '_')}>
                            <div id={join(['hover', id], '_')}>
                              <div id={join(['count', id], '_')}>
                                <span className="sr-only">N/A</span>
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      <th id={`rowHeader_${ROW_INDEX}`}>{ROW_INDEX}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorigamiCard;
