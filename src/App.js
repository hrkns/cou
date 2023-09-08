import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./App.css";
import _ from "lodash";
import algebra from "algebra.js";

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

  const nilEmptyProps = (obj) => {
    const keys = [];

    for (let key in obj) {
      if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
        keys.push(key);
      }
    }

    return keys;
  };

  const computeIntermediateUseSt = (rowKey) => {
    let shouldCompute = false;
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
    // TODO: compute from st column values
    else if (!couValues[rowKey].intermediateUse.st) {
      const eqFactors = {
        firstBranch: couValues.firstBranch.intermediateUse.st,
        secondBranch: couValues.secondBranch.intermediateUse.st,
        thirdBranch: couValues.thirdBranch.intermediateUse.st,
        imports: couValues.imports.intermediateUse.st,
        totalUses: couValues.totalUses.intermediateUse.st,
      };
      const noValueProps = nilEmptyProps(eqFactors);
      if (noValueProps.length === 1 && noValueProps[0] === rowKey) {
        const leftSide =
          (noValueProps[0] === "firstBranch" ? "x" : eqFactors.firstBranch) +
          " + " +
          (noValueProps[0] === "secondBranch" ? "x" : eqFactors.secondBranch) +
          " + " +
          (noValueProps[0] === "thirdBranch" ? "x" : eqFactors.thirdBranch) +
          " + " +
          (noValueProps[0] === "imports" ? "x" : eqFactors.imports);
        const rightSide =
          noValueProps[0] === "totalUses" ? "x" : eqFactors.totalUses;
        const expresion = new algebra.Equation(
          algebra.parse(leftSide),
          algebra.parse(rightSide)
        );
        const solucion = expresion.solveFor("x");
        val = solucion.numer / solucion.denom;
      }
    }
    // TODO: compute from the other st and the total

    if (val) {
      shouldCompute = val !== couValues[rowKey].intermediateUse.st;
      if (shouldCompute) couValues[rowKey].intermediateUse.st = val;
    }

    return shouldCompute;
  };

  const computeIntermediateTotalUse = (columnKey) => {
    let shouldCompute = false;

    if (
      couValues.firstBranch.intermediateUse[columnKey] &&
      couValues.secondBranch.intermediateUse[columnKey] &&
      couValues.thirdBranch.intermediateUse[columnKey] &&
      couValues.imports.intermediateUse[columnKey]
    ) {
      const val = _.toString(
        _.toNumber(couValues.firstBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.secondBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.thirdBranch.intermediateUse[columnKey]) +
          _.toNumber(couValues.imports.intermediateUse[columnKey])
      );

      shouldCompute = val !== couValues.totalUses.intermediateUse[columnKey];

      if (shouldCompute) couValues.totalUses.intermediateUse[columnKey] = val;
    }
    // TODO: compute using VAB and Production
    // TODO: compute using other total uses and the corresponding ST

    return shouldCompute;
  };

  const computeVab = (columnKey) => {
    let shouldCompute = false;

    if (
      couValues.ra.intermediateUse[columnKey] &&
      couValues.ckf.intermediateUse[columnKey] &&
      couValues.een.intermediateUse[columnKey]
    ) {
      const val = _.toString(
        _.toNumber(couValues.ra.intermediateUse[columnKey]) +
          _.toNumber(couValues.ckf.intermediateUse[columnKey]) +
          _.toNumber(couValues.een.intermediateUse[columnKey])
      );

      shouldCompute = val !== couValues.vab.intermediateUse[columnKey];

      if (shouldCompute) couValues.vab.intermediateUse[columnKey] = val;
    }
    // TODO: compute using corresponding total use and production
    // TODO: compute using other VAB and the corresponding ST

    return shouldCompute;
  };

  const computeProduction = (columnKey) => {
    let shouldCompute = false;

    if (
      couValues.vab.intermediateUse[columnKey] &&
      couValues.totalUses.intermediateUse[columnKey]
    ) {
      const val = _.toString(
        _.toNumber(couValues.vab.intermediateUse[columnKey]) +
          _.toNumber(couValues.totalUses.intermediateUse[columnKey])
      );

      shouldCompute = val !== couValues.production.intermediateUse[columnKey];

      if (shouldCompute) couValues.production.intermediateUse[columnKey] = val;
    }
    // TODO: compute copying values from total column
    // TODO: compute using other production and the corresponding ST

    return shouldCompute;
  };

  const computeFinalUseSt = (rowKey) => {
    let shouldCompute = false;

    if (rowKey === "gov") {
      if (couValues[rowKey].finalUse.gcfGov) {
        const val = _.toString(_.toNumber(couValues[rowKey].finalUse.gcfGov));

        shouldCompute = val !== couValues[rowKey].finalUse.st;

        if (shouldCompute) couValues[rowKey].finalUse.st = val;
      }
    } else if (
      couValues[rowKey].finalUse.gcfHomes &&
      couValues[rowKey].finalUse.fbkFbkf &&
      couValues[rowKey].finalUse.fbkVe &&
      couValues[rowKey].finalUse.exports
    ) {
      const val = _.toString(
        _.toNumber(couValues[rowKey].finalUse.gcfHomes) +
          _.toNumber(couValues[rowKey].finalUse.fbkFbkf) +
          _.toNumber(couValues[rowKey].finalUse.fbkVe) +
          _.toNumber(couValues[rowKey].finalUse.exports)
      );

      shouldCompute = val !== couValues[rowKey].finalUse.st;

      if (shouldCompute) couValues[rowKey].finalUse.st = val;
    }

    // TODO: compute from st column values
    // TODO: compute from the other st and the total

    return shouldCompute;
  };

  const computeFinalTotalUse = (columnKey) => {
    let shouldCompute = false;

    if (columnKey === "gcfGov") {
      if (_.get(couValues.gov.finalUse, columnKey)) {
        const val = _.toString(
          _.toNumber(_.get(couValues.gov.finalUse, columnKey))
        );

        shouldCompute = val !== _.get(couValues.totalUses.finalUse, columnKey);

        if (shouldCompute) _.set(couValues.totalUses.finalUse, columnKey, val);
      }
    } else if (
      _.get(couValues.firstBranch.finalUse, columnKey) &&
      _.get(couValues.secondBranch.finalUse, columnKey) &&
      _.get(couValues.thirdBranch.finalUse, columnKey) &&
      _.get(couValues.imports.finalUse, columnKey)
    ) {
      const val = _.toString(
        _.toNumber(_.get(couValues.firstBranch.finalUse, columnKey)) +
          _.toNumber(_.get(couValues.secondBranch.finalUse, columnKey)) +
          _.toNumber(_.get(couValues.thirdBranch.finalUse, columnKey)) +
          _.toNumber(_.get(couValues.imports.finalUse, columnKey))
      );

      shouldCompute = val !== _.get(couValues.totalUses.finalUse, columnKey);

      if (shouldCompute) _.set(couValues.totalUses.finalUse, columnKey, val);
    }

    // TODO: compute using other total uses and the corresponding ST

    return shouldCompute;
  };

  const computeTotal = (rowKey) => {
    let shouldCompute = false;

    if (
      (couValues[rowKey].intermediateUse.st || rowKey === "gov") &&
      couValues[rowKey].finalUse.st
    ) {
      const val = _.toString(
        (rowKey === "gov"
          ? 0
          : _.toNumber(couValues[rowKey].intermediateUse.st)) +
          _.toNumber(couValues[rowKey].finalUse.st)
      );

      shouldCompute = val !== couValues[rowKey].total;

      if (shouldCompute) couValues[rowKey].total = val;
    }

    // TODO: compute copying values from Production row
    // TODO: compute using other totals

    return shouldCompute;
  };

  const compute = () => {
    let shouldCompute = true;

    while (shouldCompute) {
      shouldCompute =
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
        computeTotal("totalUses");
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
