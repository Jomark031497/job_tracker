import { createColumnHelper, getCoreRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { Application } from "../applications.types";
import { format } from "date-fns";
import { useUserApplications } from "../hooks/useUserApplications";
import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { formatToCurrency } from "../../../utils/formatToCurrency";
import { Pagination } from "../../../components/ui/Pagination";
import { Table } from "../../../components/ui/Table";

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

type UserApplicationsProps = {
  open: () => void;
  userId: string;
};

export const UserApplications = ({ open, userId }: UserApplicationsProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: userApplications } = useUserApplications(userId, {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

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
    <section className="flex flex-col rounded border bg-white p-4 shadow md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold md:text-xl">Recent Applications</h2>
          <p className="text-xs text-gray-500 md:text-sm">Your most recent job applications</p>
        </div>

        <Button onClick={open} className="px-2">
          Create
        </Button>
      </div>

      <div className="block md:hidden">
        <ul className="flex flex-col gap-2">
          {userApplications.data.map((item) => (
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

      <Pagination count={userApplications.count} pagination={pagination} table={table} />
    </section>
  );
};
