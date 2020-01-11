import "@/styles/reset.css"
import "@/styles/common.scss"
import "@/styles/index.scss"

function test() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise 返回值")
    }, 3000)
  })
}

test()
  .then(res => {
    console.log(res)
  })
  .catch(err => {})

console.log(SERVICE_URL)
