import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (window.location.pathname.includes("cart")) {
    // Only render cart contents if we are on the cart page (or another page dedicated to showing cart items)
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function itemCount() {
  const cartItems = getLocalStorage("so-cart");
  const itemCountElement = document.querySelector(".item-count");

  if (itemCountElement) {
    if (cartItems.length > 0) {
      itemCountElement.textContent = cartItems.length;
      itemCountElement.style.display = 'inline';  // Show item count
    } else {
      itemCountElement.style.display = 'none';  // Hide item count if cart is empty
    }
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
itemCount();
