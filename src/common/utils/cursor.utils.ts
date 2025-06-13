import { BadRequestException } from '@nestjs/common';
import { CursorTypes, decodeCursor } from '../types/paginatedResult.interface';

export function verifyCursor<T extends CursorTypes>(
  nextCursor: string | null | undefined,
  expectedType: string,
): T | null {
  if (!nextCursor) return null;

  try {
    const decoded = decodeCursor<T>(nextCursor);

    if (decoded.type !== expectedType) {
      throw new BadRequestException(`Cursor type mismatch. Expected: ${expectedType}`);
    }

    return decoded.payload;
  } catch (e) {
    console.error('Cursor decode failed:', e);
    throw new BadRequestException('Invalid cursor');
  }
}
