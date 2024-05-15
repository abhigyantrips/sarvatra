'use server';

import { signIn as authSignIn } from '@/auth';

export async function signIn(id: string, password: string, role: string) {
  await authSignIn('credentials', {
    icNo: id,
    password,
    role,
    redirectTo: '/profile',
  });
}
