import React, { useState, useRef, useEffect } from 'react';

interface DataTableProps {
  data: Array<Record<string, any>>;
  columns: Array<{
    header: string;
    accessor: string;
    sortable?: boolean;
  }>;
}

// Complex Accessible Data Table Component
export const AccessibleDataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<HTMLTableElement>(null);

  // Sort handling
  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  // Row selection handling
  const handleRowSelect = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  return (
    <div role="region" aria-label="Data Table Container">
      <table
        ref={tableRef}
        role="grid"
        aria-rowcount={data.length}
        aria-colcount={columns.length}
      >
        <thead>
          <tr role="row">
            <th role="columnheader" scope="col">
              <input
                type="checkbox"
                aria-label="Select all rows"
                onChange={() => {/* Select all logic */}}
              />
            </th>
            {columns.map((column, index) => (
              <th
                key={column.accessor}
                role="columnheader"
                scope="col"
                aria-sort={
                  sortConfig?.key === column.accessor
                    ? sortConfig.direction
                    : 'none'
                }
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.accessor)}
                    aria-label={`Sort by ${column.header}`}
                  >
                    {column.header}
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              role="row"
              aria-selected={selectedRows.has(rowIndex)}
            >
              <td role="gridcell">
                <input
                  type="checkbox"
                  aria-label={`Select row ${rowIndex + 1}`}
                  checked={selectedRows.has(rowIndex)}
                  onChange={() => handleRowSelect(rowIndex)}
                />
              </td>
              {columns.map(column => (
                <td
                  key={column.accessor}
                  role="gridcell"
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div role="navigation" aria-label="Table navigation">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          aria-label="Previous page"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span role="status" aria-live="polite">
          Page {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage(p => p + 1)}
          aria-label="Next page"
          disabled={currentPage * 10 >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Usage Example
export const DataTableExample: React.FC = () => {
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // ... more data
  ];

  const columns = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Email', accessor: 'email', sortable: true },
  ];

  return (
    <AccessibleDataTable
      data={sampleData}
      columns={columns}
    />
  );
}; 