import { Table } from "react-bootstrap";
import DisabledCells from "./DisabledCells";
import DisabledCell from "./DisabledCell";

const CuADI = () => {
  return (
    <div>
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
            <th>Gobierno</th>
            <th>Sociedades</th>
            <th>Sociedades</th>
            <th>Gobierno</th>
            <th>Hogares</th>
            <th>SubTotal</th>
            <th>Resto del Mundo</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {DisabledCells("sce", 0, 6)}
            <td>
              <strong>Saldo corriente con el exterior</strong>
            </td>
            {DisabledCells("sce", 7, 4)}
            <td></td>
            <td></td>
          </tr>
          <tr>
            {DisabledCells("idb", 0, 6)}
            <td>
              <strong>Ingreso Disponible Bruto</strong>
            </td>
            <td></td>
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
            <DisabledCell />
            <td>
              <strong>Gasto de Consumo Final</strong>
            </td>
            {DisabledCells("gcf", 7, 6)}
          </tr>
          <tr>
            <td></td>
            <DisabledCell />
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <strong>Ahorro Bruto</strong>
            </td>
            {DisabledCells("ab", 0, 6)}
          </tr>
          <tr>
            <td></td>
            <td></td>
            {DisabledCells("sce", 0, 4)}
            <td>
              <strong>Saldo corriente con el exterior</strong>
            </td>
            {DisabledCells("sce", 0, 6)}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CuADI;
