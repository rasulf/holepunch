import Hyperbee from "hyperbee";
import goodbye from "graceful-goodbye";
import Hypercore from "hypercore";

const store = new Hypercore('./server-storage');
const db = new Hyperbee(store);

async function p2p() {

  await db.ready();
  console.log('Bee public key: ' + db.key.toString('hex'));
  console.log('Bee version/modifications: ' + db.version);
  console.log('Bee discovery key: ' + db.discoveryKey.toString('hex'));
  const retrievedValue = await db.get('key');
  console.log(`key: ${retrievedValue.value.toString()}`);
  console.log('');

  goodbye(() => db.close());
}

p2p();