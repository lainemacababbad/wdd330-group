<script>
  import { getLocalStorage } from "../utils.mjs";
  import { onMount } from "svelte";
  import { checkout } from "../externalServices.mjs";

  export let key = "";

  // state vars
  let list = [];
  let itemTotal = 0;
  let shipping = 0;
  let tax = 0;
  let orderTotal = 0;

  const init = function () {
    list = getLocalStorage(key) || [];
    calculateItemSummary();
  };

  // const calculateItemSummary = function () {
  //   itemTotal = list.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //   document.getElementById("subtotal").value = itemTotal.toFixed(2);
  // };

  // calculate order subtotal from the cart items
  const calculateItemSummary = function () {
    // calculate the total of all the items in the cart
    const amounts = list.map((item) => item.FinalPrice);
    itemTotal = amounts.reduce((sum, item) => sum + item);
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

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  };
  const handleSubmit = async function (e) {
    const json = formDataToJSON(this);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = total;
    json.tax = tax;
    json.shipping = shipping;
    json.items = packageItems(list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  onMount(init);
</script>

<form id="checkout-form" onsubmit={handleSubmit}>
  <fieldset>
    <legend>Shipping</legend>
    <label for="fname">First Name:</label>
    <input type="text" id="fname" name="fname" required />
    <label for="lname">Last Name:</label>
    <input type="text" id="lname" name="lname" required />
    <label for="street">Street:</label>
    <input type="text" id="street" name="street" required />
    <label for="city">City:</label>
    <input type="text" id="city" name="city" required />
    <label for="state">State:</label>
    <input type="text" id="state" name="state" required />
    <label for="zip">Zip:</label>
    <input
      type="text"
      id="zip"
      name="zip"
      onblur={calculateOrderTotal}
      required
    />
  </fieldset>

  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">Card number:</label>
    <input type="text" id="cardNumber" name="cardNumber" required />
    <label for="expiration">Expiration date:</label>
    <input type="text" id="expiration" name="expiration" required />
    <label for="code">Security Code:</label>
    <input type="text" id="code" name="code" required />
  </fieldset>

  <fieldset>
    <legend>Order Summary</legend>

    <label for="itemTotal">Item Subtotal:</label>
    <p name="itemTotal" id="itemTotal">${itemTotal}</p>

    <label for="shipping">Shipping Estimate:</label>
    <p id="shipping">${shipping}</p>

    <label for="tax">Tax:</label>
    <p id="tax">${tax}</p>

    <label for="orderTotal">Order Total:</label>
    <p id="orderTotal">${orderTotal}</p>
  </fieldset>

  <button id="checkoutSubmit" type="submit">Checkout</button>
</form>

<style>
  form {
    width: 500px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }

  fieldset {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
  }

  legend {
    font-weight: bold;
  }

  label {
    display: block;
    margin: 5px 0 2px;
  }

  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
</style>
