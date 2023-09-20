import React from "react";

const DisabledCell = ({ customKey }) => {
  return <td className="no-use" key={customKey}></td>;
};

export default DisabledCell;
