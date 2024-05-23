'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Save, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as y from 'yup';

import { useEffect, useState } from 'react';

import { db } from '@/lib/db';
import { fetchResults } from '@/lib/fetchResults';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const searchFormSchema = y.object().shape({
  icNo: y.string().required('This field is required'),
  subject: y.string().required('This field is required'),
});

export default function Results() {
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showMarks, setShowMarks] = useState(false);
  const searchForm = useForm<y.InferType<typeof searchFormSchema>>({
    resolver: yupResolver(searchFormSchema),
  });

  async function onSearchSubmit(values: y.InferType<typeof searchFormSchema>) {
    setShowMarks(false);
    const result = await fetchResults(values);

    if (result) {
      setShowMarks(true);
      toast.success('Found something!');
    } else {
      toast.error('Did not find something.');
    }
  }

  return (
    <div className="mx-auto max-w-screen-md justify-center space-y-6 py-10">
      <Form {...searchForm}>
        <form
          id="searchForm"
          autoComplete="off"
          onSubmit={searchForm.handleSubmit(onSearchSubmit)}
          className="grid grid-cols-6 items-end gap-3 border-b pb-6"
        >
          <FormField
            control={searchForm.control}
            name="icNo"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>IC Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="IC12345K" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={searchForm.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Mechatronics" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-1" variant="outline">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </form>
      </Form>
      {showMarks && <div></div>}
    </div>
  );
}
