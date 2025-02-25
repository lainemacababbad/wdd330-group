// import CheckoutForm from "../js/components/CheckoutForm.svelte";


// new CheckoutForm({
//   target: document.querySelector(".checkout-form"),
//   props: { key: "so-cart" },
// });

import { renderCheckoutForm } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutForm();
});