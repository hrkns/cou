import { Table } from "react-bootstrap";
import DisabledCells from "./DisabledCells";
import DisabledCell from "./DisabledCell";

const CuCa = () => {
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
            {DisabledCells("ab", 0, 6)}
            <td>
              <strong>Ahorro Bruto</strong>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <DisabledCell />
            <td></td>
          </tr>
          <tr>
            {DisabledCells("tkr", 0, 6)}
            <td>
              <strong>Transferencias de capital recibidas</strong>
            </td>
            <td></td>
            {DisabledCells("tkr", 8, 2)}
            <td></td>
            <DisabledCell />
            <td></td>
          </tr>
          <tr>
            {DisabledCells("tke", 0, 6)}
            <td>
              <strong>Transferencias de capital efectuadas</strong>
            </td>
            {DisabledCells("tke", 7, 4)}
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td></td>
            <td></td>
            <td>
              <strong>Formacion bruta de capital fijo</strong>
            </td>
            {DisabledCells("fbkf", 7, 6)}
          </tr>
          <tr>
            <td></td>
            <DisabledCell />
            <td></td>
            <DisabledCell />
            <td></td>
            <td></td>
            <td>
              <strong>Variación de existencias</strong>
            </td>
            {DisabledCells("ve", 7, 6)}
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <strong>Préstamo Neto</strong>
            </td>
            {DisabledCells("pn", 7, 6)}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CuCa;
