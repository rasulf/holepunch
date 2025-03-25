import RPC from '@hyperswarm/rpc';
import crypto from 'hypercore-crypto';

const rpc = new RPC();

const server = rpc.createServer();

// const serverPublicKey = crypto.randomBytes(32);
// const keyPair = crypto.encryptionKeyPair(serverPublicKey)
// console.log(keyPair.publicKey.toString('hex'));

server.listen().then(() => {
  console.log('listening. server public key: ' + server.publicKey.toString('hex'))
});

server.respond('req1', (req) => {
  console.log(JSON.stringify(req));
  return Buffer.from('response');
})

server.on('connection', (stream) => {
  console.log("recieved");
})