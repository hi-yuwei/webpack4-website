import "babel-polyfill"
import "@/styles/reset.css"
import "@/styles/common.scss"
import "@/styles/index.scss"
console.log(333)
import Swiper from "swiperJS"
import "swiper/css/swiper.min.css"

$(document).ready(function() {
  var mySwiper = new Swiper(".swiper-container", {
    // 如果需要分页器
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      bulletClass: "my-bullet",
      bulletActiveClass: "my-bullet-active"
    },
    autoplay: true
  })
})

var abc = () => {
  console.log(111)
}
abc()

console.log(SERVICE_URL)
