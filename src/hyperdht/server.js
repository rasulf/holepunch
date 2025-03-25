import DHT from 'hyperdht';
import 'dotenv/config';
import goodbye from "graceful-goodbye";
import b4a from 'b4a';

const node = new DHT();

const server = node.createServer();

server.on('connection', (socket) => {
  console.log('Serber Connection')
  // console.log(socket);
  process.stdin.pipe(socket).pipe(process.stdout);
});

const keyPair = DHT.keyPair();

server.on('listening', () => {
  console.log('Serber Listineing')
  console.log(`peer ${b4a.toString(keyPair.publicKey, 'hex')} is listening..`);
})

await server.listen(keyPair).then(() => {
  console.log("Another listener callbbak");
});

goodbye(() => server.close());