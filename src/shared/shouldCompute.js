import _ from "lodash";
import hasContent from "./hasContent";

const shouldCompute = (table, val, path) => {
  let cond = false;

  if (hasContent(val)) {
    cond = val !== _.get(table, path);
    // modify value in cou only if it's detected that the value has changed
    if (cond) {
      console.log(
        `Setting Table at ${path} with ${val}. Previous value: ${_.get(
          table,
          path
        )}`
      );
      _.set(table, path, val);
    } else {
      console.log(
        `Value at ${path} has not changed. Previous value: ${_.get(
          table,
          path
        )}`
      );
    }
  }

  return cond;
};

export default shouldCompute;
