import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePassword() {
  const characterPool =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  const passwordLength = 24;
  const randomNumber = new Uint8Array(1);
  let password = '';

  // JS doesn't provide a way to generate a cryptographically secure random number within a range, so instead
  // we just throw out values that don't correspond to a character. This is a little bit slower than using a
  // modulo operation, but it avoids introducing bias in the distribution. Realistically, it's easily performant
  // in this context.
  // @link https://dimitri.xyz/random-ints-from-random-bits/
  for (let i = 0; i < passwordLength; i++) {
    do {
      window.crypto.getRandomValues(randomNumber);
    } while (randomNumber[0] >= characterPool.length);

    password += characterPool[randomNumber[0]];
  }

  return password;
}
