import buildEquationSides from "./buildEquationSides";
import isEquationSolvable from "./isEquationSolvable";
import shouldCompute from "./shouldCompute";
import solveEquation from "./solveEquation";

const solveEquations = (equations, table, tableSaver, tableName) => {
  console.log("Computing " + tableName + " values");
  let hasComputed;
  let maxAmountOfIterations = 100;

  do {
    const cells = Object.keys(equations);
    let index = 0;
    hasComputed = false;

    while (index < cells.length && !hasComputed) {
      const targetCell = cells[index];
      const equationsAssociatedToCell = equations[targetCell];
      let amountOfEvaluatedEquations = 0;
      console.log(`Solving ${targetCell}`);
      while (
        amountOfEvaluatedEquations < equationsAssociatedToCell.length &&
        !hasComputed
      ) {
        if (
          isEquationSolvable(
            equationsAssociatedToCell[amountOfEvaluatedEquations],
            table
          )
        ) {
          console.log(
            `Solving ${equationsAssociatedToCell[
              amountOfEvaluatedEquations
            ].join(" ")}`
          );
          const { leftSide, rightSide } = buildEquationSides(
            equationsAssociatedToCell[amountOfEvaluatedEquations],
            table
          );
          const val = solveEquation(leftSide, rightSide);
          hasComputed = shouldCompute(table, val, targetCell);
        } else {
          console.log(
            `Equation ${equationsAssociatedToCell[
              amountOfEvaluatedEquations
            ].join(" ")} is not solvable`
          );
        }

        amountOfEvaluatedEquations++;
      }

      index++;
    }

    maxAmountOfIterations--;
  } while (hasComputed && maxAmountOfIterations > 0);

  if (maxAmountOfIterations === 0) {
    alert(
      "Se ha alcanzado el máximo número de iteraciones para calcular la " +
        tableName
    );
  }

  tableSaver(table);
};

export default solveEquations;
