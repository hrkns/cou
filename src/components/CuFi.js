import { Table } from "react-bootstrap";
import DisabledCells from "./DisabledCells";
import DisabledCell from "./DisabledCell";

const CuFi = () => {
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
            {DisabledCells("pn", 0, 6)}
            <td>
              <strong>Préstamo Neto</strong>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <strong>Adquisición Neta de Activos Financieros</strong>
            </td>
            {DisabledCells("anaf", 7, 6)}
          </tr>
          <tr>
            {DisabledCells("enpf", 0, 6)}
            <td>
              <strong>Emisión Neta de pasivos financieros</strong>
            </td>
            <td></td>
            <td></td>
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
            <DisabledCell />
            <td></td>
            <td>
              <strong>Dinero Legal y Depósitos</strong>
            </td>
            <td></td>
            {DisabledCells("dld", 8, 2)}
            <td></td>
            <DisabledCell />
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <DisabledCell />
            <td></td>
            <td>
              <strong>Valores distintos de acciones</strong>
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
            <td></td>
            <td></td>
            <td></td>
            <td>
              <strong>Préstamos y crédito comercial</strong>
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
            <td></td>
            <td></td>
            <td></td>
            <td>
              <strong>Acciones y otras participaciones de capital</strong>
            </td>
            <td></td>
            {DisabledCells("aopc", 8, 2)}
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CuFi;
