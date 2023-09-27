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
    // TODO: implement defining skeleton for empty table data
  };
  const storedCuCuADIByInstitutionalSectors = getItem(
    "cuADIByInstitutionalSectors"
  );
  const [cuADIByInstitutionalSectors, setcuADIByInstitutionalSectors] =
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
    _.set(cuADIByInstitutionalSectors, path, value);
    savecuADIByInstitutionalSectorsValues(cuADIByInstitutionalSectors);
  };
  const computeByInstitutionalSectors = () => {
    console.log(
      "Calculando valores de Cuenta de Asignación y Distribución de Ingresos por Sectores Institucionales"
    );
    // TODO: build equations generators
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
        // TODO: build assignation of equations generators according to current row
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
              if (isEquationSolvable(equation, cuADIByInstitutionalSectors)) {
                console.log(`Solving ${equation.join(" ")}`);
                const { leftSide, rightSide } = buildEquationSides(
                  equation,
                  cuADIByInstitutionalSectors
                );
                hasComputed = shouldCompute(
                  cuADIByInstitutionalSectors,
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
    savecuADIByInstitutionalSectorsValues(cuADIByInstitutionalSectors);
  };
  const emptyByInstitutionalSectors = () => {
    savecuADIByInstitutionalSectorsValues(emptyCuADIByInstitutionalSectors);
  };
  const retrieveFromCouForByInstitutionalSectors = () => {
    // TODO: implement retriveing and computing values from COU

    savecuADIByInstitutionalSectorsValues(cuADIByInstitutionalSectors);
  };
  const cellGeneratorForByInstitutionalSectors = new TableInputGenerator(
    cuADIByInstitutionalSectors,
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
        currentItem={cuADIByInstitutionalSectors}
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
            <td></td>
            <td></td>
          </tr>
          <tr>
            {DisabledCells(`eeb`, 0, 6)}
            <td>
              <strong>Excedente de Explotación Bruto</strong>
            </td>
            <td></td>
            <td></td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td></td>
          </tr>
          <tr>
            {DisabledCells(`ra`, 0, 6)}
            <td>
              <strong>Remuneración de Asalariados</strong>
            </td>
            {DisabledCells(`ra`, 7, 2)}
            <td></td>
            <td></td>
            <DisabledCell />
            <td></td>
          </tr>
          <tr>
            {DisabledCells(`tax`, 0, 6)}
            <td>
              <strong>Impuestos - Subsidios producción</strong>
            </td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <DisabledCell />
            <td></td>
            <td></td>
            <td>
              <strong>Rentas de la propiedad</strong>
            </td>
            {DisabledCells(`rp`, 7, 2)}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <DisabledCell />
            <td></td>
            <td></td>
            {DisabledCells(`cs`, 4, 2)}
            <td>
              <strong>Contribuciones sociales</strong>
            </td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td></td>
          </tr>
          <tr>
            <td></td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td>
              <strong>Prestaciones sociales</strong>
            </td>
            {DisabledCells(`ps`, 7, 2)}
            <td></td>
            <td></td>
            <DisabledCell />
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            {DisabledCells(`otc`, 3, 2)}
            <td></td>
            <td>
              <strong>Otras transferencias corrientes</strong>
            </td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
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
            <td></td>
            <td>
              <strong>Ingreso Disponible Bruto</strong>
            </td>
            {DisabledCells(`idb`, 6, 6)}
          </tr>
          <tr>
            <td></td>
            <td></td>
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
