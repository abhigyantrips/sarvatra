'use client';

import { Prisma } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';

import { getCourse } from '@/lib/getCourse';
import { getGradeSheet } from '@/lib/getGradeSheet';
import { getLetterGrade } from '@/lib/getLetterGrade';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type GradeSheet = Prisma.ResultGetPayload<{
  select: {
    subject: true;
    overall: true;
  };
}>[];

export default function GradeSheet() {
  const { data: session, status } = useSession();
  const [readyForRender, setReadyForRender] = useState(false);
  const [gradeSheet, setGradeSheet] = useState([] as GradeSheet);

  let semesters = 6;

  useEffect(() => {
    (async () => {
      if (status === 'authenticated') {
        const course = await getCourse((session as unknown as any).id);
        semesters = course!.semesters;
        console.log(semesters);
        setGradeSheet(await getGradeSheet((session as unknown as any).id));
        console.log(gradeSheet);
        setReadyForRender(true);
      }
    })();
  }, [session, status, gradeSheet, readyForRender]);

  if (readyForRender) {
    return (
      <div className="flex w-full justify-center py-10">
        <div className="rounded-l-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            {Array.from({ length: semesters / 2 }).map((_, index) => {
              return (
                <TableBody className="w-full">
                  <TableRow>
                    <TableHead
                      colSpan={4}
                      className="border text-center font-bold uppercase text-foreground"
                    >
                      Semester {index + 1}
                    </TableHead>
                  </TableRow>
                  {gradeSheet
                    .filter((result) => {
                      if (result.subject.semester === index + 1) {
                        return result;
                      }
                    })
                    .map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>{result.subject.subjectCode}</TableCell>
                        <TableCell>{result.subject.name}</TableCell>
                        <TableCell>{result.subject.credits}</TableCell>
                        <TableCell className="font-bold">
                          {getLetterGrade(result.overall) || 'ND'}
                        </TableCell>
                      </TableRow>
                    ))}
                  {Array.from({
                    length:
                      10 -
                      gradeSheet.filter((result) => {
                        if (result.subject.semester === index + 1) {
                          return result;
                        }
                      }).length,
                  }).map((_, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell colSpan={4} className="invisible">
                          -
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              );
            })}
          </Table>
        </div>
        <div className="rounded-r-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Credit</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            {Array.from({ length: semesters / 2 }).map((_, index) => {
              return (
                <TableBody className="w-full">
                  <TableRow>
                    <TableHead
                      colSpan={4}
                      className="border text-center font-bold uppercase text-foreground"
                    >
                      Semester {semesters / 2 + index + 1}
                    </TableHead>
                  </TableRow>
                  {gradeSheet
                    .filter((result) => {
                      if (
                        result.subject.semester ===
                        semesters / 2 + index + 1
                      ) {
                        return result;
                      }
                    })
                    .map((result) => (
                      <TableRow>
                        <TableCell>{result.subject.subjectCode}</TableCell>
                        <TableCell>{result.subject.name}</TableCell>
                        <TableCell>{result.subject.credits}</TableCell>
                        <TableCell className="font-bold">
                          {getLetterGrade(result.overall) || 'ND'}
                        </TableCell>
                      </TableRow>
                    ))}
                  {Array.from({
                    length:
                      10 -
                      gradeSheet.filter((result) => {
                        if (
                          result.subject.semester ===
                          semesters / 2 + index + 1
                        ) {
                          return result;
                        }
                      }).length,
                  }).map((_, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell colSpan={4} className="invisible">
                          -
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              );
            })}
          </Table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-[calc(100vh_-_theme(spacing.20))] w-full items-center justify-center">
        <Loader2Icon className="h-10 w-10 animate-spin duration-1000" />
        <p className="p-4 text-xl font-light">Compiling Grade Sheet</p>
      </div>
    );
  }
}
