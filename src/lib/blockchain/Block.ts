import { SHA256 } from 'crypto-js';

export interface BlockData {
  timestamp: number;
  patientId: string;
  recordType: string;
  recordHash: string;
  previousHash: string;
  metadata: {
    modifiedBy: string;
    action: 'create' | 'update' | 'view';
  };
}

export class Block {
  public hash: string;
  public nonce: number = 0;

  constructor(
    public timestamp: number,
    public data: BlockData,
    public previousHash: string = ''
  ) {
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data) +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): void {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  isValid(): boolean {
    return this.hash === this.calculateHash();
  }
}