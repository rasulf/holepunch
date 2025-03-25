import Hyperdrive from "hyperdrive";
import Corestore from 'corestore';

async function connectToP2PService(driveKey) {
  const store = new Corestore('./storage');
  const drive = new Hyperdrive(store);

  await drive.ready();

  console.log('Client connected to Hyperdrive: ' + drive.key.toString('hex'));

  const dir = await drive.readdir('/');
  // console.log('Directory: ' + JSON.stringify(dir));
  dir.on('data', async (fileName) => {
    console.log("File name: " + fileName);
    const file = await drive.get(fileName);
    console.log("File content: ", file.toString());
  });
  
}


const driveKeyFromSever = process.argv[2];

connectToP2PService(driveKeyFromSever);