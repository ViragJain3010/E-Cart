export function createUser(userData) {
  console.log(userData, "userData");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
}

export function checkUser(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        reject({ message: data.message || "Failed to authenticate" });
      }
    } catch (err) {
      reject({err: err, message: "Network error" });
    }
  });
}


export function updateUser(updatedData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/users/" + updatedData.id,
      {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: { "content-type": "application/json" },
      }
    );
    // console.log(response, "response");
    const data = await response.json();
    // console.log(data, ":data");
    resolve(data);
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    resolve({ data: "logout successfully" });
  });
}
