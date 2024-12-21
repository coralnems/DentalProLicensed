import { Block, BlockData } from './Block';

export class BlockChain {
  private static instance: BlockChain;
  private chain: Block[] = [];
  private readonly difficulty: number = 4;

  private constructor() {
    // Genesis block
    this.chain.push(new Block(Date.now(), {
      timestamp: Date.now(),
      patientId: '0',
      recordType: 'genesis',
      recordHash: '0',
      previousHash: '0',
      metadata: {
        modifiedBy: 'system',
        action: 'create'
      }
    }));
  }

  public static getInstance(): BlockChain {
    if (!BlockChain.instance) {
      BlockChain.instance = new BlockChain();
    }
    return BlockChain.instance;
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: BlockData): Block {
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block(Date.now(), data, previousBlock.hash);
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.isValid()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getBlocksByPatientId(patientId: string): Block[] {
    return this.chain.filter(block => block.data.patientId === patientId);
  }

  getBlockByHash(hash: string): Block | undefined {
    return this.chain.find(block => block.hash === hash);
  }
}