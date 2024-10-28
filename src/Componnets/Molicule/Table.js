import React from "react";

const ReusableTable = ({ headers, rows }) => {
  return (
    <table className="table table-nowrap align-middle" id="orderTable">
      <thead className="text-muted table-light">
        <tr className="text-uppercase">
          {headers.map((header, index) => (
            <th key={index} scope="col" style={header.style}>
              {header.content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="list form-check-all">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className={cell.className}>
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
