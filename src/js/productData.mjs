function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category) {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id, category = "tents") { // this is just targeting the category tents
  const products = await getData(category);
  return products.find((item) => item.Id === id);
}



// previous code
// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");cl
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

