import { createColumnHelper, getCoreRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { Application } from "../applications.types";
import { format } from "date-fns";
import { useState } from "react";
import { formatToCurrency } from "../../../utils/formatToCurrency";
import { Pagination } from "../../../components/ui/Pagination";
import { Table } from "../../../components/ui/Table";
import { usePublicApplications } from "../hooks/usePublicApplications";

const columnHelper = createColumnHelper<Application>();

const columns = [
  columnHelper.accessor("companyName", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Job Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <span className="rounded-full border px-2 py-1 text-center text-xs">{info.getValue()}</span>,
  }),
  columnHelper.accessor("applicationDate", {
    header: "Application Date",
    cell: (info) => format(info.getValue(), "MMM-dd-yyyy"),
  }),
];

type PublicApplicationProps = {};

export const PublicApplications = ({}: PublicApplicationProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: userApplications } = usePublicApplications({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    isPublic: true,
  });

  const table = useReactTable({
    data: userApplications?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: userApplications ? (Math.ceil(userApplications.count / pagination.pageSize) ?? 1) : 0,
    state: {
      pagination,
    },
  });

  return (
    <section className="flex flex-col rounded border bg-white p-4 shadow md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold md:text-xl">Public Applications</h2>
          <p className="text-xs text-gray-500 md:text-sm">View job applications that are publicly visible.</p>
        </div>
      </div>

      <div className="block md:hidden">
        <ul className="flex flex-col gap-2">
          {userApplications?.data.map((item) => (
            <li key={item.id} className="grid grid-cols-3 rounded border p-2 shadow">
              <div className="col-span-2">
                <p className="text-xs font-semibold tracking-wide">{item.companyName}</p>
                <p className="text-xs">{item.role}</p>
                <p className="text-xs">{formatToCurrency(item.expectedSalary)}</p>
              </div>
              <div className="col-span-1 flex flex-col items-end">
                <p className="text-xs">{item.platform}</p>
                <p className="text-xs">{format(item.applicationDate, "MMM dd yyyy")}</p>
                <p className="rounded-full border bg-gray-300 px-2 text-xs text-black shadow">{item.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:flex md:flex-col">
        <Table table={table} />
      </div>

      <Pagination count={userApplications?.count || 0} pagination={pagination} table={table} />
    </section>
  );
};
