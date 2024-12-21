import { MaskingPattern } from './masking';

export interface MaskingOptions {
  pattern: MaskingPattern;
  previewLength?: number;
  suffix?: string;
}

export class SecretValue {
  private readonly value: string;
  private readonly maskingOptions: Required<MaskingOptions>;

  constructor(
    value: string,
    options: Partial<MaskingOptions> = {}
  ) {
    this.value = value;
    this.maskingOptions = {
      pattern: options.pattern || MaskingPattern.FULL,
      previewLength: options.previewLength || 4,
      suffix: options.suffix || '********',
    };
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.mask();
  }

  toJSON(): string {
    return this.toString();
  }

  equals(other: SecretValue): boolean {
    return this.value === other.value;
  }

  private mask(): string {
    switch (this.maskingOptions.pattern) {
      case MaskingPattern.PARTIAL:
        return this.value.length <= this.maskingOptions.previewLength
          ? this.maskingOptions.suffix
          : `${this.value.slice(0, this.maskingOptions.previewLength)}${this.maskingOptions.suffix}`;
      
      case MaskingPattern.FULL:
      default:
        return this.maskingOptions.suffix;
    }
  }
}