import { logger } from '../logger';
import type { AuditLogEntry } from './types';

class AuditLogger {
  private static instance: AuditLogger;
  
  private constructor() {}

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  private createAuditEntry(
    action: string,
    details: Partial<AuditLogEntry>
  ): AuditLogEntry {
    return {
      timestamp: new Date().toISOString(),
      action,
      ...details,
      metadata: {
        source: 'web-client',
        ...details.metadata,
      },
    };
  }

  log(action: string, details: Partial<AuditLogEntry>): void {
    const entry = this.createAuditEntry(action, details);
    
    // Log locally
    logger.info('Audit Log Entry', { entry });
    
    // In a real application, you might want to:
    // 1. Send to a secure audit log storage
    // 2. Queue for batch processing
    // 3. Trigger security alerts based on patterns
  }

  securityEvent(
    action: string,
    severity: 'low' | 'medium' | 'high',
    details: Partial<AuditLogEntry>
  ): void {
    const entry = this.createAuditEntry(action, {
      ...details,
      metadata: {
        ...details.metadata,
        severity,
      },
    });

    logger.warn('Security Event', { entry });
    
    // In production, implement security alerting
    if (severity === 'high') {
      // Trigger immediate security response
    }
  }
}

export const auditLogger = AuditLogger.getInstance();