import Hyperdrive from "hyperdrive";
import goodbye from "graceful-goodbye";
import Corestore from 'corestore';

async function createP2PService() {
  const store = new Corestore('./storage');
  const drive = new Hyperdrive(store);
  await drive.ready();
  console.log('Hyperdrive id: ' + drive.id);
  console.log('Hyperdrive hypercore public key: ' + drive.key.toString('hex'));
  console.log('Hash of drive public key: ' + drive.discoveryKey.toString('hex'));
  console.log('version/modificastions: ' + drive.version);

  await drive.put("./text1.txt", Buffer.from(new Date().toISOString()));
  await drive.put("./text2.txt", Buffer.from(new Date().toLocaleDateString()));
  await drive.del('./text.txt');
  console.log('Hyperdrive hypercore public key: ' + drive.key.toString('hex'));  

  goodbye(() => {
    drive.close();
    console.log("BYE")
  });

}

createP2PService();