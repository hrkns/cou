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
            {DisabledCells(`sbsce`, 0, 6)}
            <td>
              <strong>Saldo de bienes y servicios con el exterior</strong>
            </td>
            {DisabledCells(`sbsce`, 7, 4)}
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
            {DisabledCells(`rp`, 4, 2)}
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
            {DisabledCells(`sce`, 2, 4)}
            <td>
              <strong>Saldo Corriente con el Exterior</strong>
            </td>
            {DisabledCells(`sce`, 6, 6)}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CuADI;
