document.addEventListener('DOMContentLoaded', function () {
  // 1. 테스트용 장바구니 데이터 (나중에 API 응답 등으로 대체)
  var cartItems = [
    {
      id: 'C0001',
      name: '라떼',
      price: 6000,
      qty: 2,
      img: '../img/C0001.jpg',
      alt: 'americano',
    },
    {
      id: 'C0006',
      name: '카페브레베',
      price: 7000,
      qty: 1,
      img: '../img/C0006.jpg',
      alt: 'drink',
    },
  ];

  // 메인 컨테이너 (장바구니 목록 + 결제 요약)
  var main = document.createElement('main');
  main.className = 'cart_container';

  // ── 장바구니 상품 목록 영역 ──
  var sectionCartItems = document.createElement('section');
  sectionCartItems.className = 'cart_items';
  main.appendChild(sectionCartItems);

  // ── 결제 요약 영역 ──
  var asideSummary = document.createElement('aside');
  asideSummary.className = 'cart_summary';

  var h2Summary = document.createElement('h2');
  h2Summary.textContent = '결제 예정 금액';
  asideSummary.appendChild(h2Summary);

  var summaryDetail = document.createElement('div');
  summaryDetail.className = 'summary_detail';

  var pProductAmount = document.createElement('p');
  pProductAmount.innerHTML = '상품 금액 <span>0원</span>';
  summaryDetail.appendChild(pProductAmount);

  var pShippingFee = document.createElement('p');
  pShippingFee.className = 'shipping_fee';
  pShippingFee.innerHTML = '배송비 <span>0원</span>';
  summaryDetail.appendChild(pShippingFee);

  var pTotal = document.createElement('p');
  pTotal.className = 'total';
  pTotal.innerHTML = '합계 <span>0원</span>';
  summaryDetail.appendChild(pTotal);

  asideSummary.appendChild(summaryDetail);

  var orderButton = document.createElement('button');
  orderButton.type = 'button';
  orderButton.className = 'order_button';
  orderButton.textContent = '주문하기';
  asideSummary.appendChild(orderButton);

  main.appendChild(asideSummary);

  // 생성한 메인 컨테이너를 body에 추가
  document.body.appendChild(main);

  // 3. 장바구니 상품 렌더링 함수 (cartItems 배열 기반)
  function renderCartItems(items) {
    // 기존 상품 목록 초기화
    sectionCartItems.innerHTML = '';

    items.forEach(function (item) {
      // 상품 컨테이너
      var cartItem = document.createElement('div');
      cartItem.className = 'cart_item';

      // 이미지
      var img = document.createElement('img');
      img.src = item.img;
      img.alt = item.alt;
      cartItem.appendChild(img);

      // 상품 정보 컨테이너
      var itemInfo = document.createElement('div');
      itemInfo.className = 'item_info';

      // 상품명
      var h2 = document.createElement('h2');
      h2.textContent = item.name;
      itemInfo.appendChild(h2);

      // 가격
      var pPrice = document.createElement('p');
      pPrice.className = 'price';
      pPrice.textContent = item.price.toLocaleString() + '원';
      itemInfo.appendChild(pPrice);

      // 수량 영역
      var divQuantity = document.createElement('div');
      divQuantity.className = 'quantity';

      var label = document.createElement('label');
      label.htmlFor = 'qty_' + item.id;
      label.textContent = '수량';
      divQuantity.appendChild(label);

      var input = document.createElement('input');
      input.type = 'number';
      input.id = 'qty_' + item.id;
      input.value = item.qty;
      input.min = '1';
      divQuantity.appendChild(input);

      itemInfo.appendChild(divQuantity);
      cartItem.appendChild(itemInfo);
      sectionCartItems.appendChild(cartItem);
    });

    // 각 수량 입력에 이벤트 리스너 등록 (총액 업데이트)
    var quantityInputs = document.querySelectorAll('.quantity input');
    quantityInputs.forEach(function (inp) {
      inp.addEventListener('input', updateTotal);
    });
  }

  // 4. 결제 금액 업데이트 함수
  // 결제 요약 영역의 각 금액 표시 요소 가져오기
  var prodAmtEl = pProductAmount.querySelector('span');
  var shipEl = pShippingFee.querySelector('span');
  var totalEl = pTotal.querySelector('span');
  var SHIPPING_FEE = 3000;
  var FREE_THRESHOLD = 50000;

  function updateTotal() {
    var sum = 0;
    var cartItemElems = document.querySelectorAll('.cart_item');
    cartItemElems.forEach(function (item) {
      var priceText = item.querySelector('.price').textContent;
      var price = parseInt(priceText.replace('원', '').replace(/,/g, ''));
      var qty = parseInt(item.querySelector('.quantity input').value);
      sum += price * qty;
    });
    var shipFee = sum >= FREE_THRESHOLD ? 0 : SHIPPING_FEE;
    var finalTotal = sum + shipFee;

    prodAmtEl.textContent = sum.toLocaleString() + '원';
    shipEl.textContent = shipFee.toLocaleString() + '원';
    totalEl.textContent = finalTotal.toLocaleString() + '원';
  }

  // 5. 초기 렌더링 및 총액 계산
  renderCartItems(cartItems);
  updateTotal();
});
