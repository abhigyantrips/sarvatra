'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as y from 'yup';

import { useRouter } from 'next/navigation';

import { postCourse } from '@/lib/postCourse';

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

const addCourseSchema = y.object().shape({
  courseCode: y.string().required('This field is required'),
  name: y.string().required('This field is required'),
  semesters: y
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('This field is required'),
  credits: y
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('This field is required'),
});

export default function AddCourse() {
  const router = useRouter();
  const form = useForm<y.InferType<typeof addCourseSchema>>({
    resolver: yupResolver(addCourseSchema),
  });

  async function onSubmit(values: y.InferType<typeof addCourseSchema>) {
    await postCourse(values);

    toast.success('Course dialog accepted.');
    router.push('/courses');
  }

  return (
    <div className="mx-auto max-w-screen-md justify-center space-y-6 py-10">
      <div className="flex flex-row justify-between space-y-0.5 border-b pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add a Course</h2>
          <p className="text-muted-foreground">
            This action allows for new courses to be added, with subjects under
            them.
          </p>
        </div>
        <Button type="submit" form="addCourse">
          Save
        </Button>
      </div>
      <Form {...form}>
        <form
          id="addCourse"
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="grid grid-cols-6 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Energy Systems" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-6 gap-3">
            <FormField
              control={form.control}
              name="courseCode"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="EODE" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semesters"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Semesters</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="4" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Credits</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
