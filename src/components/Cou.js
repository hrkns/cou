import _ from "lodash";
import algebra from "algebra.js";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { getItem, setItem } from "../shared/db";
import DisabledCell from "./DisabledCell";
import DisabledCells from "./DisabledCells";
import { Form, Modal } from "react-bootstrap";

const Cou = ({ appValues, setAppValues }) => {
  const branchesIndexes = _.range(1, appValues.branches.length + 1);

  const branchRow = {
    intermediateUse: {
      ...branchesIndexes.reduce((acc, idx) => {
        acc[`branch${idx}`] = null;
        return acc;
      }, {}),
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
  const emptyCou = {
    ...branchesIndexes.reduce((acc, idx) => {
      acc[`branch${idx}`] = _.cloneDeep(branchRow);
      return acc;
    }, {}),
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
  const storedCou = getItem("cou");
  if (storedCou) {
    branchesIndexes.forEach((index) => {
      if (!storedCou[`branch${index}`]) {
        storedCou[`branch${index}`] = _.cloneDeep(branchRow);
      }
    });
  }
  const addMissingBranches = (cou) => {
    branchesIndexes.forEach((index) => {
      if (!cou[`branch${index}`]) {
        cou[`branch${index}`] = _.cloneDeep(branchRow);
      }
    });
    return cou;
  };
  const x = addMissingBranches(_.cloneDeep(storedCou || emptyCou));
  const [couValues, setCouValues] = useState(x);

  // save in the internal component variable and the browser local storage so the user
  // can still access the values after refreshing/reopening the web app
  const saveCouValues = (content) => {
    content = addMissingBranches(content);
    setCouValues(_.cloneDeep(content));
    setItem("cou", content);
    appValues.cou = content;
    setAppValues(_.cloneDeep(appValues));
  };

  const handleCouValueChange = (value, cellKey) => {
    _.set(couValues, cellKey, value);
    saveCouValues(couValues);
  };

  const IntermediateUseRow = (rowKey) => {
    let index = 1;
    return [
      ...branchesIndexes.map((idx) => {
        return (
          <td key={`${rowKey}${index++}`}>
            <input
              className="invisible-input"
              type="number"
              value={couValues[rowKey]?.intermediateUse[`branch${idx}`] ?? ""}
              onChange={(e) => {
                handleCouValueChange(
                  e.target.value,
                  rowKey + ".intermediateUse.branch" + idx
                );
              }}
            />
          </td>
        );
      }),
      // no gov column is used when row is gov, tax or een
      rowKey === "gov" || rowKey === "tax" || rowKey === "een" ? (
        <DisabledCell key={`${rowKey}${index++}`} />
      ) : (
        <td key={`${rowKey}${index++}`}>
          <input
            className="invisible-input"
            type="number"
            value={couValues[rowKey]?.intermediateUse.gov ?? ""}
            onChange={(e) => {
              handleCouValueChange(
                e.target.value,
                rowKey + ".intermediateUse.gov"
              );
            }}
          />
        </td>
      ),
      <td key={`${rowKey}${index++}`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey]?.intermediateUse.st ?? ""}
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
    let index = 6;
    return [
      <td key={`${rowKey}${index++}`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey]?.finalUse.gcfHomes ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.gcfHomes");
          }}
        />
      </td>,
      // gov gcf is used only when row is gov or totalUses
      rowKey === "gov" || rowKey === "totalUses" ? (
        <td key={`${rowKey}${index++}`}>
          <input
            className="invisible-input"
            type="number"
            value={couValues[rowKey]?.finalUse.gcfGov ?? ""}
            onChange={(e) => {
              handleCouValueChange(e.target.value, rowKey + ".finalUse.gcfGov");
            }}
          />
        </td>
      ) : (
        <DisabledCell key={`${rowKey}${index++}`} />
      ),
      <td key={`${rowKey}${index++}`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey]?.finalUse.fbkFbkf ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.fbkFbkf");
          }}
        />
      </td>,
      <td key={`${rowKey}${index++}`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey]?.finalUse.fbkVe ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.fbkVe");
          }}
        />
      </td>,
      rowKey === "imports" ? (
        <DisabledCell key={`${rowKey}${index++}`} />
      ) : (
        <td key={`${rowKey}${index++}`}>
          <input
            className="invisible-input"
            type="number"
            value={couValues[rowKey]?.finalUse.exports ?? ""}
            onChange={(e) => {
              handleCouValueChange(
                e.target.value,
                rowKey + ".finalUse.exports"
              );
            }}
          />
        </td>
      ),
      <td key={`${rowKey}${index++}`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey]?.finalUse.st ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.st");
          }}
        />
      </td>,
    ];
  };

  // cells used for second half of the bottom rows in the right side of the table
  const DisabledCellsRow = (rowKey) => {
    return DisabledCells(rowKey, 6, 7);
  };

  const TotalCell = (rowKey) => {
    return (
      <td key={`${rowKey}13`}>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey]?.total ?? ""}
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
      if (cond) {
        console.log(
          `Setting COU at ${path} with ${val}. Previous value: ${_.get(
            couValues,
            path
          )}`
        );
        _.set(couValues, path, val);
      }
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
    console.log(`Solving equation: ${leftSide} = ${rightSide}`, { solution });
    return solution.numer / solution.denom;
  };

  const computeIntermediateUseSt = (rowKey) => {
    console.log(`Computing intermediate use sub total at row ${rowKey}`);

    let val = null;

    // compute from intermediate use cells
    if (
      _.every(
        branchesIndexes.map(
          (idx) => couValues[rowKey].intermediateUse[`branch${idx}`]
        ),
        hasContent
      ) &&
      // gov column cell is only required when the row is not tax or een
      (hasContent(couValues[rowKey].intermediateUse.gov) ||
        rowKey === "tax" ||
        rowKey === "een")
    ) {
      console.log("Computing with row values");
      val = _.toString(
        _.sum(
          branchesIndexes.map((idx) =>
            _.toNumber(couValues[rowKey].intermediateUse[`branch${idx}`])
          )
        ) +
          (rowKey === "tax" || rowKey === "een"
            ? 0
            : _.toNumber(couValues[rowKey].intermediateUse.gov))
      );
    }

    // if no value was computed from the intermediate use cells, then try to compute from the other st cells in the same column
    if (!hasContent(val)) {
      // try to compute from other column st values
      const colEquationFactors = {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = couValues[`branch${idx}`]?.intermediateUse.st;
          return acc;
        }, {}),
        imports: couValues.imports.intermediateUse.st,
        totalUses: couValues.totalUses.intermediateUse.st,
      };
      const noValueProps = propsWithoutContent(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (equationIsSolvable(noValueProps, rowKey)) {
        console.log("Computing with column values");
        // build equation expression
        const leftSide =
          branchesIndexes
            .map((idx) =>
              noValueProps[0] === "branch" + idx
                ? "x"
                : surround(colEquationFactors[`branch${idx}`])
            )
            .join(" + ") +
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
        ...branchesIndexes.map((idx) => `branch${idx}`),
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
        console.log("Computing with st and total values");
        const leftSide = "x + " + surround(stAndTotalEquationFactors.st2);
        const rightSide = stAndTotalEquationFactors.total;
        val = solveEquation(leftSide, rightSide);
      }
    }

    const s = shouldCompute(val, rowKey + ".intermediateUse.st");

    if (!s) console.log("Could not compute, not enough data available");

    return s;
  };

  const computeIntermediateTotalUse = (columnKey) => {
    console.log(`Computing intermediate total use at column ${columnKey}`);

    let val = null;

    // compute from intermediate use cells
    if (
      _.every(
        branchesIndexes.map(
          (idx) => couValues[`branch${idx}`]?.intermediateUse[columnKey]
        ),
        hasContent
      ) &&
      hasContent(couValues.imports.intermediateUse[columnKey])
    ) {
      console.log("Computing with intermediate use cells (column based)");
      val = _.toString(
        _.sum(
          branchesIndexes.map((idx) =>
            _.toNumber(couValues[`branch${idx}`]?.intermediateUse[columnKey])
          )
        ) + _.toNumber(couValues.imports.intermediateUse[columnKey])
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
        console.log("Computing using VAB and Production");
        const leftSide = "x + " + surround(totalUseEquationFactors.vab);
        const rightSide = totalUseEquationFactors.production;
        val = solveEquation(leftSide, rightSide);
      }
    }

    // if still no val was computed, then try to compute from the other row total uses values
    if (!hasContent(val)) {
      // try to compute from other row total use values
      const rowEquationFactors = {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] =
            couValues.totalUses.intermediateUse[`branch${idx}`];
          return acc;
        }, {}),
        gov: couValues.totalUses.intermediateUse.gov,
        st: couValues.totalUses.intermediateUse.st,
      };
      const noValueProps = propsWithoutContent(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (equationIsSolvable(noValueProps, columnKey)) {
        console.log("Computing using other row total use values");
        // build equation expression
        const leftSide =
          branchesIndexes
            .map((idx) =>
              noValueProps[0] === "branch" + idx
                ? "x"
                : surround(rowEquationFactors[`branch${idx}`])
            )
            .join(" + ") +
          " + " +
          (noValueProps[0] === "gov" ? "x" : surround(rowEquationFactors.gov));
        const rightSide =
          noValueProps[0] === "st" ? "x" : rowEquationFactors.st;
        // compute
        val = solveEquation(leftSide, rightSide);
      }
    }

    const c = shouldCompute(val, "totalUses.intermediateUse." + columnKey);

    if (!c) console.log("Could not compute, not enough data available");

    return c;
  };

  const computeVab = (columnKey) => {
    console.log(`Computing VAB at column ${columnKey}`);

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
      console.log("Computing with intermediate use cells (column based)");
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
        console.log("Computing using Total Uses and Production");
        const leftSide = totalUseEquationFactors.totalUses + " + x";
        const rightSide = totalUseEquationFactors.production;
        val = solveEquation(leftSide, rightSide);
      }
    }

    // if still no val was computed, then try to compute from the other row vab values
    if (!hasContent(val)) {
      // try to compute from other row vab values
      const rowEquationFactors = {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = couValues.vab.intermediateUse[`branch${idx}`];
          return acc;
        }, {}),
        gov: couValues.vab.intermediateUse.gov,
        st: couValues.vab.intermediateUse.st,
      };
      const noValueProps = propsWithoutContent(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (equationIsSolvable(noValueProps, columnKey)) {
        console.log("Computing using other row vab values");
        // build equation expression
        const leftSide =
          branchesIndexes
            .map((idx) =>
              noValueProps[0] === "branch" + idx
                ? "x"
                : surround(rowEquationFactors[`branch${idx}`])
            )
            .join(" + ") +
          " + " +
          (noValueProps[0] === "gov" ? "x" : surround(rowEquationFactors.gov));
        const rightSide =
          noValueProps[0] === "st" ? "x" : rowEquationFactors.st;
        // compute
        val = solveEquation(leftSide, rightSide);
      }
    }

    const c = shouldCompute(val, "vab.intermediateUse." + columnKey);

    if (!c) console.log("Could not compute, not enough data available");

    return c;
  };

  const computeProduction = (columnKey) => {
    console.log(`Computing Production at column ${columnKey}`);

    let val = null;

    // compute production using vab and total uses (first alternative for computing)
    if (
      hasContent(couValues.vab.intermediateUse[columnKey]) &&
      hasContent(couValues.totalUses.intermediateUse[columnKey])
    ) {
      console.log("Computing using VAB and Total Uses");
      val = _.toString(
        _.toNumber(couValues.vab.intermediateUse[columnKey]) +
          _.toNumber(couValues.totalUses.intermediateUse[columnKey])
      );
    }

    // if no val was computed from the first alternative, then try to compute from the other row production values
    if (!hasContent(val)) {
      // try to compute from other row total use values
      const rowEquationFactors = {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] =
            couValues.production.intermediateUse[`branch${idx}`];
          return acc;
        }, {}),
        gov: couValues.production.intermediateUse.gov,
        st: couValues.production.intermediateUse.st,
      };
      const noValueProps = propsWithoutContent(rowEquationFactors);
      // if it's detected that the only missing value from the row ones is the current column cell then we solve the equation
      if (equationIsSolvable(noValueProps, columnKey)) {
        console.log("Computing using other row production values");
        // build equation expression
        const leftSide =
          branchesIndexes
            .map((idx) =>
              noValueProps[0] === "branch" + idx
                ? "x"
                : surround(rowEquationFactors[`branch${idx}`])
            )
            .join(" + ") +
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
      console.log("Computing copying mirror cell from final total column");
      val = couValues[columnKey].total;
    }

    const c = shouldCompute(val, "production.intermediateUse." + columnKey);

    if (!c) console.log("Could not compute, not enough data available");

    return c;
  };

  const computeFinalUseSt = (rowKey) => {
    console.log(`Computing final use sub total at row ${rowKey}`);

    let val = null;

    // when computing final use gov st, the only value required is the gov gcf
    if (rowKey === "gov") {
      if (hasContent(couValues[rowKey].finalUse.gcfGov)) {
        console.log("Computing with gov gcf");
        val = _.toString(couValues[rowKey].finalUse.gcfGov);
      }
    } else if (
      // for the other rows, the values required are gcf homes, fbk fbkf, fbk ve and exports
      // exports are not required for imports row though
      hasContent(couValues[rowKey].finalUse.gcfHomes) &&
      (hasContent(couValues[rowKey].finalUse.gcfGov) ||
        rowKey !== "totalUses") &&
      hasContent(couValues[rowKey].finalUse.fbkFbkf) &&
      hasContent(couValues[rowKey].finalUse.fbkVe) &&
      (hasContent(couValues[rowKey].finalUse.exports) || rowKey === "imports")
    ) {
      console.log("Computing with row values");
      val = _.toString(
        _.toNumber(couValues[rowKey].finalUse.gcfHomes) +
          (rowKey !== "totalUses"
            ? 0
            : _.toNumber(couValues[rowKey].finalUse.gcfGov)) +
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
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = couValues[`branch${idx}`]?.finalUse.st;
          return acc;
        }, {}),
        gov: couValues.gov.finalUse.st,
        imports: couValues.imports.finalUse.st,
        totalUses: couValues.totalUses.finalUse.st,
      };
      const noValueProps = propsWithoutContent(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (equationIsSolvable(noValueProps, rowKey)) {
        console.log("Computing with column values", { colEquationFactors });
        // build equation expression
        const leftSide =
          branchesIndexes
            .map((idx) =>
              noValueProps[0] === "branch" + idx
                ? "x"
                : surround(colEquationFactors[`branch${idx}`])
            )
            .join(" + ") +
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
        console.log("Computing with st and total values");
        const leftSide = stAndTotalEquationFactors.st1 + " + x";
        const rightSide = stAndTotalEquationFactors.total;
        val = solveEquation(leftSide, rightSide);
      }
    }

    const c = shouldCompute(val, rowKey + ".finalUse.st");

    if (!c) console.log("Could not compute, not enough data available");

    return c;
  };

  const computeFinalTotalUse = (columnKey) => {
    console.log(`Computing final use total use at column ${columnKey}`);

    let val = null;

    // when column is gcf gov, the only value required is the gov final use column cell
    if (columnKey === "gcfGov") {
      if (hasContent(couValues.gov.finalUse[columnKey])) {
        console.log("Computing with gov final use");
        val = _.toString(couValues.gov.finalUse[columnKey]);
      }
    } else if (
      // for the other final total uses, the values required are gcf homes, fbk fbkf, fbk ve and exports
      // exports are not required for imports row though
      _.every(
        branchesIndexes.map(
          (idx) => couValues[`branch${idx}`]?.finalUse[columnKey]
        ),
        hasContent
      ) &&
      (hasContent(couValues.gov.finalUse[columnKey]) || columnKey !== "st") &&
      (hasContent(couValues.imports.finalUse[columnKey]) ||
        columnKey === "exports")
    ) {
      console.log("Computing with column values");
      val = _.toString(
        _.sum(
          branchesIndexes.map((idx) =>
            _.toNumber(couValues[`branch${idx}`]?.finalUse[columnKey])
          )
        ) +
          (columnKey === "st"
            ? _.toNumber(couValues.gov.finalUse[columnKey])
            : 0) +
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
        console.log("Computing with row values");
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

    const c = shouldCompute(val, "totalUses.finalUse." + columnKey);

    if (!c) console.log("Could not compute, not enough data available");

    return c;
  };

  const computeTotal = (rowKey) => {
    console.log(`Computing total at row ${rowKey}`);

    let val = null;

    // compute from intermediate use st and final use str
    // when row is gov, the only value required is the final use st
    if (
      (hasContent(couValues[rowKey].intermediateUse.st) || rowKey === "gov") &&
      hasContent(couValues[rowKey].finalUse.st)
    ) {
      console.log("Computing with intermediate use st and final use st");
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
        console.log("Computing copying mirror cell from Production row");
        val = couValues.production.intermediateUse[rowKey];
      }
    }

    // if no val was computed from the intermediate use st and final use st, then try to compute from the other totals in the same column
    if (!hasContent(val)) {
      // try to compute from other column total values
      const colEquationFactors = {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = couValues[`branch${idx}`]?.total;
          return acc;
        }, {}),
        gov: couValues.gov.total,
        imports: couValues.imports.total,
        totalUses: couValues.totalUses.total,
      };
      const noValueProps = propsWithoutContent(colEquationFactors);
      // if it's detected that the only missing value from the column ones is the current row then we solve the equation
      if (equationIsSolvable(noValueProps, rowKey)) {
        console.log("Computing with column values");
        // build equation expression
        const leftSide =
          branchesIndexes
            .map((idx) =>
              noValueProps[0] === "branch" + idx
                ? "x"
                : surround(colEquationFactors[`branch${idx}`])
            )
            .join(" + ") +
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

    const c = shouldCompute(val, rowKey + ".total");

    if (!c) console.log("Could not compute, not enough data available");

    return c;
  };

  // generates elements used for expression of sum between branches values
  // the return value is an array of elements that can be used to build the expression
  const generateBranchesSumElements = (expression, variableIndex) => {
    return branchesIndexes.reduce((acc, idx, index) => {
      const el =
        idx === variableIndex
          ? "x"
          : expression.replace("{REPLACE}", `branch${idx}`);
      acc.push(el);
      if (index < branchesIndexes.length - 1) acc.push("+");
      return acc;
    }, []);
  };

  // generates elements used for expression of equation for intermediate use cells
  // the return value is an array of elements that can be used to build the expression
  const generateIntermediateUseEquation = (expression, variableIndex) => {
    return [
      ...generateBranchesSumElements(expression, variableIndex),
      "+",
      expression.replace("{REPLACE}", "gov"),
      "=",
      expression.replace("{REPLACE}", "st"),
    ];
  };

  const generateInnerCellRowCalculationBasedEquationElements = (
    colsKeys,
    expression,
    varKey
  ) => {
    return colsKeys
      .reduce((acc, curr, idx) => {
        const el =
          curr === varKey ? "x" : expression.replace("{REPLACE}", curr);
        acc.push(el);
        if (idx < colsKeys.length - 1) acc.push("+");
        return acc;
      }, [])
      .concat(["=", expression.replace("{REPLACE}", "st")]);
  };

  const generateTopHalfInnerCellsEquationsForRowCalculation = (rowPrefix) => {
    let equations = {
      // generate branches intermediate use cells equations (row based calculation)
      ...branchesIndexes.reduce((acc, curr) => {
        acc[rowPrefix + ".intermediateUse.branch" + curr] =
          generateIntermediateUseEquation(
            rowPrefix + ".intermediateUse.{REPLACE}",
            curr
          );
        return acc;
      }, {}),
      // generate equation for intermediate use gov cell (row based calculation)
      [rowPrefix + ".intermediateUse.gov"]: [
        ...generateBranchesSumElements(
          rowPrefix + ".intermediateUse.{REPLACE}"
        ),
        "+",
        "x",
        "=",
        rowPrefix + ".intermediateUse.st",
      ],
    };

    // generate equations for inner cells of final use segment
    const finalUseColsKeys = [
      "gcfHomes",
      // gcfGov is only required for gov row, which is calculated somewhere else
      rowPrefix === "totalUses" ? "gcfGov" : null,
      "fbkFbkf",
      "fbkVe",
      // exports are not required for imports row
      rowPrefix !== "imports" ? "exports" : null,
    ].filter((el) => el !== null);

    equations = {
      ...equations,
      // append to existing equations the equations for the inner cells of final use segment
      ...finalUseColsKeys.reduce((acc, curr) => {
        // exports are not required for imports row
        if (rowPrefix === "imports" && curr === "exports") return acc;

        acc[rowPrefix + ".finalUse." + curr] =
          generateInnerCellRowCalculationBasedEquationElements(
            finalUseColsKeys,
            rowPrefix + ".finalUse.{REPLACE}",
            curr
          );
        return acc;
      }, {}),
    };

    return equations;
  };

  const generateBottomHalfInnerCellsEquationsForRowCalculation = (
    rowPrefix
  ) => {
    // generate branches cols + gov col
    const intermediateUseColsKeys = [
      ...branchesIndexes.map((idx) => `branch${idx}`),
      // do not include gov col for tax and een rows
      rowPrefix === "ra" || rowPrefix === "ckf" ? "gov" : null,
    ].filter((el) => el !== null);

    const equations = {
      ...intermediateUseColsKeys.reduce((acc, curr) => {
        acc[rowPrefix + ".intermediateUse." + curr] =
          generateInnerCellRowCalculationBasedEquationElements(
            intermediateUseColsKeys,
            rowPrefix + ".intermediateUse.{REPLACE}",
            curr
          );
        return acc;
      }, {}),
    };

    return equations;
  };

  // generate equations for inner cells of final use segment
  const generateInnerCellColCalculationBasedEquationElements = (
    topSide,
    columnSuffix,
    varKey
  ) => {
    const els = [];

    branchesIndexes.forEach((idx) => {
      els.push(
        `branch${idx}` === varKey
          ? "x"
          : `branch${idx}.` + topSide + "." + columnSuffix
      );
      els.push("+");
    });
    els.push(
      "imports" === varKey ? "x" : "imports." + topSide + "." + columnSuffix
    );
    els.push("=");
    els.push("totalUses." + topSide + "." + columnSuffix);

    return els;
  };

  const generateTopHalfInnerCellsEquationsForColumnCalculation = (
    columnSuffix
  ) => {
    const topSide =
      columnSuffix === "gov" || _.startsWith(columnSuffix, "branch")
        ? "intermediateUse"
        : "finalUse";

    const equations = {
      ...branchesIndexes.reduce((acc, curr) => {
        acc["branch" + curr + "." + topSide + "." + columnSuffix] =
          generateInnerCellColCalculationBasedEquationElements(
            topSide,
            columnSuffix,
            "branch" + curr
          );
        return acc;
      }, {}),
      ["imports." + topSide + "." + columnSuffix]:
        generateInnerCellColCalculationBasedEquationElements(
          topSide,
          columnSuffix,
          "imports"
        ),
    };

    return equations;
  };

  const generateBottomHalfInnerCellsEquationsForColumnCalculation = (
    columnSuffix
  ) => {
    const rowKeys = [
      "ra",
      "ckf",
      columnSuffix === "gov" ? null : "tax",
      columnSuffix === "gov" ? null : "een",
    ].filter((el) => el !== null);

    const equations = {
      ...rowKeys.reduce((equationsSoFar, currentRowPrefix) => {
        equationsSoFar[currentRowPrefix + ".intermediateUse." + columnSuffix] =
          rowKeys
            .reduce((equationsTerms, currentRowKey, idx) => {
              equationsTerms.push(
                currentRowPrefix === currentRowKey
                  ? "x"
                  : currentRowKey + ".intermediateUse." + columnSuffix
              );
              if (idx < rowKeys.length - 1) equationsTerms.push("+");
              return equationsTerms;
            }, [])
            .concat(["=", "vab.intermediateUse." + columnSuffix]);
        return equationsSoFar;
      }, {}),
    };

    return equations;
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
            if (hasContent(val)) {
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
        const val = solveEquation(leftSide, rightSide);
        hasComputed = shouldCompute(val, targetCell);
        console.log(
          "Computed value: " +
            val +
            " for cell: " +
            targetCell +
            " with equation: " +
            leftSide +
            " = " +
            rightSide,
          { equationElements }
        );
      }
    });

    return hasComputed;
  };

  const computeInnerCells = () => {
    console.log("Computing inner cells");
    // run row-based calculations
    console.log("Running row-based calculations");
    let hasComputed = processEquations({
      ...branchesIndexes.reduce((acc, idx) => {
        acc = {
          ...acc,
          ...generateTopHalfInnerCellsEquationsForRowCalculation(
            `branch${idx}`
          ),
        };
        return acc;
      }, {}),
      ...generateTopHalfInnerCellsEquationsForRowCalculation("imports"),
      ...generateTopHalfInnerCellsEquationsForRowCalculation("totalUses"),
      ...generateBottomHalfInnerCellsEquationsForRowCalculation("ra"),
      ...generateBottomHalfInnerCellsEquationsForRowCalculation("ckf"),
      ...generateBottomHalfInnerCellsEquationsForRowCalculation("tax"),
      ...generateBottomHalfInnerCellsEquationsForRowCalculation("een"),
    });

    // run column-based calculations
    console.log("Running column-based calculations");
    hasComputed =
      processEquations({
        ...branchesIndexes.reduce((acc, idx) => {
          acc = {
            ...acc,
            ...generateTopHalfInnerCellsEquationsForColumnCalculation(
              `branch${idx}`
            ),
          };
          return acc;
        }, {}),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("gov"),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("gcfHomes"),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("fbkFbkf"),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("fbkVe"),
        ...generateTopHalfInnerCellsEquationsForColumnCalculation("exports"),
        ...branchesIndexes.reduce((acc, idx) => {
          acc = {
            ...acc,
            ...generateBottomHalfInnerCellsEquationsForColumnCalculation(
              `branch${idx}`
            ),
          };
          return acc;
        }, {}),
        ...generateBottomHalfInnerCellsEquationsForColumnCalculation("gov"),
      }) || hasComputed;

    // assign value gcf of government if required
    console.log("Assigning value gcf of government if required");
    if (
      !hasContent(couValues.gov.finalUse.gcfGov) &&
      (hasContent(couValues.gov.finalUse.st) ||
        hasContent(couValues.gov.total) ||
        hasContent(couValues.production.intermediateUse.gov))
    ) {
      let val;
      console.log(
        couValues.gov.finalUse.st,
        couValues.gov.total,
        couValues.production.intermediateUse.gov
      );
      if (hasContent(couValues.gov.finalUse.st)) {
        val = couValues.gov.finalUse.st;
      } else if (hasContent(couValues.gov.total)) {
        val = couValues.gov.total;
      } else if (hasContent(couValues.production.intermediateUse.gov)) {
        val = couValues.production.intermediateUse.gov;
      }
      hasComputed = shouldCompute(val, "gov.finalUse.gcfGov");
    }

    return hasComputed;
  };

  const computeBasedOnBranches = (computer) => {
    let stopComputing = false;
    let index = 0;

    while (!stopComputing && index < branchesIndexes.length) {
      stopComputing = computer(`branch${branchesIndexes[index]}`);
      index++;
    }

    return stopComputing;
  };

  const compute = () => {
    let keepComputing = true;
    // we put a limit to the number of iterations as continous calculations
    // sometimes lead to contradictory values which causes infinite looping
    // the app is still not good enough for detecting which values are causing the contradiction
    // so we just use a limit, this (TODO) should be fixed in future versions
    let maxAmountOfIterations = 50;

    console.log({ couValues });

    while (keepComputing) {
      keepComputing =
        // Intermediate Use ST
        computeBasedOnBranches(computeIntermediateUseSt) ||
        computeIntermediateUseSt("imports") ||
        computeIntermediateUseSt("totalUses") ||
        computeIntermediateUseSt("ra") ||
        computeIntermediateUseSt("ckf") ||
        computeIntermediateUseSt("tax") ||
        computeIntermediateUseSt("een") ||
        computeIntermediateUseSt("vab") ||
        computeIntermediateUseSt("production") ||
        // Intermediate Use Total Use
        computeBasedOnBranches(computeIntermediateTotalUse) ||
        computeIntermediateTotalUse("gov") ||
        computeIntermediateTotalUse("st") ||
        // VAB
        computeBasedOnBranches(computeVab) ||
        computeVab("gov") ||
        computeVab("st") ||
        // Production
        computeBasedOnBranches(computeProduction) ||
        computeProduction("gov") ||
        computeProduction("st") ||
        // Final Use ST
        computeBasedOnBranches(computeFinalUseSt) ||
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
        computeBasedOnBranches(computeTotal) ||
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

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [savedCous, setSavedCous] = useState([]);
  const [fileName, setFileName] = useState("");
  const [optionToDelete, setOptionToDelete] = useState("");
  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
  };
  const handleCloseLoadModal = () => {
    setShowLoadModal(false);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleSave = () => {
    if (fileName?.trim().length === 0) return;
    const saved = getItem("saved") || {};
    saved.cou = saved.cou || {};
    saved.cou[fileName] = couValues;
    setItem("saved", saved);
    setShowSaveModal(false);
  };
  const handleLoad = () => {
    if (fileName?.trim().length === 0) return;
    const saved = getItem("saved") || {};
    saved.cou = saved.cou || {};
    const cou = saved.cou[fileName];
    if (!cou) {
      alert("No existe el COU guardado");
      return;
    }
    saveCouValues(cou);
    setShowLoadModal(false);
  };
  const handleDelete = () => {
    const saved = getItem("saved") || {};
    saved.cou = saved.cou || {};
    delete saved.cou[optionToDelete];
    setItem("saved", saved);
    setShowDeleteModal(false);
    updateSavedCous();
  };
  const updateSavedCous = () => {
    const saved = getItem("saved") || {};
    const cou = saved.cou || {};
    const couNames = Object.keys(cou);
    if (couNames.length === 0) {
      alert("No hay COUs guardados");
      return;
    }
    setSavedCous(couNames);
  };

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
      <Button variant="success" onClick={() => setShowSaveModal(true)}>
        Guardar
      </Button>
      &nbsp;
      <Button
        variant="info"
        onClick={() => {
          updateSavedCous();
          setShowLoadModal(true);
        }}
      >
        Cargar
      </Button>
      <Table
        striped
        bordered
        hover
        className="text-center align-middle mt-3 custom-table"
      >
        <thead>
          <tr>
            <th rowSpan={3}></th>
            <th colSpan={2 + appValues.branches.length} rowSpan={2}>
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
            {appValues.branches.map((branch, idx) => (
              <th key={`cou_header_intermediate_use_branch_${idx}`}>
                {branch.name}
              </th>
            ))}
            <th>Serv. Gob</th>
            <th>ST</th>
            <th>Hogares</th>
            <th>Gob.</th>
            <th>FBKF</th>
            <th>VE</th>
          </tr>
        </thead>
        <tbody>
          {/* Branches Rows */}
          {branchesIndexes.map((idx) => {
            return (
              <tr key={`cou_intermediate_use_row_branch_${idx}`}>
                <td>
                  <strong>{appValues.branches[idx - 1].name}</strong>
                </td>
                {IntermediateUseRow("branch" + idx)}
                {FinalUseRow("branch" + idx)}
                {TotalCell("branch" + idx)}
              </tr>
            );
          })}

          {/* Serv. Gob */}
          <tr>
            <td>
              <strong>Serv. Gob.</strong>
            </td>
            {DisabledCells("gov", 1, appValues.branches.length + 3)}
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
            {DisabledCells("gov", 8, 3)}
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
      {showSaveModal && (
        <Modal show={showSaveModal} onHide={handleCloseSaveModal}>
          <Modal.Header closeButton>
            <Modal.Title>Guardar Contenido del COU</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nombre del archivo:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del archivo"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSaveModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showLoadModal && (
        <Modal show={showLoadModal} onHide={handleCloseLoadModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cargar contenido a COU</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {savedCous.map((option, index) => (
              <div key={index}>
                <Form.Check
                  type="radio"
                  value={option}
                  checked={fileName === option}
                  onChange={(e) => setFileName(e.target.value)}
                  label={
                    <span>
                      {option} &nbsp;{" "}
                      <strong
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setOptionToDelete(option);
                          setShowDeleteModal(true);
                        }}
                      >
                        X
                      </strong>
                    </span>
                  }
                />
                &nbsp;
              </div>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLoadModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleLoad}>
              Cargar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar COU</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>¿Está seguro que desea eliminar el COU?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Cou;
