function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getExceptionMessage(body: string | object): string | string[] {
  if (isRecord(body) && 'message' in body) {
    const msg = body.message;
    if (typeof msg === 'string' || Array.isArray(msg)) return msg;
  }

  if (typeof body === 'string') return body;

  return 'Unexpected error';
}