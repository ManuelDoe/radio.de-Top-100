"use client"


import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getFilteredRowModel,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable, getPaginationRowModel
} from '@tanstack/react-table';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/app/components/ui/select';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/app/components/ui/table';
import {useState} from "react";
import {Input} from "@/app/components/ui/input";
import {Button} from "@/app/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}



export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50
    });
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            pagination
        },
    })

    return (
        <div>
            <div className="flex items-center py-4 gap-8 justify-end">
                <Input
                    placeholder="Nach Sender filtern"
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Input
                    placeholder="Nach Genre filtern"
                    value={(table.getColumn("genres")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("genres")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
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
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="lg"
                    className="bg-[#50cd32] border-[#50cd32] text-[#ffffff] hover:bg-[#44b86b] hover:text-[#ffffff] transition-colors"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    className="bg-[#50cd32] border-[#50cd32] text-[#ffffff] hover:bg-[#44b86b] hover:text-[#ffffff] transition-colors"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </Button>
                <Select value={table.getState().pagination.pageSize.toString()}
                        onValueChange={value => table.setPageSize(Number(value))}>
                    <SelectTrigger className="w-auto bg-[#50cd32] border-[#50cd32] h-10 rounded-md px-8">
                        <SelectValue placeholder="Station Result Counter" />
                    </SelectTrigger>
                    <SelectContent>
                        {[25, 50, 100].map(pageSize => (
                            <SelectItem key={pageSize} value={pageSize.toString()}>
                                {pageSize} Ergebnisse pro Seite
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
