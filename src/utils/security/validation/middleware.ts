import { z } from 'zod';
import { XSSProtection } from '../xss';
import { auditLogger } from '../audit';

export class ValidationMiddleware {
  static async validate<T>(
    data: unknown,
    schema: z.Schema<T>,
    options: {
      sanitize?: boolean;
      audit?: boolean;
      context?: string;
    } = {}
  ): Promise<T> {
    const { sanitize = true, audit = true, context = 'validation' } = options;

    try {
      // Sanitize input if enabled
      const sanitizedData = sanitize
        ? this.sanitizeObject(data)
        : data;

      // Validate against schema
      const validatedData = await schema.parseAsync(sanitizedData);

      if (audit) {
        auditLogger.log(`${context}.success`, {
          details: { schema: schema.description },
        });
      }

      return validatedData;
    } catch (error) {
      if (audit) {
        auditLogger.securityEvent(
          `${context}.failure`,
          'medium',
          {
            details: {
              error: error instanceof Error ? error.message : 'Validation failed',
              schema: schema.description,
            },
          }
        );
      }
      throw error;
    }
  }

  private static sanitizeObject(obj: unknown): unknown {
    if (typeof obj !== 'object' || obj === null) {
      return typeof obj === 'string'
        ? XSSProtection.sanitizeInput(obj)
        : obj;
    }

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        this.sanitizeObject(value),
      ])
    );
  }
}