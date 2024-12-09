import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@/lib/utils";
import DeleteBtn from "./DeleteBtn";
import ApproveBtn from "./ApproveBtn";
import CancelBtn from "./CancelBtn";

interface DataTableProps<TData, TValue> {
  handlers: {
    [handlerName: string]: ((data: TData[]) => void) | null;
  };
  filterCol: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Combine DataTableProps and Handlers in the function signature
export function DataTable<TData, TValue>({
  filterCol,
  columns,
  data,
  handlers
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  let table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  });

  const selectedRowNum = table.getFilteredSelectedRowModel().rows.length;
  const deleteHandler = handlers["deleteHandler"];
  // const cancelHandler = handlers["cancelHandler"];
  // const approveHandler = handlers["approveHandler"];

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn(filterCol)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterCol)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {deleteHandler != null ? (
          <DeleteBtn
            deleteHandler={deleteHandler}
            selectedRowNum={selectedRowNum}
            table={table}
          />
        ) : null}
        {/* {approveHandler && cancelHandler ? (
          <div className="flex items-center gap-3">
            <ApproveBtn
              approveHandler={approveHandler}
              selectedRowNum={selectedRowNum}
              table={table}
            />
            <CancelBtn
              cancelHandler={cancelHandler}
              selectedRowNum={selectedRowNum}
              table={table}
            />
          </div>
        ) : null} */}
      </div>

      <div className="rounded-md border-2">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
