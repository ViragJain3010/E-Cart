import axios from "axios"

export function fetchAllProducts(){
  return new Promise(async (resolve)=>{
    const response = await fetch("http://localhost:8000/products")
    const data = response.json()
    // console.log(data)
    resolve(data)
  })
}