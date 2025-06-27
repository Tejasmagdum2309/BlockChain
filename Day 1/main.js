import pkg from 'crypto-js';
const { SHA256 } = pkg;
// Define a simple block structure
class Block{
    constructor(index = 0, previousHash = "", timestamp = 0, data = "", hash = "", transation = {}){
        this.index = index;        // Fix: use parameter values
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
        this.transation = transation;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        
    }

    createGenesisBlock(){
        return new Block( 0, "0", Date.now(), "Genesis Block", "0", {}); 
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }
}

let myBlockchain = new Blockchain();

myBlockchain.addBlock(new Block(1, "", Date.now(), { amount: 4 }, "", { from: "Alice", to: "Bob" }));
myBlockchain.addBlock(new Block(2, "", Date.now(), { amount: 10 }, "", { from: "Bob", to: "Charlie" }));

console.log(JSON.stringify(myBlockchain, null, 4));