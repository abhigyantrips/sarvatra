import { Role } from '@prisma/client';
import { compare } from 'bcryptjs';
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from '@/lib/db';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      role: string;
    };
  }
}

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
          name: `${user.rank ? user.rank + ' ' : ''}${user.firstName} ${user.lastName}`,
          role: user.role as string,
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
          role: u.role,
        };
      }
      return token;
    },
  },
});
