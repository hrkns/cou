import _ from "lodash";
import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DisabledCells from "./DisabledCells";
import DisabledCell from "./DisabledCell";
import { getItem, setItem } from "../shared/db";
import hasContent from "../shared/hasContent";
import solveEquation from "../shared/solveEquation";
import isEquationSolvable from "../shared/isEquationSolvable";
import buildEquationSides from "../shared/buildEquationSides";

const CuPro = ({ appValues }) => {
  const branches = appValues.branches;
  const branchesIndexes = _.range(1, appValues.branches.length + 1);
  /******************************************************************************/
  const emptyCuproByActivity = {
    productionPerActivity: {
      resource: {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = "";
          return acc;
        }, {}),
        gov: "",
        total: "",
      },
    },
    intermediateConsumption: {
      usage: {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = "";
          return acc;
        }, {}),
        gov: "",
        total: "",
      },
    },
    vabPerActivity: {
      usage: {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = "";
          return acc;
        }, {}),
        gov: "",
        total: "",
      },
    },
    ckf: {
      usage: {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = "";
          return acc;
        }, {}),
        gov: "",
        total: "",
      },
    },
    vanPerActivity: {
      usage: {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = "";
          return acc;
        }, {}),
        gov: "",
        total: "",
      },
    },
  };
  const storedCuProByActivity = getItem("cuProByActivity");
  const [CuProByActivity, setCuProByActivity] = useState(
    _.cloneDeep(storedCuProByActivity || emptyCuproByActivity)
  );
  /******************************************************************************/
  const saveCuProByActivityValues = (content) => {
    setCuProByActivity(_.cloneDeep(content));
    setItem("cuProByActivity", content);
  };
  const handleCuProByActivityValueChange = (value, path) => {
    _.set(CuProByActivity, path, value);
    saveCuProByActivityValues(CuProByActivity);
  };
  /******************************************************************************/
  // given a cell changing its value, then a new loop calculation will be required
  const shouldCompute = (val, path) => {
    let cond = false;

    if (hasContent(val)) {
      cond = val !== _.get(CuProByActivity, path);
      // modify value in cou only if it's detected that the value has changed
      if (cond) {
        console.log(
          `Setting Production Account at ${path} with ${val}. Previous value: ${_.get(
            CuProByActivity,
            path
          )}`
        );
        _.set(CuProByActivity, path, val);
      } else {
        console.log(
          `Value at ${path} has not changed. Previous value: ${_.get(
            CuProByActivity,
            path
          )}`
        );
      }
    }

    return cond;
  };
  const computeByActivity = () => {
    console.log("Computing Production Account by Activity values");
    const equations = {};

    const generateEquationBasedOnBranches = (row, col, side) => {
      return branchesIndexes
        .reduce((equationElements, currentBranch) => {
          if (`branch${currentBranch}` === col) {
            equationElements.push("x");
          } else {
            equationElements.push(`${row}.${side}.branch${currentBranch}`);
          }
          equationElements.push("+");
          return equationElements;
        }, [])
        .concat([
          col === "gov" ? "x" : `${row}.${side}.gov`,
          "=",
          col === "total" ? "x" : `${row}.${side}.total`,
        ]);
    };
    const generateEquationInvolvingVanAndCkfAndVab = (row, col) => {
      return [
        row === "vabPerActivity" ? "x" : `vabPerActivity.usage.${col}`,
        "-",
        row === "ckf" ? "x" : `ckf.usage.${col}`,
        "=",
        row === "vanPerActivity" ? "x" : `vanPerActivity.usage.${col}`,
      ];
    };
    const generateEquationInvolvingVanAndCkfAndCiAndProd = (row, col) => {
      return [
        row === "productionPerActivity"
          ? "x"
          : `productionPerActivity.resource.${col}`,
        "-",
        row === "intermediateConsumption"
          ? "x"
          : `intermediateConsumption.usage.${col}`,
        "-",
        row === "ckf" ? "x" : `ckf.usage.${col}`,
        "=",
        row === "vanPerActivity" ? "x" : `vanPerActivity.usage.${col}`,
      ];
    };
    const generateEquationInvolvingVabAndCiAndProd = (row, col) => {
      return [
        row === "productionPerActivity"
          ? "x"
          : `productionPerActivity.resource.${col}`,
        "=",
        row === "intermediateConsumption"
          ? "x"
          : `intermediateConsumption.usage.${col}`,
        "+",
        row === "vabPerActivity" ? "x" : `vabPerActivity.usage.${col}`,
      ];
    };
    const setEquationsSubset = (row, side, equationBuilder) => {
      branchesIndexes.forEach((xBranch) => {
        equations[`${row}.${side}.branch${xBranch}`] =
          equations[`${row}.${side}.branch${xBranch}`] || [];
        equations[`${row}.${side}.branch${xBranch}`].push(
          equationBuilder(row, `branch${xBranch}`, side)
        );
      });
      equations[`${row}.${side}.gov`] = equations[`${row}.${side}.gov`] || [];
      equations[`${row}.${side}.gov`].push(equationBuilder(row, "gov", side));
      equations[`${row}.${side}.total`] =
        equations[`${row}.${side}.total`] || [];
      equations[`${row}.${side}.total`].push(
        equationBuilder(row, "total", side)
      );
    };

    Object.keys(emptyCuproByActivity).forEach((row) => {
      if (
        row === "vanPerActivity" ||
        row === "ckf" ||
        row === "vabPerActivity" ||
        row === "intermediateConsumption"
      ) {
        setEquationsSubset(row, "usage", generateEquationBasedOnBranches);

        if (
          row === "vanPerActivity" ||
          row === "ckf" ||
          row === "vabPerActivity"
        ) {
          setEquationsSubset(
            row,
            "usage",
            generateEquationInvolvingVanAndCkfAndVab
          );
        }

        if (
          row === "vanPerActivity" ||
          row === "ckf" ||
          row === "intermediateConsumption"
        ) {
          setEquationsSubset(
            row,
            "usage",
            generateEquationInvolvingVanAndCkfAndCiAndProd
          );
        }

        if (row === "vabPerActivity" || row === "intermediateConsumption") {
          setEquationsSubset(
            row,
            "usage",
            generateEquationInvolvingVabAndCiAndProd
          );
        }
      } else {
        setEquationsSubset(
          row,
          "resource",
          generateEquationInvolvingVabAndCiAndProd
        );
      }
    });

    let hasComputed;
    let maxAmountOfIterations = 20;

    do {
      const cells = Object.keys(equations);
      let index = 0;
      hasComputed = false;

      while (index < cells.length && !hasComputed) {
        const targetCell = cells[index];
        const equationsAssociatedToCell = equations[targetCell];
        let amountOfEvaluatedEquations = 0;
        console.log(`Solving ${targetCell}`);
        while (
          amountOfEvaluatedEquations < equationsAssociatedToCell.length &&
          !hasComputed
        ) {
          if (
            isEquationSolvable(
              equationsAssociatedToCell[amountOfEvaluatedEquations],
              CuProByActivity
            )
          ) {
            console.log(
              `Solving ${equationsAssociatedToCell[
                amountOfEvaluatedEquations
              ].join(" ")}`
            );
            const { leftSide, rightSide } = buildEquationSides(
              equationsAssociatedToCell[amountOfEvaluatedEquations],
              CuProByActivity
            );
            const val = solveEquation(leftSide, rightSide);
            hasComputed = shouldCompute(val, targetCell);
          } else {
            console.log(
              `Equation ${equationsAssociatedToCell[
                amountOfEvaluatedEquations
              ].join(" ")} is not solvable`
            );
          }

          amountOfEvaluatedEquations++;
        }

        index++;
      }

      maxAmountOfIterations--;
    } while (hasComputed && maxAmountOfIterations > 0);

    if (maxAmountOfIterations === 0) {
      alert(
        "Se ha alcanzado el máximo número de iteraciones para calcular la Cuenta de Producción por Actividad"
      );
    }

    saveCuProByActivityValues(CuProByActivity);
  };
  const emptyByActivity = () => {
    saveCuProByActivityValues(emptyCuproByActivity);
  };
  /******************************************************************************/
  const [showSaveByActivityModal, setShowSaveByActivityModal] = useState(false);
  const [showLoadByActivityModal, setShowLoadByActivityModal] = useState(false);
  const [showDeleteByActivityModal, setShowDeleteByActivity] = useState(false);
  const [savedCuProsByActivity, setSavedCuProsByActivity] = useState([]);
  const [fileNameByActivity, setFileNameByActivity] = useState("");
  const [optionByActivityToDelete, setOptionByActivityToDelete] = useState("");
  const handleCloseSaveByActivityModal = () => {
    setShowSaveByActivityModal(false);
  };
  const handleCloseLoadByActivityModal = () => {
    setShowLoadByActivityModal(false);
  };
  const handleCloseDeleteByActivityModal = () => {
    setShowDeleteByActivity(false);
  };
  const handleSaveByActivity = () => {
    if (fileNameByActivity?.trim().length === 0) return;
    const saved = getItem("saved") || {};
    saved.cuProByActivity = saved.cuProByActivity || {};
    saved.cuProByActivity[fileNameByActivity] = CuProByActivity;
    setItem("saved", saved);
    setShowSaveByActivityModal(false);
  };
  const handleLoadByActivity = () => {
    if (fileNameByActivity?.trim().length === 0) return;
    const saved = getItem("saved") || {};
    saved.cuProByActivity = saved.cuProByActivity || {};
    const cuProByActivity = saved.cuProByActivity[fileNameByActivity];
    if (!cuProByActivity) {
      alert("No existe la Cuenta de Producción por Actividad guardada!");
      return;
    }
    saveCuProByActivityValues(cuProByActivity);
    setShowLoadByActivityModal(false);
  };
  const handleDeleteByActivity = () => {
    const saved = getItem("saved") || {};
    saved.cuProByActivity = saved.cuProByActivity || {};
    delete saved.cuProByActivity[optionByActivityToDelete];
    setItem("saved", saved);
    setShowDeleteByActivity(false);
    updateSavedCuPros();
  };
  const updateSavedCuPros = () => {
    const saved = getItem("saved") || {};
    const cuProByActivity = saved.cuProByActivity || {};
    const cuProsByActivityNames = Object.keys(cuProByActivity);
    const ret = cuProsByActivityNames.length > 0;
    if (!ret) {
      alert("No hay Cuentas de Producción por Actividad guardadas");
    }
    setSavedCuProsByActivity(cuProsByActivityNames);
    setShowLoadByActivityModal(ret);
    return ret;
  };
  /******************************************************************************/
  const retrieveFromCouForByActivity = () => {
    // retrieve values from Production row
    branchesIndexes.forEach((idx) => {
      CuProByActivity.productionPerActivity.resource[`branch${idx}`] =
        appValues.cou.production.intermediateUse[`branch${idx}`];
    });
    CuProByActivity.productionPerActivity.resource.gov =
      appValues.cou.production.intermediateUse.gov;
    CuProByActivity.productionPerActivity.resource.total =
      appValues.cou.production.intermediateUse.st;

    // retrieve values from Intermediate Consumption row
    branchesIndexes.forEach((idx) => {
      CuProByActivity.intermediateConsumption.usage[`branch${idx}`] =
        appValues.cou.totalUses.intermediateUse[`branch${idx}`];
    });
    CuProByActivity.intermediateConsumption.usage.gov =
      appValues.cou.totalUses.intermediateUse.gov;
    CuProByActivity.intermediateConsumption.usage.total =
      appValues.cou.totalUses.intermediateUse.st;

    // retrieve values from VAB row
    branchesIndexes.forEach((idx) => {
      CuProByActivity.vabPerActivity.usage[`branch${idx}`] =
        appValues.cou.vab.intermediateUse[`branch${idx}`];
    });
    CuProByActivity.vabPerActivity.usage.gov =
      appValues.cou.vab.intermediateUse.gov;
    CuProByActivity.vabPerActivity.usage.total =
      appValues.cou.vab.intermediateUse.st;

    // retrieve values from CKF row
    branchesIndexes.forEach((idx) => {
      CuProByActivity.ckf.usage[`branch${idx}`] =
        appValues.cou.ckf.intermediateUse[`branch${idx}`];
    });
    CuProByActivity.ckf.usage.gov = appValues.cou.ckf.intermediateUse.gov;
    CuProByActivity.ckf.usage.total = appValues.cou.ckf.intermediateUse.st;

    saveCuProByActivityValues(CuProByActivity);
  };
  /******************************************************************************/
  return (
    <div>
      <div>
        <h2>Por Actividades</h2>
        <Button variant="primary" onClick={computeByActivity}>
          Calcular
        </Button>
        &nbsp;
        <Button variant="danger" onClick={emptyByActivity}>
          Vaciar
        </Button>
        &nbsp;
        <Button
          variant="success"
          onClick={() => setShowSaveByActivityModal(true)}
        >
          Guardar
        </Button>
        &nbsp;
        <Button
          variant="info"
          onClick={() => {
            setShowLoadByActivityModal(updateSavedCuPros());
          }}
        >
          Cargar
        </Button>
        &nbsp;
        <Button variant="warning" onClick={retrieveFromCouForByActivity}>
          Obtener valores desde el COU
        </Button>
        <Table
          striped
          bordered
          hover
          className="text-center align-middle mt-3 custom-table"
        >
          <thead>
            <tr>
              <th colSpan={branches.length + 2}>USOS</th>
              <th rowSpan={2}>Transacciones y otros saldos</th>
              <th colSpan={branches.length + 2}>RECURSOS</th>
            </tr>
            <tr>
              <th>Total</th>
              <th>Gobierno</th>
              {branches.toReversed().map((branch) => {
                return (
                  <th key={`usage_header_${branch.name}}`}>{branch.name}</th>
                );
              })}
              {branches.map((branch) => {
                return (
                  <th key={`resource_header_${branch.name}}`}>{branch.name}</th>
                );
              })}
              <th>Gobierno</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Fila Produccion por actividad */}
            <tr>
              {DisabledCells(
                `usage_productionPerActivity`,
                0,
                branches.length + 2
              )}
              <td>
                <strong>Producción por actividad</strong>
              </td>
              {branchesIndexes.map((idx) => {
                return (
                  <td key={`productionPerActivity_resource_branch${idx}}`}>
                    <input
                      className="invisible-input"
                      type="number"
                      value={
                        CuProByActivity.productionPerActivity.resource[
                          `branch${idx}`
                        ] ?? ""
                      }
                      onChange={(e) => {
                        handleCuProByActivityValueChange(
                          e.target.value,
                          `productionPerActivity.resource.branch${idx}`
                        );
                      }}
                    />
                  </td>
                );
              })}
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={
                    CuProByActivity.productionPerActivity.resource.gov ?? ""
                  }
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `productionPerActivity.resource.gov`
                    );
                  }}
                />
              </td>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={
                    CuProByActivity.productionPerActivity.resource.total ?? ""
                  }
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `productionPerActivity.resource.total`
                    );
                  }}
                />
              </td>
            </tr>

            {/* Fila Consumo Intermedio */}
            <tr>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={
                    CuProByActivity.intermediateConsumption.usage.total ?? ""
                  }
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `intermediateConsumption.usage.total`
                    );
                  }}
                />
              </td>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={
                    CuProByActivity.intermediateConsumption.usage.gov ?? ""
                  }
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `intermediateConsumption.usage.gov`
                    );
                  }}
                />
              </td>
              {branchesIndexes.toReversed().map((idx) => {
                return (
                  <td key={`intermediateConsumption_usage_${idx}}`}>
                    <input
                      className="invisible-input"
                      type="number"
                      value={
                        CuProByActivity.intermediateConsumption.usage[
                          `branch${idx}`
                        ] ?? ""
                      }
                      onChange={(e) => {
                        handleCuProByActivityValueChange(
                          e.target.value,
                          `intermediateConsumption.usage.branch${idx}`
                        );
                      }}
                    />
                  </td>
                );
              })}
              <td>
                <strong>Consumo Intermedio</strong>
              </td>
              {DisabledCells(
                `intermediateConsumption_resource`,
                5,
                branches.length + 2
              )}
            </tr>

            {/* Fila Valor Agregado Bruto por Actividad */}
            <tr>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={CuProByActivity.vabPerActivity.usage.total ?? ""}
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `vabPerActivity.usage.total`
                    );
                  }}
                />
              </td>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={CuProByActivity.vabPerActivity.usage.gov ?? ""}
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `vabPerActivity.usage.gov`
                    );
                  }}
                />
              </td>
              {branchesIndexes.toReversed().map((idx) => {
                return (
                  <td key={`vabPerActivity_usage${idx}}`}>
                    <input
                      className="invisible-input"
                      type="number"
                      value={
                        CuProByActivity.vabPerActivity.usage[`branch${idx}`] ??
                        ""
                      }
                      onChange={(e) => {
                        handleCuProByActivityValueChange(
                          e.target.value,
                          `vabPerActivity.usage.branch${idx}`
                        );
                      }}
                    />
                  </td>
                );
              })}
              <td>
                <strong>Valor Agregado Bruto por Actividad</strong>
              </td>
              {DisabledCells(`vabPerActivity_resource`, 5, branches.length + 2)}
            </tr>

            {/* Fila Consumo de Capital Fijo */}
            <tr>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={CuProByActivity.ckf.usage.total ?? ""}
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `ckf.usage.total`
                    );
                  }}
                />
              </td>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={CuProByActivity.ckf.usage.gov ?? ""}
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `ckf.usage.gov`
                    );
                  }}
                />
              </td>
              {branchesIndexes.toReversed().map((idx) => {
                return (
                  <td key={`ckf_usage${idx}}`}>
                    <input
                      className="invisible-input"
                      type="number"
                      value={CuProByActivity.ckf.usage[`branch${idx}`] ?? ""}
                      onChange={(e) => {
                        handleCuProByActivityValueChange(
                          e.target.value,
                          `ckf.usage.branch${idx}`
                        );
                      }}
                    />
                  </td>
                );
              })}
              <td>
                <strong>Consumo de Capital Fijo</strong>
              </td>
              {DisabledCells(`ckf_resource`, 5, branches.length + 2)}
            </tr>

            {/* Fila Valor Agregado Neto por Actividad */}
            <tr>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={CuProByActivity.vanPerActivity.usage.total ?? ""}
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `vanPerActivity.usage.total`
                    );
                  }}
                />
              </td>
              <td>
                <input
                  className="invisible-input"
                  type="number"
                  value={CuProByActivity.vanPerActivity.usage.gov ?? ""}
                  onChange={(e) => {
                    handleCuProByActivityValueChange(
                      e.target.value,
                      `vanPerActivity.usage.gov`
                    );
                  }}
                />
              </td>
              {branchesIndexes.toReversed().map((idx) => {
                return (
                  <td key={`vanPerActivity_usage${idx}}`}>
                    <input
                      className="invisible-input"
                      type="number"
                      value={
                        CuProByActivity.vanPerActivity.usage[`branch${idx}`] ??
                        ""
                      }
                      onChange={(e) => {
                        handleCuProByActivityValueChange(
                          e.target.value,
                          `vanPerActivity.usage.branch${idx}`
                        );
                      }}
                    />
                  </td>
                );
              })}
              <td>
                <strong>Valor agregado neto por actividad</strong>
              </td>
              {DisabledCells(`vanPerActivity_resource`, 5, branches.length + 2)}
            </tr>
          </tbody>
        </Table>
        {showSaveByActivityModal && (
          <Modal
            show={showSaveByActivityModal}
            onHide={handleCloseSaveByActivityModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Guardar Contenido de la Cuenta de Producción Por Actividades
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre del archivo:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del archivo"
                    value={fileNameByActivity}
                    onChange={(e) => setFileNameByActivity(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseSaveByActivityModal}
              >
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleSaveByActivity}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {showLoadByActivityModal && (
          <Modal
            show={showLoadByActivityModal}
            onHide={handleCloseLoadByActivityModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Cargar contenido a Cuenta de Produccion Por Actividad
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {savedCuProsByActivity.map((option, index) => (
                <div key={index}>
                  <Form.Check
                    type="radio"
                    value={option}
                    checked={fileNameByActivity === option}
                    onChange={(e) => setFileNameByActivity(e.target.value)}
                    label={
                      <span>
                        {option} &nbsp;{" "}
                        <strong
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setOptionByActivityToDelete(option);
                            setShowDeleteByActivity(true);
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
              <Button
                variant="secondary"
                onClick={handleCloseLoadByActivityModal}
              >
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleLoadByActivity}>
                Cargar
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {showDeleteByActivityModal && (
          <Modal
            show={showDeleteByActivityModal}
            onHide={handleCloseDeleteByActivityModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Eliminar Cuenta de Producción por Actividad
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                ¿Está seguro que desea eliminar esta Cuenta de Producción Por
                Actividad?
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseDeleteByActivityModal}
              >
                Cerrar
              </Button>
              <Button variant="danger" onClick={handleDeleteByActivity}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      {false && (
        <div>
          <h2>Por Sectores Institucionales</h2>
          <Table
            striped
            bordered
            hover
            className="text-center align-middle mt-3 custom-table"
          >
            <thead>
              <tr>
                <th colSpan={5}>USOS</th>
                <th rowSpan={2}>Transacciones y Otros Saldos</th>
                <th colSpan={5}>RECURSOS</th>
              </tr>
              <tr>
                <th>Total</th>
                <th>Resto del Mundo</th>
                <th>SubTotal</th>
                <th>Gobierno</th>
                <th>Sociedades</th>
                <th>Sociedades</th>
                <th>Gobierno</th>
                <th>SubTotal</th>
                <th>Resto del Mundo</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {DisabledCells("imports", 0, 5)}
                <td>
                  <strong>Importaciones de bienes y servicios</strong>
                </td>
                {DisabledCells("imports", 6, 3)}
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                {DisabledCells("exports", 3, 3)}
                <td>
                  <strong>Exportaciones de bienes y servicios</strong>
                </td>
                {DisabledCells("exports", 6, 5)}
              </tr>
              <tr>
                {DisabledCells("production", 0, 5)}
                <td>
                  <strong>Produccion</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <DisabledCell />
                <td></td>
              </tr>
              <tr>
                <td></td>
                <DisabledCell />
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>Consumo Intermedio</strong>
                </td>
                {DisabledCells("ci", 6, 5)}
              </tr>
              <tr>
                <td></td>
                <DisabledCell />
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>Valor Agregado Bruto</strong>
                </td>
                {DisabledCells("vab", 6, 5)}
              </tr>
              <tr>
                <td></td>
                <DisabledCell />
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>Consumo de Capital Fijo</strong>
                </td>
                {DisabledCells("ckf", 6, 5)}
              </tr>
              <tr>
                <td></td>
                <DisabledCell />
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>Valor Agregado Neto</strong>
                </td>
                {DisabledCells("van", 6, 5)}
              </tr>
              <tr>
                <td></td>
                <td></td>
                {DisabledCells("sbsce", 3, 3)}
                <td>
                  <strong>Saldo de bienes y servicios con el exterior</strong>
                </td>
                {DisabledCells("sbsce", 6, 5)}
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CuPro;
