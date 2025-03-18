const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

//CORS문제 해결
app.use(cors());

/*요청ContentType이 x-www-form-urlencoded인 경우
요청의 body사용하고 싶다면 아래 함수를 사용하세요*/
app.use(express.urlencoded({ extended: true }));

/*요청ContentType이 application/json인 경우
요청의 body사용하고 싶다면 아래 함수를 사용하세요*/
app.use(express.json());

app.get('/', function (req, res) {
  res.send('welcome!');
});

require('./js/product-back')(app);

app.listen(port, () => {
  console.log(`${port}번 포트에서 server 실행 중 ...`);
});
