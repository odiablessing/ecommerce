const categoryItem = (category) =>
  `<div class="group relative cursor-pointer">
        <div class="mt-4 flex justify-between items-center border py-6 px-3 rounded-lg text-gray-700 hover:bg-primary hover:text-white transition ease-in-out delay-150 duration-300 hover:shadow-lg hover:border-primary">
            <h3 class="text-base capitalize">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${category}
            </h3>
        </div>
      </div>`;

const productContainer = (item) => {
  return `<div class="group relative border border-secondary rounded-sm p-1" data-id='${
    item.id
  }'>
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-48">
          <img src="${item.image}" alt="${
    item.title
  }" referrerpolicy="no-referrer" class="h-full w-full object-cover object-top lg:h-full lg:w-full">
        </div>
        <div class="mt-4 flex flex-col p-2 gap-2">
         <a class='text-base line-clamp-1' href="../../product-details.html?id=${
           item.id
         }">
                <span aria-hidden="true" class="absolute inset-0 "></span>
                ${item.title}
              </a>
              <p class="text-sm text-gray-600">
                $${item.price}
              </p>

            <div class="flex items-center">
              ${injectStars(item.rating.rate)} 
              <span class="ml-2 text-sm text-secondary">(${
                item.rating.count
              } reviews)</span>
          </div>

            <button class="text-sm bg-primary text-white py-2 z-20 add-to-cart-btn"
            data-id="${item.id}"
            data-image="${item.image}"
            data-title="${item.title}"
            data-price="${item.price}"
            data-category="${item.category}">
            Add to cart
            </button>
        </div>
      </div>`;
};

document.addEventListener('DOMContentLoaded', async () => {
  const categories = await requestHandler('/products/categories', {
    method: 'GET',
  });
  const featuredProducts = await requestHandler('/products?limit=12', {
    method: 'GET',
  });

  categoriesDiv.innerHTML = categories
    .map((category) => categoryItem(category))
    .join('');

  featuredProductsWrapper.innerHTML = featuredProducts
    .map((product) => productContainer(product))
    .join('');

  document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const item = {
        id: event.target.dataset.id,
        image: event.target.dataset.image,
        title: event.target.dataset.title,
        price: event.target.dataset.price,
        category: event.target.dataset.category,
      };
      addToCart(item);
    });
  });
});
