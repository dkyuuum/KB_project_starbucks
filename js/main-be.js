const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const cors = require('cors');
app.use(cors());

app.listen(port, () => {
  console.log('3000번 포트에서 backend server 실행중...');
});

// app.use(
//   '/img',
//   express.static(path.join(__dirname, 'KB_project_starbucks/img'))
// );

app.get('/', (req, res) => {
  const springProducts = [
    { id: 2, imageUrl: '/img/2025_spring_top_drink02.png' },
    { id: 1, imageUrl: '/img/2025_spring_top_drink01.png' },
    { id: 3, imageUrl: '/img/2025_spring_top_drink03.png' },
  ];
  res.json(springProducts);
});
