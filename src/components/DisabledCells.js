import _ from "lodash";
import DisabledCell from "./DisabledCell";

const DisabledCells = (rowKey, base, amount) => {
  return _.range(base, base + amount).map((keyIndex) => {
    return <DisabledCell key={`${rowKey}${keyIndex}`} />;
  });
};

export default DisabledCells;
