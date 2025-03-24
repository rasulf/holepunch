// import DHT from "dht-rpc";
import DHT from 'hyperdht';
import "dotenv/config";
import b4a from 'b4a';

const node = new DHT();

const conn = node.connect(b4a.from(process.argv[2], 'hex'));
// const socket = node.connect(Buffer.from("9zPcy6lR/Q1ZaW5DCquV+6HHNnC3/CH+WSH89Gb+e8M=", 'base64'))
console.log(process.argv[2]);

conn.once('open', (e) => {
  console.log("GOT CONNECTIOn");
})

process.stdin.pipe(conn).pipe(process.stdout);