import { auth } from '@/auth';

export async function useCurrentRole() {
  const session = await auth();

  if (session) {
    return (session as unknown as any).role;
  } else {
    return undefined;
  }
}
