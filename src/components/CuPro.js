import { Table } from "react-bootstrap";

const CuPro = ({ appValues }) => {
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
                return (
                  <td key={`usage_productionPerActivity_${branch.name}}`}></td>
                );
              })}
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
              {branches.map((branch) => {
                return (
                  <td
                    key={`resource_intermediateConsumption_${branch.name}}`}
                  ></td>
                );
              })}
              <td></td>
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_vabPerActivity_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Valor Agregado Bruto por Actividad</strong>
              </td>
              {branches.map((branch) => {
                return (
                  <td key={`resource_vabPerActivity_${branch.name}}`}></td>
                );
              })}
              <td></td>
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_ccf_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Consumo de Capital Fijo</strong>
              </td>
              {branches.map((branch) => {
                return <td key={`resource_ccf_${branch.name}}`}></td>;
              })}
              <td></td>
            </tr>
            <tr>
              <td></td>
              {branches.toReversed().map((branch) => {
                return <td key={`usage_vanPerActivity_${branch.name}}`}></td>;
              })}
              <td>
                <strong>Valor agregado neto por actividad</strong>
              </td>
              {branches.map((branch) => {
                return (
                  <td key={`resource_vanPerActivity_${branch.name}}`}></td>
                );
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
                <strong>Importaciones de bienes y servicios</strong>
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
                <strong>Exportaciones de bienes y servicios</strong>
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
                <strong>Produccion</strong>
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
                <strong>Consumo Intermedio</strong>
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
                <strong>Consumo de Capital Fijo</strong>
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
                <strong>Valor Agregado Neto</strong>
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

export default CuPro;
