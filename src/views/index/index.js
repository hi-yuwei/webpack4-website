import "@/styles/reset.css"
import "@/styles/common.scss"
import "@/styles/index.scss"

$("#info")
  .text("这是jquery添加的")
  .css({ color: "red" })

let getX = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("5")
    }, 3000)
  })
}

async function Add() {
  let result = await getX()
  console.log(result)
  console.log(3333)

  return result + 333
}

Add().then(res => {
  console.log(res)
})
