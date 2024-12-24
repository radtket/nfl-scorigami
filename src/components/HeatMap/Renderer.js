/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import * as d3 from 'd3';
import { createKey } from '../../constants/utils';

const MARGIN = { top: 0, right: 50, bottom: 30, left: 50 };

const getFill = ({ value, x, y }, colorScale) => {
  const fill = colorScale(value);

  if (value > 0) {
    return '#008000';
  }

  if (x < y) {
    return 'black';
  }

  return 'white';

const Renderer = ({ width, height, data, setHoveredCell }) => {
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = useMemo(() => {
    return [
      ...new Set(
        data.map(d => {
          return d.y;
        })
      ),
    ];
  }, [data]);

  const allXGroups = useMemo(() => {
    return [
      ...new Set(
        data.map(d => {
          return d.x;
        })
      ),
    ];
  }, [data]);

  const [min = 0, max = 0] = d3.extent(
    data.map(d => {
      return d.value;
    })
  );

  // extent can return [undefined, undefined], default to [0,0] to fix types
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [allXGroups, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [allYGroups, boundsHeight]);

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1, 5]);

  // Build the rectangles
  const allShapes = data.map(d => {
    const x = xScale(d.x);
    const y = yScale(d.y);

    if (d.value === null || !x || !y) {
      return null;
    }

    return (
      <rect
        key={createKey(['rect', d.x, d.y, d.value])}
        cursor="pointer"
        fill={getFill(d, colorScale)}
        height={yScale.bandwidth()}
        onMouseEnter={() => {
          setHoveredCell({
            xLabel: `group ${d.x}`,
            yLabel: `group ${d.y}`,
            xPos: x + xScale.bandwidth() + MARGIN.left,
            yPos: y + xScale.bandwidth() / 2 + MARGIN.top,
            value: Math.round(d.value * 100) / 100,
            winning: d.x,
            losing: d.y,
          });
        }}
        onMouseLeave={() => {
          return setHoveredCell(null);
        }}
        opacity={1}
        r={4}
        rx={5}
        stroke="white"
        width={xScale.bandwidth()}
        x={xScale(d.x)}
        y={yScale(d.y)}
      />
    );
  });

  const xLabels = allXGroups.map(name => {
    const x = xScale(name);

    if (!x) {
      return null;
    }

    return (
      <text
        key={createKey(['xLabel', name, 'text'])}
        dominantBaseline="middle"
        fontSize={10}
        textAnchor="middle"
        x={x + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
      >
        {name}
      </text>
    );
  });

  const yLabels = allYGroups.map(name => {
    const y = yScale(name);

    if (!y) {
      return null;
    }

    return (
      <text
        key={createKey(['yLabels', name, 'text'])}
        dominantBaseline="middle"
        fontSize={10}
        textAnchor="end"
        x={-5}
        y={y + yScale.bandwidth() / 2}
      >
        {name}
      </text>
    );
  });

  return (
    <svg height={height} width={width}>
      <g
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        width={boundsWidth}
      >
        {allShapes}
        {xLabels}
        {yLabels}
      </g>
    </svg>
  );
};
export default Renderer;
