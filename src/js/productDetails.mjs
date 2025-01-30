import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

export default async function productDetails(productId, selector) {
// Take product_id retrieve product data
// Use temp transform data to HTML
  const product = await findProductById(productId);
  const element = document.querySelector(selector);
  element.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  document.getElementById("addToCart").addEventListener("click", addProductToCart);
} 

export function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// this will insert the product specifics into a string of markup.
export function productDetailsTemplate(product) {
  return `<h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Image}"
    alt="${product.Name}"
  />
  <p class="product-card__price">$${product.FinalPrice}</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>`;
}