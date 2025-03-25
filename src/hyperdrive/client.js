import Hyperdrive from "hyperdrive";
import Corestore from 'corestore';

async function connectToP2PService(driveKey) {
  const store = new Corestore('./storage');
  const drive = new Hyperdrive(store);

  await drive.ready();

  console.log('Client connected to Hyperdrive: ' + drive.key.toString('hex'));

  try {
    const file = await drive.get("/text.txt");
    if (file) {
      console.log("File content:", file.toString());
    } else {
      console.log("File not found or empty.");
    }
  } catch (err) {
    console.error("Error reading file:", err);
  } finally {
    drive.close();
  }
}

// Replace with the actual drive key from server.js
const driveKeyFromSever = process.argv[2]; // Get the driveKey from command line arguments

if (!driveKeyFromSever) {
  console.error("Please provide the drive key as a command-line argument.");
  process.exit(1);
}

connectToP2PService(driveKeyFromSever);