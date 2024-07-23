import { useAuth } from "../../auth/hooks/useAuth";
import { Suspense } from "react";
import { UserApplications } from "../../applications/components/UserApplications";
import { useToggle } from "../../miscs/hooks/useToggle";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button";
import { useApplications } from "../../applications/hooks/useApplications";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Application } from "../../applications/applications.types";
import { format } from "date-fns";
import { Table } from "../../../components/ui/Table";
import { lazily } from "react-lazily";

const { CreateApplication } = lazily(() => import("../../applications/components/CreateApplication"));

const { ApplicationsOverview, ApplicationsOverviewSkeleton } = lazily(
  () => import("../../applications/components/ApplicationsOverview"),
);

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
    cell: (info) => <span className="rounded-full border px-4 py-1.5 text-sm">{info.getValue()}</span>,
  }),
  columnHelper.accessor("applicationDate", {
    header: "Application Date",
    cell: (info) => format(info.getValue(), "yyyy-MMM-dd"),
  }),
];

export const Dashboard = () => {
  const { user } = useAuth();

  const { data: publicApplications } = useApplications({
    isPublic: true,
  });

  if (!user) {
    return <>No User found, this shouldnt happen</>;
  }

  const { isOpen, open, close } = useToggle();

  const table = useReactTable({
    data: publicApplications?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // manualPagination: true,
    // onPaginationChange: setPagination,
    // pageCount: Math.ceil(userApplications.count / pagination.pageSize) ?? 1,
    // state: {
    //   pagination,
    // },
  });

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div className="flex flex-col items-center border p-4">
                <p className="italic text-red-500">Unable to fetch applications overview</p>
                <Button className="px-4" onClick={() => resetErrorBoundary()}>
                  Try again
                </Button>
              </div>
            )}
          >
            <Suspense fallback={<ApplicationsOverviewSkeleton />}>
              <ApplicationsOverview userId={user.id} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                User Application Failed
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
          >
            <Suspense fallback={<>Loading...</>}>
              <UserApplications userId={user.id} open={open} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <section className="flex flex-col p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold md:text-2xl">Public Applications</h2>
        </div>

        <div className="hidden md:flex md:flex-col">
          <Table table={table} />
        </div>
      </section>

      {user && <CreateApplication close={close} isOpen={isOpen} userId={user.id} />}
    </>
  );
};
