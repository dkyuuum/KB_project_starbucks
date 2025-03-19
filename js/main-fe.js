//
window.addEventListener('load', async () => {
  const divContainer = document.querySelector('.contents');

  try {
    const response = await fetch('http://localhost:3000');
    const data = await response.json();
    console.log(data);

    data.forEach((product) => {
      const newDiv = document.createElement('div');

      const img = document.createElement('img');
      // img.src = `http:localhost:3000${product.imageUrl}`;
      img.src = `${product.imageUrl}`;

      // newDiv.style.marginTop = '50px';
      // newDiv.style.height = '80%';

      newDiv.appendChild(img);
      const newProduct = divContainer.appendChild(newDiv);
      // newProduct.style.paddingTop = '50px';
    });
  } catch (err) {
    console.error('데이터 로드 실패', err);
  }

  // 링크 연결
  const productList = document.querySelector('.products > a');

  productList.addEventListener('click', () => {
    const contentsDiv = document.querySelector('.contents');
    try {
      contentsDiv.appendChild(response);
    } catch (err) {
      console.error('링크 연결 실패', err);
    }
  });
});
