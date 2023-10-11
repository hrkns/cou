const genByRow = (row, side, col, currentRow, varSide) => {
  return row === currentRow && (!varSide || varSide === side)
    ? "x"
    : `${currentRow}.${side}.${col}`;
};

export default genByRow;
