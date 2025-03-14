const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.listen(port, () => {
  console.log('3000번 포트에서 backend server 실행중...');
});

// app.get('/', (req, res) => {
//   res.send('STARBUCKS');
// });

app.get('/', (req, res) => {
  const products = [
    { prodNo: 'C0001', prodName: '아메리카노', prodPrice: 1500 },
    { prodNo: 'C0002', prodName: '바닐라라떼', prodPrice: 2000 },
    { prodNo: 'C0003', prodName: '바닐라크림 콜드브루', prodPrice: 2500 },
  ];
  res.json(products);
});
