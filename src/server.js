import express from 'express';

const app = express();
  app.get('', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="./index.js"></script>
        <title>Holepunch</title>
      </head>
      <body>
        <div>
          <button id="list-drives">
            List Drives
          </button>
        </div>
      </body>
    </html>
    `;
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  app.listen(3000, () => {
    console.log('listening');
  });