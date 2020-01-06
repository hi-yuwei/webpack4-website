import "babel-polyfill"
import "@/styles/reset.css"
import "@/styles/common.scss"
import "@/styles/index.scss"
console.log(333)
import Swiper from "swiperJS"
import "swiper/css/swiper.min.css"

$(document).ready(function() {
  /* 轮播图 */
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

  let urlHash = location.hash || "#index"
  urlHash = urlHash.replace("#", "")

  document.querySelector(`.js-nav-menu>.js-${urlHash}`).classList.add("current-nav")
})

console.log(SERVICE_URL)
