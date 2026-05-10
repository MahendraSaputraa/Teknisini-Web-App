import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SearchIcon, PlusIcon, Columns } from "lucide-react";
import { Table } from "@tanstack/react-table";

export interface QueryParams {
  search?: string;
  [key: string]: any;
}

interface TableToolbarProps<TData> {
  table: Table<TData>;
  queryParams: QueryParams;
  setQueryParams: (value: any) => void;
  onAdd?: () => void;
  addLabel?: string;
}

export function TableToolbar<TData>({
  table,
  queryParams,
  setQueryParams,
  onAdd,
  addLabel = "Tambah",
}: TableToolbarProps<TData>) {
  return (
    <div className="grid grid-cols-1 gap-4 ">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Layanan</h1>

        {onAdd && (
          <Button variant="default" onClick={onAdd}>
            <PlusIcon className="h-4 w-4 " />
            {addLabel}
          </Button>
        )}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {/* Input with search icon */}
        <div className="relative ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </span>
          <Input
            placeholder="Cari berdasarkan nama..."
            value={queryParams.search || ""}
            onChange={(e) =>
              setQueryParams((prev: any) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            className="h-10 pl-10"
          />
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns className="mr-2 h-4 w-4" /> Kolom
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                ?.getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
