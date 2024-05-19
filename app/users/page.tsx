'use client';

import { Plus } from 'lucide-react';

import Link from 'next/link';

import { db } from '@/lib/db';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';

import { columns } from '@/app/users/columns';

async function getUsers() {
  const users = await db.user.findMany({});

  return users;
}

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="space-y-6 py-10">
      <div className="flex flex-row items-center justify-between space-y-0.5 border-b pb-6">
        <Input className="max-w-sm" placeholder="Search and filter users..." />
        <Button variant="outline" asChild>
          <Link href="/users/add">
            <Plus className="mr-2 h-5 w-5" />
            Add User
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
