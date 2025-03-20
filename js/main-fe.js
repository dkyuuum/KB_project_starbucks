window.addEventListener('load', async () => {
  const divContainer = document.querySelector('.contents');

  try {
    const response = await fetch('http://localhost:3000');
    const data = await response.json();
    console.log(data);

    data.forEach((product) => {
      const newDiv = document.createElement('div');

      const img = document.createElement('img');
      img.src = `${product.imageUrl}`;

      newDiv.appendChild(img);
      const newProduct = divContainer.appendChild(newDiv);
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

  if (window.matchMedia('(max-width: 960px)').matches) {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('mouseover', function () {
      nav.style.display = 'block';
    });
    hamburger.addEventListener('mouseout', function () {
      nav.style.display = 'none';
    });
  }
});
