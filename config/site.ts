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
      title: 'Subjects',
      href: '/subjects',
      requiredRoles: ['TEACHER', 'ADMIN'],
    },
    {
      title: 'Users',
      href: '/users',
      requiredRoles: ['ADMIN'],
    },
  ] satisfies NavItem[],
};
