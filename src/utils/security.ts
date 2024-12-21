import { generateRandomString } from './string';

export class SecretValue {
  private static readonly MASK = '********';
  private readonly value: string;
  private readonly masked: string;
  private readonly preview: string;

  constructor(value: string, previewLength: number = 4) {
    this.value = value;
    this.masked = SecretValue.MASK;
    this.preview = this.generatePreview(value, previewLength);
  }

  private generatePreview(value: string, length: number): string {
    if (value.length <= length) return SecretValue.MASK;
    return `${value.slice(0, length)}${SecretValue.MASK}`;
  }

  toString(): string {
    return this.masked;
  }

  toJSON(): string {
    return this.masked;
  }

  getValue(): string {
    return this.value;
  }

  getPreview(): string {
    return this.preview;
  }

  equals(other: SecretValue): boolean {
    return this.value === other.value;
  }
}