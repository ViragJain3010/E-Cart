// export function fetchAllProducts() {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8000/products");
//     const data = response.json();
//     resolve(data);
//   });
// }

// <-- API Call for Filtered Products -->
let prevQueryString = "";
export function fetchProductsByFilter(filter, sort, pagination, user) {
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
  if (prevQueryString === query+temp) {
    prevQueryString = query;
  } else {
    query += temp;
    prevQueryString = query;
  }

  for (let key in pagination) {
    query += `${key}=${pagination[key]}&`;
  }

  if(user.role==="admin"){
    query+="role=admin"
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/products?` + query);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
    // resolve(data);
  });
}

export function fetchProductByID(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products/" + id);
    const data = await response.json();
    resolve(data);
  });
}

export function createNewProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
}

export function updateProduct(updatedData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/products/" + updatedData.id,
      {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve(data);
  });
}
