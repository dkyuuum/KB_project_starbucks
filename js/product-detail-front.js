// const init = async () => {
//   const URL = 'http://localhost:3000/product/detail/:prodNo';
//   let response = await getFetch(URL);
// };

// /**
//  * GET 요청
//  * */
// const getFetch = async (url) => {
//   return await fetch(url)
//     .then((response) => response.json()) // fetch 함수가 끝날 때까지 기다려라
//     .catch((err) => console.error(err));
// };

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
