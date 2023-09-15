import { Table } from "react-bootstrap";
import DisabledCells from "./DisabledCells";
import DisabledCell from "./DisabledCell";

const CuPro = ({ appValues }) => {
  const branches = appValues.branches;

  return (
    <div>
      <div>
        <h2>Por Actividades</h2>
        <Table
          striped
          bordered
          hover
          className="text-center align-middle mt-3 custom-table"
        >
          <thead>
            <tr>
              <th colSpan={branches.length + 1}>USOS</th>
              <th rowSpan={2}>Transacciones y otros saldos</th>
              <th colSpan={branches.length + 1}>RECURSOS</th>
            </tr>
            <tr>
              <th>Total</th>
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
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {DisabledCells(
                `usage_productionPerActivity`,
                0,
                branches.length + 1
              )}
              <td>
                <strong>Producción por actividad</strong>
              </td>
              {branches.map((branch) => {
                return (
                  <td
                    key={`resource_productionPerActivity_${branch.name}}`}
                  ></td>
                );
              })}
              <td></td>
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return (
                  <td
                    key={`usage_intermediateConsumption_${branch.name}}`}
                  ></td>
                );
              })}
              <td>
                <strong>Consumo Intermedio</strong>
              </td>
              {DisabledCells(
                `resource_intermediateConsumption`,
                5,
                branches.length + 1
              )}
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_vabPerActivity_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Valor Agregado Bruto por Actividad</strong>
              </td>
              {DisabledCells(`resource_vabPerActivity`, 5, branches.length + 1)}
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_ccf_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Consumo de Capital Fijo</strong>
              </td>
              {DisabledCells(`resource_ccf`, 5, branches.length + 1)}
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_vanPerActivity_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Valor agregado neto por actividad</strong>
              </td>
              {DisabledCells(`resource_vanPerActivity`, 5, branches.length + 1)}
            </tr>
          </tbody>
        </Table>
      </div>
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
    </div>
  );
};

export default CuPro;
