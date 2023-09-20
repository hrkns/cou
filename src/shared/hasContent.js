import _ from "lodash";

const hasContent = (val) => {
  return !_.isNil(val) && val !== "";
};

export default hasContent;
