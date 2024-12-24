import data from '../../constants/data';

const { maxpts, matrix } = data;

export default matrix.reduce((all, row, y) => {
  const copy = [...all];
  row.forEach(({ count }, col) => {
    copy.push({
      x: col,
      y,
      value: count,
    });
  });

  return copy;
}, []);
