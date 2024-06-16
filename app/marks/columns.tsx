'use client';

import type { Prisma } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { Check, Pencil, X } from 'lucide-react';

import * as React from 'react';

import { getLetterGrade } from '@/lib/getLetterGrade';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type StudentWithResults = Prisma.UserGetPayload<{
  include: { course: true; testResults: true };
}>;

function EditableCell({ getValue, row, column, table }: any) {
  const initialValue = getValue();
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function onBlur() {
    table.options.meta?.updateData(row.index, column.id, value);
  }

  if (table.options.meta?.editedRows[row.id]) {
    return (
      <Input
        type="number"
        min={0}
        className="max-w-12 text-center [-moz-appearance:textfield] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  }

  return <span>{value}</span>;
}

function EditButtons({ row, table }: any) {
  const meta = table.options.meta;

  const setEditedRows = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== 'edit') {
      meta?.revertData(row.index, e.currentTarget.name === 'cancel');
    }
  };

  return meta?.editedRows[row.id] ? (
    <>
      <div className="flex w-fit gap-2">
        <Button size="icon" onClick={setEditedRows} name="cancel">
          <X className="h-5 w-5" />
        </Button>
        <Button size="icon" onClick={setEditedRows} name="done">
          <Check className="h-5 w-5" />
        </Button>
      </div>
    </>
  ) : (
    <Button className="mx-6" size="icon" onClick={setEditedRows} name="edit">
      <Pencil className="h-5 w-5" />
    </Button>
  );
}

export const columns: ColumnDef<StudentWithResults>[] = [
  {
    accessorKey: 'icNo',
    header: 'IC No.',
  },
  {
    id: 'rank',
    accessorFn: (row) => (row.rank ? `${row.rank}` : '-'),
    header: 'Rank',
  },
  {
    id: 'name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: 'Name',
  },
  {
    id: 'PH1',
    accessorFn: (row) => `${row.testResults[0] ? row.testResults[0].PH1 : '-'}`,
    header: 'PH1 (20)',
    cell: EditableCell,
  },
  {
    id: 'PH2',
    accessorFn: (row) => `${row.testResults[0] ? row.testResults[0].PH2 : '-'}`,
    header: 'PH2 (20)',
    cell: EditableCell,
  },
  {
    id: 'assignment',
    accessorFn: (row) =>
      `${row.testResults[0] ? row.testResults[0].assignment : '-'}`,
    header: 'Assignment (10)',
    cell: EditableCell,
  },
  {
    id: 'finals',
    accessorFn: (row) =>
      `${row.testResults[0] ? row.testResults[0].finals : '-'}`,
    header: 'Finals (50)',
    cell: EditableCell,
  },
  {
    id: 'overall',
    header: 'Total',
    cell: ({ row }) => {
      return (
        <b>
          {row.original.testResults[0]
            ? row.original.testResults[0].overall
            : '-'}
        </b>
      );
    },
  },
  {
    accessorKey: 'letterGrade',
    header: 'Letter Grade',
    cell: ({ row }) => {
      return (
        <b>
          {row.original.testResults[0]
            ? getLetterGrade(row.original.testResults[0].overall)
            : 'ND'}
        </b>
      );
    },
  },
  {
    id: 'edit',
    cell: EditButtons,
  },
];
