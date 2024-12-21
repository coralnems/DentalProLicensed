type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private readonly isDevelopment = import.meta.env.DEV;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatData(data: any): any {
    if (data === null || data === undefined) return data;
    
    if (Array.isArray(data)) {
      return data.map(item => this.formatData(item));
    }
    
    if (typeof data === 'object') {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          this.formatData(value)
        ])
      );
    }
    
    if (data?.toString) {
      return data.toString();
    }
    
    return data;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: any
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data: data ? this.formatData(data) : undefined,
    };
  }

  private log(entry: LogEntry): void {
    const { level, message, timestamp, data } = entry;
    
    if (this.isDevelopment) {
      const logFn = console[level] || console.log;
      logFn(
        `[${timestamp}] ${level.toUpperCase()}: ${message}`,
        data ? '\nData:' : '',
        data || ''
      );
    } else {
      // In production, you might want to send logs to a service
      // For now, we'll just use console.log for critical errors
      if (level === 'error') {
        console.error(
          `[${timestamp}] ERROR: ${message}`,
          data ? '\nData:' : '',
          data || ''
        );
      }
    }
  }

  debug(message: string, data?: any): void {
    this.log(this.createLogEntry('debug', message, data));
  }

  info(message: string, data?: any): void {
    this.log(this.createLogEntry('info', message, data));
  }

  warn(message: string, data?: any): void {
    this.log(this.createLogEntry('warn', message, data));
  }

  error(message: string, error?: Error | any): void {
    const errorData = error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: this.isDevelopment ? error.stack : undefined,
        }
      : error;

    this.log(this.createLogEntry('error', message, errorData));
  }
}

export const logger = Logger.getInstance();