import type { ReactNode } from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  striped?: boolean;
  className?: string;
}

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  striped = true,
  className = '',
}: TableProps<T>) {
  const alignClass = (align?: string) =>
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  return (
    <div className={`overflow-x-auto rounded-lg border border-border ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-2">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-medium text-text-secondary ${alignClass(col.align)}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={keyExtractor(row)}
              className={`
                border-b border-border last:border-0
                ${striped && i % 2 === 1 ? 'bg-surface-1' : 'bg-surface-0'}
                hover:bg-surface-2 transition-colors
              `}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 text-text-primary ${alignClass(col.align)}`}>
                  {col.render ? col.render(row) : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
