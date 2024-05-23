'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Prisma } from '@prisma/client';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as y from 'yup';

import { useState } from 'react';

import { fetchMarksheet } from '@/lib/fetchMarksheet';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { columns } from '@/app/marksheets/columns';

type ResultWithStudent = Prisma.ResultGetPayload<{
  include: { student: true };
}>;

const marksheetSchema = y.object().shape({
  subjectCode: y.string().required('This field is required'),
});

export default function Marksheets() {
  const [showTable, setShowTable] = useState(false);
  const [marksheet, setMarksheet] = useState([] as ResultWithStudent[]);
  const marksheetForm = useForm<y.InferType<typeof marksheetSchema>>({
    resolver: yupResolver(marksheetSchema),
  });

  async function onSubmit(values: y.InferType<typeof marksheetSchema>) {
    setShowTable(false);
    const dbMarksheet = await fetchMarksheet(values.subjectCode);
    setMarksheet(dbMarksheet);
    setShowTable(true);
  }

  return (
    <div className="space-y-6 py-10">
      <Form {...marksheetForm}>
        <form
          id="marksheetForm"
          autoComplete="off"
          onSubmit={marksheetForm.handleSubmit(onSubmit)}
          className="flex flex-row items-start gap-3"
        >
          <FormField
            control={marksheetForm.control}
            name="subjectCode"
            render={({ field }) => (
              <FormItem className="max-w-screen-sm">
                <FormControl>
                  <Input {...field} placeholder="Subject Code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </form>
      </Form>
      {showTable && <DataTable columns={columns} data={marksheet} />}
    </div>
  );
}
