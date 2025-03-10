import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import CheckoutForm from "./components/CheckoutForm.svelte";
import { mount } from "svelte";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : []; // updated to return an array
  // update: even if no data exists, it still returns an array
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// URL parameter search
export function getParam(param) {

  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const product = urlParams.get('product');
    // Extract filmId from the URL query string
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// Getting the total of the cart
export function getCartTotal() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  let total = 0;
  cart.forEach((item) => {
    total += item.FinalPrice;
  });

  return total;
}

export function renderHeaderFooter() {
  mount(MainHeader, { target: document.querySelector("#main-header") });
  mount(MainFooter, { target: document.querySelector("#main-footer") });
}

export function renderCheckoutForm() {
  mount(CheckoutForm, { target: document.querySelector("#checkout-form") });
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = mount(AlertMessage, {
    target: document.querySelector("body"),
    anchor: document.querySelector("main"),
    props: {
      message,
    },
  });
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   alert.$destroy();
  // }, duration);
}