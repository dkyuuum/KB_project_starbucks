const express = require('express');
// import express from 'express';

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.get('/product/list', (req, res) => {
  const products = [
    {
      prodNo: 'C0001',
      prodName: '아메리카노',
      prodPrice: 1500,
      prodImg: '../img/C0001.jpg',
    },
    {
      prodNo: 'C0002',
      prodName: '아이스 아메리카노',
      prodPrice: 1700,
      prodImg: '../img/C0002.jpg',
    },
    {
      prodNo: 'C0003',
      prodName: '라떼',
      prodPrice: 2000,
      prodImg: '../img/C0003.jpg',
    },
    {
      prodNo: 'C0004',
      prodName: '아이스 라떼',
      prodPrice: 2200,
      prodImg: '../img/C0004.jpg',
    },
    {
      prodNo: 'C0005',
      prodName: '아이스 라떼',
      prodPrice: 2200,
      prodImg: '../img/C0005.jpg',
    },
    {
      prodNo: 'C0006',
      prodName: '아이스 라떼',
      prodPrice: 2200,
      prodImg: '../img/C0006.jpg',
    },
    {
      prodNo: 'C0007',
      prodName: '아이스 라떼',
      prodPrice: 2200,
      prodImg: '../img/C0007.jpg',
    },
  ];

  res.json(products);
});

app.get('/product/detail/:prodNo', (req, res) => {
  let product;

  if (req.params.prodNo == 'C0001') {
    product = { prodNo: 'C0001', prodName: '아메리카노', prodPrice: 1500 };
  } else {
    product = {
      prodNo: '그 외의 상품',
      prodName: '그 외의 상품',
      prodPrice: '그 외의 상품',
    };
  }

  res.json(product);
});

app.listen(port, () => {
  console.log('3000번 포트에서 backend server 실행 중 ...');
});
