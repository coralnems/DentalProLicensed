import { BlockChain } from './Chain';
import { createHash } from 'crypto';
import { SecretValue } from '../utils/security/SecretValue';

export class MedicalRecordManager {
  private blockchain: BlockChain;

  constructor() {
    this.blockchain = BlockChain.getInstance();
  }

  async addRecord(
    patientId: string,
    recordType: string,
    recordData: any,
    modifiedBy: string
  ): Promise<string> {
    // Hash the record data
    const recordHash = createHash('sha256')
      .update(JSON.stringify(recordData))
      .digest('hex');

    // Add to blockchain
    const block = this.blockchain.addBlock({
      timestamp: Date.now(),
      patientId,
      recordType,
      recordHash,
      previousHash: this.blockchain.getLatestBlock().hash,
      metadata: {
        modifiedBy,
        action: 'create'
      }
    });

    return block.hash;
  }

  verifyRecordIntegrity(blockHash: string, recordData: any): boolean {
    const block = this.blockchain.getBlockByHash(blockHash);
    if (!block) return false;

    const currentHash = createHash('sha256')
      .update(JSON.stringify(recordData))
      .digest('hex');

    return block.data.recordHash === currentHash;
  }

  getRecordHistory(patientId: string): Array<{
    timestamp: number;
    recordType: string;
    modifiedBy: string;
    action: string;
    hash: string;
  }> {
    return this.blockchain
      .getBlocksByPatientId(patientId)
      .map(block => ({
        timestamp: block.timestamp,
        recordType: block.data.recordType,
        modifiedBy: block.data.metadata.modifiedBy,
        action: block.data.metadata.action,
        hash: block.hash
      }));
  }
}