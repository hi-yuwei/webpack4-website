import "@/styles/reset.css"
import "@/styles/common.scss"
import "@/styles/index.scss"

import Swiper from "swiper"
import "swiper/css/swiper.min.css"

$(document).ready(function() {
  var mySwiper = new Swiper(".swiper-container", {
    pagination: {
      el: ".swiper-pagination",
      bulletClass: "swiper-pagination", //需设置.my-bullet样式
      bulletActiveClass: "swiper-pagination-active"
    },
    autoplay: true
  })
})

console.log(SERVICE_URL)
