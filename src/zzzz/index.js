import './styles.css';

import Highcharts from 'highcharts';
import Heatmap from 'highcharts/modules/heatmap';
import data from '../constants/data';
import scanData from './scanData';

if (typeof Highcharts === 'object') {
  Heatmap(Highcharts);
}

console.log(
  data.matrix,
  data.matrix.reduce((all, row, y) => {
    return [
      ...all,
      ...row.map(({ count }, col) => {
        return [col, y, count];
      }),
    ];
  }, [])
);

const compactOptions = {
  series: [
    {
      id: 'scans',
      dataLabels: {
        enabled: false,
      },
    },
    // {
    //   id: 'totals',
    //   dataLabels: {
    //     enabled: false
    //   }
    // },
    // {
    //   id: 'grandTotal',
    //   dataLabels: {
    //     enabled: false
    //   }
    // }
  ],
};

const options = {
  chart: {
    type: 'heatmap',
    marginTop: 40,
    marginBottom: 80,
    events: {
      render() {
        console.timeEnd('chart');
      },
    },
  },

  title: {
    text: 'Scan Summary',
  },

  xAxis: {
    // categories: [
    //   '12 AM',
    //   '1 AM',
    //   '2 AM',
    //   '3 AM',
    //   '4 AM',
    //   '5 AM',
    //   '6 AM',
    //   '7 AM',
    //   '8 AM',
    //   '9 AM',
    //   '10 AM',
    //   '11 AM',
    //   '12 PM',
    //   '1 PM',
    //   '2 PM',
    //   '3 PM',
    //   '4 PM',
    //   '5 PM',
    //   '6 PM',
    //   '7 PM',
    //   '8 PM',
    //   '9 PM',
    //   '10 PM',
    //   '11 PM',
    //   'Total',
    // ],
    title: {
      text: 'Hour of Day',
    },
    plotBands: [
      {
        borderWidth: 1,
        borderColor: '#000000',
        color: 'rgba(0, 0, 0, 0.05)',
        from: 23.5,
        to: 25,
        zIndex: 5,
      },
    ],
  },

  yAxis: {
    // categories: [
    //   '1',
    //   '2',
    //   '3',
    //   '4',
    //   '5',
    //   '6',
    //   '7',
    //   '8',
    //   '9',
    //   '10',
    //   '11',
    //   '12',
    //   '13',
    //   '14',
    //   '15',
    //   '16',
    //   '17',
    //   '18',
    //   '19',
    //   '20',
    //   '21',
    //   '22',
    //   '23',
    //   '24',
    //   '25',
    //   '26',
    //   '27',
    //   '28',
    //   '29',
    //   '30',
    //   '31',
    //   'Total',
    // ],
    title: {
      text: 'Day of Month',
    },
    reversed: true,

    plotBands: [
      {
        borderWidth: 1,
        borderColor: '#000000',
        color: 'rgba(0, 0, 0, 0.05)',
        from: 30.5,
        to: 32,
        zIndex: 5,
      },
    ],
  },

  legend: {
    enabled: false,
  },

  plotOptions: {
    series: {
      states: {
        inactive: {
          enabled: false,
        },
      },
    },
  },

  series: [
    {
      id: 'scans',
      cursor: 'pointer',
      name: 'Scans by hour of day',
      // data: scanData.scans,

      data: data.matrix.reduce((all, row, y) => {
        return [
          ...all,
          ...row.map(({ count }, col) => {
            return [col, y, count];
          }),
        ];
      }, []),
      dataLabels: {
        enabled: true,
      },
      colorAxis: 0,
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 1000,
        },
        chartOptions: compactOptions,
      },
      {
        condition: {
          maxHeight: 800,
        },
        chartOptions: compactOptions,
      },
    ],
  },

  credits: {
    enabled: false,
  },
};

export default options;
