document.addEventListener('DOMContentLoaded', function () {
  // 백엔드에서 장바구니 데이터를 가져옴
  fetch('http://localhost:3000/cart/list') // 장바구니 조회 API 호출
    .then((response) => response.json())
    .then((cartItems) => {
      // 받아온 데이터를 이용하여 장바구니 초기화
      initCart(cartItems);
    })
    .catch((error) => {
      console.error('장바구니 데이터를 가져오지 못했습니다.', error);
    });
});

function initCart(cartItems) {
  // 메인 컨테이너 생성
  const main = document.createElement('main');
  main.className = 'cart_container';

  // 장바구니 상품 목록 영역
  const sectionCartItems = document.createElement('section');
  sectionCartItems.className = 'cart_items';
  main.appendChild(sectionCartItems);

  // 결제 요약 영역
  const asideSummary = document.createElement('aside');
  asideSummary.className = 'cart_summary';

  asideSummary.innerHTML = `
    <h2>결제 예정 금액</h2>
    <div class="summary_detail">
      <p class="product_amount">상품 금액 <span>0원</span></p>
      <p class="shipping_fee">배송비 <span>0원</span></p>
      <p class="total">합계 <span>0원</span></p>
    </div>
    <button type="button" class="order_button">주문하기</button>
  `;
  main.appendChild(asideSummary);

  // 메인 컨테이너를 body에 추가
  document.body.appendChild(main);

  // 장바구니 상품 렌더링
  renderCartItems(cartItems, sectionCartItems);
}

function renderCartItems(items, sectionCartItems) {
  // 기존 상품 목록 초기화
  sectionCartItems.innerHTML = '';

  let totalProductAmount = 0; // 상품 금액 합계
  const shippingFee = 3000; // 기본 배송비

  items.forEach((item) => {
    // 상품 컨테이너 생성
    const cartItem = document.createElement('div');
    cartItem.className = 'cart_item';

    cartItem.innerHTML = `
      <img src="${item.proImg || '/img/default.jpg'}" alt="${
      item.prodName || '상품 이미지'
    }">
      <div class="item_info">
        <h2>${item.prodName}</h2>
        <p class="price">${item.price.toLocaleString()}원</p>
        <div class="quantity">
          <label for="quantity-${item.prodNo}">수량</label>
          <input type="number" id="quantity-${item.prodNo}" value="${
      item.count
    }" min="1">
        </div>
      </div>
    `;

    // 수량 변경 이벤트 추가
    const quantityInput = cartItem.querySelector(`#quantity-${item.prodNo}`);
    quantityInput.addEventListener('change', function () {
      item.count = parseInt(quantityInput.value, 10);
      updateSummary(items);
    });

    sectionCartItems.appendChild(cartItem);

    // 상품 금액 합계 계산
    totalProductAmount += item.price * item.count;
  });

  // 결제 요약 업데이트
  updateSummary(items, totalProductAmount, shippingFee);
}

function updateSummary(items, totalProductAmount = 0, shippingFee = 3000) {
  // 상품 금액 합계 계산
  totalProductAmount = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  // 배송비 계산 (예: 5만 원 이상 무료 배송)
  shippingFee = totalProductAmount >= 50000 ? 0 : 3000;

  // 총합계 계산
  const totalAmount = totalProductAmount + shippingFee;

  // DOM 업데이트
  document.querySelector(
    '.product_amount span'
  ).textContent = `${totalProductAmount.toLocaleString()}원`;
  document.querySelector(
    '.shipping_fee span'
  ).textContent = `${shippingFee.toLocaleString()}원`;
  document.querySelector(
    '.total span'
  ).textContent = `${totalAmount.toLocaleString()}원`;
}
