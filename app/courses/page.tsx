'use client';

import { Plus } from 'lucide-react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Courses() {
  return (
    <div className="space-y-6 py-10">
      <div className="flex flex-row items-center justify-between space-y-0.5 border-b pb-6">
        <Input
          className="max-w-sm"
          placeholder="Search and filter courses..."
        />
        <Button variant="outline" asChild>
          <Link href="/subjects/add">
            <Plus className="mr-2 h-5 w-5" />
            Add Course
          </Link>
        </Button>
      </div>
    </div>
  );
}
