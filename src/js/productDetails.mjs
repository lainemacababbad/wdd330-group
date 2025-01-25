export default async function productDetails(productId, selector) {

}

export function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// this will insert the product specifics into a string of markup.
export function productDetailsTemplate(product) {

}

// where to store the data
let productData = null;