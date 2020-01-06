import "@/styles/reset.css"
import "@/styles/common.scss"
import "@/styles/index.scss"

import Swiper from "swiper"
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
    autoplay: false
  })
})

console.log(SERVICE_URL)
