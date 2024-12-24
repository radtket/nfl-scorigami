import React from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHeatmap from 'highcharts/modules/heatmap';

import data from '../../constants/data';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
  HighchartsHeatmap(Highcharts);
}

const Spicy = () => {
  return (
    <div className="App">
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'heatmap',
          },

          // yAxis: {
          //   categories: CHART.categories.map((c, i) => {
          //     return `Cool ${i}`;
          //   }),
          // },

          // colorAxis: {
          //   min: 0,
          //   max: 73,
          // },

          series: [
            {
              name: 'Sales per employees@@@@',
              // data: [
              //   { x: 0, y: 0, value: 4956 },
              //   { x: 1, y: 0, value: 8345 },
              //   { x: 2, y: 0, value: 4100 },
              //   { x: 3, y: 0, value: 156913 },
              //   { x: 4, y: 0, value: 26912 },
              //   { x: 5, y: 0, value: 44960 },
              //   { x: 0, y: 1, value: 31199 },
              //   { x: 1, y: 1, value: 87858 },
              //   { x: 2, y: 1, value: 2066 },
              //   { x: 3, y: 1, value: 5665 },
              //   { x: 4, y: 1, value: 762033 },
              //   { x: 5, y: 1, value: 463131 },
              //   { x: 0, y: 2, value: 2299 },
              //   { x: 1, y: 2, value: 23854 },
              //   { x: 2, y: 2, value: 3389 },
              //   { x: 3, y: 2, value: 5607 },
              //   { x: 4, y: 2, value: 1768 },
              //   { x: 5, y: 2, value: 5543 },
              // ],

              data: data.matrix.reduce((all, row, y) => {
                return [
                  ...all,
                  ...row.map(({ count }, col) => {
                    return [col, y, count];
                  }),
                ];
              }, []),
              // data: data.matrix.reduce((all, row, y) => {
              //   const copy = [...all];
              //   row.forEach(({ count }, col) => {
              //     copy.push({
              //       x: col,
              //       y,
              //       value: count,
              //     });
              //   });

              //   return copy;
              // }, []),
            },
          ],
        }}
      />
    </div>
  );
};

export default Spicy;
