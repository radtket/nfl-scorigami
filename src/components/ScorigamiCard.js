import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import classNames from 'classnames';
import * as d3 from 'd3';
import { readableColor } from 'polished';
import { ScrollPanel } from 'primereact/scrollpanel';
import { getYear } from 'date-fns';
import {
  MODE_FIRST_GAME_CALENDAR_YEAR,
  MODE_FIRST_GAME_SEASON_YEAR,
  MODE_OPTIONS,
  MODE_SHOW_GRADIENT,
  MODE_SHOW_VALUE,
  MULTI_SELECT_OPTIONS,
} from '../constants/modes';
import json from '../constants/data';

const { matrix } = json;

const data = matrix.reduce((all, row, ROW_INDEX) => {
  const copy = [...all];

  row.forEach((cell, COL_INDEX) => {
    copy.push({
      ...cell,
      x: COL_INDEX,
      y: ROW_INDEX,
      value: cell.count,
      date: cell.last_date || null,
      year: cell.first_date
        ? parseInt(cell.first_date.split('-')[0], 10)
        : null,
      impossible:
        COL_INDEX < ROW_INDEX ||
        (ROW_INDEX <= 1 &&
          [
            [0, 1],
            [1, 0],
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
            [5, 1],
            [7, 1],
          ].some(([x, y]) => {
            return x === COL_INDEX && y === ROW_INDEX;
          })),
    });
  });

  return copy;
}, []);

const initalRange = getYear(new Date());

const ScorigamiCard = () => {
  const [multiSelect, setMultiSelect] = useState([]);
  const [mode, setMode] = useState(MODE_OPTIONS[1]);
  const [range, setRange] = useState(initalRange);

  const [min, max] = useMemo(() => {
    return d3.extent(data, d => {
      return parseInt(d.year, 10);
    });
  }, []);

  useEffect(() => {
    setRange(max);
  }, [max]);

  const ref = useRef();

  const colorScale = useMemo(() => {
    return d3.scaleSequential(d3.interpolateYlOrRd).domain(
      d3.extent(data, d => {
        return d.value;
      })
    );
  }, []);

  // TODO: CREATE SEPERATE FOR GRAPH MOST FREQUENT SCORES TO RAREST
  const drawHeatmap = useCallback(() => {
    const svg = d3.select(ref.current);
    const width = 2000;
    const height = width; // Maintain 1:1 ratio
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const INNER_WIDTH = width - margin.left - margin.right;
    const INNER_HEIGHT = height - margin.top - margin.bottom;

    const maxMinScore = d3.max(
      data.map(d => {
        return Math.min(d.score1, d.score2);
      })
    );

    const x = d3
      .scaleBand()
      .domain(
        data.map(d => {
          return d.x;
        })
      )
      .range([0, INNER_WIDTH])
      .padding(-0.05);

    const y = d3
      .scaleBand()
      .domain(
        data.map(d => {
          return d.y;
        })
      )
      .range([0, INNER_HEIGHT])
      .padding(-0.05);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => {
        return x(d.x);
      })
      .attr('y', d => {
        return y(d.y);
      })
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('class', 'square')
      .attr('fill', d => {
        if (
          d.x < d.y ||
          (d.y <= 1 &&
            [
              [0, 1],
              [1, 0],
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
              [5, 1],
              [7, 1],
            ].some(cord => {
              return cord[0] === d.x && cord[1] === d.y;
            }))
        ) {
          return '#000';
        }

        if (d.count > 0) {
          return colorScale(d.value);
        }

        return '#e9ecef';
      });

    d3.selectAll('.square')
      .filter(({ count }) => {
        return count > 0;
      })
      .attr('data-filled', 'true')
      .attr('class', 'filled');

    g.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => {
        return x(d.x) + x.bandwidth() / 2;
      })
      .attr('y', d => {
        return y(d.y) + y.bandwidth() / 2;
      })
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('class', d => {
        return d.value > 0 ? 'cell-text' : 'cell-text--empty';
      });

    d3.selectAll('.cell-text')
      .text(d => {
        return d.value > 0 ? d.value : '';
      })
      .attr('fill', d => {
        return readableColor(colorScale(d.value), '#000', '#fff');
      });

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${INNER_HEIGHT})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('transform', `translate(${INNER_HEIGHT}, 0)`)
      .call(d3.axisRight(x));

    // Add Y axis
    g.append('g').call(d3.axisLeft(y));

    // Add top Y axis
    g.append('g').call(d3.axisTop(x)); // Customize top Y axis tick labels

    // Add X axis label
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', margin.left + INNER_WIDTH / 2)
      .attr('y', height - 10)
      .text('Losing Team');

    // Add Y axis label
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(15, ${margin.top + INNER_HEIGHT / 2}) rotate(-90)`
      )
      .text('Winning Team');

    // Add legend
    const legendWidth = 300;
    const legendHeight = 20;

    const legendSvg = svg
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left},${height - margin.bottom - legendHeight})`
      )
      .attr('id', 'gradient-legend');

    const defs = svg.append('defs');

    const linearGradient = defs
      .append('linearGradient')
      .attr('id', 'linear-gradient');

    linearGradient
      .selectAll('stop')
      .data(
        colorScale.ticks().map((t, i, n) => {
          return {
            offset: `${(100 * i) / n.length}%`,
            color: colorScale(t),
          };
        })
      )
      .enter()
      .append('stop')
      .attr('offset', d => {
        return d.offset;
      })
      .attr('stop-color', d => {
        return d.color;
      });

    legendSvg
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#linear-gradient)');

    const legendScale = d3
      .scaleLinear()
      .domain(colorScale.domain())
      .range([0, legendWidth]);

    const legendAxis = d3
      .axisBottom(legendScale)
      .ticks(5)
      .tickSize(-legendHeight);

    legendSvg
      .append('g')
      .attr('transform', `translate(0,${legendHeight})`)
      .call(legendAxis)
      .select('.domain')
      .remove();
  }, [colorScale]);

  useEffect(() => {
    drawHeatmap();
    window.addEventListener('resize', drawHeatmap);
    return () => {
      return window.removeEventListener('resize', drawHeatmap);
    };
  }, [drawHeatmap]);

  return (
    <div className="card">
      <div className="grid">
        <div className="col-12">
          <Toolbar
            end={
              <Dropdown
                className="w-full md:w-14rem"
                onChange={({ value }) => {
                  const { code, key } = value;
                  switch (code) {
                    case MODE_FIRST_GAME_CALENDAR_YEAR:
                    case MODE_FIRST_GAME_SEASON_YEAR: {
                      d3.selectAll('[data-filled]').attr('class', 'filled');
                      setRange(initalRange);
                      break;
                    }

                    default:
                      break;
                  }

                  d3.selectAll('.cell-text').text(d => {
                    const cool = d[key];
                    if (!cool) {
                      return 'N/A';
                    }
                    return d[key];
                  });

                  setMode(value);
                }}
                optionLabel="name"
                options={MODE_OPTIONS}
                value={mode}
              />
            }
            start={
              <SelectButton
                multiple
                onChange={({ value }) => {
                  setMultiSelect(value);
                }}
                optionLabel="name"
                options={MULTI_SELECT_OPTIONS}
                value={multiSelect}
              />
            }
          />
        </div>
        {[MODE_FIRST_GAME_CALENDAR_YEAR, MODE_FIRST_GAME_SEASON_YEAR].includes(
          mode.code
        ) && (
          <div className="col-12">
            <label className="flex align-items-center">
              <Slider
                max={max}
                min={min}
                onChange={({ value }) => {
                  d3.selectAll('.cell-text').attr('class', d => {
                    const year = parseInt(d.year, 10);

                    // if (year === value) {
                    //   return 'filled red';
                    // }

                    if (year > value) {
                      return 'cell-text later';
                    }

                    return 'cell-text';
                  });

                  d3.selectAll('[data-filled]').attr('class', d => {
                    const year = parseInt(d.year, 10);

                    if (year === value) {
                      return 'filled red';
                    }

                    if (year > value) {
                      return 'filled later';
                    }

                    return 'filled';
                  });
                  setRange(value);
                }}
                style={{ width: '100%' }}
                value={range}
              />

              <span className="pl-4 flex-shrink-0 ">
                {min} - {max}
              </span>
            </label>
          </div>
        )}

        <div
          className={classNames('col-12', {
            'hide-cell-text': !multiSelect.includes(MODE_SHOW_VALUE),
            'solid-filled': !multiSelect.includes(MODE_SHOW_GRADIENT),
          })}
        >
          <ScrollPanel style={{ height: '100%' }}>
            <svg ref={ref} />
          </ScrollPanel>
        </div>
      </div>
    </div>
  );
};

export default ScorigamiCard;
