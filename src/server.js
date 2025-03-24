import DHT from 'hyperdht';
import 'dotenv/config';
import goodbye from "graceful-goodbye";

const node = new DHT();

const server = node.createServer();

server.on('connection', (socket) => {
  console.log('Serber Connection')
  console.log(socket);
  process.stdin.pipe(socket).pipe(process.stdout);
  // console.log('rempte public key', socket);
});

const keyPair = DHT.keyPair();

server.on('listening', () => {
  console.log('Serber Listineing')
  console.log(`peer ${keyPair.publicKey.toString('hex')} is listening..`);
})

await server.listen(keyPair);

goodbye(() => server.close());