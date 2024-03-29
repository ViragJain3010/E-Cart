export function addToCart(items) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart", {
      method: "POST",
      body: JSON.stringify(items),
      headers: { "content-type": "application/json" },
    });
    // console.log(response, "response");
    const data = await response.json();
    // console.log(data, ":data");
    resolve({ data });
  });
}

export function fetchItemsByUserId(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/cart?user=${id}`);
    const data = await response.json();
    resolve(data);
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/cart/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function incrementQty() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/cart`);
  });
}
