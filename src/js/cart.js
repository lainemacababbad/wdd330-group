import { getLocalStorage, getCartTotal } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (window.location.pathname.includes("cart")) {
    // Only render cart contents if we are on the cart page (or another page dedicated to showing cart items)
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        removeItemFromCart(index);
      });
    });
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

function cartItemTemplate(item, index) {
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
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button id="remove-button" class="remove-item" data-index="${index}">X</button>
</li>`;

  return newItem;
}

// Total in cart
function updateCartTotal() {
  const cartTotal = getCartTotal();

  const cartTotalElement = document.querySelector(".cart-total");
  if (cartTotalElement) {
    cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
  }
}

// Remove item from cart by index
function removeItemFromCart(index) {
  let cartItems = getLocalStorage("so-cart");
  cartItems.splice(index, 1); // Remove item by index
  localStorage.setItem("so-cart", JSON.stringify(cartItems)); // Update local storage
  renderCartContents();
  itemCount();
  updateCartTotal();
}

renderCartContents();
itemCount();
updateCartTotal();
