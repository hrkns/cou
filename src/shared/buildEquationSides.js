import _ from "lodash";
import hasContent from "./hasContent";
import surround from "./surround";

const buildEquationSides = (equationElements, values) => {
  let leftSide = "";
  let rightSide = "";
  let switchToRightSide = false;

  equationElements.forEach((element) => {
    let content;
    switch (element) {
      case "x":
        content = element;
        break;
      case "+":
        content = element;
        break;
      case "-":
        content = element;
        break;
      case "=":
        switchToRightSide = true;
        break;
      default:
        let val = _.get(values, element);
        if (hasContent(val)) {
          content = surround(_.toString(val));
        }
    }

    if (hasContent(content)) {
      if (switchToRightSide) {
        rightSide += content;
      } else {
        leftSide += content;
      }
    }
  });

  return { leftSide, rightSide };
};

export default buildEquationSides;
