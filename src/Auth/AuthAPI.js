export function createUser(userData) {
  console.log(userData, "userData");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    // console.log(response, "response");
    const data = await response.json();
    // console.log(data, ":data");
    resolve(data);
  });
}

export function checkUser(loginData) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8000/users?email=${loginData.email}`);
    const data = await response.json();
    // console.log(data, ":data");
    if (data.length) {
      if (data[0].password === loginData.password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong Credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }
  });
}
