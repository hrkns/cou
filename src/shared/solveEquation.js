import _ from "lodash";
import algebra from "algebra.js";

const solveEquation = (leftSide, rightSide) => {
  const expresion = new algebra.Equation(
    algebra.parse(_.toString(leftSide)),
    algebra.parse(_.toString(rightSide))
  );
  const solution = expresion.solveFor("x");
  console.log(`Solving equation: ${leftSide} = ${rightSide}`, { solution });
  return solution.numer / solution.denom;
};

export default solveEquation;
