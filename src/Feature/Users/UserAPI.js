export function fetchLoggedInUserData(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/users/" + userId);
    const data = await response.json();
    resolve(data[0]);
  });
}

export function createLoggedInUserData(userData) {
  console.log(userData, "userData");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/users/", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
}

export function updateLoggedInUserData(updatedData) {
  console.log(updatedData)
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/users/" + updatedData.userId,
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
