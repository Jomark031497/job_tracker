import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Application } from "../applications.types";
import { format } from "date-fns";
import { useUserApplications } from "../hooks/useUserApplications";
import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const columnHelper = createColumnHelper<Application>();

const columns = [
  columnHelper.accessor("companyName", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span className="border rounded-full text-sm px-4 py-1.5">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("applicationDate", {
    header: "Application Date",
    cell: (info) => format(info.getValue(), "yyyy-MMM-dd"),
  }),
];

type UserApplicationsProps = {
  open: () => void;
  userId: string;
};

export const UserApplications = ({ open, userId }: UserApplicationsProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const {
    data: userApplications,
    error,
    isFetching,
  } = useUserApplications(userId, {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  if (error && !isFetching) {
    throw error;
  }

  const table = useReactTable({
    data: userApplications.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: Math.ceil(userApplications.count / pagination.pageSize) ?? 1,
    state: {
      pagination,
    },
  });

  return (
    <section className="border rounded p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Recent Applications</h2>

        <button onClick={open} className="bg-accent border rounded p-2 font-semibold">
          New Application
        </button>
      </div>
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
      <div className="flex items-center gap-2 self-end">
        <Button
          className="p-1 bg-white border-accent border-2 text-accent hover:bg-accent hover:text-white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <FaAngleLeft />
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.ceil(userApplications.count / pagination.pageSize)}
          </strong>
        </span>
        <Button
          className="p-1 bg-white border-accent border-2 text-accent hover:bg-accent hover:text-white"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <FaAngleRight />
        </Button>
      </div>
    </section>
  );
};
