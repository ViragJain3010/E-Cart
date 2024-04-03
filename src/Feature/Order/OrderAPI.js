export function addOrder(items) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/order", {
      method: "POST",
      body: JSON.stringify(items),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrdersByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/order?user=" + userId.id + "&_sort=id&_order=desc"
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let query = "";
  for (let key in pagination) {
    query += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    query += `${key}=${sort[key]}&`;
  }

  console.log(query);
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/order?${query}`);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/order/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
