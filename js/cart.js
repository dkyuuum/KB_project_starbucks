document.addEventListener('DOMContentLoaded', function () {
  const quantities = document.querySelectorAll('.quantity input');
  const prices = document.querySelectorAll('.price');
  const totalElement = document.querySelector('.total span');
  const productAmountElement = document.querySelector('.summary_detail p span');
  const shippingFeeElement = document.querySelector('.shipping_fee span');
  const SHIPPING_FEE = 3000;
  const FREE_SHIPPING_THRESHOLD = 50000;

  function updateTotal() {
    let total = 0;
    quantities.forEach((quantity, index) => {
      const price = parseInt(
        prices[index].textContent.replace('원', '').replace(',', '')
      );
      const qty = parseInt(quantity.value);
      total += price * qty;
    });

    let shippingFee = SHIPPING_FEE;
    if (total >= FREE_SHIPPING_THRESHOLD) {
      shippingFee = 0;
    }

    const finalTotal = total + shippingFee;

    productAmountElement.textContent = total.toLocaleString() + '원';
    shippingFeeElement.textContent = shippingFee.toLocaleString() + '원';
    totalElement.textContent = finalTotal.toLocaleString() + '원';
  }

  quantities.forEach((quantity) => {
    quantity.addEventListener('input', updateTotal);
  });

  updateTotal(); // 초기 총합 계산
});
