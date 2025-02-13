import ProductList from "./components/ProductList.svelte";
import { mount } from "svelte";
import { renderHeaderFooter } from "./utils.mjs";
import { renderAlerts } from "./alertModule.mjs";

// import { itemCount } from "./cart.js";

const productList = mount(ProductList, {
    target: document.querySelector(".products"),
    props: { category: "tents" },
  });

document.addEventListener("DOMContentLoaded", () => {
  renderHeaderFooter();
  // itemCount();
  renderAlerts();
});