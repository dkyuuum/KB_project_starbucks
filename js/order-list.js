const orders = [
  {
    prodNo: 'C0001',
    date: '2025-03-01',
    num: '97',
    name: '아메리카노',
    price: '1500',
    qty: '2',
  },
  {
    prodNo: 'C0002',
    date: '2025-03-02',
    num: '3',
    name: '아이스아메리카노',
    price: '2000',
    qty: '3',
  },
  {
    prodNo: 'C0003',
    date: '2025-03-05',
    num: '5',
    name: '라떼',
    price: '1800',
    qty: '1',
  },
  {
    prodNo: 'C0004',
    date: '2025-03-10',
    num: '7',
    name: '아이스라떼',
    price: '1500',
    qty: '4',
  },
  {
    prodNo: 'C0005',
    date: '2025-03-15',
    num: '80',
    name: '콜드브루몰트',
    price: '2500',
    qty: '2',
  },
  {
    prodNo: 'C0006',
    date: '2025-03-20',
    num: '40',
    name: '카페브레베',
    price: '2000',
    qty: '1',
  },
  {
    prodNo: 'C0007',
    date: '2025-03-22',
    num: '10',
    name: '바닐라라떼',
    price: '2200',
    qty: '2',
  },
];

let page = 1;
const rows = 5;
let filt = [];

document.addEventListener('DOMContentLoaded', () => {
  createDOM();
  filt = orders;
  renderTbl(filt, page);
  renderPag(filt);
  document
    .getElementById('fetchOrders')
    .addEventListener('click', filterOrders);
});

function createDOM() {
  // 날짜 필터 영역
  const dr = document.createElement('div');
  dr.className = 'date_range';

  const sLbl = document.createElement('label');
  sLbl.htmlFor = 'start_date';
  sLbl.textContent = '시작일';
  dr.appendChild(sLbl);

  const sIn = document.createElement('input');
  sIn.type = 'date';
  sIn.id = 'start_date';
  dr.appendChild(sIn);

  const sep = document.createElement('span');
  sep.textContent = '-';
  dr.appendChild(sep);

  const eLbl = document.createElement('label');
  eLbl.htmlFor = 'end_date';
  eLbl.textContent = '종료일';
  dr.appendChild(eLbl);

  const eIn = document.createElement('input');
  eIn.type = 'date';
  eIn.id = 'end_date';
  dr.appendChild(eIn);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'fetchOrders';
  btn.textContent = '조회';
  dr.appendChild(btn);

  document.body.appendChild(dr);

  // 주문 목록 영역
  const sec = document.createElement('section');
  sec.className = 'order_list';

  const tbl = document.createElement('table');
  tbl.style.tableLayout = 'fixed';

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  ['주문번호', '주문일자', '상품번호', '상품명', '가격', '주문수량'].forEach(
    (text) => {
      const th = document.createElement('th');
      th.textContent = text;
      tr.appendChild(th);
    }
  );
  thead.appendChild(tr);
  tbl.appendChild(thead);

  const tbody = document.createElement('tbody');
  tbody.id = 'tableBody';
  tbl.appendChild(tbody);
  sec.appendChild(tbl);

  const pagDiv = document.createElement('div');
  pagDiv.id = 'pagination';
  sec.appendChild(pagDiv);

  document.body.appendChild(sec);
}

function filterOrders() {
  const sVal = document.getElementById('start_date').value;
  const eVal = document.getElementById('end_date').value;

  if (!sVal && !eVal) {
    filt = orders;
  } else {
    const sDate = sVal ? new Date(sVal) : null;
    const eDate = eVal ? new Date(eVal) : null;
    filt = orders.filter((o) => {
      const d = new Date(o.date);
      if (sDate && eDate) return d >= sDate && d <= eDate;
      if (sDate) return d >= sDate;
      if (eDate) return d <= eDate;
      return true;
    });
  }

  page = 1;
  renderTbl(filt, page);
  renderPag(filt);
}

function renderTbl(data, p) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';
  const start = (p - 1) * rows;
  const end = start + rows;
  data.slice(start, end).forEach((o) => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.textContent = o.num;
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    td2.textContent = o.date;
    tr.appendChild(td2);

    const td3 = document.createElement('td');
    td3.textContent = o.prodNo;
    tr.appendChild(td3);

    const td4 = document.createElement('td');
    td4.textContent = o.name;
    tr.appendChild(td4);

    const td5 = document.createElement('td');
    td5.textContent = o.price;
    tr.appendChild(td5);

    const td6 = document.createElement('td');
    td6.textContent = o.qty;
    tr.appendChild(td6);

    tbody.appendChild(tr);
  });
}

function renderPag(data) {
  const pagDiv = document.getElementById('pagination');
  pagDiv.innerHTML = '';
  const totPages = Math.ceil(data.length / rows);
  if (totPages <= 1) return;

  const prev = document.createElement('button');
  prev.textContent = '<';
  prev.disabled = page === 1;
  prev.addEventListener('click', () => {
    if (page > 1) {
      page--;
      update();
    }
  });
  pagDiv.appendChild(prev);

  for (let i = 1; i <= totPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === page) btn.disabled = true;
    btn.addEventListener('click', () => {
      page = i;
      update();
    });
    pagDiv.appendChild(btn);
  }

  const next = document.createElement('button');
  next.textContent = '>';
  next.disabled = page === totPages;
  next.addEventListener('click', () => {
    if (page < totPages) {
      page++;
      update();
    }
  });
  pagDiv.appendChild(next);

  function update() {
    renderTbl(filt, page);
    renderPag(filt);
  }
}
