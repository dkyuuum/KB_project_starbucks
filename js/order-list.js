document.getElementById('fetchOrders').addEventListener('click', fetchOrders);

function fetchOrders() {
  const startDate = document.getElementById('start_date').value;
  const endDate = document.getElementById('end_date').value;

  // 로컬 JSON 파일에서 데이터 가져오기
  fetch('orders.json')
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById('orderTableBody');
      tbody.innerHTML = ''; // 기존 테이블 내용 지우기

      data.forEach((order) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.orderNumber}</td>
          <td>${order.orderDate}</td>
          <td>${order.productNumber}</td>
          <td>${order.productName}</td>
          <td>${order.price}</td>
          <td>${order.quantity}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => console.error('Error fetching orders:', error));
}
