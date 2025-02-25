import CheckoutForm from "../js/components/CheckoutForm.svelte";

new CheckoutForm({
  target: document.querySelector(".checkout-form"),
  props: { key: "so-cart" },
});