import { describe, it, expect, vi } from 'vitest';
import { auditLogger } from '../../utils/security/audit';
import { logger } from '../../utils/logger';

// Mock the logger
vi.mock('../../utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('Audit Logger', () => {
  it('should create audit log entries', () => {
    const testAction = 'user.login';
    const testDetails = {
      userId: 'test-user',
      resourceType: 'auth',
      details: { method: 'password' },
    };

    auditLogger.log(testAction, testDetails);

    expect(logger.info).toHaveBeenCalledWith(
      'Audit Log Entry',
      expect.objectContaining({
        entry: expect.objectContaining({
          action: testAction,
          userId: testDetails.userId,
          resourceType: testDetails.resourceType,
        }),
      })
    );
  });

  it('should handle security events with severity', () => {
    const testAction = 'security.breach';
    const testDetails = {
      userId: 'test-user',
      resourceType: 'auth',
    };

    auditLogger.securityEvent(testAction, 'high', testDetails);

    expect(logger.warn).toHaveBeenCalledWith(
      'Security Event',
      expect.objectContaining({
        entry: expect.objectContaining({
          action: testAction,
          metadata: expect.objectContaining({
            severity: 'high',
          }),
        }),
      })
    );
  });
});