import "@/styles/reset.css"
import "@/styles/common.scss"
import "@/styles/index.scss"

$("#info")
  .text("这是jquery添加的")
  .css({ color: "red" })

let funs = () => {
  console.log(1111)
}

funs()
