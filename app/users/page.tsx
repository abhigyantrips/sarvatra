'use client';

import { Plus } from 'lucide-react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Users() {
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
    </div>
  );
}
