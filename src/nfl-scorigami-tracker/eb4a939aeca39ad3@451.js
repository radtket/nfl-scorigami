/* eslint-disable no-underscore-dangle */
import define1 from './a33468b95d0b15b0@817';
import define2 from './ded14e45220521a2@140';

function _title(md) {
  return md`
# NFL Scorigami Tracker
  `;
}

function _description(md) {
  return md`
A scorigami occurs when a game ends in a score that has never been recorded before. This chart shows the NFL scorigami combinations which have happened with a box at that combination. The color of each box indicates the season that scorigami occured. Hover over a box to view the date the scorigami occurred and the teams involved.
  `;
}

function _chart(
  d3,
  width,
  height,
  xAxisMajor,
  xAxisMinor,
  yAxisMajor,
  yAxisMinor,
  data,
  color,
  x,
  y,
  legend,
  margin
) {
  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, width, height])
    .style('overflow', 'visible');

  svg.append('g').call(xAxisMajor);
  svg.append('g').call(xAxisMinor);
  svg.append('g').call(yAxisMajor);
  svg.append('g').call(yAxisMinor);

  const boxes = svg
    .append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('fill', d => {
      return color(d.season);
    })
    .attr('x', d => {
      return x(Math.max(d.score1, d.score2));
    })
    .attr('y', d => {
      return y(Math.min(d.score1, d.score2));
    })
    .attr('height', y.bandwidth())
    .attr('width', x.bandwidth())
    .append('title')
    .text(d => {
      return `${`${d.team1} ${d.score1} - ${d.score2} ${d.team2}`}\n${d.date}`;
    });

  const tooltip = svg.append('g').attr('x', 0).attr('y', 0);

  /* boxes.on('mousemove touchmove', function(e, d) {
      d3.select(this).attr('opacity', 0.5);
      let xp = x(Math.max(d.score1, d.score2)) + x.bandwidth() / 2;
      let yp = y(Math.min(d.score1, d.score2)) + y.bandwidth() + 5;

      tooltip
        .attr('visibility', 'visible')
        .attr('transform', `translate(${xp},${yp})`)
        .attr('stroke-width', 0)
        .call(
          callout,
          `${d.team1 + ' ' + d.score1 + ' - ' + d.score2 + ' ' + d.team2}\n${
            d.date
          }`
        )
        .selectAll('tspan')
        .style("font", '10px sans-serif')
        .style('font-weight', null);

      tooltip.selectAll('path').style('fill', 'whitesmoke');
    })
    .on('mouseleave touchend', function() {
      d3.select(this).attr('opacity', 1);
      tooltip.attr('visibility', 'hidden');
    }); */

  const colorLegend = legend({
    color: d3.scaleSequential([1920, 2020], d3.interpolateSpectral),
    title: 'Season',
    tickFormat: 'd',
    width: width / 3,
  });

  svg
    .append('g')
    .attr('transform', `translate(${margin.left + 20}, ${height - 70})`)
    .append(() => {
      return colorLegend;
    });

  svg
    .append('text')
    .attr(
      'transform',
      `translate(${(width - margin.left - margin.right) / 2 + margin.left}, ${
        margin.top - 30
      })`
    )
    .attr('text-anchor', 'middle')
    .style('font', '15px sans-serif')
    .text('Larger Score')
    .style('font-weight', 'bold');

  svg
    .append('text')
    .attr('transform', 'rotate(90)')
    .attr('x', (height - margin.top - margin.bottom) / 2 + margin.top)
    .attr('y', -width + 10)
    .attr('text-anchor', 'middle')
    .style('font', '15px sans-serif')
    .text('Smaller Score')
    .style('font-weight', 'bold');

  return svg.node();
}

function _x(d3, maxScore, margin, width) {
  return d3
    .scaleBand()
    .domain(d3.range(0, maxScore + 0.1))
    .range([margin.left, width - margin.right])
    .padding(0.1);
}

function _y(d3, maxMinScore, margin, height) {
  return d3
    .scaleBand()
    .domain(d3.range(0, maxMinScore + 0.1))
    .range([margin.top, height - margin.bottom])
    .padding(0.1);
}

function _color(d3, maxYear) {
  return d3.scaleSequential(d3.interpolateSpectral).domain([1920, maxYear]);
}

function _xAxisMajor(margin, d3, x) {
  return g => {
    return g.attr('transform', `translate(0,${margin.top})`).call(
      d3
        .axisTop(x)
        .tickValues(
          x.domain().filter(val => {
            return val % 5 === 0;
          })
        )
        .tickSizeOuter(0)
    );
  };
}

function _xAxisMinor(margin, d3, x) {
  return g => {
    return g
      .attr('transform', `translate(0,${margin.top})`)
      .call(
        d3.axisTop(x).tickValues(x.domain()).tickFormat('').tickSizeOuter(0)
      );
  };
}

function _yAxisMajor(width, margin, d3, y) {
  return g => {
    return g.attr('transform', `translate(${width - margin.right}, 0)`).call(
      d3
        .axisRight(y)
        .tickValues(
          y.domain().filter(val => {
            return val % 5 === 0;
          })
        )
        .tickSizeOuter(0)
    );
  };
}

function _yAxisMinor(width, margin, d3, y) {
  return g => {
    return g
      .attr('transform', `translate(${width - margin.right}, 0)`)
      .call(
        d3.axisRight(y).tickValues(y.domain()).tickFormat('').tickSizeOuter(0)
      );
  };
}

function _data(scorigamisArr) {
  return scorigamisArr;
}

function _maxYear(d3, data) {
  return d3.max(
    data.map(d => {
      return d.season;
    })
  );
}

function _maxScore(d3, data) {
  return d3.max(
    data.map(val => {
      return Math.max(val.score1, val.score2);
    })
  );
}

function _maxMinScore(d3, data) {
  return d3.max(
    data.map(val => {
      return Math.min(val.score1, val.score2);
    })
  );
}

function _height(maxMinScore, width, margin, maxScore) {
  return (
    (maxMinScore + 1) *
      ((width - margin.left - margin.right) / (maxScore + 1)) +
    margin.top +
    margin.bottom
  );
}

function _margin() {
  return {
    top: 40,
    bottom: 0,
    left: 10,
    right: 40,
  };
}

function _d3(require) {
  return require('d3@6');
}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer('title')).define('title', ['md'], _title);
  main
    .variable(observer('description'))
    .define('description', ['md'], _description);
  main
    .variable(observer('chart'))
    .define(
      'chart',
      [
        'd3',
        'width',
        'height',
        'xAxisMajor',
        'xAxisMinor',
        'yAxisMajor',
        'yAxisMinor',
        'data',
        'color',
        'x',
        'y',
        'legend',
        'margin',
      ],
      _chart
    );
  main
    .variable(observer('x'))
    .define('x', ['d3', 'maxScore', 'margin', 'width'], _x);
  main
    .variable(observer('y'))
    .define('y', ['d3', 'maxMinScore', 'margin', 'height'], _y);
  main.variable(observer('color')).define('color', ['d3', 'maxYear'], _color);
  main
    .variable(observer('xAxisMajor'))
    .define('xAxisMajor', ['margin', 'd3', 'x'], _xAxisMajor);
  main
    .variable(observer('xAxisMinor'))
    .define('xAxisMinor', ['margin', 'd3', 'x'], _xAxisMinor);
  main
    .variable(observer('yAxisMajor'))
    .define('yAxisMajor', ['width', 'margin', 'd3', 'y'], _yAxisMajor);
  main
    .variable(observer('yAxisMinor'))
    .define('yAxisMinor', ['width', 'margin', 'd3', 'y'], _yAxisMinor);
  main.variable(observer('data')).define('data', ['scorigamisArr'], _data);
  main
    .variable(observer('maxYear'))
    .define('maxYear', ['d3', 'data'], _maxYear);
  main
    .variable(observer('maxScore'))
    .define('maxScore', ['d3', 'data'], _maxScore);
  main
    .variable(observer('maxMinScore'))
    .define('maxMinScore', ['d3', 'data'], _maxMinScore);
  main
    .variable(observer('height'))
    .define('height', ['maxMinScore', 'width', 'margin', 'maxScore'], _height);
  main.variable(observer('margin')).define('margin', _margin);
  main.variable(observer('d3')).define('d3', ['require'], _d3);
  const child1 = runtime.module(define1);
  main.import('legend', child1);
  main.import('swatches', child1);
  const child2 = runtime.module(define2);
  main.import('scorigamisArr', child2);
  return main;
}
