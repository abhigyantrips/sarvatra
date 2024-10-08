'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  GraduationCapIcon,
  KeySquareIcon,
  Loader2Icon,
  SchoolIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as y from 'yup';

import { useState } from 'react';

import { signIn } from '@/lib/sign-in';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const loginSchema = y.object().shape({
  type: y
    .string()
    .oneOf(['STUDENT', 'TEACHER', 'ADMIN'])
    .required('This field is required'),
  id: y.string().required('This field is required'),
  password: y.string().required('This field is required'),
});

export default function Login() {
  const [loading, setLoading] = useState(false);

  const form = useForm<y.InferType<typeof loginSchema>>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      type: 'STUDENT',
      id: '',
      password: '',
    },
  });

  async function onSubmit(values: y.InferType<typeof loginSchema>) {
    setLoading(true);
    try {
      await signIn(values.id, values.password, values.type);
      toast.success('Login successful.');
    } catch (e) {
      setLoading(false);
      toast.error('Something went wrong!', {
        description: 'The ID/password you entered is incorrect',
      });
    }
  }

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.20))] w-full flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="STUDENT"
                          id="student"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="student"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <GraduationCapIcon className="mb-3 h-6 w-6" />
                          Student
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="TEACHER"
                          id="instructor"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="instructor"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <SchoolIcon className="mb-3 h-6 w-6" />
                          Instructor
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="ADMIN"
                          id="admin"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="admin"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <KeySquareIcon className="mb-3 h-6 w-6" />
                          Admin
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormControl>
                      <Input placeholder="User ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2Icon className="animate-spin duration-1000" />
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
