import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        icNo: {
          type: 'text',
          required: true,
        },
        password: {
          type: 'password',
          required: true,
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            icNo: credentials.icNo as string,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id + '',
          icNo: user.icNo,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
});
