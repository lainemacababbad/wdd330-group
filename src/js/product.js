import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import productDetails from "./productDetails.mjs";

function addProductToCart(product) {
  setLocalStorage("so-cart", [product]); // i put the brackets to ensure that it is showing the product on the cart
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

//
const productId = getParam("product");
productDetails(productId, ".product-detail");

console.log(productId);
