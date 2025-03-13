import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('welcome!');
});

app.listen(port, () => {
  console.log('8080번 포트에서 server 실행 중 ...');
});
