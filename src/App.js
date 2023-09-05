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

  const handleCouValueChange = (value, cellKey) => {
    _.set(couValues, cellKey, value);
    setIntermediateUseSt("firstBranch");
    setIntermediateUseSt("secondBranch");
    setIntermediateUseSt("thirdBranch");
    setIntermediateUseSt("imports");
    setIntermediateUseSt("totalUses");
    setIntermediateUseSt("ra");
    setIntermediateUseSt("eeb");
    setIntermediateUseSt("vab");
    setIntermediateUseSt("production");
    setFinalUseSt("firstBranch");
    setFinalUseSt("secondBranch");
    setFinalUseSt("thirdBranch");
    setFinalUseSt("imports");
    setFinalUseSt("totalUses");
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
            handleCouValueChange(
              e.target.value,
              rowKey + ".finalUse.fbk.fbkf"
            );
          }}
        />
      </td>,
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.fbk.ve ?? ""}
          onChange={(e) => {
            handleCouValueChange(
              e.target.value,
              rowKey + ".finalUse.fbk.ve"
            );
          }}
        />
      </td>,
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.exports ?? ""}
          onChange={(e) => {
            handleCouValueChange(
              e.target.value,
              rowKey + ".finalUse.exports"
            );
          }}
        />
      </td>,
      <td>
        <input
          className="invisible-input"
          type="number"
          value={couValues[rowKey].finalUse.st ?? ""}
          onChange={(e) => {
            handleCouValueChange(
              e.target.value,
              rowKey + ".finalUse.st"
            );
          }}
        />
      </td>
    ];
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
              <td>
                <input className="invisible-input" type="number" />
              </td>
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
              <td>
                <input className="invisible-input" type="number" />
              </td>
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
              <td>
                <input className="invisible-input" type="number" />
              </td>
            </tr>
            {/* Imports Row */}
            <tr>
              <td>
                <strong>Import.</strong>
              </td>
              {IntermediateUseRow("imports")}
              {FinalUseRow("imports")}
              <td>
                <input className="invisible-input" type="number" />
              </td>
            </tr>
            {/* Total Uses Row */}
            <tr>
              <td>
                <strong>Usos Totales</strong>
              </td>
              {IntermediateUseRow("totalUses")}
              {FinalUseRow("totalUses")}
              <td>
                <input className="invisible-input" type="number" />
              </td>
            </tr>
            {/* RA Row */}
            <tr>
              <td>
                <strong>RA</strong>
              </td>
              {IntermediateUseRow("ra")}
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
            </tr>
            {/* EEB Row */}
            <tr>
              <td>
                <strong>EEB (CKF + EEN)</strong>
              </td>
              {IntermediateUseRow("eeb")}
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
            </tr>
            {/* VAB Row */}
            <tr>
              <td>
                <strong>VAB</strong>
              </td>
              {IntermediateUseRow("vab")}
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
            </tr>
            {/* Production Row */}
            <tr>
              <td>
                <strong>Producción</strong>
              </td>
              {IntermediateUseRow("production")}
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
              <td className="no-use"></td>
            </tr>
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default App;
