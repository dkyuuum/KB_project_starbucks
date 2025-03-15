const init = async () => {
  const URL = 'http://localhost:3000/product/detail/:prodNo';
  let response = await getFetch(URL);

  
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
