import React, { useState, useMemo } from "react";
import Select from "react-select";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  FolderOpenIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

const CustomTable = ({
  columns,
  data,
  handleSorting,
  sorting,
  disablePagination,
  title,
  enableSearch = true,
  isLoading = false,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columnHelper = createColumnHelper();

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(globalFilter.toLowerCase()),
      ),
    );
  }, [data, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: columns?.map((col) => {
      return columnHelper.accessor(col.accessor, col);
    }),
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    onSortingChange: handleSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      )}
      {enableSearch && (
        <div className="mb-4">
          <div className="relative w-full sm:w-[25%]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search contacts..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            {globalFilter && (
              <button
                onClick={() => setGlobalFilter("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <XIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      )}
      <div className="overflow-x-auto bg-white rounded-lg shadow -mx-4 sm:mx-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup?.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center gap-2"
                              : "flex items-center"
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <ChevronUpIcon className="h-4 w-4" />,
                            desc: <ChevronDownIcon className="h-4 w-4" />,
                          }[header.column.getIsSorted()?.toString()] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns?.length}
                  className="px-3 sm:px-6 py-8 sm:py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                      Loading contacts...
                    </p>
                  </div>
                </td>
              </tr>
            ) : filteredData && filteredData?.length > 0 ? (
              table?.getRowModel()?.rows?.map((row, index) => (
                <tr
                  key={row?.id}
                  className={`transition-colors ${
                    index % 2 === 0
                      ? "bg-white hover:bg-blue-50"
                      : "bg-gray-50 hover:bg-blue-100"
                  }`}
                >
                  {row?.getVisibleCells()?.map((cell) => (
                    <td
                      key={cell?.id}
                      className={`px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 ${
                        cell?.column?.columnDef?.ClassNames || ""
                      }`}
                    >
                      {flexRender(
                        cell?.column?.columnDef?.cell,
                        cell?.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns?.length}
                  className="px-3 sm:px-6 py-8 sm:py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="rounded-full bg-gray-100 p-3 sm:p-4">
                      <FolderOpenIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">
                        No Data Available
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {globalFilter
                          ? "No contacts match your search criteria"
                          : "No contacts found. Add a new contact to get started"}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredData && filteredData?.length > 0 && !disablePagination && (
        <div className="bg-white px-3 sm:px-6 py-4 sm:py-5 border-t border-gray-200 mt-4 rounded-lg shadow">
          {/* Mobile Layout */}
          <div className="sm:hidden space-y-3">
            {/* Page Info and Navigation */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700 font-medium">
                Page{" "}
                <strong className="font-semibold">
                  {table.getState()?.pagination?.pageIndex + 1}
                </strong>{" "}
                of{" "}
                <strong className="font-semibold">
                  {table.getPageCount().toLocaleString()}
                </strong>
              </span>
              <div className="flex gap-1">
                <button
                  className="p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  title="Previous page"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <button
                  className="p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  title="Next page"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            {/* Records Per Page */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700 font-medium">
                Per Page:
              </span>
              <Select
                value={{
                  value: table.getState()?.pagination?.pageSize,
                  label: table.getState()?.pagination?.pageSize,
                }}
                onChange={(option) => {
                  table.setPageSize(Number(option.value));
                }}
                options={[10, 20, 30, 40, 50].map((pageSize) => ({
                  value: pageSize,
                  label: pageSize,
                }))}
                className="w-20"
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "32px",
                    fontSize: "12px",
                  }),
                  menu: (base) => ({
                    ...base,
                    fontSize: "12px",
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                Records Per Page:
              </span>
              <Select
                value={{
                  value: table.getState()?.pagination?.pageSize,
                  label: table.getState()?.pagination?.pageSize,
                }}
                onChange={(option) => {
                  table.setPageSize(Number(option.value));
                }}
                options={[10, 20, 30, 40, 50].map((pageSize) => ({
                  value: pageSize,
                  label: pageSize,
                }))}
                className="w-24"
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "36px",
                    fontSize: "14px",
                  }),
                  menu: (base) => ({
                    ...base,
                    fontSize: "14px",
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                Page{" "}
                <strong className="font-semibold">
                  {table.getState()?.pagination?.pageIndex + 1}
                </strong>{" "}
                of{" "}
                <strong className="font-semibold">
                  {table.getPageCount().toLocaleString()}
                </strong>
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  title="Previous page"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  title="Next page"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
