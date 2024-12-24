import data from '../../constants/data';

const chart = data.matrix.reduce((all, row, y) => {
  const copy = [...all];
  row.forEach(({ count }, col) => {
    copy.push([col, y, count]);
  });

  return copy;
}, []);
