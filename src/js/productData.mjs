const baseURL = import.meta.env.VITE_SERVER_URL;


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}


// ! old function
// export function getData(category) {
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     .then((data) => data);
// }

//! team 5 new function
export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}


// export async function findProductById(id, category = "tents") { // this is just targeting the category tents
//   const products = await getData(category);
//   return products.find((item) => item.Id === id);
// }

export async function findProductById(id, category = "tents") {
  const response = await fetch(`${baseURL}/product/${id}`);
  if (!response.ok) {
    throw new Error('Product not found');
  }
  const product = await response.json();
  return product;
}




// previous code
// function convertToJson(res) {
//   if (res.ok) {

//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }

// export function getData(category = "tents") {
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     .then((data) => data);
// }

// export async function findProductById(id) {
//   const products = await getData();
//   return products.find((item) => item.Id === id);
// }

