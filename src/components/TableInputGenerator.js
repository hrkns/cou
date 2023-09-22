import _ from "lodash";

const TableInput = ({ table, cell, onChange }) => {
  return (
    <input
      className="invisible-input"
      type="number"
      value={_.get(table, cell) ?? ""}
      onChange={(e) => {
        onChange(e.target.value, cell);
      }}
    />
  );
};

class TableInputGenerator {
  constructor(table, onChange) {
    this.table = table;
    this.onChange = onChange;
  }

  generate = (cell) => {
    return (
      <td key={cell}>
        <TableInput table={this.table} cell={cell} onChange={this.onChange} />
      </td>
    );
  };
}

export default TableInputGenerator;
