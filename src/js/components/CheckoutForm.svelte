<script>
  import { getLocalStorage } from "../utils.mjs";
  import { onMount } from "svelte";

  let { key = "" } = $props();

  let list = $state([]);
  let itemTotal = $state(0);
  let shipping = $state(0);
  let tax = $state(0);
  let orderTotal = $state(0);

  const init = function () {
    list = getLocalStorage(key) || [];
    calculateItemSummary();
  };

  const calculateItemSummary = function () {
    itemTotal = list.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("subtotal").value = itemTotal.toFixed(2);
  };

  const calculateOrderTotal = function () {
    let itemCount = list.reduce((sum, item) => sum + item.quantity, 0);
    shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    tax = itemTotal * 0.06;
    orderTotal = itemTotal + shipping + tax;

    document.getElementById("shipping").value = shipping.toFixed(2);
    document.getElementById("tax").value = tax.toFixed(2);
    document.getElementById("total").value = orderTotal.toFixed(2);
  };

  onMount(init);
</script>

<form id="checkout-form">
  <fieldset>
    <legend>Shipping</legend>
    <label for="fname">First Name:</label>
    <input type="text" id="fname" name="fname" />
    <label for="lname">Last Name:</label>
    <input type="text" id="lname" name="lname" />
    <label for="street">Street:</label>
    <input type="text" id="street" name="street" />
    <label for="city">City:</label>
    <input type="text" id="city" name="city" />
    <label for="state">State:</label>
    <input type="text" id="state" name="state" />
    <label for="zip">Zip:</label>
    <input type="text" id="zip" name="zip" oninput={calculateOrderTotal} />
  </fieldset>

  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">Card number:</label>
    <input type="text" id="cardNumber" name="cardNumber" />
    <label for="expiration">Expiration date:</label>
    <input type="text" id="expiration" name="expiration" />
    <label for="code">Security Code:</label>
    <input type="text" id="code" name="code" />
  </fieldset>

  <fieldset>
    <legend>Order Summary</legend>
    <label for="subtotal">Item Subtotal:</label>
    <input type="text" id="subtotal" name="subtotal" readonly />
    <label for="shipping">Shipping Estimate:</label>
    <input type="text" id="shipping" name="shipping" readonly />
    <label for="tax">Tax:</label>
    <input type="text" id="tax" name="tax" readonly />
    <label for="total">Order Total:</label>
    <input type="text" id="total" name="total" readonly />
  </fieldset>

  <button>Submit</button>
</form>
