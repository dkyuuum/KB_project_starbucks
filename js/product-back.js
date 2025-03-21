module.exports = (app) => {
  const products = [
    {
      prodNo: 'C0001',
      prodName: '아메리카노',
      prodNameEng: 'Americano',
      prodCategory: '에스프레소',
      prodPrice: 1500,
      prodImg: '/img/C0001.jpg',
      prodDesc: '맛있는 커피',
      prodKcal: 80,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '',
      prodCount: '',
    },
    {
      prodNo: 'C0002',
      prodName: '아이스 아메리카노',
      prodNameEng: 'Ice Americano',
      prodPrice: 1700,
      prodImg: '/img/C0002.jpg',
      prodDesc: '으어 찹다',
      prodKcal: 80,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '',
      prodCount: '',
    },
    {
      prodNo: 'C0003',
      prodName: '라떼',
      prodNameEng: 'Latte',
      prodPrice: 2000,
      prodImg: '../img/C0003.jpg',
      prodDesc: '에스프레소 + 우유',
      prodKcal: 100,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 0,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '우유',
      prodCount: '',
    },
    {
      prodNo: 'C0004',
      prodName: '아이스 라떼',
      prodNameEng: 'Ice Latte',
      prodPrice: 2200,
      prodImg: '../img/C0004.jpg',
      prodDesc: '에스프레소 + 우유 + 얼음',
      prodKcal: 100,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 0,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '우유',
      prodCount: '',
    },
    {
      prodNo: 'C0005',
      prodName: '콜드 브루 몰트',
      prodNameEng: 'Cold Brew Malt',
      prodPrice: 3000,
      prodImg: '../img/C0005.jpg',
      prodDesc: '맛있다!',
      prodKcal: 150,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '',
      prodCount: '',
    },
    {
      prodNo: 'C0006',
      prodName: '아이스 라벤더 카페 브레베',
      prodNameEng: 'Lavender Cafe Breve',
      prodPrice: 3500,
      prodImg: '../img/C0006.jpg',
      prodDesc: '라벤더 향! ',
      prodKcal: 200,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '우유',
      prodCount: '',
    },
    {
      prodNo: 'C0007',
      prodName: '스타벅스 1호점 크림 라떼',
      prodNameEng: 'Starbucks 1st Store Cream Latte',
      prodPrice: 3500,
      prodImg: '/img/C0007.jpg',
      prodDesc: '맛있는 커피',
      prodKcal: 250,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '우유',
      prodCount: '',
    },
    {
      prodNo: 'C0001',
      prodName: '아메리카노',
      prodNameEng: 'Americano',
      prodCategory: '에스프레소',
      prodPrice: 1500,
      prodImg: '/img/C0001.jpg',
      prodDesc: '맛있는 커피',
      prodKcal: 80,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '',
      prodCount: '',
    },
    {
      prodNo: 'C0002',
      prodName: '아이스 아메리카노',
      prodNameEng: 'Ice Americano',
      prodPrice: 1700,
      prodImg: '/img/C0002.jpg',
      prodDesc: '으어 찹다',
      prodKcal: 80,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '',
      prodCount: '',
    },
    {
      prodNo: 'C0003',
      prodName: '라떼',
      prodNameEng: 'Latte',
      prodPrice: 2000,
      prodImg: '../img/C0003.jpg',
      prodDesc: '맛있는 커피',
      prodKcal: 80,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '우유',
      prodCount: '',
    },
    {
      prodNo: 'C0004',
      prodName: '아이스 라떼',
      prodNameEng: 'Ice Latte',
      prodPrice: 2200,
      prodImg: '/img/C0004.jpg',
      prodDesc: '맛있는 커피',
      prodKcal: 80,
      prodSod: 80,
      prodFat: 2,
      prodSugar: 2,
      prodProtein: 3,
      prodCaffeine: 50,
      prodAllergy: '우유',
      prodCount: '',
    },
  ];

  // 전체 상품 리스트 API
  app.get('/product/list', (req, res) => {
    res.json(products);
  });

  // 특정 상품 상세 조회 API
  app.get(`/product/detail/:prodNo`, (req, res) => {
    const { prodNo } = req.params;
    const product = products.find((p) => p.prodNo === prodNo);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
  });

  const cart = []; // 장바구니 데이터

  // 장바구니 담기 API
  app.post('/cart/add', (req, res) => {
    const { prodNo, count } = req.body;

    // 상품 찾기
    const product = products.find((p) => p.prodNo === prodNo);

    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    const existingCartItem = cart.find((item) => item.prodNo === prodNo);
    //동일한 상품이 장바구니에 담겨있는 경우
    if (existingCartItem) {
      existingCartItem.count += parseInt(count, 10);
    } else {
      const cartItem = {
        prodNo,
        count: parseInt(count, 10),
        prodName: product.prodName,
        price: product.prodPrice,
        proImg: product.prodImg,
      };
      cart.push(cartItem);
    }

    return res
      .status(200)
      .json({ message: '장바구니에 추가되었습니다.', cart });
  });
  // 장바구니 조회 API
  app.get('/cart/list', (req, res) => {
    res.json(cart);
  });
};
