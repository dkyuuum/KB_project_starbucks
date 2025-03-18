// 주문 목록(예시 데이터)
const orders = [
  {
    prodNo: 'C0001',
    orderDate: '2025-03-01',
    productNumber: '97',
    prodName: '아메리카노',
    prodPrice: '1500',
    quantity: '2',
  },
  {
    prodNo: 'C0002',
    orderDate: '2025-03-02',
    productNumber: '3',
    prodName: '아이스아메리카노',
    prodPrice: '2000',
    quantity: '3',
  },
  {
    prodNo: 'C0003',
    orderDate: '2025-03-05',
    productNumber: '5',
    prodName: '라떼',
    prodPrice: '1800',
    quantity: '1',
  },
  {
    prodNo: 'C0004',
    orderDate: '2025-03-10',
    productNumber: '7',
    prodName: '아이스라떼',
    prodPrice: '1500',
    quantity: '4',
  },
  {
    prodNo: 'C0005',
    orderDate: '2025-03-15',
    productNumber: '80',
    prodName: '콜드브루몰트',
    prodPrice: '2500',
    quantity: '2',
  },
  {
    prodNo: 'C0006',
    orderDate: '2025-03-20',
    productNumber: '40',
    prodName: '카페브레베',
    prodPrice: '2000',
    quantity: '1',
  },
  {
    prodNo: 'C0007',
    orderDate: '2025-03-22',
    productNumber: '10',
    prodName: '바닐라라떼',
    prodPrice: '2200',
    quantity: '2',
  },
];

// 전역 변수
let currentPage = 1; // 현재 페이지
const rowsPerPage = 5; // 페이지당 표시할 행 수
let filteredOrders = []; // 필터된 주문 목록

document.addEventListener('DOMContentLoaded', () => {
  // 초기 로딩 시, 전체 주문 목록을 필터 없이 표시
  filteredOrders = orders;
  renderTable(filteredOrders, currentPage);
  renderPagination(filteredOrders);

  // "조회" 버튼 클릭 시 날짜 필터 적용
  const fetchOrdersBtn = document.getElementById('fetchOrders');
  fetchOrdersBtn.addEventListener('click', handleDateFilter);
});

/**
 * 날짜 필터 적용 함수
 */
function handleDateFilter() {
  const startDateValue = document.getElementById('start_date').value;
  const endDateValue = document.getElementById('end_date').value;

  // 필터가 없는 경우 전체 데이터
  if (!startDateValue && !endDateValue) {
    filteredOrders = orders;
  } else {
    // 날짜 입력값을 Date 객체로 변환
    const startDate = startDateValue ? new Date(startDateValue) : null;
    const endDate = endDateValue ? new Date(endDateValue) : null;

    filteredOrders = orders.filter((item) => {
      const orderDate = new Date(item.orderDate);
      if (startDate && endDate) {
        return orderDate >= startDate && orderDate <= endDate;
      } else if (startDate && !endDate) {
        return orderDate >= startDate;
      } else if (!startDate && endDate) {
        return orderDate <= endDate;
      }
      return true;
    });
  }

  // 필터 적용 후 1페이지부터 다시 표시
  currentPage = 1;
  renderTable(filteredOrders, currentPage);
  renderPagination(filteredOrders);
}

/**
 * 테이블에 데이터 렌더링
 * @param {Array} data - 표시할 주문 목록
 * @param {Number} page - 현재 페이지 번호
 */
function renderTable(data, page) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  // 페이지별로 보여줄 데이터 slice
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  pageData.forEach((item) => {
    const row = document.createElement('tr');

    // 주문번호
    const prodNoTd = document.createElement('td');
    prodNoTd.textContent = item.productNumber;
    row.appendChild(prodNoTd);

    // 주문일자
    const orderDateTd = document.createElement('td');
    orderDateTd.textContent = item.orderDate;
    row.appendChild(orderDateTd);

    // 상품번호
    const productNumberTd = document.createElement('td');
    productNumberTd.textContent = item.prodNo;
    row.appendChild(productNumberTd);

    // 상품명
    const prodNameTd = document.createElement('td');
    prodNameTd.textContent = item.prodName;
    row.appendChild(prodNameTd);

    // 가격
    const prodPriceTd = document.createElement('td');
    prodPriceTd.textContent = item.prodPrice;
    row.appendChild(prodPriceTd);

    // 주문수량
    const quantityTd = document.createElement('td');
    quantityTd.textContent = item.quantity;
    row.appendChild(quantityTd);

    tableBody.appendChild(row);
  });
}

/**
 * 페이지네이션 렌더링
 * @param {Array} data - 표시할 주문 목록
 */
function renderPagination(data) {
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = '';

  const totalPages = Math.ceil(data.length / rowsPerPage);
  if (totalPages <= 1) return; // 페이지가 1개 이하면 버튼 표시 X

  // 이전 페이지 버튼
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '<';
  prevBtn.disabled = currentPage === 1; // 첫 페이지일 때 비활성화
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable(filteredOrders, currentPage);
      renderPagination(filteredOrders);
    }
  });
  paginationDiv.appendChild(prevBtn);

  // 페이지 번호 버튼
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    if (i === currentPage) {
      pageBtn.disabled = true; // 현재 페이지는 비활성화
    }
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      renderTable(filteredOrders, currentPage);
      renderPagination(filteredOrders);
    });
    paginationDiv.appendChild(pageBtn);
  }

  // 다음 페이지 버튼
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '>';
  nextBtn.disabled = currentPage === totalPages; // 마지막 페이지일 때 비활성화
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable(filteredOrders, currentPage);
      renderPagination(filteredOrders);
    }
  });
  paginationDiv.appendChild(nextBtn);
}
