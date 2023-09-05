import React, { useState } from "react";
import Table from "react-bootstrap/Table";
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
    eeb: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    vab: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
    production: _.cloneDeep(_.pick(branchRow, ["intermediateUse"])),
  });

  const setIntermediateUseSt = (branchName) => {
    if (
      couValues[branchName].intermediateUse.firstBranch &&
      couValues[branchName].intermediateUse.secondBranch &&
      couValues[branchName].intermediateUse.thirdBranch
    ) {
      couValues[branchName].intermediateUse.st =
        _.toNumber(couValues[branchName].intermediateUse.firstBranch) +
        _.toNumber(couValues[branchName].intermediateUse.secondBranch) +
        _.toNumber(couValues[branchName].intermediateUse.thirdBranch);
    } else {
      couValues[branchName].intermediateUse.st = null;
    }
  };

  const setFinalUseSt = (branchName) => {
    if (
      couValues[branchName].finalUse.gcf.homes &&
      couValues[branchName].finalUse.fbk.fbkf &&
      couValues[branchName].finalUse.fbk.ve &&
      couValues[branchName].finalUse.exports
    ) {
      couValues[branchName].finalUse.st =
        _.toNumber(couValues[branchName].finalUse.gcf.homes) +
        _.toNumber(couValues[branchName].finalUse.fbk.fbkf) +
        _.toNumber(couValues[branchName].finalUse.fbk.ve) +
        _.toNumber(couValues[branchName].finalUse.exports);
    } else {
      couValues[branchName].finalUse.st = null;
    }
  };

  const setTotal = (branchName) => {
    if (
      couValues[branchName].intermediateUse.st &&
      couValues[branchName].finalUse.st
    ) {
      couValues[branchName].total =
        _.toNumber(couValues[branchName].intermediateUse.st) +
        _.toNumber(couValues[branchName].finalUse.st);
    } else {
      couValues[branchName].total = null;
    }
  };

  const handleCouValueChange = (value, cellKey) => {
    _.set(couValues, cellKey, value);

    if (
      cellKey === "firstBranch.intermediateUse.firstBranch" ||
      cellKey === "firstBranch.intermediateUse.secondBranch" ||
      cellKey === "firstBranch.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("firstBranch");
      setTotal("firstBranch");
    }

    if (
      cellKey === "secondBranch.intermediateUse.firstBranch" ||
      cellKey === "secondBranch.intermediateUse.secondBranch" ||
      cellKey === "secondBranch.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("secondBranch");
      setTotal("secondBranch");
    }

    if (
      cellKey === "thirdBranch.intermediateUse.firstBranch" ||
      cellKey === "thirdBranch.intermediateUse.secondBranch" ||
      cellKey === "thirdBranch.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("thirdBranch");
      setTotal("thirdBranch");
    }

    if (
      cellKey === "imports.intermediateUse.firstBranch" ||
      cellKey === "imports.intermediateUse.secondBranch" ||
      cellKey === "imports.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("imports");
      setTotal("imports");
    }

    if (
      cellKey === "totalUses.intermediateUse.firstBranch" ||
      cellKey === "totalUses.intermediateUse.secondBranch" ||
      cellKey === "totalUses.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("totalUses");
      setTotal("totalUses");
    }

    if (
      cellKey === "ra.intermediateUse.firstBranch" ||
      cellKey === "ra.intermediateUse.secondBranch" ||
      cellKey === "ra.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("ra");
    }

    if (
      cellKey === "eeb.intermediateUse.firstBranch" ||
      cellKey === "eeb.intermediateUse.secondBranch" ||
      cellKey === "eeb.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("eeb");
    }

    if (
      cellKey === "vab.intermediateUse.firstBranch" ||
      cellKey === "vab.intermediateUse.secondBranch" ||
      cellKey === "vab.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("vab");
    }

    if (
      cellKey === "production.intermediateUse.firstBranch" ||
      cellKey === "production.intermediateUse.secondBranch" ||
      cellKey === "production.intermediateUse.thirdBranch"
    ) {
      setIntermediateUseSt("production");
    }

    if (
      cellKey === "firstBranch.finalUse.gcf.homes" ||
      cellKey === "firstBranch.finalUse.fbk.fbkf" ||
      cellKey === "firstBranch.finalUse.fbk.ve" ||
      cellKey === "firstBranch.finalUse.exports"
    ) {
      setFinalUseSt("firstBranch");
      setTotal("firstBranch");
    }

    if (
      cellKey === "secondBranch.finalUse.gcf.homes" ||
      cellKey === "secondBranch.finalUse.fbk.fbkf" ||
      cellKey === "secondBranch.finalUse.fbk.ve" ||
      cellKey === "secondBranch.finalUse.exports"
    ) {
      setFinalUseSt("secondBranch");
      setTotal("secondBranch");
    }

    if (
      cellKey === "thirdBranch.finalUse.gcf.homes" ||
      cellKey === "thirdBranch.finalUse.fbk.fbkf" ||
      cellKey === "thirdBranch.finalUse.fbk.ve" ||
      cellKey === "thirdBranch.finalUse.exports"
    ) {
      setFinalUseSt("thirdBranch");
      setTotal("thirdBranch");
    }

    if (
      cellKey === "imports.finalUse.gcf.homes" ||
      cellKey === "imports.finalUse.fbk.fbkf" ||
      cellKey === "imports.finalUse.fbk.ve" ||
      cellKey === "imports.finalUse.exports"
    ) {
      setFinalUseSt("imports");
      setTotal("imports");
    }

    if (
      cellKey === "totalUses.finalUse.gcf.homes" ||
      cellKey === "totalUses.finalUse.fbk.fbkf" ||
      cellKey === "totalUses.finalUse.fbk.ve" ||
      cellKey === "totalUses.finalUse.exports"
    ) {
      setFinalUseSt("totalUses");
      setTotal("totalUses");
    }

    if (
      cellKey === "firstBranch.intermediateUse.st" ||
      cellKey === "firstBranch.finalUse.st"
    ) {
      setTotal("firstBranch");

      if (cellKey === "firstBranch.intermediateUse.st") {
        couValues.firstBranch.intermediateUse.firstBranch = null;
        couValues.firstBranch.intermediateUse.secondBranch = null;
        couValues.firstBranch.intermediateUse.thirdBranch = null;
      } else {
        couValues.firstBranch.finalUse.gcf.homes = null;
        couValues.firstBranch.finalUse.fbk.fbkf = null;
        couValues.firstBranch.finalUse.fbk.ve = null;
        couValues.firstBranch.finalUse.exports = null;
      }
    }

    if (
      cellKey === "secondBranch.intermediateUse.st" ||
      cellKey === "secondBranch.finalUse.st"
    ) {
      setTotal("secondBranch");

      if (cellKey === "secondBranch.intermediateUse.st") {
        couValues.secondBranch.intermediateUse.firstBranch = null;
        couValues.secondBranch.intermediateUse.secondBranch = null;
        couValues.secondBranch.intermediateUse.thirdBranch = null;
      } else {
        couValues.secondBranch.finalUse.gcf.homes = null;
        couValues.secondBranch.finalUse.fbk.fbkf = null;
        couValues.secondBranch.finalUse.fbk.ve = null;
        couValues.secondBranch.finalUse.exports = null;
      }
    }

    if (
      cellKey === "thirdBranch.intermediateUse.st" ||
      cellKey === "thirdBranch.finalUse.st"
    ) {
      setTotal("thirdBranch");

      if (cellKey === "thirdBranch.intermediateUse.st") {
        couValues.thirdBranch.intermediateUse.firstBranch = null;
        couValues.thirdBranch.intermediateUse.secondBranch = null;
        couValues.thirdBranch.intermediateUse.thirdBranch = null;
      } else {
        couValues.thirdBranch.finalUse.gcf.homes = null;
        couValues.thirdBranch.finalUse.fbk.fbkf = null;
        couValues.thirdBranch.finalUse.fbk.ve = null;
        couValues.thirdBranch.finalUse.exports = null;
      }
    }

    if (
      cellKey === "imports.intermediateUse.st" ||
      cellKey === "imports.finalUse.st"
    ) {
      setTotal("imports");

      if (cellKey === "imports.intermediateUse.st") {
        couValues.imports.intermediateUse.firstBranch = null;
        couValues.imports.intermediateUse.secondBranch = null;
        couValues.imports.intermediateUse.thirdBranch = null;
      } else {
        couValues.imports.finalUse.gcf.homes = null;
        couValues.imports.finalUse.fbk.fbkf = null;
        couValues.imports.finalUse.fbk.ve = null;
        couValues.imports.finalUse.exports = null;
      }
    }

    if (
      cellKey === "totalUses.intermediateUse.st" ||
      cellKey === "totalUses.finalUse.st"
    ) {
      setTotal("totalUses");

      if (cellKey === "totalUses.intermediateUse.st") {
        couValues.totalUses.intermediateUse.firstBranch = null;
        couValues.totalUses.intermediateUse.secondBranch = null;
        couValues.totalUses.intermediateUse.thirdBranch = null;
      } else {
        couValues.totalUses.finalUse.gcf.homes = null;
        couValues.totalUses.finalUse.fbk.fbkf = null;
        couValues.totalUses.finalUse.fbk.ve = null;
        couValues.totalUses.finalUse.exports = null;
      }
    }

    if (cellKey === "ra.intermediateUse.st") {
      couValues.ra.intermediateUse.firstBranch = null;
      couValues.ra.intermediateUse.secondBranch = null;
      couValues.ra.intermediateUse.thirdBranch = null;
    }

    if (cellKey === "eeb.intermediateUse.st") {
      couValues.eeb.intermediateUse.firstBranch = null;
      couValues.eeb.intermediateUse.secondBranch = null;
      couValues.eeb.intermediateUse.thirdBranch = null;
    }

    if (cellKey === "vab.intermediateUse.st") {
      couValues.vab.intermediateUse.firstBranch = null;
      couValues.vab.intermediateUse.secondBranch = null;
      couValues.vab.intermediateUse.thirdBranch = null;
    }

    if (cellKey === "production.intermediateUse.st") {
      couValues.production.intermediateUse.firstBranch = null;
      couValues.production.intermediateUse.secondBranch = null;
      couValues.production.intermediateUse.thirdBranch = null;
    }

    if (cellKey === "firstBranch.total") {
      couValues.firstBranch.intermediateUse.st = null;
      couValues.firstBranch.finalUse.st = null;
    }

    if (cellKey === "secondBranch.total") {
      couValues.secondBranch.intermediateUse.st = null;
      couValues.secondBranch.finalUse.st = null;
    }

    if (cellKey === "thirdBranch.total") {
      couValues.thirdBranch.intermediateUse.st = null;
      couValues.thirdBranch.finalUse.st = null;
    }

    if (cellKey === "imports.total") {
      couValues.imports.intermediateUse.st = null;
      couValues.imports.finalUse.st = null;
    }

    if (cellKey === "totalUses.total") {
      couValues.totalUses.intermediateUse.st = null;
      couValues.totalUses.finalUse.st = null;
    }

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

  return (
    <div className="App m-5">
      <header className="App-header">
        <h1>Tabla de Utilización</h1>
      </header>
      <main>
        <Table striped bordered hover className="text-center align-middle">
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

            {/* EEB Row */}
            <tr>
              <td>
                <strong>EEB (CKF + EEN)</strong>
              </td>
              {IntermediateUseRow("eeb")}
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
