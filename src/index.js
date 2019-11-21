import "./styles/home.scss"
import "./styles/index.css"

$("#info")
  .text("这是jquery添加的")
  .css({ color: "red" })

let funs = () => {
  console.log(1111)
}

funs()
