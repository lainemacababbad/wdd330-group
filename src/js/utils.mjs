// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return Array.from([data]); // updated to return an array
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
  window.addEventListener('DOMContentLoaded', () => {
    // Extract filmId from the URL query string
    const params = new URLSearchParams(window.location.search);
    console.log(params.get('product'));
  });


}


