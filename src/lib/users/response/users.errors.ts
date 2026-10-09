import { ConflictException } from '@nestjs/common';

export function handleDuplicateEmailError(error: unknown): never {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ER_DUP_ENTRY'
  ) {
    throw new ConflictException('Email already exists');
  }

  throw error;
}
