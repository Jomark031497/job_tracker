import { flexRender, Table as TableType } from "@tanstack/react-table";

type TableProps<T> = {
  table: TableType<T>;
};

export const Table = <T,>({ table }: TableProps<T>) => {
  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-start text-gray-500 pb-2">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-t">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
