import "./App.css";
import _ from "lodash";
import algebra from "algebra.js";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

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

const App = () => {
  const [firstBranchName, setFirstBranchName] = useState("Rama 1");
  const [secondBranchName, setSecondBranchName] = useState("Rama 2");
  const [thirdBranchName, setThirdBranchName] = useState("Rama 3");
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
  let storedCouValues = localStorage.getItem("couApp_cou");
  if (storedCouValues) {
    storedCouValues = JSON.parse(storedCouValues);
  }
  const [couValues, setCouValues] = useState(
    _.cloneDeep(storedCouValues || emptyCou)
  );

  // save in the internal component variable and the browser local storage so the user
  // can still access the values after refreshing/reopening the web app
  const saveCouValues = (content) => {
    setCouValues(_.cloneDeep(content));
    localStorage.setItem("couApp_cou", JSON.stringify(content));
  };

  const handleCouValueChange = (value, cellKey) => {
    _.set(couValues, cellKey, value);
    saveCouValues(couValues);
  };

  const IntermediateUseRow = (rowKey) => {
    return [
      <td>
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
      <td>
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
      <td>
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
      rowKey === "gov" || rowKey === "tax" || rowKey === "een" ? (
        <td className="no-use"></td>
      ) : (
        <td>
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
      <td>
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
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.gcfHomes ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.gcfHomes");
          }}
        />
      </td>,
      rowKey === "gov" || rowKey === "totalUses" ? (
        <td>
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
        <td className="no-use"></td>
      ),
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.fbkFbkf ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.fbkFbkf");
          }}
        />
      </td>,
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.fbkVe ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.fbkVe");
          }}
        />
      </td>,
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.exports ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.exports");
          }}
        />
      </td>,
      <td>
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

  const DisabledCellsRow = () => {
    return [
      <td className="no-use"></td>,
      <td className="no-use"></td>,
      <td className="no-use"></td>,
      <td className="no-use"></td>,
      <td className="no-use"></td>,
      <td className="no-use"></td>,
      <td className="no-use"></td>,
    ];
  };

  const TotalCell = (rowKey) => {
    return (
      <td>
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

  const nilAndEmptyProps = (obj) => {
    const keys = [];

    for (let key in obj) {
      if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
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

  const shouldCompute = (val, path) => {
    let cond = false;

    if (!_.isNil(val)) {
      cond = val !== _.get(couValues, path);
      if (cond) _.set(couValues, path, val);
    }

    return cond;
  };

  // TODO: for the computing operations, we should unifiy everything using the equations libray (Algebra.js) (should we?)

  const computeIntermediateUseSt = (rowKey) => {
    let val = null;

    // compute from intermediate cells
    if (
      couValues[rowKey].intermediateUse.firstBranch &&
      couValues[rowKey].intermediateUse.secondBranch &&
      couValues[rowKey].intermediateUse.thirdBranch &&
      couValues[rowKey].intermediateUse.gov
    ) {
      val = _.toString(
        _.toNumber(couValues[rowKey].intermediateUse.firstBranch) +
          _.toNumber(couValues[rowKey].intermediateUse.secondBranch) +
          _.toNumber(couValues[rowKey].intermediateUse.thirdBranch) +
          _.toNumber(couValues[rowKey].intermediateUse.gov)
      );
    }

    if (_.isNil(val) || val === "") {
      // try to compute from other column st values
      const colEquationFactors = {
        firstBranch: couValues.firstBranch.intermediateUse.st,
        secondBranch: couValues.secondBranch.intermediateUse.st,
        thirdBranch: couValues.thirdBranch.intermediateUse.st,
        imports: couValues.imports.intermediateUse.st,
        totalUses: couValues.totalUses.intermediateUse.st,
      };
      const noValueProps = nilAndEmptyProps(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (noValueProps.length === 1 && noValueProps[0] === rowKey) {
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
        // compute
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    if (
      (_.isNil(val) || val === "") &&
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
      const noValueProps = nilAndEmptyProps(stAndTotalEquationFactors);
      if (noValueProps.length === 1 && noValueProps[0] === "st1") {
        const leftSide = "x + " + surround(stAndTotalEquationFactors.st2);
        const rightSide = stAndTotalEquationFactors.total;
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    return shouldCompute(val, rowKey + ".intermediateUse.st");
  };

  const computeIntermediateTotalUse = (columnKey) => {
    let val = null;

    if (
      couValues.firstBranch.intermediateUse[columnKey] &&
      couValues.secondBranch.intermediateUse[columnKey] &&
      couValues.thirdBranch.intermediateUse[columnKey] &&
      couValues.imports.intermediateUse[columnKey]
    ) {
      val = _.toString(
        _.toNumber(couValues.firstBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.secondBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.thirdBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.imports.intermediateUse[columnKey])
      );
    }

    if (_.isNil(val) || val === "") {
      // compute using VAB and Production
      const totalUseEquationFactors = {
        totalUses: couValues.totalUses.intermediateUse[columnKey],
        vab: couValues.vab.intermediateUse[columnKey],
        production: couValues.production.intermediateUse[columnKey],
      };
      const noValueProps = nilAndEmptyProps(totalUseEquationFactors);
      if (noValueProps.length === 1 && noValueProps[0] === "totalUses") {
        const leftSide = "x + " + surround(totalUseEquationFactors.vab);
        const rightSide = totalUseEquationFactors.production;
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    if (_.isNil(val) || val === "") {
      // try to compute from other row total use values
      const rowEquationFactors = {
        firstBranch: couValues.totalUses.intermediateUse.firstBranch,
        secondBranch: couValues.totalUses.intermediateUse.secondBranch,
        thirdBranch: couValues.totalUses.intermediateUse.thirdBranch,
        gov: couValues.totalUses.intermediateUse.gov,
        st: couValues.totalUses.intermediateUse.st,
      };
      const noValueProps = nilAndEmptyProps(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (noValueProps.length === 1 && noValueProps[0] === columnKey) {
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
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    return shouldCompute(val, "totalUses.intermediateUse." + columnKey);
  };

  const computeVab = (columnKey) => {
    let val = null;

    if (
      couValues.ra.intermediateUse[columnKey] &&
      couValues.ckf.intermediateUse[columnKey] &&
      couValues.een.intermediateUse[columnKey]
    ) {
      val = _.toString(
        _.toNumber(couValues.ra.intermediateUse[columnKey]) +
          _.toNumber(couValues.ckf.intermediateUse[columnKey]) +
          _.toNumber(couValues.een.intermediateUse[columnKey])
      );
    }

    if (_.isNil(val) || val === "") {
      // compute using column Total Uses and Production
      const totalUseEquationFactors = {
        totalUses: couValues.totalUses.intermediateUse[columnKey],
        vab: couValues.vab.intermediateUse[columnKey],
        production: couValues.production.intermediateUse[columnKey],
      };
      const noValueProps = nilAndEmptyProps(totalUseEquationFactors);
      if (noValueProps.length === 1 && noValueProps[0] === "vab") {
        const leftSide = totalUseEquationFactors.totalUses + " + x";
        const rightSide = totalUseEquationFactors.production;
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    if (_.isNil(val) || val === "") {
      // try to compute from other row total use values
      const rowEquationFactors = {
        firstBranch: couValues.vab.intermediateUse.firstBranch,
        secondBranch: couValues.vab.intermediateUse.secondBranch,
        thirdBranch: couValues.vab.intermediateUse.thirdBranch,
        gov: couValues.vab.intermediateUse.gov,
        st: couValues.vab.intermediateUse.st,
      };
      const noValueProps = nilAndEmptyProps(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (noValueProps.length === 1 && noValueProps[0] === columnKey) {
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
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    return shouldCompute(val, "vab.intermediateUse." + columnKey);
  };

  const computeProduction = (columnKey) => {
    let val = null;

    if (
      couValues.vab.intermediateUse[columnKey] &&
      couValues.totalUses.intermediateUse[columnKey]
    ) {
      val = _.toString(
        _.toNumber(couValues.vab.intermediateUse[columnKey]) +
          _.toNumber(couValues.totalUses.intermediateUse[columnKey])
      );
    }

    if (_.isNil(val) || val === "") {
      // compute using column Total Uses and VAB
      const totalUseEquationFactors = {
        totalUses: couValues.totalUses.intermediateUse[columnKey],
        vab: couValues.vab.intermediateUse[columnKey],
        production: couValues.production.intermediateUse[columnKey],
      };
      const noValueProps = nilAndEmptyProps(totalUseEquationFactors);
      if (noValueProps.length === 1 && noValueProps[0] === "production") {
        const leftSide =
          totalUseEquationFactors.totalUses +
          " + " +
          surround(totalUseEquationFactors.vab);
        const rightSide = totalUseEquationFactors.production;
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    if (_.isNil(val) || val === "") {
      // try to compute from other row total use values
      const rowEquationFactors = {
        firstBranch: couValues.production.intermediateUse.firstBranch,
        secondBranch: couValues.production.intermediateUse.secondBranch,
        thirdBranch: couValues.production.intermediateUse.thirdBranch,
        gov: couValues.production.intermediateUse.gov,
        st: couValues.production.intermediateUse.st,
      };
      const noValueProps = nilAndEmptyProps(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (noValueProps.length === 1 && noValueProps[0] === columnKey) {
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
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    if (_.isNil(val) || val === "") {
      if (columnKey !== "st") {
        val = couValues[columnKey].total;
      }
    }

    return shouldCompute(val, "production.intermediateUse." + columnKey);
  };

  const computeFinalUseSt = (rowKey) => {
    let val = null;

    if (rowKey === "gov") {
      if (couValues[rowKey].finalUse.gcfGov) {
        val = _.toString(_.toNumber(couValues[rowKey].finalUse.gcfGov));
      }
    } else if (
      couValues[rowKey].finalUse.gcfHomes &&
      couValues[rowKey].finalUse.fbkFbkf &&
      couValues[rowKey].finalUse.fbkVe &&
      couValues[rowKey].finalUse.exports
    ) {
      val = _.toString(
        _.toNumber(couValues[rowKey].finalUse.gcfHomes) +
          _.toNumber(couValues[rowKey].finalUse.fbkFbkf) +
          _.toNumber(couValues[rowKey].finalUse.fbkVe) +
          _.toNumber(couValues[rowKey].finalUse.exports)
      );
    }

    if (_.isNil(val) || val === "") {
      // try to compute from other column st values
      const colEquationFactors = {
        firstBranch: couValues.firstBranch.finalUse.st,
        secondBranch: couValues.secondBranch.finalUse.st,
        thirdBranch: couValues.thirdBranch.finalUse.st,
        gov: couValues.gov.finalUse.st,
        imports: couValues.imports.finalUse.st,
        totalUses: couValues.totalUses.finalUse.st,
      };
      const noValueProps = nilAndEmptyProps(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (noValueProps.length === 1 && noValueProps[0] === rowKey) {
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
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    if (_.isNil(val) || val === "") {
      // compute from the other st and the total
      const stAndTotalEquationFactors = {
        st1: couValues[rowKey].intermediateUse.st,
        st2: couValues[rowKey].finalUse.st,
        total: couValues[rowKey].total,
      };
      const noValueProps = nilAndEmptyProps(stAndTotalEquationFactors);
      if (noValueProps.length === 1 && noValueProps[0] === "st2") {
        const leftSide = stAndTotalEquationFactors.st1 + " + x";
        const rightSide = stAndTotalEquationFactors.total;
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    return shouldCompute(val, rowKey + ".finalUse.st");
  };

  const computeFinalTotalUse = (columnKey) => {
    let val = null;

    if (columnKey === "gcfGov") {
      if (couValues.gov.finalUse.columnKey) {
        val = _.toString(_.toNumber(couValues.gov.finalUse.columnKey));
      }
    } else if (
      couValues.firstBranch.finalUse.columnKey &&
      couValues.secondBranch.finalUse.columnKey &&
      couValues.thirdBranch.finalUse.columnKey &&
      couValues.imports.finalUse.columnKey
    ) {
      val = _.toString(
        _.toNumber(couValues.firstBranch.finalUse.columnKey) +
          _.toNumber(couValues.secondBranch.finalUse.columnKey) +
          _.toNumber(couValues.thirdBranch.finalUse.columnKey) +
          _.toNumber(couValues.imports.finalUse.columnKey)
      );
    }

    if (_.isNil(val) || val === "") {
      // try to compute from other row total use values
      const rowEquationFactors = {
        gcfHomes: couValues.totalUses.finalUse.gcfHomes,
        gcfGov: couValues.totalUses.finalUse.gcfGov,
        fbkFbkf: couValues.totalUses.finalUse.fbkFbkf,
        fbkVe: couValues.totalUses.finalUse.fbkVe,
        exports: couValues.totalUses.finalUse.exports,
        st: couValues.totalUses.finalUse.st,
      };
      const noValueProps = nilAndEmptyProps(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (noValueProps.length === 1 && noValueProps[0] === columnKey) {
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
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    return shouldCompute(val, "totalUses.finalUse." + columnKey);
  };

  const computeTotal = (rowKey) => {
    let val = null;

    if (
      (couValues[rowKey].intermediateUse.st || rowKey === "gov") &&
      couValues[rowKey].finalUse.st
    ) {
      val = _.toString(
        (rowKey === "gov"
          ? 0
          : _.toNumber(couValues[rowKey].intermediateUse.st)) +
          _.toNumber(couValues[rowKey].finalUse.st)
      );
    }

    // compute copying values from Production row
    if (_.isNil(val) || val === "") {
      if (rowKey !== "imports" && rowKey !== "totalUses") {
        val = couValues.production.intermediateUse[rowKey];
      }
    }

    if (_.isNil(val) || val === "") {
      // try to compute from other column st values
      const colEquationFactors = {
        firstBranch: couValues.firstBranch.total,
        secondBranch: couValues.secondBranch.total,
        thirdBranch: couValues.thirdBranch.total,
        gov: couValues.gov.total,
        imports: couValues.imports.total,
        totalUses: couValues.totalUses.total,
      };
      const noValueProps = nilAndEmptyProps(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (noValueProps.length === 1 && noValueProps[0] === rowKey) {
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
        const expresion = new algebra.Equation(
          algebra.parse(_.toString(leftSide)),
          algebra.parse(_.toString(rightSide))
        );
        const solution = expresion.solveFor("x");
        val = solution.numer / solution.denom;
      }
    }

    return shouldCompute(val, rowKey + ".total");
  };

  const generateTopHalfInnerCellsEquations = (rowPrefix) => {
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
          [rowPrefix + ".finalUse.exports"]: [
            rowPrefix + ".finalUse.gcfHomes",
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
    }

    return equations;
  };

  const generateBottomHalfInnerCellsEquations = (rowPrefix) => {
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

  const processEquations = (equations, print) => {
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
            {
              content = element;
              requiredValuesAmount++;
            }
            break;
          case "+":
            {
              content = element;
            }
            break;
          case "=":
            {
              switchToRightSide = true;
            }
            break;
          default: {
            let val = _.get(couValues, element);
            if (!_.isNil(val) && val !== "") {
              definedValuesAmount++;
              content = surround(_.toString(val));
            }
            requiredValuesAmount++;
          }
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
    let hasComputed = false;

    // compute inner cells of top half of the cou (both intermediate and final uses) using row values
    let equations = {
      ...generateTopHalfInnerCellsEquations("firstBranch"),
      ...generateTopHalfInnerCellsEquations("secondBranch"),
      ...generateTopHalfInnerCellsEquations("thirdBranch"),
      ...generateTopHalfInnerCellsEquations("imports"),
      ...generateTopHalfInnerCellsEquations("totalUses"),
    };

    hasComputed = processEquations(equations);

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

    // compute inner cells of bottom half of the cou using row values
    equations = {
      ...generateBottomHalfInnerCellsEquations("ra"),
      ...generateBottomHalfInnerCellsEquations("ckf"),
      ...generateBottomHalfInnerCellsEquations("tax"),
      ...generateBottomHalfInnerCellsEquations("een"),
    };

    hasComputed = processEquations(equations, true) || hasComputed;

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

  return (
    <div className="App m-5">
      <header className="App-header">
        <h1>Tabla de Utilización</h1>
      </header>
      <main>
        <Button variant="primary" onClick={compute}>
          Calcular
        </Button>
        <Button variant="danger" onClick={empty}>
          Vaciar
        </Button>
        <Table striped bordered hover className="text-center align-middle mt-3">
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
              {DisabledCellsRow()}
            </tr>

            {/* CKF Row */}
            <tr>
              <td>
                <strong>CKF</strong>
              </td>
              {IntermediateUseRow("ckf")}
              {DisabledCellsRow()}
            </tr>

            {/* Imp-S Row */}
            <tr>
              <td>
                <strong>Imp-S</strong>
              </td>
              {IntermediateUseRow("tax")}
              {DisabledCellsRow()}
            </tr>

            {/* EEN Row */}
            <tr>
              <td>
                <strong>EEN</strong>
              </td>
              {IntermediateUseRow("een")}
              {DisabledCellsRow()}
            </tr>

            {/* VAB Row */}
            <tr>
              <td>
                <strong>VAB</strong>
              </td>
              {IntermediateUseRow("vab")}
              {DisabledCellsRow()}
            </tr>

            {/* Production Row */}
            <tr>
              <td>
                <strong>Producción</strong>
              </td>
              {IntermediateUseRow("production")}
              {DisabledCellsRow()}
            </tr>
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default App;
