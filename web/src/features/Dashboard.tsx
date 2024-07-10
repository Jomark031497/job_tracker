import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { format } from "date-fns";
import { useToggle } from "./miscs/hooks/useToggle";
import { CreateApplication } from "./applications/components/CreateApplication";

type Application = {
  id: number;
  companyName: string;
  companyWebsite?: string;
  role: string;
  minSalaryRange?: number;
  maxSalaryRange?: number;
  status: "In Progress" | "Responded" | "Rejected" | "For Offer";
  description?: string;
  applicationDate: Date;
};

const defaultData: Application[] = [
  {
    id: 1,
    role: "Fullstack Web Developer",
    companyName: "ePerformax Contact Centers & BPO",
    minSalaryRange: 30_000,
    maxSalaryRange: 35_000,
    companyWebsite: "https://eperformax.com",
    applicationDate: new Date(),
    description: "referred by Charlie",
    status: "Responded",
  },
  {
    id: 2,
    role: "Frontend Web Developer",
    companyName: "Steelx Pty Ltd",
    companyWebsite: "https://steelx.com.au",
    applicationDate: new Date(),
    description: "Found in onlinejobs.ph, australian client",
    status: "In Progress",
  },
];

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

export const Dashboard = () => {
  const [data] = useState(defaultData);

  const { isOpen, open, close } = useToggle();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <section className="flex items-center gap-4 mb-8">
        <div className="p-4 border-2 rounded text-center flex-1">
          <h2 className="text-xl font-semibold">Total Applications</h2>
          <p className="text-2xl font-bold">124</p>
        </div>
        <div className="p-4 border-2 rounded text-center flex-1">
          <h2 className="text-xl font-semibold">In Progress</h2>
          <p className="text-2xl font-bold">42</p>
        </div>
        <div className="p-4 border-2 rounded text-center flex-1">
          <h2 className="text-xl font-semibold">Responded</h2>
          <p className="text-2xl font-bold">62</p>
        </div>
        <div className="p-4 border-2 rounded text-center flex-1">
          <h2 className="text-xl font-semibold">Rejected</h2>
          <p className="text-2xl font-bold">20</p>
        </div>
      </section>

      <section className="border rounded p-4">
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
      </section>

      <CreateApplication close={close} isOpen={isOpen} />
    </>
  );
};
