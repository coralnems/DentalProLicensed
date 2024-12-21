export enum MaskingPattern {
  FULL = 'full',
  PARTIAL = 'partial',
}

export function maskValue(
  value: string,
  pattern: MaskingPattern = MaskingPattern.FULL,
  previewLength: number = 4
): string {
  const mask = '********';
  
  switch (pattern) {
    case MaskingPattern.PARTIAL:
      return value.length <= previewLength
        ? mask
        : `${value.slice(0, previewLength)}${mask}`;
    
    case MaskingPattern.FULL:
    default:
      return mask;
  }
}