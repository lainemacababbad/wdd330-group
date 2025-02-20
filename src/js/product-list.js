//product-list.js
console.log("product-list.js loaded");

import { mount } from "svelte";
import ProductList from "./components/ProductList.svelte";
import { getParam } from "./utils.mjs"; // Import getParam from utils.mjs

// Retrieve the category from the URL query parameters
const category = getParam("category") || "tents";  // Default to "tents" if no category is found

// Log the category value to check if it matches the clicked category
console.log("Category from URL:", category);

// Mount the ProductList component and pass the category as a prop
const productListContainer = document.querySelector(".products");

if (productListContainer.hasChildNodes()) {
  const productList = mount(ProductList, {
    target: productListContainer,
    props: { category: category },
  });
} else {
  console.log("Product list already rendered, skipping mount.");
}
