import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default async function productDetails(productId, selector) {
// Take product_id retrieve product data
// Use temp transform data to HTML
  const product = await findProductById(productId);
  console.log(product)
  const element = document.querySelector(selector);
  element.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  document.getElementById("addToCart").addEventListener("click", addProductToCart);
} 

// export function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }

export async function addProductToCart(event) {
  const productId = event.target.dataset.id; // this is for the button so that it adds the item to cart
  const product = await findProductById(productId);

  let cart = getLocalStorage("so-cart") || [];

  cart.push(product); // this add another product to cart, instead of it replacing the item added
  // it add the new product as the last item
  setLocalStorage("so-cart", cart);
}

// this will insert the product specifics into a string of markup.
// export function productDetailsTemplate(product) {
//   return `<h3>${product.Brand.Name}</h3>
//   <h2 class="divider">${product.NameWithoutBrand}</h2>
//   <img
//     class="divider"
//     src="${product.Images.PrimaryLarge}"
//     alt="${product.Name}"
//   />
//   <p class="product-card__price">$${product.FinalPrice}</p>
//   <p class="product__color">${product.Colors[0].ColorName}</p>
//   <p class="product__description">
//   ${product.DescriptionHtmlSimple}
//   </p>
//   <div class="product-detail__add">
//     <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//   </div>`;
// }

export function productDetailsTemplate(product) {
  const originalPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;
  let discountHTML = "";

  if (originalPrice > finalPrice) {
    const amountSaved = (originalPrice - finalPrice).toFixed(2);
    const percentageSaved = ((amountSaved / originalPrice) * 100).toFixed(0);
    discountHTML = `<p class="product-card__discount">You save $${amountSaved} (${percentageSaved}% off)</p>`;
  }

  return `<h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Images.PrimaryLarge}"
    alt="${product.Name}"
  />
  <p class="product-card__price">$${finalPrice}</p>
  ${discountHTML}
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>`;
}
