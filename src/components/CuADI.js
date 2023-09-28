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

const CuADI = ({ appValues }) => {
  const branchesIndexes = _.range(1, appValues.branches.length + 1);
  /******************************************************************************/
  const emptyCuADIByInstitutionalSectors = {
    // TODO: customize this object when copying file content to another
    sbsx: {
      resource: {
        rm: null,
        total: null,
      },
    },
    eeb: {
      resource: {
        society: null,
        gov: null,
        st: null,
        total: null,
      },
    },
    ra: {
      resource: {
        homes: null,
        st: null,
        total: null,
      },
    },
    tax: {
      resource: {
        gov: null,
        st: null,
        total: null,
      },
    },
    rp: {
      resource: {
        homes: null,
        st: null,
        rm: null,
        total: null,
      },
      usage: {
        society: null,
        gov: null,
        st: null,
        rm: null,
        total: null,
      },
    },
    cs: {
      resource: {
        gov: null,
        st: null,
        total: null,
      },
      usage: {
        homes: null,
        st: null,
        total: null,
      },
    },
    ps: {
      resource: {
        homes: null,
        st: null,
        total: null,
      },
      usage: {
        gov: null,
        st: null,
        total: null,
      },
    },
    otc: {
      resource: {
        gov: null,
        st: null,
        total: null,
      },
      usage: {
        society: null,
        st: null,
        rm: null,
        total: null,
      },
    },
    idb: {
      usage: {
        society: null,
        gov: null,
        homes: null,
        st: null,
        total: null,
      },
    },
    scx: {
      usage: {
        rm: null,
        total: null,
      },
    },
  };
  const storedCuCuADIByInstitutionalSectors = getItem(
    "cuADIByInstitutionalSectors"
  );
  const [CuADIByInstitutionalSectors, setcuADIByInstitutionalSectors] =
    useState(
      _.cloneDeep(
        storedCuCuADIByInstitutionalSectors || emptyCuADIByInstitutionalSectors
      )
    );
  const savecuADIByInstitutionalSectorsValues = (content) => {
    setcuADIByInstitutionalSectors(_.cloneDeep(content));
    setItem("cuADIByInstitutionalSectors", content);
  };
  const handlecuADIByInstitutionalSectorsValueChange = (value, path) => {
    _.set(CuADIByInstitutionalSectors, path, value);
    savecuADIByInstitutionalSectorsValues(CuADIByInstitutionalSectors);
  };
  const computeByInstitutionalSectors = () => {
    console.log(
      "Calculando valores de Cuenta de Asignación y Distribución de Ingresos por Sectores Institucionales"
    );
    // TODO: customize this segment when copying file content to another (build equations generators)
    let hasComputed = false;
    let maxAmountOfIterations = 100;
    do {
      hasComputed = false;
      const rows = Object.keys(emptyCuADIByInstitutionalSectors);
      let iRows = 0;
      while (iRows < rows.length && !hasComputed) {
        const row = rows[iRows];
        let side;
        let cols;
        const equationsGenerators = [];
        // TODO: customize this segment when copying file content to another (build assignation of equations generators according to current row)

        if (row === "sbsx") {
        } else if (row === "eeb") {
        } else if (row === "ra") {
        } else if (row === "tax") {
        } else if (row === "rp") {
        } else if (row === "cs") {
        } else if (row === "ps") {
        } else if (row === "otc") {
        } else if (row === "idb") {
        } else if (row === "scx") {
        }

        let iCols = 0;
        while (iCols < cols.length && !hasComputed) {
          const col = cols[iCols];
          let iEquationsGenerators = 0;
          while (
            iEquationsGenerators < equationsGenerators.length &&
            !hasComputed
          ) {
            const equations = equationsGenerators[iEquationsGenerators](
              row,
              side,
              col
            );
            let iEquations = 0;
            while (iEquations < equations.length && !hasComputed) {
              const equation = equations[iEquations];
              if (isEquationSolvable(equation, CuADIByInstitutionalSectors)) {
                console.log(`Solving ${equation.join(" ")}`);
                const { leftSide, rightSide } = buildEquationSides(
                  equation,
                  CuADIByInstitutionalSectors
                );
                hasComputed = shouldCompute(
                  CuADIByInstitutionalSectors,
                  solveEquation(leftSide, rightSide),
                  `${row}.${side}.${col}`
                );
              } else {
                console.log(`Equation ${equation.join(" ")} is not solvable`);
              }
              iEquations++;
            }
            iEquationsGenerators++;
          }
          iCols++;
        }
        iRows++;
      }
      maxAmountOfIterations--;
    } while (hasComputed && maxAmountOfIterations > 0);
    if (maxAmountOfIterations === 0) {
      alert(
        "Se ha alcanzado el máximo número de iteraciones para calcular la Cuenta de Asignación y Distribución de Ingresos por Sectores Institucionales"
      );
    }
    savecuADIByInstitutionalSectorsValues(CuADIByInstitutionalSectors);
  };
  const emptyByInstitutionalSectors = () => {
    savecuADIByInstitutionalSectorsValues(emptyCuADIByInstitutionalSectors);
  };
  const retrieveFromCouForByInstitutionalSectors = () => {
    // TODO: customize this segment when copying file content to another (implement retriveing and computing values from COU)

    // Saldo de Balanza Comercial
    if (
      hasContent(appValues.cou.imports.total) &&
      hasContent(appValues.cou.totalUses.finalUse.exports)
    ) {
      const val = -(
        _.toNumber(appValues.cou.totalUses.finalUse.exports) -
        _.toNumber(appValues.cou.imports.total)
      );
      CuADIByInstitutionalSectors.sbsx.resource.rm = val;
      CuADIByInstitutionalSectors.sbsx.resource.total = val;
      CuADIByInstitutionalSectors.sbsx.resource.rm = val;
      CuADIByInstitutionalSectors.sbsx.resource.total = val;
    }

    // EEB
    if (
      _.every(
        branchesIndexes,
        (idx) =>
          hasContent(appValues.cou.een.intermediateUse[`branch${idx}`]) &&
          hasContent(appValues.cou.ckf.intermediateUse[`branch${idx}`])
      )
    ) {
      CuADIByInstitutionalSectors.eeb.resource.society = _.sum(
        branchesIndexes.map(
          (idx) =>
            _.toNumber(appValues.cou.een.intermediateUse[`branch${idx}`]) +
            _.toNumber(appValues.cou.ckf.intermediateUse[`branch${idx}`])
        )
      );
    }
    CuADIByInstitutionalSectors.eeb.resource.gov =
      _.toNumber(appValues.cou.een.intermediateUse.gov) +
      _.toNumber(appValues.cou.ckf.intermediateUse.gov);
    CuADIByInstitutionalSectors.eeb.resource.st =
      _.toNumber(appValues.cou.een.intermediateUse.st) +
      _.toNumber(appValues.cou.ckf.intermediateUse.st);
    CuADIByInstitutionalSectors.eeb.resource.total =
      _.toNumber(appValues.cou.een.intermediateUse.st) +
      _.toNumber(appValues.cou.ckf.intermediateUse.st);

    // RA
    CuADIByInstitutionalSectors.ra.resource.total =
      appValues.cou.ra.intermediateUse.st;

    // Taxes
    CuADIByInstitutionalSectors.tax.resource.gov =
      appValues.cou.tax.intermediateUse.st;
    CuADIByInstitutionalSectors.tax.resource.st =
      appValues.cou.tax.intermediateUse.st;
    CuADIByInstitutionalSectors.tax.resource.total =
      appValues.cou.tax.intermediateUse.st;

    savecuADIByInstitutionalSectorsValues(CuADIByInstitutionalSectors);
  };
  const cellGeneratorForByInstitutionalSectors = new TableInputGenerator(
    CuADIByInstitutionalSectors,
    handlecuADIByInstitutionalSectorsValueChange
  );
  /******************************************************************************/
  return (
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
        currentItem={CuADIByInstitutionalSectors}
        storageKey="cuADIByInstitutionalSectors"
        saveModalTitle="Guardar Cuenta de Asignación y Distribución de Ingresos por Sectores Institucionales"
        loadModalTitle="Cargar Cuenta de Asignación y Distribución de Ingresos por Sectores Institucionales"
        deleteModalTitle="Borrar Cuenta de Asignación y Distribución de Ingresos por Sectores Institucionales"
        deleteModalMessage="¿Está seguro que desea borrar la Cuenta de Asignación y Distribución de Ingresos por Sectores Institucionales?"
        itemSaver={savecuADIByInstitutionalSectorsValues}
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
            <th colSpan={6}>USOS</th>
            <th rowSpan={2}>Transacciones y Otros Saldos</th>
            <th colSpan={6}>RECURSOS</th>
          </tr>
          <tr>
            <th>Total</th>
            <th>Resto del Mundo</th>
            <th>SubTotal</th>
            <th>Hogares</th>
            <th>Gobierno General</th>
            <th>Sociedades</th>
            <th>Sociedades</th>
            <th>Gobierno General</th>
            <th>Hogares</th>
            <th>SubTotal</th>
            <th>Resto del Mundo</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {DisabledCells(`sbsx`, 0, 6)}
            <td>
              <strong>Saldo de bienes y servicios con el exterior</strong>
            </td>
            {DisabledCells(`sbsx`, 7, 4)}
            {cellGeneratorForByInstitutionalSectors.generate(
              "sbsx.resource.rm"
            )}
            {cellGeneratorForByInstitutionalSectors.generate(
              "sbsx.resource.total"
            )}
          </tr>
          <tr>
            {DisabledCells(`eeb`, 0, 6)}
            <td>
              <strong>Excedente de Explotación Bruto</strong>
            </td>
            {cellGeneratorForByInstitutionalSectors.generate(
              "eeb.resource.society"
            )}
            {cellGeneratorForByInstitutionalSectors.generate(
              "eeb.resource.gov"
            )}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("eeb.resource.st")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate(
              "eeb.resource.total"
            )}
          </tr>
          <tr>
            {DisabledCells(`ra`, 0, 6)}
            <td>
              <strong>Remuneración de Asalariados</strong>
            </td>
            {DisabledCells(`ra`, 7, 2)}
            {cellGeneratorForByInstitutionalSectors.generate(
              "ra.resource.homes"
            )}
            {cellGeneratorForByInstitutionalSectors.generate("ra.resource.st")}
            {cellGeneratorForByInstitutionalSectors.generate("ra.resource.rm")}
            {cellGeneratorForByInstitutionalSectors.generate(
              "ra.resource.total"
            )}
          </tr>
          <tr>
            {DisabledCells(`tax`, 0, 6)}
            <td>
              <strong>Impuestos - Subsidios producción</strong>
            </td>
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate(
              "tax.resource.gov"
            )}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("tax.resource.st")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate(
              "tax.resource.total"
            )}
          </tr>
          <tr>
            {cellGeneratorForByInstitutionalSectors.generate(
              "rp.resource.total"
            )}
            {cellGeneratorForByInstitutionalSectors.generate("rp.resource.rm")}
            {cellGeneratorForByInstitutionalSectors.generate("rp.resource.st")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("rp.resource.gov")}
            {cellGeneratorForByInstitutionalSectors.generate("rp.resource.soc")}
            <td>
              <strong>Rentas de la propiedad</strong>
            </td>
            {DisabledCells(`rp`, 7, 2)}
            {cellGeneratorForByInstitutionalSectors.generate("rp.usage.homes")}
            {cellGeneratorForByInstitutionalSectors.generate("rp.usage.st")}
            {cellGeneratorForByInstitutionalSectors.generate("rp.usage.rm")}
            {cellGeneratorForByInstitutionalSectors.generate("rp.usage.total")}
          </tr>
          <tr>
            {cellGeneratorForByInstitutionalSectors.generate("cs.usage.total")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("cs.usage.st")}
            {cellGeneratorForByInstitutionalSectors.generate("cs.usage.homes")}
            {DisabledCells(`cs`, 4, 2)}
            <td>
              <strong>Contribuciones sociales</strong>
            </td>
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("cs.resource.gov")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("cs.resource.st")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate(
              "cs.resource.total"
            )}
          </tr>
          <tr>
            {cellGeneratorForByInstitutionalSectors.generate("ps.usage.total")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("ps.usage.st")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("ps.usage.gov")}
            <DisabledCell />
            <td>
              <strong>Prestaciones sociales</strong>
            </td>
            {DisabledCells(`ps`, 7, 2)}
            {cellGeneratorForByInstitutionalSectors.generate(
              "ps.resource.homes"
            )}
            {cellGeneratorForByInstitutionalSectors.generate("ps.resource.st")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate(
              "ps.resource.total"
            )}
          </tr>
          <tr>
            {cellGeneratorForByInstitutionalSectors.generate("otc.usage.total")}
            {cellGeneratorForByInstitutionalSectors.generate("otc.usage.rm")}
            {cellGeneratorForByInstitutionalSectors.generate("otc.usage.st")}
            {DisabledCells(`otc`, 3, 2)}
            <td></td>
            <td>
              <strong>Otras transferencias corrientes</strong>
            </td>
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate(
              "otc.resource.gov"
            )}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("otc.resource.st")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate(
              "otc.resource.total"
            )}
          </tr>
          <tr>
            {cellGeneratorForByInstitutionalSectors.generate("idb.usage.total")}
            <DisabledCell />
            {cellGeneratorForByInstitutionalSectors.generate("idb.usage.st")}
            {cellGeneratorForByInstitutionalSectors.generate("idb.usage.homes")}
            {cellGeneratorForByInstitutionalSectors.generate("idb.usage.gov")}
            {cellGeneratorForByInstitutionalSectors.generate(
              "idb.usage.society"
            )}
            <td>
              <strong>Ingreso Disponible Bruto</strong>
            </td>
            {DisabledCells(`idb`, 6, 6)}
          </tr>
          <tr>
            {cellGeneratorForByInstitutionalSectors.generate("scx.usage.total")}
            {cellGeneratorForByInstitutionalSectors.generate("scx.usage.rm")}
            {DisabledCells(`scx`, 2, 4)}
            <td>
              <strong>Saldo Corriente con el Exterior</strong>
            </td>
            {DisabledCells(`scx`, 6, 6)}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CuADI;
