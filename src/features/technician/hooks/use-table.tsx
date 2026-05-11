import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Pencil,
  Trash2,
  EllipsisVerticalIcon,
  BadgeCheckIcon,
  XCircleIcon,
  ClockIcon, // Tambahan icon
  StarIcon, // Tambahan icon untuk rating
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useTechnician } from "./use-list";
import { useCategories } from "./use-categories";

import { Badge } from "@/components/ui/badge";

export function useTableData({ onEdit, onDelete }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    search: "",
  });
  const [debouncedSearchParams, setDebouncedSearchParams] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { data, isPending } = useTechnician({
    page: currentPage,
    ...(debouncedSearchParams && { search: debouncedSearchParams }),
    limit: 10,
  });

  const { data: categoriesData } = useCategories();

  // Create a map of category_id to category name for quick lookup
  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    if (categoriesData?.data) {
      categoriesData.data.forEach((cat: any) => {
        map[cat.id] = cat.name;
      });
    }
    return map;
  }, [categoriesData]);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearchParams(queryParams.search),
      1000,
    );
    return () => clearTimeout(timer);
  }, [queryParams.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchParams]);

  const table = useReactTable({
    data: data?.data || [],
    columns: [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Nama Teknisi
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return <div className="ps-3 font-medium"> {row.original.name} </div>;
        },
      },
      {
        accessorKey: "phone",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Telepon
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium">{row.original.phone ?? "-"}</div>
          );
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Kategori
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          // Use category_id if available, otherwise fall back to category
          const categoryId = row.original.category;
          const categoryName =
            categoryMap[categoryId] || row.original.category || "-";
          return <div className="ps-3 font-medium"> {categoryName} </div>;
        },
      },
      {
        accessorKey: "rating_avg",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Rating
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium flex items-center gap-1">
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-500" />
              {row.original.rating_avg}
            </div>
          );
        },
      },
      {
        accessorKey: "total_reviews",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Total Ulasan
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="ps-3 font-medium text-gray-500">
              {row.original.total_reviews} ulasan
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const status = row.original.status;

          // Improvisasi pewarnaan Badge berdasarkan status
          if (status === "available") {
            return (
              <div className="ps-3 font-medium">
                <Badge
                  variant="secondary"
                  className="border border-green-400 bg-green-50 text-green-800 dark:bg-green-900/70 dark:text-white/80 gap-1"
                >
                  <BadgeCheckIcon className="h-3.5 w-3.5" />
                  Tersedia
                </Badge>
              </div>
            );
          }

          if (status === "busy" || status === "working") {
            return (
              <div className="ps-3 font-medium">
                <Badge
                  variant="secondary"
                  className="border border-yellow-400 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/70 dark:text-white/80 gap-1"
                >
                  <ClockIcon className="h-3.5 w-3.5" />
                  Sibuk
                </Badge>
              </div>
            );
          }

          return (
            <div className="ps-3 font-medium">
              <Badge
                variant="secondary"
                className="border border-red-400 bg-red-50 text-red-800 dark:bg-red-900/70 dark:text-white/80 gap-1 capitalize"
              >
                <XCircleIcon className="h-3.5 w-3.5" />
                {status || "Tidak Aktif"}
              </Badge>
            </div>
          );
        },
      },
      {
        size: 10,
        id: "actions",
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                    size="icon"
                  >
                    <EllipsisVerticalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  <DropdownMenuItem onClick={() => onEdit(row.original)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => onDelete(row.original)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    pageCount: data?.pagination?.total_pages || 1,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: 10,
      },
    },
  });

  return {
    table,
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    data,
    isPending,
  };
}
