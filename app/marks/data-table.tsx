'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import type { Prisma, Subject } from '@prisma/client';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Row } from '@tanstack/react-table';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as y from 'yup';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { deleteResult } from '@/lib/deleteResult';
import { postResult } from '@/lib/postResult';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type StudentWithResults = Prisma.UserGetPayload<{
  include: { course: true; testResults: true };
}>;

const resultSchema = y.object().shape({
  PH1: y
    .number()
    .min(0)
    .max(20)
    .transform((value) => (isNaN(value) ? undefined : value)),
  PH2: y
    .number()
    .min(0)
    .max(20)
    .transform((value) => (isNaN(value) ? undefined : value)),
  assignment: y
    .number()
    .min(0)
    .max(10)
    .transform((value) => (isNaN(value) ? undefined : value)),
  finals: y
    .number()
    .min(0)
    .max(50)
    .transform((value) => (isNaN(value) ? undefined : value)),
});

function RowActions({
  row,
  subject,
}: {
  row: Row<StudentWithResults>;
  subject: Subject;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const form = useForm<y.InferType<typeof resultSchema>>({
    resolver: yupResolver(resultSchema),
  });
  const result = row.original.testResults[0];

  function onEdit(values: y.InferType<typeof resultSchema>) {
    setOpen(false);

    const promise = Promise.resolve(postResult(row.original, subject, values));

    toast.promise(promise, {
      loading: 'Updating result...',
      success: 'Result updated. Refreshing...',
      error: 'Could not update result.',
    });

    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => {
                if (result) {
                  form.reset({
                    PH1: result.PH1 ?? undefined,
                    PH2: result.PH2 ?? undefined,
                    assignment: result.assignment ?? undefined,
                    finals: result.finals ?? undefined,
                  });
                }
              }}
            >
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={() => {
              const promise = Promise.resolve(
                deleteResult(row.original.icNo, subject.subjectCode)
              );

              toast.promise(promise, {
                loading: 'Clearing result...',
                success: 'Result cleared. Refreshing...',
                error: 'Could not clear result.',
              });

              router.refresh();
            }}
            disabled={row.original.testResults[0] ? false : true}
          >
            Clear
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Result</DialogTitle>
          <DialogDescription>
            ({row.original.icNo}) {row.original.firstName}{' '}
            {row.original.lastName}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="editResult"
            autoComplete="off"
            onSubmit={form.handleSubmit(onEdit)}
            className="grid grid-cols-4 gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="PH1"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>PH1</FormLabel>
                  <FormControl>
                    <Input placeholder="(Max. 20)" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PH2"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>PH2</FormLabel>
                  <FormControl>
                    <Input placeholder="(Max. 20)" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignment"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Assignment</FormLabel>
                  <FormControl>
                    <Input placeholder="(Max. 10)" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finals"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Finals</FormLabel>
                  <FormControl>
                    <Input placeholder="(Max. 50)" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="editResult">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DataTable({
  columns,
  data,
  subject,
}: {
  columns: ColumnDef<StudentWithResults>[];
  data: StudentWithResults[];
  subject: Subject;
}) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
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
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <RowActions row={row} subject={subject} />
                </TableCell>
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
  );
}
