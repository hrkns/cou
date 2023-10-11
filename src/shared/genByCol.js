const genByCol = (row, side, col, currentCol) => {
  return col === currentCol ? "x" : `${row}.${side}.${currentCol}`;
};

export default genByCol;
