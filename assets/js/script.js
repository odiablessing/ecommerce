const hamburgerOpen = document.querySelector('#hamburger-open');
const hamburgerClose = document.querySelector('#hamburger-close');
const mobileMenu = document.querySelector('#mobile-menu');
const categoriesDiv = document.querySelector('#categories');
const featuredProductsWrapper = document.querySelector('#featured-products');
const _qtyInput = document.querySelector('#qty-input');

/**
 * @type {string}
 * @constant BASEURL
 * @default
 */
const BASEURL = 'https://fakestoreapi.com';

function toggleMenu() {
  hamburgerOpen.classList.toggle('hidden');
  hamburgerClose.classList.toggle('hidden');
  mobileMenu.classList.toggle('hidden');
}

/**
 *
 * @param {*} path
 * @param {Object} options
 * @returns {Promise<void>}
 */
async function requestHandler(path, options = {}) {
  const response = await fetch(`${BASEURL}${path}`, options);
  return response.json();
}

hamburgerOpen.addEventListener('click', toggleMenu);
hamburgerClose.addEventListener('click', toggleMenu);

function injectStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="bx bxs-star text-base text-yellow-500"></i>';
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars += '<i class="bx bxs-star-half text-base text-yellow-500"></i>';
    } else {
      stars += '<i class="bx bx-star text-base text-yellow-500"></i>';
    }
  }

  return stars;
}
const _storageKey = 'enny-cart-items';
const cart = localStorage.getItem(_storageKey);
const cartItems = JSON.parse(cart) || [];

function getCartLength() {
  return cartItems?.length ?? 0;
}

document.querySelector('#cart-count').innerText = getCartLength();

/**
 *
 * @param {Object} item - item to be added to cart
 * @description Adds item to cart
 * @returns {void}
 */
function addToCart(item, qty = 1) {
  const id = item.id;

  if (cartItems.some((cartItem) => cartItem.id === id)) {
    const cartItem = cartItems.find((cartItem) => cartItem.id === id);
    cartItem.quantity += qty;
    localStorage.setItem(_storageKey, JSON.stringify(cartItems));
  } else {
    cartItems.push({ ...item, quantity: qty });
    localStorage.setItem(_storageKey, JSON.stringify(cartItems));
  }
  document.querySelector('#cart-count').innerText = getCartLength();
  alert('Item Added to Cart');
}

/**
 *
 * @param {Object} id
 * @param {number} quantity
 * @description Updates item in cart
 * @returns {void}
 */
function updateCart(id, quantity) {
  const item = cartItems.find((cartItem) => cartItem.id === id);
  item.quantity = quantity;
  localStorage.setItem(_storageKey, JSON.stringify(cartItems));
  document.querySelector('#cart-count').innerText = getCartLength();
}

/**
 *
 * @param {Object} id - item to be removed from cart
 * @description Removes item from cart
 * @returns {void}
 */
function removeFromCart(id) {
  const item = cartItems.find((cartItem) => cartItem.id === id);
  cartItems.splice(cartItems.indexOf(item), 1);
  localStorage.setItem(_storageKey, JSON.stringify(cartItems || []));
  document.querySelector('#cart-count').innerText = getCartLength();

  window.location.reload();
}

function clearCart() {
  localStorage.removeItem('enny-cart-items');
}

function handleIncrement(id) {
  updateCart(id, Number(_qtyInput.value) + 1);
  alert('Item Quantity Incremented');
  //   _qtyInput.value = isExist.quantity;
}

function handleDecrement(id) {
  if (Number(_qtyInput.value) === 1) {
    _qtyInput.value = 1;
  } else {
    updateCart(id, Number(_qtyInput.value) - 1);
    alert('Item Quantity Decremented');
  }
  //   _qtyInput.value = isExist.quantity;
}
