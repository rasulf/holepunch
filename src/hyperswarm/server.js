import Hyperswarm from "hyperswarm";
import crypto from "hypercore-crypto";
import { server } from "typescript";
import goodbye from "graceful-goodbye";

const swarm = new Hyperswarm();

const topic = crypto.randomBytes(32);

swarm.on('connection', (conn, peerInfo) => {
  console.log('swarm connected to a new peer!');
  console.log('Peer connected to: ' + peerInfo.publicKey.toString('hex'));
  console.log('This Peer: ' + conn.publicKey.toString('hex'));
});

swarm.on('update', () => {
  console.log('There has been a swarm update');
  console.log('Connections in progress: ' + swarm.connecting);
  console.log('Active Connections: ' + JSON.stringify(swarm.connections));
});

swarm.listen().then(() => {
  console.log('Server Swarm is now listening. Topic: ' + topic.toString('hex'));
});

swarm.flush().then(() => {
  console.log('Server Swamr Flush. Swarm has connected to every peer.')
})

const discovery = swarm.join(topic, {
  server: true,
  client: false
})

discovery.flushed().then(() => {
  console.log('Topic fully announced');
});


goodbye(() => discovery.destroy());
