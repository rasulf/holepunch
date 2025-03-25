import RPC from '@hyperswarm/rpc';
import crypto from 'hypercore-crypto';

const rpc = new RPC();

const client = await rpc.connect(Buffer.from(process.argv[2], 'hex'))

client.request('req1', Buffer.from('val')).then((response) => {
  console.log('response from server: ' + response.toString());
});