const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//CORS문제 해결
const cors = require('cors');
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

// app.use(express.static(path.join(__dirname, 'html')));

app.listen(port, () => {
  console.log('3000번 포트에서 server 실행 중 ...');
});
