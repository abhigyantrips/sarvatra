'use server';

import { signIn as authSignIn } from '@/auth';

export async function signIn(id: string, password: string) {
  await authSignIn('credentials', {
    icNo: id,
    password,
    redirectTo: '/profile',
  });
}
