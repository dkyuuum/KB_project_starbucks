const init = async () => {
  const URL = 'http://localhost:3000/product/list';
  let response = await getFetch(URL);

  /*
  var table = document.createElement('table');
  for (const product of response) {
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.textContent = product.prodNo;
    tr1.appendChild(td1);

    var tr2 = document.createElement('tr');
    var td2 = document.createElement('td');
    var tr2Img = document.createElement('img');
    tr2Img.setAttribute('src', product.prodImg);
    td2.appendChild(tr2Img);
    tr2.appendChild(td2);

    table.appendChild(tr2);
    table.appendChild(tr1);
  }
  setTable.appendChild(table);
  */
  var table = document.createElement('table');
  table.classList.add('product-table');

  let tr = document.createElement('tr'); // 첫 번째 행 생성

  response.forEach((product, index) => {
    var td = document.createElement('td');
    td.classList.add('product');

    var img = document.createElement('img');
    img.setAttribute('src', product.prodImg);
    img.classList.add('product-img');

    var p = document.createElement('p');
    p.classList.add(product.prodNo);
    p.textContent = product.prodName;

    td.appendChild(img);
    td.appendChild(p);
    tr.appendChild(td);

    if ((index + 1) % 4 === 0) {
      table.appendChild(tr);
      tr = document.createElement('tr'); // 새 행 생성
    }
  });

  // 마지막 행의 빈칸 채우기
  const remaining = response.length % 4;
  if (remaining > 0) {
    for (let i = 0; i < 4 - remaining; i++) {
      let emptyTd = document.createElement('td');
      emptyTd.classList.add('product');
      tr.appendChild(emptyTd);
    }
    table.appendChild(tr);
  }

  document.getElementById('setTable').appendChild(table);

  // 상품 클릭 시 정보 조회
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
    .then((response) => response.json()) // fetch 함수가 끝날 때까지 기다려라
    .catch((err) => console.error(err));
};

init();

export const productListFront = init();
