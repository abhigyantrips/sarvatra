import { Role } from '@prisma/client';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from '@/lib/db';

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
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
        role: {
          type: 'text',
          required: true,
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            icNo: credentials.icNo as string,
            role: credentials.role as unknown as Role,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid || !(user.role === credentials.role)) {
          return null;
        }

        return {
          id: user.icNo as string,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    session({ session, token }) {
      return { ...session, ...token };
    },
    jwt({ token, user }) {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
});
