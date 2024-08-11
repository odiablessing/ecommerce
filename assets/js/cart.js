const container = document.querySelector('.cart-items-wrapper');

document.addEventListener('DOMContentLoaded', async () => {
  if (!cart || !cartItems.length) {
    document.querySelector('.checkout-wrapper').classList.add('hidden');
  } else {
    document.querySelector('.empty-cart').classList.add('hidden');
  }

  if (cartItems.length > 0) {
    container.innerHTML = cartItems
      .map((item) => {
        return `
      <div class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6" data-item-id="${
        item.id
      }">
          <div class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
            <div class="img-box"><img src="${
              item.image
            }" alt="perfume bottle image" class="xl:w-[140px] rounded-xl"></div>
            <div class="pro-data w-full max-w-sm ">
              <h5 class="font-semibold text-xl leading-8 text-black max-[550px]:text-center">${
                item.title
              }</h5>
              <p class="font-normal text-lg leading-8 capitalize text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                ${item.category}</p>
              <h6 class="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">$${
                item.price
              }</h6>
            </div>
          </div>
          <div class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
            <div class="flex items-center w-full mx-auto justify-center">
              <button class="group rounded-l-full px-6 py-[12px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50 cart-decrement">
                <i class='bx bx-minus text-xl'></i>
              </button>
              <input type="text" class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[100px] min-w-[80px] placeholder:text-gray-900 py-[12px] text-center bg-transparent" id='#qty-input' value="${
                item.quantity
              }" readonly>
              <button class="group rounded-r-full px-6 py-[12px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50 cart-increment">
                <i class='bx bx-plus text-xl'></i>
              </button>
            </div>
            <h6 class="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
             ${item.quantity * parseFloat(item.price)}  
            </h6>
            <button class="group flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50" 
            onclick="removeFromCart(${item.id})">
              <i class='bx bx-trash text-2xl text-red-700'></i>
            </button>
          </div>
        </div>`;
      })
      .join('');

    // Add event listeners after the elements are created
    container.querySelectorAll('.cart-increment').forEach((button, index) => {
      button.addEventListener('click', () => {
        handleIncrement(cartItems[index].id);
        updateQuantityDisplay(cartItems[index].id);
      });
    });

    container.querySelectorAll('.cart-decrement').forEach((button, index) => {
      button.addEventListener('click', () => {
        handleDecrement(cartItems[index].id);
        updateQuantityDisplay(cartItems[index].id);
      });
    });
  }
});

function updateQuantityDisplay(productId) {
  const itemElement = document.querySelector(`[data-item-id="${productId}"]`);
  if (itemElement) {
    const updatedItem = cartItems.find((item) => item.id === productId);
    _qtyInput = itemElement.querySelector('#qty-input');
    if (updatedItem) {
      itemElement.querySelector('#qty-input').value = updatedItem.quantity;
    }
  }
}
