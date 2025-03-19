const init = async () => {
  const prodNo = localStorage.getItem('selectedProdNo');
  const URL = `http://localhost:3000/product/detail/${prodNo}`;
  let response = await getFetch(URL);

  const productCategory = document.createElement('div');
  productCategory.classList.add('product_category');
  productCategory.textContent = response.prodCategory;

  const productDetailContainer = document.querySelector('.product');
  productDetailContainer.classList.add('product');

  // 이미지
  const productImg = document.createElement('img');
  productImg.classList.add('product_img');
  productImg.src = response.prodImg;
  productImg.alt = '상품-이미지';

  // 상세 정보
  const detailContainer = document.createElement('div');
  detailContainer.classList.add('detail');

  // 상품명, 영문명
  const header = document.createElement('header');
  const productName = document.createElement('h2');
  productName.classList.add('product_name');
  productName.textContent = response.prodName;

  const productSubName = document.createElement('h5');
  productSubName.classList.add('product_sub_name');
  productSubName.textContent = response.prodNameEng;

  header.appendChild(productName);
  header.appendChild(productSubName);

  // 구분선
  const boldLine = document.createElement('hr');
  boldLine.classList.add('bold_line');

  // 상품 설명
  const section = document.createElement('section');
  const productInfo = document.createElement('p');
  productInfo.classList.add('product_info');
  productInfo.textContent = response.prodDesc;

  // 영양 정보
  const nutrientsInfo = document.createElement('p');
  nutrientsInfo.classList.add('nutrients_info');
  nutrientsInfo.textContent = '제품 영양 정보';

  const productSize = document.createElement('p');
  productSize.classList.add('product_size');
  productSize.textContent = '사이즈 / 음료양';

  // 영양 정보 테이블
  const table = document.createElement('table');
  table.classList.add('table1');
  const tableData = [
    [
      '1회 제공량 (kcal)',
      `${response.prodKcal}`,
      '나트륨 (mg)',
      `${response.prodSod}`,
    ],
    [
      '포화지방 (g)',
      `${response.prodFat}`,
      '당류 (g)',
      `${response.prodSugar}`,
    ],
    [
      '단백질 (g)',
      `${response.prodProtein}`,
      '카페인 (mg)',
      `${response.prodCaffeine}`,
    ],
  ];

  tableData.forEach((rowContent) => {
    const row = document.createElement('tr');
    rowContent.forEach((cellContent, index) => {
      const cell = document.createElement(index % 2 === 0 ? 'td' : 'td');
      cell.textContent = cellContent;
      cell.classList.add(index % 2 === 0 ? 'table_title' : 'table_content');
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  // 알레르기 정보
  const allergyRow = document.createElement('tr');
  const allergyCell = document.createElement('td');
  allergyCell.colSpan = 4;
  allergyCell.classList.add('allergy');
  allergyCell.textContent = `알레르기 유발요인: ${response.prodAllergy}`;
  allergyRow.appendChild(allergyCell);
  table.appendChild(allergyRow);

  // 장바구니
  const cartRow = document.createElement('tr');
  const cartCell = document.createElement('td');
  cartCell.colSpan = 4;

  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart_container');

  // 수량
  const countInput = document.createElement('input');
  countInput.classList.add('count_cart');
  countInput.type = 'number';
  countInput.name = 'count';
  countInput.id = 'count';
  countInput.min = '1';
  countInput.value = '1';

  const cartButton = document.createElement('button');
  cartButton.classList.add('btn_cart');
  cartButton.textContent = '장바구니 담기';

  cartContainer.appendChild(countInput);
  cartContainer.appendChild(cartButton);
  cartCell.appendChild(cartContainer);
  cartRow.appendChild(cartCell);
  table.appendChild(cartRow);

  section.appendChild(productInfo);
  section.appendChild(document.createElement('hr')).classList.add('thin_line');
  section.appendChild(nutrientsInfo);
  section.appendChild(productSize);
  section.appendChild(table);

  detailContainer.appendChild(header);
  detailContainer.appendChild(section);

  productDetailContainer.appendChild(productImg);
  productDetailContainer.appendChild(detailContainer);

  document.body.appendChild(productDetailContainer);

  document.querySelector('.btn_cart').addEventListener('click', () => {
    console.log(`장바구니 구현 중.. ${prodNo} ${countInput.value}`);
    addToCart(prodNo, countInput.value);
  });
};

/**
 * 장바구니 담기
 * */
const addToCart = (product, countInput) => {
  // 구현 중..

  alert('장바구니에 추가되었습니다!');
  window.location.href = '../html/cart.html'; // 장바구니 페이지로 이동
};

/**
 * GET 요청
 * */
const getFetch = (url) => {
  return fetch(url)
    .then((response) => response.json()) // fetch 함수가 끝날 때까지 기다려라
    .catch((err) => console.error('err: ' + err));
};

// init();

document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const prodNo = urlParams.get('prodNo');

  if (!prodNo) {
    console.error('❌ Error: 상품 번호가 없습니다.');
    return;
  }

  try {
    // 🔹 서버에서 상품 정보 가져오기
    const response = await fetch(
      `http://localhost:3000/product/detail/${prodNo}`
    );
    const product = await response.json();

    if (!response.ok)
      throw new Error(
        product.message || '상품 정보를 불러오는 데 실패했습니다.'
      );

    // 🔹 데이터 반영
    document.querySelector('.product_name').textContent =
      product.prodName || '상품명 없음';
    document.querySelector('.product_sub_name').textContent =
      product.prodSubName || '';
    document.querySelector('.product_img').src =
      product.prodImg || '../img/default.jpg';
    document.querySelector('.product_info').textContent =
      product.prodInfo || '상품 설명이 없습니다.';
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
});
