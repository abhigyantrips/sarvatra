import type { NavItem } from '@/types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  title: 'Sarvatra',
  institute: 'College of Military Engineering, Pune',
  description:
    'A fully automated grading system for the officers of CME, Pune.',
  navLinks: [
    {
      title: 'Results',
      href: '/results',
      requiredRoles: ['STUDENT', 'TEACHER', 'ADMIN'],
    },
    {
      title: 'Courses',
      href: '/courses',
      requiredRoles: ['TEACHER', 'ADMIN'],
    },
    {
      title: 'Students',
      href: '/students',
      requiredRoles: ['ADMIN'],
    },
  ] satisfies NavItem[],
};
