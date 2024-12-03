let cart = [];

function loadProducts() {
  fetch('product.json') 
    .then(response => response.json())
    .then(data => {
      const products = data.products; 
      const productContainer = document.getElementById('product-container'); 

      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        productElement.innerHTML = `
          <img src="${product.image}" alt="Product" />
          <div class="product_content">
            <a href="${product.link}" class="product_name">${product.name}</a>
            <p class="product_text">${product.description}</p>
            <p class="product_price">${product.price}</p>
            <button class="add-to-cart" data-name="${product.name}" data-image="${product.image}" data-price="${product.price}">Add to Cart</button>
          </div>
        `;
        
        productContainer.appendChild(productElement);
      });

      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
      });
    })
    .catch(error => console.error('Error loading products:', error)); 
}

function addToCart(event) {
  const productName = event.target.getAttribute('data-name');
  const productImage = event.target.getAttribute('data-image');
  const productPrice = event.target.getAttribute('data-price');
  
  const product = { name: productName, image: productImage, price: productPrice };
  cart.push(product);

  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  cart.forEach((product, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="cart-item-content">
        <span class="cart-item-name">${product.name}</span>
        <span class="cart-item-price">${product.price}</span>
      </div>
      <button class="remove-item" data-index="${index}">X</button>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });

  const cartCount = document.querySelector('.cart_count');
  cartCount.textContent = cart.length;

  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });
}

function removeFromCart(event) {
  const index = event.target.getAttribute('data-index');
  cart.splice(index, 1);
  updateCart();
}

document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  updateCart();
});

window.onload = loadProducts;
