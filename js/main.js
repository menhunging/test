// addEventListener("scroll", (event) => {
//   currentScroll = $(window).scrollTop();
// });

$(document).ready(function () {
  if ($(".slider-grettings").length > 0) {
    const swiper = new Swiper(".slider-grettings", {
      slidesPerView: 1,
      autoHeight: true,
      watchSlidesProgress: true,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 3000,
      },
    });
  }
});

$(window).on("resize", function () {});
