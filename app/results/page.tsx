'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Subject, User } from '@prisma/client';
import { Save, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as y from 'yup';

import { useState } from 'react';

import { fetchResults } from '@/lib/fetchResults';
import { fetchSubject } from '@/lib/fetchSubject';
import { fetchUser } from '@/lib/fetchUser';
import { postResult } from '@/lib/postResult';

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

const marksFormSchema = y.object().shape({
  PH1: y
    .number()
    .min(0, 'Between 0 and 20')
    .max(20, 'Between 0 and 20')
    .optional(),
  PH2: y
    .number()
    .min(0, 'Between 0 and 20')
    .max(20, 'Between 0 and 20')
    .optional(),
  assignment: y
    .number()
    .min(0, 'Between 0 and 10')
    .max(10, 'Between 0 and 10')
    .optional(),
  finals: y
    .number()
    .min(0, 'Between 0 and 50')
    .max(50, 'Between 0 and 50')
    .optional(),
});

export default function Results() {
  const [user, setUser] = useState({} as User);
  const [subject, setSubject] = useState({} as Subject);
  const [showMarks, setShowMarks] = useState(false);
  const searchForm = useForm<y.InferType<typeof searchFormSchema>>({
    resolver: yupResolver(searchFormSchema),
  });
  const marksForm = useForm<y.InferType<typeof marksFormSchema>>({
    resolver: yupResolver(marksFormSchema),
    defaultValues: {
      PH1: 0,
      PH2: 0,
      assignment: 0,
      finals: 0,
    },
  });

  async function onSearchSubmit(values: y.InferType<typeof searchFormSchema>) {
    setShowMarks(false);
    marksForm.reset();
    const result = await fetchResults(values);

    if (result) {
      const dbUser = (await fetchUser(result.icNo)) ?? ({} as User);
      setUser(dbUser);

      const dbSubject = (await fetchSubject(values.subject)) ?? ({} as Subject);
      setSubject(dbSubject);

      setShowMarks(true);
      toast.success('Student profile loaded successfully.');
    } else {
      toast.error('Could not fetch the given user/subject.', {
        description:
          'The student might not be attending the specified subject.',
      });
    }
  }

  async function onMarksSubmit(values: y.InferType<typeof marksFormSchema>) {
    const result = await postResult(user, subject, values);

    if (result) {
      toast.success('Result uploaded successfully.');
    } else {
      toast.error('There was an error.');
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
      {showMarks && (
        <div className="flex flex-col items-start gap-3 border-b pb-6">
          <h2 className="text-md">
            <span className="font-bold">Name: </span>
            {user.rank ? `${user.rank} ` : ''}
            {`${user.firstName} `}
            {user.lastName ? `${user.lastName} ` : ''}
          </h2>
          <h2 className="text-md">
            <span className="font-bold">Subject: </span>
            {`(${subject.subjectCode}) ${subject.name}`}
          </h2>
        </div>
      )}
      {showMarks && (
        <Form {...marksForm}>
          <form
            id="marksForm"
            autoComplete="off"
            onSubmit={marksForm.handleSubmit(onMarksSubmit)}
            className="grid grid-cols-5 items-end gap-3 border-b pb-6"
          >
            <FormField
              control={marksForm.control}
              name="PH1"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>PH1 (20)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={marksForm.control}
              name="PH2"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>PH2 (20)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={marksForm.control}
              name="assignment"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Assignment (10)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={marksForm.control}
              name="finals"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Finals (50)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="col-span-1" variant="outline">
              <Save className="mr-2 h-5 w-5" />
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
