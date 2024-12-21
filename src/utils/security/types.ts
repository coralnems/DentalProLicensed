import type { MaskingPattern } from './masking';

export interface MaskingOptions {
  pattern: MaskingPattern;
  previewLength: number;
  suffix: string;
  customPattern?: RegExp;
}

export interface AuditLogEntry {
  timestamp: string;
  action: string;
  userId?: string;
  resourceType?: string;
  resourceId?: string;
  details?: Record<string, any>;
  metadata: {
    ip?: string;
    userAgent?: string;
    source?: string;
  };
}