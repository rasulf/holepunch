// import DHT from "dht-rpc";
import DHT from 'hyperdht';
import "dotenv/config";

const node = new DHT();

const socket = node.connect(Buffer.from(process.argv[2], 'hex'));
// const socket = node.connect(Buffer.from("9zPcy6lR/Q1ZaW5DCquV+6HHNnC3/CH+WSH89Gb+e8M=", 'base64'))
console.log(process.argv[2]);

socket.on('open', (e) => {
  console.log(e);
})

process.stdin.pipe(socket).pipe(process.stdout);