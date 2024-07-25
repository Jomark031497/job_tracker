import { PaginationState, Table } from "@tanstack/react-table";
import { Button } from "./Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type PaginationProps<T> = {
  table: Table<T>;
  pagination: PaginationState;
  count: number;
};

export const Pagination = <T,>({ table, pagination, count }: PaginationProps<T>) => {
  return (
    <section className="flex items-center gap-2 self-end pt-4">
      <Button
        className="border-2 border-accent bg-white p-1 text-accent hover:bg-accent hover:text-white"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <FaAngleLeft />
      </Button>
      <span className="flex items-center gap-1 text-xs md:text-base">
        <div>Page</div>
        <strong>
          {count ? table.getState().pagination.pageIndex + 1 : 0} of {Math.ceil(count / pagination.pageSize)}
        </strong>
      </span>
      <Button
        className="border-2 border-accent bg-white p-1 text-accent hover:bg-accent hover:text-white"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <FaAngleRight />
      </Button>
    </section>
  );
};
