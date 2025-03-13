const init = async () => {
  const URL = 'http://localhost:3000/product/list';
  let response = await getFetch(URL);

  for (const product of response) {
    var table = document.createElement('table');

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

    setTable.appendChild(table);
  }
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
