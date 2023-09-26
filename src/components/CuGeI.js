import React, { useState } from "react";
import _ from "lodash";
import { Button, Table } from "react-bootstrap";
import DisabledCells from "./DisabledCells";
import DisabledCell from "./DisabledCell";
import hasContent from "../shared/hasContent";
import { getItem, setItem } from "../shared/db";
import isEquationSolvable from "../shared/isEquationSolvable";
import buildEquationSides from "../shared/buildEquationSides";
import solveEquation from "../shared/solveEquation";
import shouldCompute from "../shared/shouldCompute";
import TableInputGenerator from "./TableInputGenerator";
import CrudModals from "./CrudModals";

const CuGeI = ({ appValues }) => {
  const branches = appValues.branches;
  const branchesIndexes = _.range(1, appValues.branches.length + 1);
  /******************************************************************************/
  const emptyCuGeIByActivity = {
    vabPerActivity: {
      resource: {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = "";
          return acc;
        }, {}),
        gov: "",
        total: "",
      },
    },
    ra: {
      usage: {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = "";
          return acc;
        }, {}),
        gov: "",
        total: "",
      },
    },
    tax: {
      usage: {
        ...branchesIndexes.reduce((acc, idx) => {
          acc[`branch${idx}`] = "";
          return acc;
        }, {}),
        gov: "",
        total: "",
      },
    },
    eeb: {
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
  const storedCuGeIByActivity = getItem("cuGeIByActivity");
  const [CuGeIByActivity, setCuGeIByActivity] = useState(
    _.cloneDeep(storedCuGeIByActivity || emptyCuGeIByActivity)
  );
  const saveCuGeIByActivityValues = (content) => {
    setCuGeIByActivity(_.cloneDeep(content));
    setItem("cuGeIByActivity", content);
  };
  const handleCuGeIByActivityValueChange = (value, path) => {
    _.set(CuGeIByActivity, path, value);
    saveCuGeIByActivityValues(CuGeIByActivity);
  };
  const computeByActivity = () => {
    console.log("Computing Income Generation Account by Activity values");
    const equations = {};

    Object.keys(emptyCuGeIByActivity).forEach((row) => {
      // TODO: build equations for each row
    });

    let hasComputed;
    let maxAmountOfIterations = 100;

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
              CuGeIByActivity
            )
          ) {
            console.log(
              `Solving ${equationsAssociatedToCell[
                amountOfEvaluatedEquations
              ].join(" ")}`
            );
            const { leftSide, rightSide } = buildEquationSides(
              equationsAssociatedToCell[amountOfEvaluatedEquations],
              CuGeIByActivity
            );
            const val = solveEquation(leftSide, rightSide);
            hasComputed = shouldCompute(CuGeIByActivity, val, targetCell);
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
        "Se ha alcanzado el máximo número de iteraciones para calcular la Cuenta de Generación de Ingresos por Actividad"
      );
    }

    saveCuGeIByActivityValues(CuGeIByActivity);
  };
  const emptyByActivity = () => {
    saveCuGeIByActivityValues(emptyCuGeIByActivity);
  };
  const retrieveFromCouForByActivity = () => {
    // retrieve values from VAB row
    if (
      _.every(branchesIndexes, (idx) =>
        hasContent(appValues.cou.vab.intermediateUse[`branch${idx}`])
      )
    ) {
      branchesIndexes.forEach((idx) => {
        CuGeIByActivity.vabPerActivity.resource[`branch${idx}`] =
          appValues.cou.vab.intermediateUse[`branch${idx}`];
      });
    }
    CuGeIByActivity.vabPerActivity.resource.gov =
      appValues.cou.vab.intermediateUse.gov;
    CuGeIByActivity.vabPerActivity.resource.total =
      appValues.cou.vab.intermediateUse.st;

    // retrieve values from RA row

    if (
      _.every(branchesIndexes, (idx) =>
        hasContent(appValues.cou.ra.intermediateUse[`branch${idx}`])
      )
    ) {
      branchesIndexes.forEach((idx) => {
        CuGeIByActivity.ra.usage[`branch${idx}`] =
          appValues.cou.ra.intermediateUse[`branch${idx}`];
      });
    }
    CuGeIByActivity.ra.usage.gov = appValues.cou.ra.intermediateUse.gov;
    CuGeIByActivity.ra.usage.total = appValues.cou.ra.intermediateUse.st;

    // retrieve values from TAX row
    if (
      _.every(branchesIndexes, (idx) =>
        hasContent(appValues.cou.tax.intermediateUse[`branch${idx}`])
      )
    ) {
      branchesIndexes.forEach((idx) => {
        CuGeIByActivity.tax.usage[`branch${idx}`] =
          appValues.cou.tax.intermediateUse[`branch${idx}`];
      });
    }
    CuGeIByActivity.tax.usage.gov = appValues.cou.tax.intermediateUse.gov;
    CuGeIByActivity.tax.usage.total = appValues.cou.tax.intermediateUse.st;

    // retrieve values for EEB row
    if (
      _.every(
        branchesIndexes,
        (idx) =>
          hasContent(appValues.cou.een.intermediateUse[`branch${idx}`]) &&
          hasContent(appValues.cou.ckf.intermediateUse[`branch${idx}`])
      )
    ) {
      branchesIndexes.forEach((idx) => {
        CuGeIByActivity.eeb.usage[`branch${idx}`] =
          _.toNumber(appValues.cou.een.intermediateUse[`branch${idx}`]) +
          _.toNumber(appValues.cou.ckf.intermediateUse[`branch${idx}`]);
      });
    }
    CuGeIByActivity.eeb.usage.gov =
      _.toNumber(appValues.cou.ckf.intermediateUse.gov) +
      _.toNumber(appValues.cou.een.intermediateUse.gov);
    CuGeIByActivity.eeb.usage.total =
      _.toNumber(appValues.cou.ckf.intermediateUse.st) +
      _.toNumber(appValues.cou.een.intermediateUse.st);

    saveCuGeIByActivityValues(CuGeIByActivity);
  };
  const cellGeneratorForByActivities = new TableInputGenerator(
    CuGeIByActivity,
    handleCuGeIByActivityValueChange
  );
  /******************************************************************************/
  const emptyCuGeIByInstitutionalSectors = {
    sbsx: {
      resource: {
        rm: null,
        total: null,
      },
      usage: {
        rm: null,
        total: null,
      },
    },
    vab: {
      resource: {
        society: null,
        gov: null,
        st: null,
      },
    },
    ra: {
      usage: {
        society: null,
        gov: null,
        st: null,
        total: null,
      },
    },
    tax: {
      usage: {
        society: null,
        st: null,
        total: null,
      },
    },
    eeb: {
      usage: {
        society: null,
        gov: null,
        st: null,
        total: null,
      },
    },
  };
  const storedCuGeIByInstitutionalSectors = getItem(
    "cuGeIByInstitutionalSectors"
  );
  const [CuGeIByInstitutionalSectors, setCuGeIByInstitutionalSectors] =
    useState(
      _.cloneDeep(
        storedCuGeIByInstitutionalSectors || emptyCuGeIByInstitutionalSectors
      )
    );
  const saveCuGeIByInstitutionalSectorsValues = (content) => {
    setCuGeIByInstitutionalSectors(_.cloneDeep(content));
    setItem("cuGeIByInstitutionalSectors", content);
  };
  const handleCuGeIByInstitutionalSectorsValueChange = (value, path) => {
    _.set(CuGeIByInstitutionalSectors, path, value);
    saveCuGeIByInstitutionalSectorsValues(CuGeIByInstitutionalSectors);
  };
  const computeByInstitutionalSectors = () => {
    console.log(
      "Computing Income Generation Account by Institutional Sectors values"
    );
    let hasComputed = false;
    let maxAmountOfIterations = 100;

    do {
      hasComputed = false;
      const rows = Object.keys(emptyCuGeIByInstitutionalSectors);
      let iRows = 0;

      while (iRows < rows.length && !hasComputed) {
        const row = rows[iRows];
        let side;
        let cols;
        const equationsGenerators = [];

        let iCols = 0;
        while (iCols < cols.length && !hasComputed) {
          const col = cols[iCols];
          let iEquations = 0;
          while (iEquations < equationsGenerators.length && !hasComputed) {
            const equation = equationsGenerators[iEquations](col, row);
            if (isEquationSolvable(equation, CuGeIByInstitutionalSectors)) {
              console.log(`Solving ${equation.join(" ")}`);
              const { leftSide, rightSide } = buildEquationSides(
                equation,
                CuGeIByInstitutionalSectors
              );
              hasComputed = shouldCompute(
                CuGeIByInstitutionalSectors,
                solveEquation(leftSide, rightSide),
                `${row}.${side}.${col}`
              );
            } else {
              console.log(`Equation ${equation.join(" ")} is not solvable`);
            }
            iEquations++;
          }
          iCols++;
        }
        iRows++;
      }
      maxAmountOfIterations--;
    } while (hasComputed && maxAmountOfIterations > 0);

    if (maxAmountOfIterations === 0) {
      alert(
        "Se ha alcanzado el máximo número de iteraciones para calcular la Cuenta de Generación de Ingresos por Sectores Institucionales"
      );
    }

    saveCuGeIByInstitutionalSectorsValues(CuGeIByInstitutionalSectors);
  };
  const emptyByInstitutionalSectors = () => {
    saveCuGeIByInstitutionalSectorsValues(emptyCuGeIByInstitutionalSectors);
  };
  const retrieveFromCouForByInstitutionalSectors = () => {
    // Saldo de Balanza Comercial
    if (
      hasContent(appValues.cou.imports.total) &&
      hasContent(appValues.cou.totalUses.finalUse.exports)
    ) {
      const val = -(
        _.toNumber(appValues.cou.totalUses.finalUse.exports) -
        _.toNumber(appValues.cou.imports.total)
      );
      CuGeIByInstitutionalSectors.sbsx.resource.rm = val;
      CuGeIByInstitutionalSectors.sbsx.resource.total = val;
      CuGeIByInstitutionalSectors.sbsx.usage.rm = val;
      CuGeIByInstitutionalSectors.sbsx.usage.total = val;
    }

    // VAB
    if (
      _.every(branchesIndexes, (idx) =>
        hasContent(appValues.cou.vab.intermediateUse[`branch${idx}`])
      )
    ) {
      CuGeIByInstitutionalSectors.vab.resource.society = _.sum(
        branchesIndexes.map((idx) =>
          _.toNumber(appValues.cou.vab.intermediateUse[`branch${idx}`])
        )
      );
    }
    CuGeIByInstitutionalSectors.vab.resource.gov =
      appValues.cou.vab.intermediateUse.gov;
    CuGeIByInstitutionalSectors.vab.resource.st =
      appValues.cou.vab.intermediateUse.st;
    CuGeIByInstitutionalSectors.vab.resource.total =
      appValues.cou.vab.intermediateUse.st;

    // RA
    if (
      _.every(branchesIndexes, (idx) =>
        hasContent(appValues.cou.ra.intermediateUse[`branch${idx}`])
      )
    ) {
      CuGeIByInstitutionalSectors.ra.usage.society = _.sum(
        branchesIndexes.map((idx) =>
          _.toNumber(appValues.cou.ra.intermediateUse[`branch${idx}`])
        )
      );
    }
    CuGeIByInstitutionalSectors.ra.usage.gov =
      appValues.cou.ra.intermediateUse.gov;
    CuGeIByInstitutionalSectors.ra.usage.st =
      appValues.cou.ra.intermediateUse.st;
    CuGeIByInstitutionalSectors.ra.usage.total =
      appValues.cou.ra.intermediateUse.st;

    // Taxes
    if (
      _.every(branchesIndexes, (idx) =>
        hasContent(appValues.cou.tax.intermediateUse[`branch${idx}`])
      )
    ) {
      CuGeIByInstitutionalSectors.tax.usage.society = _.sum(
        branchesIndexes.map((idx) =>
          _.toNumber(appValues.cou.tax.intermediateUse[`branch${idx}`])
        )
      );
    }
    CuGeIByInstitutionalSectors.tax.usage.st =
      appValues.cou.tax.intermediateUse.st;
    CuGeIByInstitutionalSectors.tax.usage.total =
      appValues.cou.tax.intermediateUse.st;

    // EEB
    if (
      _.every(
        branchesIndexes,
        (idx) =>
          hasContent(appValues.cou.een.intermediateUse[`branch${idx}`]) &&
          hasContent(appValues.cou.ckf.intermediateUse[`branch${idx}`])
      )
    ) {
      CuGeIByInstitutionalSectors.eeb.usage.society = _.sum(
        branchesIndexes.map(
          (idx) =>
            _.toNumber(appValues.cou.een.intermediateUse[`branch${idx}`]) +
            _.toNumber(appValues.cou.ckf.intermediateUse[`branch${idx}`])
        )
      );
    }
    CuGeIByInstitutionalSectors.eeb.usage.gov =
      _.toNumber(appValues.cou.een.intermediateUse.gov) +
      _.toNumber(appValues.cou.ckf.intermediateUse.gov);
    CuGeIByInstitutionalSectors.eeb.usage.st =
      _.toNumber(appValues.cou.een.intermediateUse.st) +
      _.toNumber(appValues.cou.ckf.intermediateUse.st);
    CuGeIByInstitutionalSectors.eeb.usage.total =
      _.toNumber(appValues.cou.een.intermediateUse.st) +
      _.toNumber(appValues.cou.ckf.intermediateUse.st);

    saveCuGeIByInstitutionalSectorsValues(CuGeIByInstitutionalSectors);
  };

  const cellGeneratorForByInstitutionalSectors = new TableInputGenerator(
    CuGeIByInstitutionalSectors,
    handleCuGeIByInstitutionalSectorsValueChange
  );

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
        <CrudModals
          currentItem={CuGeIByActivity}
          storageKey="cuGeIByActivity"
          saveModalTitle="Guardar Cuenta de Generación de Ingresos por Actividad"
          loadModalTitle="Cargar Cuenta de Generación de Ingresos por Actividad"
          deleteModalTitle="Borrar Cuenta de Generación de Ingresos por Actividad"
          deleteModalMessage="¿Está seguro que desea borrar la Cuenta de Generación de Ingresos por Actividad?"
          itemSaver={saveCuGeIByActivityValues}
        />
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
            {/* Fila Valor Agregado Bruto por Actividad */}
            <tr>
              {DisabledCells(`resource_vab`, 0, branches.length + 2)}
              <td>
                <strong>Valor Agregado Bruto por actividad</strong>
              </td>
              {branchesIndexes.map((idx) => {
                return cellGeneratorForByActivities.generate(
                  `vabPerActivity.resource.branch${idx}`
                );
              })}
              {cellGeneratorForByActivities.generate(
                `vabPerActivity.resource.gov`
              )}
              {cellGeneratorForByActivities.generate(
                `vabPerActivity.resource.total`
              )}
            </tr>

            {/* Fila Remuneración de Asalariados */}
            <tr>
              {cellGeneratorForByActivities.generate(`ra.usage.total`)}
              {cellGeneratorForByActivities.generate(`ra.usage.gov`)}
              {branchesIndexes.toReversed().map((idx) => {
                return cellGeneratorForByActivities.generate(
                  `ra.usage.branch${idx}`
                );
              })}
              <td>
                <strong>Remuneración de Asalariados</strong>
              </td>
              {DisabledCells(`usage_ra_`, 5, branches.length + 2)}
            </tr>

            {/* Fila Impuestos.- Subsidios sobre la Producción */}
            <tr>
              {cellGeneratorForByActivities.generate(`tax.usage.total`)}
              <DisabledCell />
              {branchesIndexes.toReversed().map((idx) => {
                return cellGeneratorForByActivities.generate(
                  `tax.usage.branch${idx}`
                );
              })}
              <td>
                <strong>Impuestos.- Subsidios sobre la Producción</strong>
              </td>
              {DisabledCells(`usage_tax_`, 5, branches.length + 2)}
            </tr>

            {/* Fila Excedente de Explotación Bruto */}
            <tr>
              {cellGeneratorForByActivities.generate(`eeb.usage.total`)}
              {cellGeneratorForByActivities.generate(`eeb.usage.gov`)}
              {branchesIndexes.toReversed().map((idx) => {
                return cellGeneratorForByActivities.generate(
                  `eeb.usage.branch${idx}`
                );
              })}
              <td>
                <strong>Consumo de Capital Fijo</strong>
              </td>
              {DisabledCells(`usage_eeb_`, 5, branches.length + 2)}
            </tr>
          </tbody>
        </Table>
      </div>
      <div>
        <h2>Por Sectores Institucionales</h2>
        <Button variant="primary" onClick={computeByInstitutionalSectors}>
          Calcular
        </Button>
        &nbsp;
        <Button variant="danger" onClick={emptyByInstitutionalSectors}>
          Vaciar
        </Button>
        &nbsp;
        <CrudModals
          currentItem={CuGeIByInstitutionalSectors}
          storageKey="cuGeIByInstitutionalSectors"
          saveModalTitle="Guardar Cuenta de Generación de Ingresos por Sectores Institucionales"
          loadModalTitle="Cargar Cuenta de Generación de Ingresos por Sectores Institucionales"
          deleteModalTitle="Borrar Cuenta de Generación de Ingresos por Sectores Institucionales"
          deleteModalMessage="¿Está seguro que desea borrar la Cuenta de Generación de Ingresos por Sectores Institucionales?"
          itemSaver={saveCuGeIByInstitutionalSectorsValues}
        />
        &nbsp;
        <Button
          variant="warning"
          onClick={retrieveFromCouForByInstitutionalSectors}
        >
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
              {DisabledCells(`sbsx.resource`, 0, 5)}
              <td>
                <strong>Saldo de bienes y servicios con el exterior</strong>
              </td>
              {DisabledCells(`sbsx.resource`, 6, 3)}
              {cellGeneratorForByInstitutionalSectors.generate(
                "sbsx.resource.rm"
              )}
              {cellGeneratorForByInstitutionalSectors.generate(
                "sbsx.resource.total"
              )}
            </tr>
            <tr>
              {DisabledCells(`vab`, 0, 5)}
              <td>
                <strong>Valor Agregado Bruto</strong>
              </td>
              {cellGeneratorForByInstitutionalSectors.generate(
                "vab.resource.society"
              )}
              {cellGeneratorForByInstitutionalSectors.generate(
                "vab.resource.gov"
              )}
              {cellGeneratorForByInstitutionalSectors.generate(
                "vab.resource.st"
              )}
              <DisabledCell />
              {cellGeneratorForByInstitutionalSectors.generate(
                "vab.resource.total"
              )}
            </tr>
            <tr>
              {cellGeneratorForByInstitutionalSectors.generate(
                "ra.usage.total"
              )}
              <DisabledCell />
              {cellGeneratorForByInstitutionalSectors.generate("ra.usage.st")}
              {cellGeneratorForByInstitutionalSectors.generate("ra.usage.gov")}
              {cellGeneratorForByInstitutionalSectors.generate(
                "ra.usage.society"
              )}
              <td>
                <strong>Remuneración de Asalariados</strong>
              </td>
              {DisabledCells(`ra`, 6, 5)}
            </tr>
            <tr>
              {cellGeneratorForByInstitutionalSectors.generate(
                "tax.usage.total"
              )}
              <DisabledCell />
              {cellGeneratorForByInstitutionalSectors.generate("tax.usage.st")}
              <DisabledCell />
              {cellGeneratorForByInstitutionalSectors.generate(
                "tax.usage.society"
              )}
              <td>
                <strong>Impuestos.- Subsidios sobre la Producción</strong>
              </td>
              {DisabledCells(`ra`, 6, 5)}
            </tr>
            <tr>
              {cellGeneratorForByInstitutionalSectors.generate(
                "eeb.usage.total"
              )}
              <DisabledCell />
              {cellGeneratorForByInstitutionalSectors.generate("eeb.usage.st")}
              {cellGeneratorForByInstitutionalSectors.generate("eeb.usage.gov")}
              {cellGeneratorForByInstitutionalSectors.generate(
                "eeb.usage.society"
              )}
              <td>
                <strong>Excedente de Explotación Bruto</strong>
              </td>
              {DisabledCells(`eeb`, 6, 5)}
            </tr>
            <tr>
              {cellGeneratorForByInstitutionalSectors.generate(
                "sbsx.usage.total"
              )}
              {cellGeneratorForByInstitutionalSectors.generate("sbsx.usage.rm")}
              {DisabledCells(`sbsx`, 2, 3)}
              <td>
                <strong>Saldo de bienes y servicios con el exterior</strong>
              </td>
              {DisabledCells(`sbsx`, 6, 5)}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CuGeI;
