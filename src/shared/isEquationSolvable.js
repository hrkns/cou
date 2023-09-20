import _ from "lodash";
import hasContent from "./hasContent";

const isEquationSolvable = (equationElements, values) => {
  let amountOfDefinedValues = 0;
  let amountOfTotalValues = 0;
  equationElements.forEach((element) => {
    if (element === "=" || element === "+" || element === "-") return;
    amountOfTotalValues++;
    if (element !== "x" && hasContent(_.get(values, element)))
      amountOfDefinedValues++;
  });
  return amountOfDefinedValues === amountOfTotalValues - 1;
};

export default isEquationSolvable;
