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

  function searchParse() {
    var resultObj = {}
    var search = window.location.search
    if (search && search.length > 1) {
      var search = search.substring(1)
      var items = search.split("&")
      for (var index = 0; index < items.length; index++) {
        if (!items[index]) {
          continue
        }
        var kv = items[index].split("=")
        resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1]
      }
    }
    return resultObj
  }

  let searchObj = searchParse()

  console.log(searchObj)

  let currentNav = searchObj["nav"] || "index"
  document.querySelector(`.js-nav-menu>.js-${currentNav}`).classList.add("current-nav")
})

console.log(SERVICE_URL)
