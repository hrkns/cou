// it's required to surround values with parenthesis for the algebra.js library to work
// it breaks when the values are negative and they are not surrounded
const surround = (val) => {
  return "(" + val + ")";
};

export default surround;
