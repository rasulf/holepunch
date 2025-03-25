import Hyperswarm from "hyperswarm";
import crypto from "hypercore-crypto";
import goodbye from "graceful-goodbye";

const swarm = new Hyperswarm();

let joinedPeers = [];

swarm.on('connection', (conn, peerInfo) => {
  console.log('swarm connected to a new peer: ');

  console.log('Peer connected to: ' + peerInfo.publicKey.toString('hex'));
  joinedPeers.push(peerInfo.publicKey);

  console.log('This Peer: ' + conn.publicKey.toString('hex'));
});

swarm.on('update', () => {
  console.log('There has been a swarm update');
});

const discovery = swarm.join(Buffer.from(process.argv[2], 'hex'), {
  server: false,
  client: true
});

setTimeout(() => {
  console.log("LEAVONG, BYE")
  swarm.leavePeer(joinedPeers[0]);
}, parseInt(process.argv[3]));

goodbye(() => discovery.destroy());

