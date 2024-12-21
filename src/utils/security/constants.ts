export const SECURITY_CONSTANTS = {
  MASK_PATTERN: {
    JWT: /(?<=\.)[^.]+(?=\.|$)/g,
    EMAIL: /(?<=@)[^@]+$/,
    API_KEY: /^.{4}/,
  },
  AUDIT: {
    MAX_RETENTION_DAYS: 90,
    BATCH_SIZE: 100,
  },
} as const;