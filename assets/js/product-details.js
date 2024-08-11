const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const _incrementor = document.querySelector('.cart-increment');
const _decrementor = document.querySelector('.cart-decrement');

if (!productId) {
  window.location.href = '../../index.html';
}

document.addEventListener('DOMContentLoaded', async () => {
  const product = await requestHandler(`/products/${productId}`, {
    method: 'GET',
  });

  document.title = `${product.title} | EnnyStore`;
  document.querySelector(
    '#overview-title'
  ).textContent = `Products > ${product.title}`;

  document.querySelector('.product-title').innerText = product.title;
  document.querySelector('.product-image').src = product.image;
  document.querySelector('.product-price').innerText = `$${product.price}`;
  document.querySelector('.product-category').innerText = product.category;
  document.querySelector('.product-rating').innerHTML = injectStars(
    product.rating.rate
  );
  document.querySelector('.product-description').innerText =
    product.description;

  const isExist = cartItems.find((item) => item.id === productId);

  _incrementor.addEventListener('click', () => {
    handleIncrement(productId);
    _qtyInput.value = isExist.quantity;
  });
  _decrementor.addEventListener('click', () => {
    handleDecrement(productId);
    _qtyInput.value = isExist.quantity;
  });

  if (isExist) {
    document.querySelector('.product-cart-btn').classList.add('hidden');

    _qtyInput.value = isExist.quantity;
  }
});
