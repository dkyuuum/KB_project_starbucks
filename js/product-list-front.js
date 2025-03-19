const init = async () => {
  const URL = 'http://localhost:3000/product/list';
  let response = await getFetch(URL);

  var container = document.createElement('div');
  container.classList.add('product-container');

  response.forEach((product) => {
    var div = document.createElement('div');
    div.classList.add('product');

    var img = document.createElement('img');
    img.setAttribute('src', product.prodImg);
    img.classList.add('product-img');

    var p = document.createElement('p');
    p.classList.add(product.prodNo);
    p.textContent = product.prodName;

    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
  });

  document.getElementById('setProductList').appendChild(container);

  // 상품 클릭 이벤트 등록
  onClinkProduct();
};

/**
 * 상품 클릭 시 정보 넘기기 함수
 * */
const onClinkProduct = async () => {
  let products = document.querySelectorAll('.product-img');

  products.forEach((product) => {
    product.addEventListener('click', (event) => {
      let product = event.target.closest('.product');
      if (!product) return;

      let prodNo = product.querySelector('p').classList.value || '';
      // let prodName = product.querySelector('p')?.textContent.trim() || '';

      window.location.href = `/html/product-detail.html?${prodNo}`;
      localStorage.setItem('selectedProdNo', prodNo);
    });
  });
};

/**
 * GET 요청
 * */
const getFetch = async (url) => {
  return await fetch(url)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

init();
