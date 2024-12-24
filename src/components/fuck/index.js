import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';
import heatmap from 'highcharts/modules/heatmap'; // import the heatmap module
import HighchartsExporting from 'highcharts/modules/exporting';

import data from '../../constants/data';
import zzz from './matrix';

const { maxcount, maxpts } = data;

const states = {
  // hover: {
  //   enabled: false,
  // },
  inactive: {
    opacity: 1,
  },
};

if (typeof Highcharts === 'object') {
  heatmap(Highcharts); // initialize the module
  HighchartsExporting(Highcharts);
}

const categories = Array.from({ length: maxpts }).map((_, idx) => {
  return idx;
});

const App = () => {
  const FILTER_STATE = {
    isShowAllRows: false,
    isShowGradientMode: false,
    isShowCountLabels: true,
  };

  const series = zzz.reduce(
    (all, row, ROW_INDEX) => {
      const copy = [...all];

      row.forEach(({ count }, CELL_INDEX) => {
        const payload = [CELL_INDEX, ROW_INDEX, count];

        if (
          CELL_INDEX < ROW_INDEX ||
          (CELL_INDEX === 1 && ROW_INDEX <= 1) ||
          (ROW_INDEX === 1 &&
            CELL_INDEX > 1 &&
            (CELL_INDEX <= 5 || CELL_INDEX === 7))
        ) {
          copy[2].data.push(payload);
          return;
        }

        if (count > 0) {
          copy[0].data.push(payload);
        } else {
          copy[1].data.push(payload);
        }
      });

      return copy;
    },
    [
      {
        colorAxis: 0,
        name: 'green',
        data: [],
        states,
        borderWidth: 0.25,
        dataLabels: {
          enabled: FILTER_STATE.isShowCountLabels,
          color: FILTER_STATE.isShowGradientMode ? '#BADA55' : '#fff',
        },
      },
      {
        colorAxis: 1,
        name: 'blank',
        data: [],
        states,
        borderWidth: 0.25,
      },
      {
        colorAxis: 2,
        name: 'black',
        data: [],
        states,
      },
    ]
  );

  const [, yMax] = series[0].data.at(-1);

  const options = {
    chart: {
      type: 'heatmap',
      height: 1000,
    },
    title: {
      text: 'Heatmap Chart',
    },
    xAxis: {
      categories,
      max: categories.length,
      opposite: true,
      title: {
        text: 'Winning Team Score',
      },
      // reversed: true,
    },
    yAxis: {
      categories,
      max: FILTER_STATE.isShowAllRows ? categories.length : yMax,
      opposite: true,
      title: {
        text: 'Lossing Team Score',
      },
      reversed: true,
    },
    colorAxis: [
      FILTER_STATE.isShowGradientMode
        ? null
        : {
            // stops: [
            //   [0.125, 'var(--green-200)'],
            //   [0.25, 'var(--green-300)'],
            //   [0.375, 'var(--green-400)'],
            //   [0.5, 'var(--green-500)'],
            //   [0.625, 'var(--green-600)'],
            //   [0.75, 'var(--green-700)'],
            //   [0.875, 'var(--green-800)'],
            //   [1, 'var(--green-900)'],
            // ],
            minColor: 'green',
            maxColor: 'green',
            // min: 1,
            // max: 8,
            // labels: {
            //   format: '{value}%',
            // },
          },
      {
        maxColor: 'transparent',
        minColor: 'transparent',
        showInLegend: false,
        // visible: false,
        // labels: {
        //   format: '{value}%',
        // },
      },

      {
        minColor: 'black',
        maxColor: 'black',
        showInLegend: false,
        // labels: {
        //   format: '{value}%',
        // },
      },
    ],
    series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default App;
