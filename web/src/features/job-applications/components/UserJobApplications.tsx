import { createColumnHelper, flexRender, getCoreRowModel, PaginationState, useReactTable } from "@tanstack/react-table";
import { Application } from "../job-applications.types";
import { format } from "date-fns";
import { useUserJobApplications } from "../hooks/useUserJobApplications";
import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { formatToCurrency } from "../../../utils/formatToCurrency";
import { Pagination } from "../../../components/ui/Pagination";
import { Link, useNavigate } from "react-router-dom";

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

type UserJobApplicationsProps = {
  open: () => void;
  userId: string;
};

export const UserJobApplications = ({ open, userId }: UserJobApplicationsProps) => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: userJobApplications } = useUserJobApplications(userId, {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const table = useReactTable({
    data: userJobApplications?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: userJobApplications ? (Math.ceil(userJobApplications.count / pagination.pageSize) ?? 1) : 0,
    state: {
      pagination,
    },
  });

  return (
    <section className="flex flex-col rounded border bg-white p-4 shadow md:p-8">
      <div className="mb-4 flex items-center justify-between md:mb-8">
        <div>
          <h2 className="text-sm font-semibold md:text-xl">Recent Applications</h2>
          <p className="text-xs text-gray-500 md:text-sm">Your most recent job applications</p>
        </div>

        <Button onClick={open} className="px-2">
          Create
        </Button>
      </div>

      {userJobApplications?.count ? (
        <>
          {/* Mobile View */}
          <div className="block md:hidden">
            <ul className="flex flex-col gap-2">
              {userJobApplications?.data.map((item) => (
                <li key={item.id} className="rounded border p-2 shadow">
                  <Link to={`/applications/${item.id}`} className="grid grid-cols-3 transition-all hover:bg-gray-100">
                    <div className="col-span-2 flex flex-col gap-0.5">
                      <p className="text-xs font-semibold tracking-wide">{item.companyName}</p>
                      <p className="text-xs">{item.role}</p>
                      <p className="text-xs">{formatToCurrency(item.expectedSalary)}</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-end gap-0.5">
                      <p className="px-2 text-xs">{item.platform}</p>
                      <p className="px-2 text-xs">{format(item.applicationDate, "MMM dd yyyy")}</p>
                      <p className="rounded-full border px-2 text-xs text-black">{item.status}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop View */}
          <div className="hidden h-[298px] md:flex md:flex-col">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="pb-2 text-start font-normal text-gray-500">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => {
                      navigate(`/applications/${row.original.id}`);
                    }}
                    className="border-t transition-all hover:cursor-pointer hover:bg-gray-100 hover:shadow"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 text-sm font-medium">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination count={userJobApplications?.count || 0} pagination={pagination} table={table} />
        </>
      ) : (
        <UserJobApplicationsSkeleton />
      )}
    </section>
  );
};

export const UserJobApplicationsSkeleton = () => {
  return (
    <section className="flex flex-col">
      <div className="mb-2 h-[298px] animate-pulse rounded border bg-gray-100 p-4 shadow md:p-8"></div>
      <div className="h-[38px] w-[144px] animate-pulse self-end rounded bg-gray-100"></div>
    </section>
  );
};
