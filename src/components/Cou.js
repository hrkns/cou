import _ from "lodash";
import algebra from "algebra.js";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../shared/db";

const branchRow = {
  intermediateUse: {
    firstBranch: null,
    secondBranch: null,
    thirdBranch: null,
    gov: null,
    st: null,
  },
  finalUse: {
    gcfHomes: null,
    gcfGov: null,
    fbkFbkf: null,
    fbkVe: null,
    exports: null,
    st: null,
  },
  total: null,
};

const Cou = ({ appValues, setAppValues }) => {
  // TODO: change to dynamics branch amount: an input for defining the amount
  // of branches (1 or more) and from there generate dinamically the corresponding
  // row and columns, modifying also the corresponding calculations
  const [firstBranchName, setFirstBranchName] = useState("Rama 1");
  useEffect(() => {
    appValues.branches[0].name = firstBranchName;
    setAppValues(_.cloneDeep(appValues));
  }, [firstBranchName]);

  const [secondBranchName, setSecondBranchName] = useState("Rama 2");
  useEffect(() => {
    appValues.branches[1].name = secondBranchName;
    setAppValues(_.cloneDeep(appValues));
  }, [secondBranchName]);

  const [thirdBranchName, setThirdBranchName] = useState("Rama 3");
  useEffect(() => {
    if (appValues.branches[2]) {
      appValues.branches[2].name = thirdBranchName;
      setAppValues(_.cloneDeep(appValues));
    }
  }, [thirdBranchName]);

  const emptyCou = {
    firstBranch: _.cloneDeep(branchRow),
    secondBranch: _.cloneDeep(branchRow),
    thirdBranch: _.cloneDeep(branchRow),
    gov: _.cloneDeep(branchRow),
    imports: _.cloneDeep(branchRow),
    totalUses: _.cloneDeep(branchRow),
    ra: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    ckf: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    tax: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    een: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    vab: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    production: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
  };
  const [couValues, setCouValues] = useState(getItem("cou") || emptyCou);
  const [useThirdBranch, setUseThirdBranch] = useState(
    appValues.useThirdBranch
  );
  const [useGov, setUseGov] = useState(appValues.useGov);

  // save in the internal component variable and the browser local storage so the user
  // can still access the values after refreshing/reopening the web app
  const saveCouValues = (content) => {
    setCouValues(_.cloneDeep(content));
    setItem("cou", content);
  };

  const handleCouValueChange = (value, cellKey) => {
    _.set(couValues, cellKey, value);
    saveCouValues(couValues);
  };

  const IntermediateUseRow = (rowKey) => {
    return [
      <td key={`${rowKey}1`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].intermediateUse.firstBranch ?? ""}
          onChange={(e) => {
            handleCouValueChange(
              e.target.value,
              rowKey + ".intermediateUse.firstBranch"
            );
          }}
        />
      </td>,
      <td key={`${rowKey}2`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].intermediateUse.secondBranch ?? ""}
          onChange={(e) => {
            handleCouValueChange(
              e.target.value,
              rowKey + ".intermediateUse.secondBranch"
            );
          }}
        />
      </td>,
      <td key={`${rowKey}3`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].intermediateUse.thirdBranch ?? ""}
          onChange={(e) => {
            handleCouValueChange(
              e.target.value,
              rowKey + ".intermediateUse.thirdBranch"
            );
          }}
        />
      </td>,
      // no gov column is used when row is gov, tax or een
      rowKey === "gov" || rowKey === "tax" || rowKey === "een" ? (
        <td className="no-use" key={`${rowKey}4`}></td>
      ) : (
        <td key={`${rowKey}4`}>
          <input
            className="invisible-input"
            type="number"
            value={couValues[rowKey].intermediateUse.gov ?? ""}
            onChange={(e) => {
              handleCouValueChange(
                e.target.value,
                rowKey + ".intermediateUse.gov"
              );
            }}
          />
        </td>
      ),
      <td key={`${rowKey}5`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].intermediateUse.st ?? ""}
          onChange={(e) => {
            handleCouValueChange(
              e.target.value,
              rowKey + ".intermediateUse.st"
            );
          }}
        />
      </td>,
    ];
  };

  const FinalUseRow = (rowKey) => {
    return [
      <td key={`${rowKey}6`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.gcfHomes ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.gcfHomes");
          }}
        />
      </td>,
      // gov gcf is used only when row is gov or totalUses
      rowKey === "gov" || rowKey === "totalUses" ? (
        <td key={`${rowKey}7`}>
          <input
            className="invisible-input"
            type="number"
            value={couValues[rowKey].finalUse.gcfGov ?? ""}
            onChange={(e) => {
              handleCouValueChange(e.target.value, rowKey + ".finalUse.gcfGov");
            }}
          />
        </td>
      ) : (
        <td className="no-use" key={`${rowKey}8`}></td>
      ),
      <td key={`${rowKey}9`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.fbkFbkf ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.fbkFbkf");
          }}
        />
      </td>,
      <td key={`${rowKey}10`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.fbkVe ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.fbkVe");
          }}
        />
      </td>,
      <td key={`${rowKey}11`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.exports ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.exports");
          }}
        />
      </td>,
      <td key={`${rowKey}12`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.st ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.st");
          }}
        />
      </td>,
    ];
  };

  // cells used for second half of the bottom rows in the right side of the table
  const DisabledCellsRow = (rowKey) => {
    return [
      <td className="no-use" key={`${rowKey}6`}></td>,
      <td className="no-use" key={`${rowKey}7`}></td>,
      <td className="no-use" key={`${rowKey}8`}></td>,
      <td className="no-use" key={`${rowKey}9`}></td>,
      <td className="no-use" key={`${rowKey}10`}></td>,
      <td className="no-use" key={`${rowKey}11`}></td>,
      <td className="no-use" key={`${rowKey}12`}></td>,
    ];
  };

  const TotalCell = (rowKey) => {
    return (
      <td key={`${rowKey}13`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].total ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".total");
          }}
        />
      </td>
    );
  };

  const hasContent = (val) => {
    return !_.isNil(val) && val !== "";
  };

  const propsWithoutContent = (obj) => {
    const keys = [];

    for (let key in obj) {
      if (!hasContent(obj[key])) {
        keys.push(key);
      }
    }

    return keys;
  };

  // it's required to surround values with parenthesis for the algebra.js library to work
  // it breaks when the values are negative and they are not surrounded
  const surround = (val) => {
    return "(" + val + ")";
  };

  // given a cell changing its value, then a new loop calculation will be required
  const shouldCompute = (val, path) => {
    let cond = false;

    if (hasContent(val)) {
      cond = val !== _.get(couValues, path);
      // modify value in cou only if it's detected that the value has changed
      if (cond) _.set(couValues, path, val);
    }

    return cond;
  };

  // TODO: for the computing operations, we should unifiy everything using the equations libray (Algebra.js) (should we?)

  const equationIsSolvable = (noValueProps, target) => {
    return noValueProps.length === 1 && noValueProps[0] === target;
  };

  const solveEquation = (leftSide, rightSide) => {
    const expresion = new algebra.Equation(
      algebra.parse(_.toString(leftSide)),
      algebra.parse(_.toString(rightSide))
    );
    const solution = expresion.solveFor("x");
    return solution.numer / solution.denom;
  };

  const computeIntermediateUseSt = (rowKey) => {
    let val = null;

    // compute from intermediate use cells
    if (
      hasContent(couValues[rowKey].intermediateUse.firstBranch) &&
      hasContent(couValues[rowKey].intermediateUse.secondBranch) &&
      hasContent(couValues[rowKey].intermediateUse.thirdBranch) &&
      // gov column cell is only required when the row is not tax or een
      (hasContent(couValues[rowKey].intermediateUse.gov) ||
        rowKey === "tax" ||
        rowKey === "een")
    ) {
      val = _.toString(
        _.toNumber(couValues[rowKey].intermediateUse.firstBranch) +
          _.toNumber(couValues[rowKey].intermediateUse.secondBranch) +
          _.toNumber(couValues[rowKey].intermediateUse.thirdBranch) +
          (rowKey === "tax" || rowKey === "een"
            ? 0
            : _.toNumber(couValues[rowKey].intermediateUse.gov))
      );
    }

    // if no value was computed from the intermediate use cells, then try to compute from the other st cells in the same column
    if (!hasContent(val)) {
      // try to compute from other column st values
      const colEquationFactors = {
        firstBranch: couValues.firstBranch.intermediateUse.st,
        secondBranch: couValues.secondBranch.intermediateUse.st,
        thirdBranch: couValues.thirdBranch.intermediateUse.st,
        imports: couValues.imports.intermediateUse.st,
        totalUses: couValues.totalUses.intermediateUse.st,
      };
      const noValueProps = propsWithoutContent(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (equationIsSolvable(noValueProps, rowKey)) {
        // build equation expression
        const leftSide =
          (noValueProps[0] === "firstBranch"
            ? "x"
            : surround(colEquationFactors.firstBranch)) +
          " + " +
          (noValueProps[0] === "secondBranch"
            ? "x"
            : surround(colEquationFactors.secondBranch)) +
          " + " +
          (noValueProps[0] === "thirdBranch"
            ? "x"
            : surround(colEquationFactors.thirdBranch)) +
          " + " +
          (noValueProps[0] === "imports"
            ? "x"
            : surround(colEquationFactors.imports));
        const rightSide =
          noValueProps[0] === "totalUses" ? "x" : colEquationFactors.totalUses;
        val = solveEquation(leftSide, rightSide);
      }
    }

    // if still no value was computed, then try to compute from the other st and the total
    if (
      !hasContent(val) &&
      [
        "firstBranch",
        "secondBranch",
        "thirdBranch",
        "imports",
        "totalUses",
      ].includes(rowKey)
    ) {
      // compute from the other st and the total
      const stAndTotalEquationFactors = {
        st1: couValues[rowKey].intermediateUse.st,
        st2: couValues[rowKey].finalUse.st,
        total: couValues[rowKey].total,
      };
      const noValueProps = propsWithoutContent(stAndTotalEquationFactors);
      if (equationIsSolvable(noValueProps, "st1")) {
        const leftSide = "x + " + surround(stAndTotalEquationFactors.st2);
        const rightSide = stAndTotalEquationFactors.total;
        val = solveEquation(leftSide, rightSide);
      }
    }

    return shouldCompute(val, rowKey + ".intermediateUse.st");
  };

  const computeIntermediateTotalUse = (columnKey) => {
    let val = null;

    // compute from intermediate use cells
    if (
      hasContent(couValues.firstBranch.intermediateUse[columnKey]) &&
      hasContent(couValues.secondBranch.intermediateUse[columnKey]) &&
      hasContent(couValues.thirdBranch.intermediateUse[columnKey]) &&
      hasContent(couValues.imports.intermediateUse[columnKey])
    ) {
      val = _.toString(
        _.toNumber(couValues.firstBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.secondBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.thirdBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.imports.intermediateUse[columnKey])
      );
    }

    // if no val was computed from the intermediate use cells, then try to compute from VAB and Production
    if (!hasContent(val)) {
      // compute using VAB and Production
      const totalUseEquationFactors = {
        totalUses: couValues.totalUses.intermediateUse[columnKey],
        vab: couValues.vab.intermediateUse[columnKey],
        production: couValues.production.intermediateUse[columnKey],
      };
      const noValueProps = propsWithoutContent(totalUseEquationFactors);
      if (equationIsSolvable(noValueProps, "totalUses")) {
        const leftSide = "x + " + surround(totalUseEquationFactors.vab);
        const rightSide = totalUseEquationFactors.production;
        val = solveEquation(leftSide, rightSide);
      }
    }

    // if still no val was computed, then try to compute from the other row total uses values
    if (!hasContent(val)) {
      // try to compute from other row total use values
      const rowEquationFactors = {
        firstBranch: couValues.totalUses.intermediateUse.firstBranch,
        secondBranch: couValues.totalUses.intermediateUse.secondBranch,
        thirdBranch: couValues.totalUses.intermediateUse.thirdBranch,
        gov: couValues.totalUses.intermediateUse.gov,
        st: couValues.totalUses.intermediateUse.st,
      };
      const noValueProps = propsWithoutContent(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (equationIsSolvable(noValueProps, columnKey)) {
        // build equation expression
        const leftSide =
          (noValueProps[0] === "firstBranch"
            ? "x"
            : surround(rowEquationFactors.firstBranch)) +
          " + " +
          (noValueProps[0] === "secondBranch"
            ? "x"
            : surround(rowEquationFactors.secondBranch)) +
          " + " +
          (noValueProps[0] === "thirdBranch"
            ? "x"
            : surround(rowEquationFactors.thirdBranch)) +
          " + " +
          (noValueProps[0] === "gov" ? "x" : surround(rowEquationFactors.gov));
        const rightSide =
          noValueProps[0] === "st" ? "x" : rowEquationFactors.st;
        // compute
        val = solveEquation(leftSide, rightSide);
      }
    }

    return shouldCompute(val, "totalUses.intermediateUse." + columnKey);
  };

  const computeVab = (columnKey) => {
    let val = null;

    // compute from intermediate use cells
    if (
      hasContent(couValues.ra.intermediateUse[columnKey]) &&
      hasContent(couValues.ckf.intermediateUse[columnKey]) &&
      // gov vab does not require een and tax
      (hasContent(couValues.een.intermediateUse[columnKey]) ||
        columnKey === "gov") &&
      (hasContent(couValues.tax.intermediateUse[columnKey]) ||
        columnKey === "gov")
    ) {
      val = _.toString(
        _.toNumber(couValues.ra.intermediateUse[columnKey]) +
          _.toNumber(couValues.ckf.intermediateUse[columnKey]) +
          (columnKey === "gov"
            ? 0
            : _.toNumber(couValues.een.intermediateUse[columnKey])) +
          (columnKey === "gov"
            ? 0
            : _.toNumber(couValues.tax.intermediateUse[columnKey]))
      );
    }

    // if no val was computed from the intermediate use cells, then try to compute from Total Uses and Production
    if (!hasContent(val)) {
      // compute using column Total Uses and Production
      const totalUseEquationFactors = {
        totalUses: couValues.totalUses.intermediateUse[columnKey],
        vab: couValues.vab.intermediateUse[columnKey],
        production: couValues.production.intermediateUse[columnKey],
      };
      const noValueProps = propsWithoutContent(totalUseEquationFactors);
      if (equationIsSolvable(noValueProps, "vab")) {
        const leftSide = totalUseEquationFactors.totalUses + " + x";
        const rightSide = totalUseEquationFactors.production;
        val = solveEquation(leftSide, rightSide);
      }
    }

    // if still no val was computed, then try to compute from the other row vab values
    if (!hasContent(val)) {
      // try to compute from other row vab values
      const rowEquationFactors = {
        firstBranch: couValues.vab.intermediateUse.firstBranch,
        secondBranch: couValues.vab.intermediateUse.secondBranch,
        thirdBranch: couValues.vab.intermediateUse.thirdBranch,
        gov: couValues.vab.intermediateUse.gov,
        st: couValues.vab.intermediateUse.st,
      };
      const noValueProps = propsWithoutContent(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (equationIsSolvable(noValueProps, columnKey)) {
        // build equation expression
        const leftSide =
          (noValueProps[0] === "firstBranch"
            ? "x"
            : surround(rowEquationFactors.firstBranch)) +
          " + " +
          (noValueProps[0] === "secondBranch"
            ? "x"
            : surround(rowEquationFactors.secondBranch)) +
          " + " +
          (noValueProps[0] === "thirdBranch"
            ? "x"
            : surround(rowEquationFactors.thirdBranch)) +
          " + " +
          (noValueProps[0] === "gov" ? "x" : surround(rowEquationFactors.gov));
        const rightSide =
          noValueProps[0] === "st" ? "x" : rowEquationFactors.st;
        // compute
        val = solveEquation(leftSide, rightSide);
      }
    }

    return shouldCompute(val, "vab.intermediateUse." + columnKey);
  };

  const computeProduction = (columnKey) => {
    let val = null;

    // compute production using vab and total uses (first alternative for computing)
    if (
      hasContent(couValues.vab.intermediateUse[columnKey]) &&
      hasContent(couValues.totalUses.intermediateUse[columnKey])
    ) {
      val = _.toString(
        _.toNumber(couValues.vab.intermediateUse[columnKey]) +
          _.toNumber(couValues.totalUses.intermediateUse[columnKey])
      );
    }

    // if no val was computed from the first alternative, then try to compute from the other row production values
    if (!hasContent(val)) {
      // try to compute from other row total use values
      const rowEquationFactors = {
        firstBranch: couValues.production.intermediateUse.firstBranch,
        secondBranch: couValues.production.intermediateUse.secondBranch,
        thirdBranch: couValues.production.intermediateUse.thirdBranch,
        gov: couValues.production.intermediateUse.gov,
        st: couValues.production.intermediateUse.st,
      };
      const noValueProps = propsWithoutContent(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (equationIsSolvable(noValueProps, columnKey)) {
        // build equation expression
        const leftSide =
          (noValueProps[0] === "firstBranch"
            ? "x"
            : surround(rowEquationFactors.firstBranch)) +
          " + " +
          (noValueProps[0] === "secondBranch"
            ? "x"
            : surround(rowEquationFactors.secondBranch)) +
          " + " +
          (noValueProps[0] === "thirdBranch"
            ? "x"
            : surround(rowEquationFactors.thirdBranch)) +
          " + " +
          (noValueProps[0] === "gov" ? "x" : surround(rowEquationFactors.gov));
        const rightSide =
          noValueProps[0] === "st" ? "x" : rowEquationFactors.st;
        // compute
        val = solveEquation(leftSide, rightSide);
      }
    }

    // if still no val was computed, then copy the value from the final total column (except if the current column is st)
    if (!hasContent(val) && columnKey !== "st") {
      val = couValues[columnKey].total;
    }

    return shouldCompute(val, "production.intermediateUse." + columnKey);
  };

  const computeFinalUseSt = (rowKey) => {
    let val = null;

    // when computing final use gov st, the only value required is the gov gcf
    if (rowKey === "gov") {
      if (hasContent(couValues[rowKey].finalUse.gcfGov)) {
        val = _.toString(couValues[rowKey].finalUse.gcfGov);
      }
    } else if (
      // for the other rows, the values required are gcf homes, fbk fbkf, fbk ve and exports
      // exports are not required for imports row though
      hasContent(couValues[rowKey].finalUse.gcfHomes) &&
      hasContent(couValues[rowKey].finalUse.fbkFbkf) &&
      hasContent(couValues[rowKey].finalUse.fbkVe) &&
      (hasContent(couValues[rowKey].finalUse.exports) || rowKey === "imports")
    ) {
      val = _.toString(
        _.toNumber(couValues[rowKey].finalUse.gcfHomes) +
          _.toNumber(couValues[rowKey].finalUse.fbkFbkf) +
          _.toNumber(couValues[rowKey].finalUse.fbkVe) +
          (rowKey === "imports"
            ? 0
            : _.toNumber(couValues[rowKey].finalUse.exports))
      );
    }

    // if no val was computed from the final use cells, then try to compute from the other st cells in the same column
    if (!hasContent(val)) {
      // try to compute from other column st values
      const colEquationFactors = {
        firstBranch: couValues.firstBranch.finalUse.st,
        secondBranch: couValues.secondBranch.finalUse.st,
        thirdBranch: couValues.thirdBranch.finalUse.st,
        gov: couValues.gov.finalUse.st,
        imports: couValues.imports.finalUse.st,
        totalUses: couValues.totalUses.finalUse.st,
      };
      const noValueProps = propsWithoutContent(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (equationIsSolvable(noValueProps, rowKey)) {
        // build equation expression
        const leftSide =
          (noValueProps[0] === "firstBranch"
            ? "x"
            : surround(colEquationFactors.firstBranch)) +
          " + " +
          (noValueProps[0] === "secondBranch"
            ? "x"
            : surround(colEquationFactors.secondBranch)) +
          " + " +
          (noValueProps[0] === "thirdBranch"
            ? "x"
            : surround(colEquationFactors.thirdBranch)) +
          " + " +
          (noValueProps[0] === "gov" ? "x" : surround(colEquationFactors.gov)) +
          " + " +
          (noValueProps[0] === "imports"
            ? "x"
            : surround(colEquationFactors.imports));
        const rightSide =
          noValueProps[0] === "totalUses" ? "x" : colEquationFactors.totalUses;
        // compute
        val = solveEquation(leftSide, rightSide);
      }
    }

    // if still no val was computed, then try to compute from the other st and the total
    if (!hasContent(val)) {
      // compute from the other st and the total
      const stAndTotalEquationFactors = {
        st1: couValues[rowKey].intermediateUse.st,
        st2: couValues[rowKey].finalUse.st,
        total: couValues[rowKey].total,
      };
      const noValueProps = propsWithoutContent(stAndTotalEquationFactors);
      if (equationIsSolvable(noValueProps, "st2")) {
        const leftSide = stAndTotalEquationFactors.st1 + " + x";
        const rightSide = stAndTotalEquationFactors.total;
        val = solveEquation(leftSide, rightSide);
      }
    }

    return shouldCompute(val, rowKey + ".finalUse.st");
  };

  const computeFinalTotalUse = (columnKey) => {
    let val = null;

    // when column is gcf gov, the only value required is the gov final use column cell
    if (columnKey === "gcfGov") {
      if (hasContent(couValues.gov.finalUse[columnKey])) {
        val = _.toString(couValues.gov.finalUse[columnKey]);
      }
    } else if (
      // for the other final total uses, the values required are gcf homes, fbk fbkf, fbk ve and exports
      // exports are not required for imports row though
      hasContent(couValues.firstBranch.finalUse[columnKey]) &&
      hasContent(couValues.secondBranch.finalUse[columnKey]) &&
      hasContent(couValues.thirdBranch.finalUse[columnKey]) &&
      (hasContent(couValues.imports.finalUse[columnKey]) ||
        columnKey === "exports")
    ) {
      val = _.toString(
        _.toNumber(couValues.firstBranch.finalUse[columnKey]) +
          _.toNumber(couValues.secondBranch.finalUse[columnKey]) +
          _.toNumber(couValues.thirdBranch.finalUse[columnKey]) +
          (columnKey === "exports"
            ? 0
            : _.toNumber(couValues.imports.finalUse[columnKey]))
      );
    }

    // if no val was computed from the final use cells, then try to compute from the other final total uses in the same row
    if (!hasContent(val)) {
      // try to compute from other row total use values
      const rowEquationFactors = {
        gcfHomes: couValues.totalUses.finalUse.gcfHomes,
        gcfGov: couValues.totalUses.finalUse.gcfGov,
        fbkFbkf: couValues.totalUses.finalUse.fbkFbkf,
        fbkVe: couValues.totalUses.finalUse.fbkVe,
        exports: couValues.totalUses.finalUse.exports,
        st: couValues.totalUses.finalUse.st,
      };
      const noValueProps = propsWithoutContent(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (equationIsSolvable(noValueProps, columnKey)) {
        // build equation expression
        const leftSide =
          (noValueProps[0] === "gcfHomes"
            ? "x"
            : surround(rowEquationFactors.gcfHomes)) +
          " + " +
          (noValueProps[0] === "gcfGov"
            ? "x"
            : surround(rowEquationFactors.gcfGov)) +
          " + " +
          (noValueProps[0] === "fbkFbkf"
            ? "x"
            : surround(rowEquationFactors.fbkFbkf)) +
          " + " +
          (noValueProps[0] === "fbkVe"
            ? "x"
            : surround(rowEquationFactors.fbkVe)) +
          " + " +
          (noValueProps[0] === "exports"
            ? "x"
            : surround(rowEquationFactors.exports));
        const rightSide =
          noValueProps[0] === "st" ? "x" : rowEquationFactors.st;
        // compute
        val = solveEquation(leftSide, rightSide);
      }
    }

    return shouldCompute(val, "totalUses.finalUse." + columnKey);
  };

  const computeTotal = (rowKey) => {
    let val = null;

    // compute from intermediate use st and final use str
    // when row is gov, the only value required is the final use st
    if (
      (hasContent(couValues[rowKey].intermediateUse.st) || rowKey === "gov") &&
      hasContent(couValues[rowKey].finalUse.st)
    ) {
      val = _.toString(
        (rowKey === "gov"
          ? 0
          : _.toNumber(couValues[rowKey].intermediateUse.st)) +
          _.toNumber(couValues[rowKey].finalUse.st)
      );
    }

    // if no val was computed from the intermediate use st and final use st, then copy values from Production row
    if (!hasContent(val)) {
      if (rowKey !== "imports" && rowKey !== "totalUses") {
        val = couValues.production.intermediateUse[rowKey];
      }
    }

    // if no val was computed from the intermediate use st and final use st, then try to compute from the other totals in the same column
    if (!hasContent(val)) {
      // try to compute from other column total values
      const colEquationFactors = {
        firstBranch: couValues.firstBranch.total,
        secondBranch: couValues.secondBranch.total,
        thirdBranch: couValues.thirdBranch.total,
        gov: couValues.gov.total,
        imports: couValues.imports.total,
        totalUses: couValues.totalUses.total,
      };
      const noValueProps = propsWithoutContent(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (equationIsSolvable(noValueProps, rowKey)) {
        // build equation expression
        const leftSide =
          (noValueProps[0] === "firstBranch"
            ? "x"
            : surround(colEquationFactors.firstBranch)) +
          " + " +
          (noValueProps[0] === "secondBranch"
            ? "x"
            : surround(colEquationFactors.secondBranch)) +
          " + " +
          (noValueProps[0] === "thirdBranch"
            ? "x"
            : surround(colEquationFactors.thirdBranch)) +
          " + " +
          (noValueProps[0] === "gov" ? "x" : surround(colEquationFactors.gov)) +
          " + " +
          (noValueProps[0] === "imports"
            ? "x"
            : surround(colEquationFactors.imports));
        const rightSide =
          noValueProps[0] === "totalUses" ? "x" : colEquationFactors.totalUses;
        // compute
        val = solveEquation(leftSide, rightSide);
      }
    }

    return shouldCompute(val, rowKey + ".total");
  };

  const generateTopHalfInnerCellsEquationsForRowCalculation = (rowPrefix) => {
    let equations = {
      [rowPrefix + ".intermediateUse.firstBranch"]: [
        "x",
        "+",
        rowPrefix + ".intermediateUse.secondBranch",
        "+",
        rowPrefix + ".intermediateUse.thirdBranch",
        "+",
        rowPrefix + ".intermediateUse.gov",
        "=",
        rowPrefix + ".intermediateUse.st",
      ],
      [rowPrefix + ".intermediateUse.secondBranch"]: [
        rowPrefix + ".intermediateUse.firstBranch",
        "+",
        "x",
        "+",
        rowPrefix + ".intermediateUse.thirdBranch",
        "+",
        rowPrefix + ".intermediateUse.gov",
        "=",
        rowPrefix + ".intermediateUse.st",
      ],
      [rowPrefix + ".intermediateUse.thirdBranch"]: [
        rowPrefix + ".intermediateUse.firstBranch",
        "+",
        rowPrefix + ".intermediateUse.secondBranch",
        "+",
        "x",
        "+",
        rowPrefix + ".intermediateUse.gov",
        "=",
        rowPrefix + ".intermediateUse.st",
      ],
      [rowPrefix + ".intermediateUse.gov"]: [
        rowPrefix + ".intermediateUse.firstBranch",
        "+",
        rowPrefix + ".intermediateUse.secondBranch",
        "+",
        rowPrefix + ".intermediateUse.thirdBranch",
        "+",
        "x",
        "=",
        rowPrefix + ".intermediateUse.st",
      ],
    };

    if (rowPrefix === "totalUses") {
      equations = {
        ...equations,
        ...{
          [rowPrefix + ".finalUse.gcfHomes"]: [
            "x",
            "+",
            rowPrefix + ".finalUse.gcfGov",
            "+",
            rowPrefix + ".finalUse.fbkFbkf",
            "+",
            rowPrefix + ".finalUse.fbkVe",
            "+",
            rowPrefix + ".finalUse.exports",
            "=",
            rowPrefix + ".finalUse.st",
          ],
          [rowPrefix + ".finalUse.gcfGov"]: [
            rowPrefix + ".finalUse.gcfHomes",
            "+",
            "x",
            "+",
            rowPrefix + ".finalUse.fbkFbkf",
            "+",
            rowPrefix + ".finalUse.fbkVe",
            "+",
            rowPrefix + ".finalUse.exports",
            "=",
            rowPrefix + ".finalUse.st",
          ],
          [rowPrefix + ".finalUse.fbkFbkf"]: [
            rowPrefix + ".finalUse.gcfHomes",
            "+",
            rowPrefix + ".finalUse.gcfGov",
            "+",
            "x",
            "+",
            rowPrefix + ".finalUse.fbkVe",
            "+",
            rowPrefix + ".finalUse.exports",
            "=",
            rowPrefix + ".finalUse.st",
          ],
          [rowPrefix + ".finalUse.fbkVe"]: [
            rowPrefix + ".finalUse.gcfHomes",
            "+",
            rowPrefix + ".finalUse.gcfGov",
            "+",
            rowPrefix + ".finalUse.fbkFbkf",
            "+",
            "x",
            "+",
            rowPrefix + ".finalUse.exports",
            "=",
            rowPrefix + ".finalUse.st",
          ],
          [rowPrefix + ".finalUse.exports"]: [
            rowPrefix + ".finalUse.gcfHomes",
            "+",
            rowPrefix + ".finalUse.gcfGov",
            "+",
            rowPrefix + ".finalUse.fbkFbkf",
            "+",
            rowPrefix + ".finalUse.fbkVe",
            "+",
            "x",
            "=",
            rowPrefix + ".finalUse.st",
          ],
        },
      };
    } else {
      equations = {
        ...equations,
        ...{
          [rowPrefix + ".finalUse.gcfHomes"]: [
            "x",
            "+",
            rowPrefix + ".finalUse.fbkFbkf",
            "+",
            rowPrefix + ".finalUse.fbkVe",
            "+",
            rowPrefix + ".finalUse.exports",
            "=",
            rowPrefix + ".finalUse.st",
          ],
          [rowPrefix + ".finalUse.fbkFbkf"]: [
            rowPrefix + ".finalUse.gcfHomes",
            "+",
            "x",
            "+",
            rowPrefix + ".finalUse.fbkVe",
            "+",
            rowPrefix + ".finalUse.exports",
            "=",
            rowPrefix + ".finalUse.st",
          ],
          [rowPrefix + ".finalUse.fbkVe"]: [
            rowPrefix + ".finalUse.gcfHomes",
            "+",
            rowPrefix + ".finalUse.fbkFbkf",
            "+",
            "x",
            "+",
            rowPrefix + ".finalUse.exports",
            "=",
            rowPrefix + ".finalUse.st",
          ],
        },
      };

      if (rowPrefix !== "imports") {
        equations[rowPrefix + ".finalUse.exports"] = [
          rowPrefix + ".finalUse.gcfHomes",
          "+",
          rowPrefix + ".finalUse.fbkFbkf",
          "+",
          rowPrefix + ".finalUse.fbkVe",
          "+",
          "x",
          "=",
          rowPrefix + ".finalUse.st",
        ];
      }
    }

    return equations;
  };

  const generateBottomHalfInnerCellsEquationsForRowCalculation = (
    rowPrefix
  ) => {
    let equations = {};

    if (rowPrefix === "ra" || rowPrefix === "ckf") {
      equations = {
        [rowPrefix + ".intermediateUse.firstBranch"]: [
          "x",
          "+",
          rowPrefix + ".intermediateUse.secondBranch",
          "+",
          rowPrefix + ".intermediateUse.thirdBranch",
          "+",
          rowPrefix + ".intermediateUse.gov",
          "=",
          rowPrefix + ".intermediateUse.st",
        ],
        [rowPrefix + ".intermediateUse.secondBranch"]: [
          rowPrefix + ".intermediateUse.firstBranch",
          "+",
          "x",
          "+",
          rowPrefix + ".intermediateUse.thirdBranch",
          "+",
          rowPrefix + ".intermediateUse.gov",
          "=",
          rowPrefix + ".intermediateUse.st",
        ],
        [rowPrefix + ".intermediateUse.thirdBranch"]: [
          rowPrefix + ".intermediateUse.firstBranch",
          "+",
          rowPrefix + ".intermediateUse.secondBranch",
          "+",
          "x",
          "+",
          rowPrefix + ".intermediateUse.gov",
          "=",
          rowPrefix + ".intermediateUse.st",
        ],
        [rowPrefix + ".intermediateUse.gov"]: [
          rowPrefix + ".intermediateUse.firstBranch",
          "+",
          rowPrefix + ".intermediateUse.secondBranch",
          "+",
          rowPrefix + ".intermediateUse.thirdBranch",
          "+",
          "x",
          "=",
          rowPrefix + ".intermediateUse.st",
        ],
      };
    } else {
      equations = {
        [rowPrefix + ".intermediateUse.firstBranch"]: [
          "x",
          "+",
          rowPrefix + ".intermediateUse.secondBranch",
          "+",
          rowPrefix + ".intermediateUse.thirdBranch",
          "=",
          rowPrefix + ".intermediateUse.st",
        ],
        [rowPrefix + ".intermediateUse.secondBranch"]: [
          rowPrefix + ".intermediateUse.firstBranch",
          "+",
          "x",
          "+",
          rowPrefix + ".intermediateUse.thirdBranch",
          "=",
          rowPrefix + ".intermediateUse.st",
        ],
        [rowPrefix + ".intermediateUse.thirdBranch"]: [
          rowPrefix + ".intermediateUse.firstBranch",
          "+",
          rowPrefix + ".intermediateUse.secondBranch",
          "+",
          "x",
          "=",
          rowPrefix + ".intermediateUse.st",
        ],
      };
    }

    return equations;
  };

  const generateTopHalfInnerCellsEquationsForColumnCalculation = (
    columnSuffix
  ) => {
    const topSide = [
      "firstBranch",
      "secondBranch",
      "thirdBranch",
      "gov",
    ].includes(columnSuffix)
      ? "intermediateUse"
      : "finalUse";

    return {
      ["firstBranch." + topSide + "." + columnSuffix]: [
        "x",
        "+",
        "secondBranch." + topSide + "." + columnSuffix,
        "+",
        "thirdBranch." + topSide + "." + columnSuffix,
        "+",
        "imports." + topSide + "." + columnSuffix,
        "=",
        "totalUses." + topSide + "." + columnSuffix,
      ],
      ["secondBranch." + topSide + "." + columnSuffix]: [
        "firstBranch." + topSide + "." + columnSuffix,
        "+",
        "x",
        "+",
        "thirdBranch." + topSide + "." + columnSuffix,
        "+",
        "imports." + topSide + "." + columnSuffix,
        "=",
        "totalUses." + topSide + "." + columnSuffix,
      ],
      ["thirdBranch." + topSide + "." + columnSuffix]: [
        "firstBranch." + topSide + "." + columnSuffix,
        "+",
        "secondBranch." + topSide + "." + columnSuffix,
        "+",
        "x",
        "+",
        "imports." + topSide + "." + columnSuffix,
        "=",
        "totalUses." + topSide + "." + columnSuffix,
      ],
      ["imports." + topSide + "." + columnSuffix]: [
        "firstBranch." + topSide + "." + columnSuffix,
        "+",
        "secondBranch." + topSide + "." + columnSuffix,
        "+",
        "thirdBranch." + topSide + "." + columnSuffix,
        "+",
        "x",
        "=",
        "totalUses." + topSide + "." + columnSuffix,
      ],
    };
  };

  const generateBottomHalfInnerCellsEquationsForColumnCalculation = (
    columnSuffix
  ) => {
    if (columnSuffix === "gov") {
      return {
        ["ra.intermediateUse." + columnSuffix]: [
          "x",
          "+",
          "ckf.intermediateUse." + columnSuffix,
          "=",
          "vab.intermediateUse." + columnSuffix,
        ],
        ["ckf.intermediateUse." + columnSuffix]: [
          "ra.intermediateUse." + columnSuffix,
          "+",
          "x",
          "=",
          "vab.intermediateUse." + columnSuffix,
        ],
      };
    } else {
      return {
        ["ra.intermediateUse." + columnSuffix]: [
          "x",
          "+",
          "ckf.intermediateUse." + columnSuffix,
          "+",
          "tax.intermediateUse." + columnSuffix,
          "+",
          "een.intermediateUse." + columnSuffix,
          "=",
          "vab.intermediateUse." + columnSuffix,
        ],
        ["ckf.intermediateUse." + columnSuffix]: [
          "ra.intermediateUse." + columnSuffix,
          "+",
          "x",
          "+",
          "tax.intermediateUse." + columnSuffix,
          "+",
          "een.intermediateUse." + columnSuffix,
          "=",
          "vab.intermediateUse." + columnSuffix,
        ],
        ["tax.intermediateUse." + columnSuffix]: [
          "ra.intermediateUse." + columnSuffix,
          "+",
          "ckf.intermediateUse." + columnSuffix,
          "+",
          "x",
          "+",
          "een.intermediateUse." + columnSuffix,
          "=",
          "vab.intermediateUse." + columnSuffix,
        ],
        ["een.intermediateUse." + columnSuffix]: [
          "ra.intermediateUse." + columnSuffix,
          "+",
          "ckf.intermediateUse." + columnSuffix,
          "+",
          "tax.intermediateUse." + columnSuffix,
          "+",
          "x",
          "=",
          "vab.intermediateUse." + columnSuffix,
        ],
      };
    }
  };

  const processEquations = (equations) => {
    let hasComputed = false;

    Object.keys(equations).forEach((targetCell) => {
      const equationElements = equations[targetCell];
      let leftSide = "";
      let rightSide = "";
      let requiredValuesAmount = 0;
      let definedValuesAmount = 0;
      let switchToRightSide = false;

      equationElements.forEach((element) => {
        let content;
        switch (element) {
          case "x":
            content = element;
            requiredValuesAmount++;
            break;
          case "+":
            content = element;
            break;
          case "=":
            switchToRightSide = true;
            break;
          default:
            let val = _.get(couValues, element);
            if (!_.isNil(val) && val !== "") {
              definedValuesAmount++;
              content = surround(_.toString(val));
            }
            requiredValuesAmount++;
        }

        if (!_.isNil(content) && content !== "") {
          if (switchToRightSide) {
            rightSide += content;
          } else {
            leftSide += content;
          }
        }
      });

      if (requiredValuesAmount === definedValuesAmount + 1) {
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        const val = solution.numer / solution.denom;
        hasComputed = shouldCompute(val, targetCell);
      }
    });

    return hasComputed;
  };

  const computeInnerCells = () => {
    // run row-based calculations
    let hasComputed = processEquations({
      ...generateTopHalfInnerCellsEquationsForRowCalculation("firstBranch"),
      ...generateTopHalfInnerCellsEquationsForRowCalculation("secondBranch"),
      ...generateTopHalfInnerCellsEquationsForRowCalculation("thirdBranch"),
      ...generateTopHalfInnerCellsEquationsForRowCalculation("imports"),
      ...generateTopHalfInnerCellsEquationsForRowCalculation("totalUses"),
      ...generateBottomHalfInnerCellsEquationsForRowCalculation("ra"),
      ...generateBottomHalfInnerCellsEquationsForRowCalculation("ckf"),
      ...generateBottomHalfInnerCellsEquationsForRowCalculation("tax"),
      ...generateBottomHalfInnerCellsEquationsForRowCalculation("een"),
    });

    // run column-based calculations
    hasComputed =
      processEquations({
        ...generateTopHalfInnerCellsEquationsForColumnCalculation(
          "firstBranch"
        ),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation(
          "secondBranch"
        ),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation(
          "thirdBranch"
        ),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("gov"),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("gcfHomes"),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("fbkFbkf"),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("fbkVe"),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("exports"),
        ...generateBottomHalfInnerCellsEquationsForColumnCalculation(
          "firstBranch"
        ),
        ...generateBottomHalfInnerCellsEquationsForColumnCalculation(
          "secondBranch"
        ),
        ...generateBottomHalfInnerCellsEquationsForColumnCalculation(
          "thirdBranch"
        ),
        ...generateBottomHalfInnerCellsEquationsForColumnCalculation("gov"),
      }) || hasComputed;

    // assign value gcf of government if required
    if (
      (_.isNil(couValues.gov.finalUse.gcfGov) ||
        couValues.gov.finalUse.gcfGov === "") &&
      ((!_.isNil(couValues.gov.finalUse.st) &&
        couValues.gov.finalUse.st !== "") ||
        (!_.isNil(couValues.gov.total) && couValues.gov.total !== ""))
    ) {
      const val =
        _.isNil(couValues.gov.finalUse.st) || couValues.gov.finalUse.st === ""
          ? couValues.gov.total
          : couValues.gov.finalUse.st;
      hasComputed = shouldCompute(val, "gov.finalUse.gcfGov");
    }

    return hasComputed;
  };

  const compute = () => {
    let keepComputing = true;
    // we put a limit to the number of iterations as continous calculations
    // sometimes lead to contradictory values which causes infinite looping
    // the app is still not good enough for detecting which values are causing the contradiction
    // so we just use a limit, this (TODO) should be fixed in future versions
    let maxAmountOfIterations = 1000;

    while (keepComputing) {
      keepComputing =
        // Intermediate Use ST
        computeIntermediateUseSt("firstBranch") ||
        computeIntermediateUseSt("secondBranch") ||
        computeIntermediateUseSt("thirdBranch") ||
        computeIntermediateUseSt("imports") ||
        computeIntermediateUseSt("totalUses") ||
        computeIntermediateUseSt("ra") ||
        computeIntermediateUseSt("ckf") ||
        computeIntermediateUseSt("tax") ||
        computeIntermediateUseSt("een") ||
        computeIntermediateUseSt("vab") ||
        computeIntermediateUseSt("production") ||
        // Intermediate Use Total Use
        computeIntermediateTotalUse("firstBranch") ||
        computeIntermediateTotalUse("secondBranch") ||
        computeIntermediateTotalUse("thirdBranch") ||
        computeIntermediateTotalUse("gov") ||
        computeIntermediateTotalUse("st") ||
        // VAB
        computeVab("firstBranch") ||
        computeVab("secondBranch") ||
        computeVab("thirdBranch") ||
        computeVab("gov") ||
        computeVab("st") ||
        // Production
        computeProduction("firstBranch") ||
        computeProduction("secondBranch") ||
        computeProduction("thirdBranch") ||
        computeProduction("gov") ||
        computeProduction("st") ||
        // Final Use ST
        computeFinalUseSt("firstBranch") ||
        computeFinalUseSt("secondBranch") ||
        computeFinalUseSt("thirdBranch") ||
        computeFinalUseSt("gov") ||
        computeFinalUseSt("imports") ||
        computeFinalUseSt("totalUses") ||
        // Final Use Total Use
        computeFinalTotalUse("gcfHomes") ||
        computeFinalTotalUse("gcfGov") ||
        computeFinalTotalUse("fbkFbkf") ||
        computeFinalTotalUse("fbkVe") ||
        computeFinalTotalUse("exports") ||
        computeFinalTotalUse("st") ||
        // Total
        computeTotal("firstBranch") ||
        computeTotal("secondBranch") ||
        computeTotal("thirdBranch") ||
        computeTotal("gov") ||
        computeTotal("imports") ||
        computeTotal("totalUses") ||
        computeInnerCells();

      maxAmountOfIterations--;
      if (maxAmountOfIterations === 0) {
        keepComputing = false;
      }
    }

    if (maxAmountOfIterations === 0) {
      alert(
        "¡No se pudo calcular el COU! Hay valores contradictorios. Revise."
      );
    }

    saveCouValues(couValues);
  };

  const empty = () => {
    saveCouValues(emptyCou);
  };

  useEffect(() => {
    // third branch dependent values
    let val = useThirdBranch ? "" : "0";
    couValues.thirdBranch.intermediateUse.firstBranch = val;
    couValues.thirdBranch.intermediateUse.secondBranch = val;
    couValues.thirdBranch.intermediateUse.thirdBranch = val;
    couValues.thirdBranch.intermediateUse.gov =
      useThirdBranch && useGov ? "" : 0;
    couValues.thirdBranch.intermediateUse.st = val;
    couValues.thirdBranch.finalUse.gcfHomes = val;
    couValues.thirdBranch.finalUse.fbkFbkf = val;
    couValues.thirdBranch.finalUse.fbkVe = val;
    couValues.thirdBranch.finalUse.exports = val;
    couValues.thirdBranch.finalUse.st = val;
    couValues.thirdBranch.total = val;
    couValues.firstBranch.intermediateUse.thirdBranch = val;
    couValues.secondBranch.intermediateUse.thirdBranch = val;
    couValues.gov.intermediateUse.thirdBranch =
      useThirdBranch && useGov ? "" : 0;
    couValues.imports.intermediateUse.thirdBranch = val;
    couValues.totalUses.intermediateUse.thirdBranch = val;
    couValues.ra.intermediateUse.thirdBranch = val;
    couValues.ckf.intermediateUse.thirdBranch = val;
    couValues.tax.intermediateUse.thirdBranch =
      useThirdBranch && useGov ? "" : 0;
    couValues.een.intermediateUse.thirdBranch = val;
    couValues.vab.intermediateUse.thirdBranch = val;
    couValues.production.intermediateUse.thirdBranch = val;

    // gov dependent values
    val = useGov ? "" : "0";
    couValues.gov.finalUse.gcfGov = val;
    couValues.gov.finalUse.st = val;
    couValues.gov.total = val;
    couValues.totalUses.finalUse.gcfGov = val;
    couValues.firstBranch.intermediateUse.gov = val;
    couValues.secondBranch.intermediateUse.gov = val;
    couValues.thirdBranch.intermediateUse.gov =
      useThirdBranch && useGov ? "" : 0;
    couValues.imports.intermediateUse.gov = val;
    couValues.totalUses.intermediateUse.gov = val;
    couValues.ra.intermediateUse.gov = val;
    couValues.ckf.intermediateUse.gov = val;

    couValues.tax.intermediateUse.firstBranch = val;
    couValues.tax.intermediateUse.secondBranch = val;
    couValues.tax.intermediateUse.thirdBranch =
      useThirdBranch && useGov ? "" : 0;
    couValues.tax.intermediateUse.st = val;

    couValues.vab.intermediateUse.gov = val;
    couValues.production.intermediateUse.gov = val;

    saveCouValues(couValues);
    appValues.useGov = useGov;
    appValues.useThirdBranch = useThirdBranch;
    setAppValues(_.cloneDeep(appValues));

    // following es lint rule is put there for disabling warning for not placing couValues as dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useThirdBranch, useGov]);

  return (
    <div>
      <Button variant="primary" onClick={compute}>
        Calcular
      </Button>
      &nbsp;
      <Button variant="danger" onClick={empty}>
        Vaciar
      </Button>
      &nbsp;
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={(e) => setUseThirdBranch(e.target.checked)}
          checked={useThirdBranch}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Usar Rama 3
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={(e) => setUseGov(e.target.checked)}
          checked={useGov}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Usar Gobierno
        </label>
      </div>
      <Table
        striped
        bordered
        hover
        className="text-center align-middle mt-3 custom-table"
      >
        <thead>
          <tr>
            <th rowSpan={3}></th>
            <th colSpan={5} rowSpan={2}>
              UTILIZACION INTERMEDIA
            </th>
            <th colSpan={6}>UTILIZACION FINAL</th>
            <th rowSpan={3}>Total</th>
          </tr>
          <tr>
            <th colSpan={2}>GCF</th>
            <th colSpan={2}>FBK</th>
            <th rowSpan={2}>Exportaciones</th>
            <th rowSpan={2}>ST</th>
          </tr>
          <tr>
            <th>
              <input
                className="invisible-input"
                type="text"
                value={firstBranchName}
                onChange={(e) => setFirstBranchName(e.target.value)}
              />
            </th>
            <th>
              <input
                className="invisible-input"
                type="text"
                value={secondBranchName}
                onChange={(e) => setSecondBranchName(e.target.value)}
              />
            </th>
            <th>
              <input
                className="invisible-input"
                type="text"
                value={thirdBranchName}
                onChange={(e) => setThirdBranchName(e.target.value)}
              />
            </th>
            <th>Serv. Gob</th>
            <th>ST</th>
            <th>Hogares</th>
            <th>Gob.</th>
            <th>FBKF</th>
            <th>VE</th>
          </tr>
        </thead>
        <tbody>
          {/* First Branch Row */}
          <tr>
            <td>
              <input
                className="invisible-input"
                type="text"
                value={firstBranchName}
                onChange={(e) => setFirstBranchName(e.target.value)}
              />
            </td>
            {IntermediateUseRow("firstBranch")}
            {FinalUseRow("firstBranch")}
            {TotalCell("firstBranch")}
          </tr>

          {/* Second Branch Row */}
          <tr>
            <td>
              <input
                className="invisible-input"
                type="text"
                value={secondBranchName}
                onChange={(e) => setSecondBranchName(e.target.value)}
              />
            </td>
            {IntermediateUseRow("secondBranch")}
            {FinalUseRow("secondBranch")}
            {TotalCell("secondBranch")}
          </tr>

          {/* Third Branch Row */}
          <tr>
            <td>
              <input
                className="invisible-input"
                type="text"
                value={thirdBranchName}
                onChange={(e) => setThirdBranchName(e.target.value)}
              />
            </td>
            {IntermediateUseRow("thirdBranch")}
            {FinalUseRow("thirdBranch")}
            {TotalCell("thirdBranch")}
          </tr>

          {/* Serv. Gob */}
          <tr>
            <td>
              <strong>Serv. Gob.</strong>
            </td>
            <td className="no-use"></td>
            <td className="no-use"></td>
            <td className="no-use"></td>
            <td className="no-use"></td>
            <td className="no-use"></td>
            <td className="no-use"></td>
            <td>
              <input
                className="invisible-input"
                type="number"
                value={couValues.gov.finalUse.gcfGov ?? ""}
                onChange={(e) => {
                  handleCouValueChange(e.target.value, "gov.finalUse.gcfGov");
                }}
              />
            </td>
            <td className="no-use"></td>
            <td className="no-use"></td>
            <td className="no-use"></td>
            <td>
              <input
                className="invisible-input"
                type="number"
                value={couValues.gov.finalUse.st ?? ""}
                onChange={(e) => {
                  handleCouValueChange(e.target.value, "gov.finalUse.st");
                }}
              />
            </td>
            <td>
              <input
                className="invisible-input"
                type="number"
                value={couValues.gov.total ?? ""}
                onChange={(e) => {
                  handleCouValueChange(e.target.value, "gov.total");
                }}
              />
            </td>
          </tr>

          {/* Imports Row */}
          <tr>
            <td>
              <strong>Import.</strong>
            </td>
            {IntermediateUseRow("imports")}
            {FinalUseRow("imports")}
            {TotalCell("imports")}
          </tr>

          {/* Total Uses Row */}
          <tr>
            <td>
              <strong>Usos Totales</strong>
            </td>
            {IntermediateUseRow("totalUses")}
            {FinalUseRow("totalUses")}
            {TotalCell("totalUses")}
          </tr>

          {/* RA Row */}
          <tr>
            <td>
              <strong>RA</strong>
            </td>
            {IntermediateUseRow("ra")}
            {DisabledCellsRow("ra")}
          </tr>

          {/* CKF Row */}
          <tr>
            <td>
              <strong>CKF</strong>
            </td>
            {IntermediateUseRow("ckf")}
            {DisabledCellsRow("ckf")}
          </tr>

          {/* Imp-S Row */}
          <tr>
            <td>
              <strong>Imp-S</strong>
            </td>
            {IntermediateUseRow("tax")}
            {DisabledCellsRow("tax")}
          </tr>

          {/* EEN Row */}
          <tr>
            <td>
              <strong>EEN</strong>
            </td>
            {IntermediateUseRow("een")}
            {DisabledCellsRow("een")}
          </tr>

          {/* VAB Row */}
          <tr>
            <td>
              <strong>VAB</strong>
            </td>
            {IntermediateUseRow("vab")}
            {DisabledCellsRow("vab")}
          </tr>

          {/* Production Row */}
          <tr>
            <td>
              <strong>Producción</strong>
            </td>
            {IntermediateUseRow("production")}
            {DisabledCellsRow("production")}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Cou;
