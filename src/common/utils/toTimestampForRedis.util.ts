function toTimestampForRedis(input?: string | number, defaultVal: '-inf' | '+inf' = '-inf'): string {
  if (input === undefined || input === null || input === '') {
    return defaultVal;
  }

  // 如果是数字就直接 toString
  if (typeof input === 'number') {
    return input.toString();
  }

  // 如果是能转成有效数字的字符串（即时间戳字符串）
  const parsed = Number(input);
  if (!isNaN(parsed)) {
    return parsed.toString();
  }

  throw new Error(`Invalid timestamp input: ${input}`);
}
