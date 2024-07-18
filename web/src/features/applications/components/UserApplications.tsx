import {
  createColumnHelper,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
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
    <section className="p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm md:text-2xl">Recent Applications</h2>

        <Button onClick={open} className="px-2">
          Create
        </Button>
      </div>

      <div className="block md:hidden">
        <ul className="flex flex-col gap-2">
          {userApplications.data.map((item) => (
            <li key={item.id} className="grid grid-cols-3 p-2 border rounded shadow">
              <div className="col-span-2">
                <p className="font-semibold tracking-wide text-xs">{item.companyName}</p>
                <p className="text-xs">{item.role}</p>
                <p className="text-xs">{formatToCurrency(item.expectedSalary)}</p>
              </div>
              <div className="col-span-1 flex flex-col items-end">
                <p className="text-xs">{item.platform}</p>
                <p className="text-xs">{format(item.applicationDate, "MMM dd yyyy")}</p>
                <p className="text-xs px-2 border rounded-full shadow bg-gray-300 text-black">
                  {item.status}
                </p>
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
