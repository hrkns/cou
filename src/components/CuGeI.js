import { Table } from "react-bootstrap";

const CuGei = ({ appValues }) => {
  const branches = appValues.useThirdBranch
    ? appValues.branches
    : appValues.branches.slice(0, 2);
  const branchesAmount = branches.length;

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
              <th colSpan={branchesAmount + 1}>USOS</th>
              <th rowSpan={2}>Transacciones y otros saldos</th>
              <th colSpan={branchesAmount + 1}>RECURSOS</th>
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
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_tax_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Valor Agregado Bruto por actividad</strong>
              </td>
              {branches.map((branch) => {
                return <td key={`resource_tax_${branch.name}}`}></td>;
              })}
              <td></td>
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_ra_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Remuneración de Asalariados</strong>
              </td>
              {branches.map((branch) => {
                return <td key={`resource_ra_${branch.name}}`}></td>;
              })}
              <td></td>
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_tax_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Impuestos.- Subsidios sobre la Producción</strong>
              </td>
              {branches.map((branch) => {
                return <td key={`resource_tax_${branch.name}}`}></td>;
              })}
              <td></td>
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_eeb_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Consumo de Capital Fijo</strong>
              </td>
              {branches.map((branch) => {
                return <td key={`resource_eeb_${branch.name}}`}></td>;
              })}
              <td></td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <strong>Saldo de bienes y servicios con el exterior</strong>
              </td>
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
              <td>
                <strong>Valor Agregado Bruto</strong>
              </td>
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
              <td>
                <strong>Remuneración de Asalariados</strong>
              </td>
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
              <td>
                <strong>Impuestos.- Subsidios sobre la Producción</strong>
              </td>
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
              <td>
                <strong>Excedente de Explotación Bruto</strong>
              </td>
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
              <td>
                <strong>Saldo de bienes y servicios con el exterior</strong>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CuGei;
