import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./App.css";
import _ from "lodash";

const branchRow = {
  intermediateUse: {
    firstBranch: null,
    secondBranch: null,
    thirdBranch: null,
    st: null,
  },
  finalUse: {
    gcf: {
      homes: null,
    },
    fbk: {
      fbkf: null,
      ve: null,
    },
    exports: null,
    st: null,
  },
  total: null,
};

const App = () => {
  const [firstBranchName, setFirstBranchName] = useState("Rama 1");
  const [secondBranchName, setSecondBranchName] = useState("Rama 2");
  const [thirdBranchName, setThirdBranchName] = useState("Rama 3");
  const [couValues, setCouValues] = useState({
    firstBranch: _.cloneDeep(branchRow),
    secondBranch: _.cloneDeep(branchRow),
    thirdBranch: _.cloneDeep(branchRow),
    imports: _.cloneDeep(branchRow),
    totalUses: _.cloneDeep(branchRow),
    ra: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    ckf: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    een: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    vab: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    production: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
  });

  const handleCouValueChange = (value, cellKey) => {
    _.set(couValues, cellKey, value);
    setCouValues(_.cloneDeep(couValues));
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
          value={couValues[rowKey].finalUse.gcf.homes ?? ""}
          onChange={(e) => {
            handleCouValueChange(
              e.target.value,
              rowKey + ".finalUse.gcf.homes"
            );
          }}
        />
      </td>,
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.fbk.fbkf ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.fbk.fbkf");
          }}
        />
      </td>,
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.fbk.ve ?? ""}
          onChange={(e) => {
            handleCouValueChange(e.target.value, rowKey + ".finalUse.fbk.ve");
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

  const computeIntermediateUseSt = (rowKey) => {
    let shouldCompute = false;

    if (
      couValues[rowKey].intermediateUse.firstBranch &&
      couValues[rowKey].intermediateUse.secondBranch &&
      couValues[rowKey].intermediateUse.thirdBranch
    ) {
      const val = _.toString(
        _.toNumber(couValues[rowKey].intermediateUse.firstBranch) +
          _.toNumber(couValues[rowKey].intermediateUse.secondBranch) +
          _.toNumber(couValues[rowKey].intermediateUse.thirdBranch)
      );

      shouldCompute = val !== couValues[rowKey].intermediateUse.st;

      if (shouldCompute) couValues[rowKey].intermediateUse.st = val;
    }

    return shouldCompute;
  };

  const computeTotalUse = (columnKey) => {
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
  };

  const compute = () => {
    let shouldCompute = true;

    while (shouldCompute) {
      shouldCompute =
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
        computeTotalUse("firstBranch") ||
        computeTotalUse("secondBranch") ||
        computeTotalUse("thirdBranch") ||
        computeTotalUse("st") ||
        computeVab("firstBranch") ||
        computeVab("secondBranch") ||
        computeVab("thirdBranch") ||
        computeVab("st") ||
        computeProduction("firstBranch") ||
        computeProduction("secondBranch") ||
        computeProduction("thirdBranch") ||
        computeProduction("st");
    }

    setCouValues(_.cloneDeep(couValues));
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
        <Table striped bordered hover className="text-center align-middle mt-3">
          <thead>
            <tr>
              <th rowSpan={3}></th>
              <th colSpan={4} rowSpan={2}>
                UTILIZACION INTERMEDIA
              </th>
              <th colSpan={5}>UTILIZACION FINAL</th>
              <th rowSpan={3}>Total</th>
            </tr>
            <tr>
              <th>GCF</th>
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
              <th>ST</th>
              <th>Hogares</th>
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
