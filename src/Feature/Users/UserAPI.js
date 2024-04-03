export function fetchLoggedInUserData(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/user?id=" + userId);
    const data = await response.json();
    resolve(data[0]);
  });
}

export function createLoggedInUserData(userData) {
  console.log(userData, "userData");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
}

export function updateLoggedInUserData(updatedData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/user/" + updatedData.id,
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
