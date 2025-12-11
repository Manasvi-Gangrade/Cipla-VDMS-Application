import { ReactNode } from "react";
import EmptyState from "./EmptyState";
import { FileX } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  emptyDescription?: string;
}

function DataTable<T extends { id?: number | string }>({ 
  data, 
  columns, 
  emptyMessage = "No data available",
  emptyDescription = "There are no items to display at this time."
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={FileX}
        title={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column, index) => (
              <th key={index} className={`text-left py-3 px-4 text-sm font-medium text-gray-700 ${column.className || ''}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="border-b border-border hover:bg-gray-50 transition-colors">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={`py-4 px-4 ${column.className || ''}`}>
                  {typeof column.accessor === 'function' 
                    ? column.accessor(row)
                    : String(row[column.accessor as keyof T])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
