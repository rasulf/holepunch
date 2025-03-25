import Hyperswarm from "hyperswarm";
import Hyperdrive from "hyperdrive";
import crypto from "hypercore-crypto";
import goodbye from "graceful-goodbye";
import Corestore from 'corestore';

async function createP2PService() {
  const store = new Corestore('./storage');
  const swarm = new Hyperswarm();
  const drive = new Hyperdrive(store);
  await drive.ready();
  console.log('Hyperdrive id: ' + drive.id);
  console.log('Hyperdrive hypercore public key: ' + drive.key.toString('hex'));
  console.log('Hash of drive public key: ' + drive.discoveryKey.toString('hex'));
  console.log('version/modificastions: ' + drive.version);

  setTimeout(async () => {
    await drive.put("./text.txt", Buffer.from(new Date().toISOString()));
    console.log("FLUSHED")
    drive.close();
    console.log('Hyperdrive hypercore public key: ' + drive.key.toString('hex'));
  }, 2000);

  goodbye(() => {
    drive.close();
    console.log("BYE")
  });

}

createP2PService();