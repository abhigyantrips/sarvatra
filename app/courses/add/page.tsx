'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as y from 'yup';

import { useRouter } from 'next/navigation';

import { generatePassword } from '@/lib/utils';

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
import { PasswordInput } from '@/components/ui/password-input';

const addCourseSchema = y.object().shape({
  email: y.string().email().optional(),
  phoneNo: y.string().optional(),
  aadharNo: y.string().optional(),
  panNo: y.string().optional(),
  icNo: y.string().required('This field is required'),
  rank: y.string().optional(),
  firstName: y.string().required('This field is required'),
  lastName: y.string().optional(),
  role: y
    .string()
    .oneOf(['STUDENT', 'TEACHER', 'ADMIN'])
    .required('This field is required'),
  password: y.string().required('This field is required'),
});

export default function AddCourse() {
  const router = useRouter();
  const form = useForm<y.InferType<typeof addCourseSchema>>({
    resolver: yupResolver(addCourseSchema),
  });

  function onSubmit(values: y.InferType<typeof addCourseSchema>) {
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
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="user@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1234567890" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-6 gap-3">
            <FormField
              control={form.control}
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
              control={form.control}
              name="aadharNo"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123456789012" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="panNo"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>PAN Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="TYPOS1234L" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-6 gap-3">
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Rank</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Maj." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ashok" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Kumar" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-6 items-end gap-3">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Student" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="*************" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="col-span-1"
              onClick={() => form.setValue('password', generatePassword())}
            >
              Generate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
