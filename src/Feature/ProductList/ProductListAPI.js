// export function fetchAllProducts() {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8000/products");
//     const data = response.json();
//     resolve(data);
//   });
// }

// export function fetchAllProducts() {
//   return new Promise(async (resolve) => {
//     const response = await fetch("https://dummyjson.com/products?limit=15");
//     const data = await response.json();
//     // console.log(data)
//     resolve(data.products);
//   });
// }

// <-- API Call for Filtered Products -->
let prevQueryString = "";
export function fetchProductsByFilter(filter, sort, pagination) {
  // filter = {"Catergory": ["smartphones","laptops"]}    --> filter will be this type of object
  //  sort = {"_sort" : "price"}              --> sort will be this type of object
  let query = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      for (let s in categoryValues) {
        query += `${key}=${filter[key][s]}&`;
      }
    }
  }
  let temp = "";
  for (let key in sort) {
    temp += `${key}=${sort[key]}&`;
  }

  // This does the toggling of sort
  if (prevQueryString.includes(temp)) {
    prevQueryString = query;
  } else {
    query += temp;
    prevQueryString = query;
  }

  for (let key in pagination) {
    query += `${key}=${pagination[key]}&`;
  }

  // console.log(query, " :query");
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/products?${query}`);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
    // resolve(data);
  });
}

export function fetchAllCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/category");
    const data = await response.json();
    resolve(data);
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/brands");
    const data = await response.json();
    resolve(data);
  });
}

export function fetchProductByID(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/products/${id}`);
    const data = await response.json();
    resolve(data);
  });
}
