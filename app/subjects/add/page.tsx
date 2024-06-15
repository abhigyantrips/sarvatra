'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as y from 'yup';

import { useRouter } from 'next/navigation';

import { postSubject } from '@/lib/postSubject';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const addSubjectSchema = y.object().shape({
  subjectCode: y.string().required('This field is required'),
  name: y.string().required('This field is required'),
  course: y
    .string()
    .oneOf(['MTech', 'EODE1', 'EODE2', 'TES1', 'TES2'])
    .required('This field is required'),
  semester: y
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('This field is required'),
  credits: y
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('This field is required'),
});

export default function AddSubject() {
  const router = useRouter();
  const form = useForm<y.InferType<typeof addSubjectSchema>>({
    resolver: yupResolver(addSubjectSchema),
  });

  async function onSubmit(values: y.InferType<typeof addSubjectSchema>) {
    await postSubject(values);

    toast.success('Subject dialog accepted.');
    router.push('/subjects');
  }

  return (
    <div className="mx-auto max-w-screen-md justify-center space-y-6 py-10">
      <div className="flex flex-row justify-between space-y-0.5 border-b pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add a Subject</h2>
          <p className="text-muted-foreground">
            This action allows creating new subjects and connecting them to
            courses.
          </p>
        </div>
        <Button type="submit" form="addSubject">
          Save
        </Button>
      </div>
      <Form {...form}>
        <form
          id="addSubject"
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
                    <Input {...field} placeholder="Soft Computing Techniques" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-6 gap-3">
            <FormField
              control={form.control}
              name="subjectCode"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Subject Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="MES204" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Semester</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ? field.value.toString() : ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Credits</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MTech">
                        M.Tech - Energy Systems
                      </SelectItem>
                      <SelectItem value="EODE1">EODE - Electrical</SelectItem>
                      <SelectItem value="EODE2">EODE - Civil</SelectItem>
                      <SelectItem value="TES1">TES - Civil</SelectItem>
                      <SelectItem value="TES2">TES - Mechanical</SelectItem>
                    </SelectContent>
                  </Select>
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
