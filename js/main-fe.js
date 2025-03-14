async function request() {
  try {
    const response = await fetch('http://localhost:3000');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
request();

window.addEventListener('load', () => {
  let contentDiv = document.querySelectorAll('.contetns div');
});
