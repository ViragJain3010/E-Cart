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
    const response = await fetch("http://localhost:8000/cart/" + id);
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
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export async function resetCart(userId) {
  return new Promise(async (resolve) => {
    const items = await fetchItemsByUserId(userId);
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
