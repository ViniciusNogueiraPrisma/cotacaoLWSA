var swiper = new Swiper(".mySwiper-banner-home", {
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".mySwiper-imprensa-home", {
  spaceBetween: 32,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Arenas Esportivas
var swiperEsportiva = new Swiper(".arena-esportiva-swiper", {
  spaceBetween: 8,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".arena-esportiva-next",
    prevEl: ".arena-esportiva-prev",
  },
});

// Arenas Indoor
var swiperIndoor = new Swiper(".arena-indoor-swiper", {
  spaceBetween: 8,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".arena-indoor-next",
    prevEl: ".arena-indoor-prev",
  },
});

// Arenas 360˚
var swiper360 = new Swiper(".arena-360-swiper", {
  spaceBetween: 8,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: ".arena-360-next",
    prevEl: ".arena-360-prev",
  },
});

// Slide + Tabs - Nosso Ecossistema (suporta múltiplas instâncias)
function initSlideNavtabsSwiper() {
  var containers = document.querySelectorAll(".slide-navtabs-lwsa");
  if (!containers.length) return;

  containers.forEach(function (container) {
    var swiperEl = container.querySelector(".slide-navtabs-swiper");
    var items = container.querySelectorAll(".slide-navtabs-item");
    var panels = container.querySelectorAll(".slide-navtabs-panel");
    var prevBtn = container.querySelector(".slide-navtabs-arrow-prev");
    var nextBtn = container.querySelector(".slide-navtabs-arrow-next");

    if (!swiperEl || !items.length || !panels.length) return;

    function setActiveByIndex(index) {
      items.forEach(function (item, i) {
        if (i === index) {
          item.classList.add("is-active");
        } else {
          item.classList.remove("is-active");
        }
      });

      panels.forEach(function (panel) {
        panel.classList.remove("is-active");
      });

      var activeItem = items[index];
      if (activeItem) {
        var targetId = activeItem.getAttribute("data-tab-target");
        if (targetId) {
          var targetPanel = container.querySelector("#" + targetId);
          if (targetPanel) {
            targetPanel.classList.add("is-active");
          }
        }
      }
    }

    var slideNavtabsSwiper = new Swiper(swiperEl, {
      slidesPerView: "auto",
      spaceBetween: 24,
      watchOverflow: true,
      freeMode: false,
      breakpoints: {
        0: {
          spaceBetween: 12,
        },
        768: {
          spaceBetween: 20,
        },
        1200: {
          spaceBetween: 24,
        },
      },
    });

    items.forEach(function (item, index) {
      item.addEventListener("click", function () {
        if (slideNavtabsSwiper) {
          slideNavtabsSwiper.slideTo(index);
        }
        setActiveByIndex(index);
      });
    });

    function getCurrentActiveIndex() {
      var currentIndex = 0;
      items.forEach(function (item, i) {
        if (item.classList.contains("is-active")) {
          currentIndex = i;
        }
      });
      return currentIndex;
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var currentIndex = getCurrentActiveIndex();
        var nextIndex = Math.min(items.length - 1, currentIndex + 1);
        if (nextIndex !== currentIndex) {
          if (slideNavtabsSwiper) {
            slideNavtabsSwiper.slideTo(nextIndex);
          }
          setActiveByIndex(nextIndex);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var currentIndex = getCurrentActiveIndex();
        var prevIndex = Math.max(0, currentIndex - 1);
        if (prevIndex !== currentIndex) {
          if (slideNavtabsSwiper) {
            slideNavtabsSwiper.slideTo(prevIndex);
          }
          setActiveByIndex(prevIndex);
        }
      });
    }

    // Garante estado inicial correto baseado no HTML
    var initialIndex = 0;
    items.forEach(function (item, i) {
      if (item.classList.contains("is-active")) {
        initialIndex = i;
      }
    });
    setActiveByIndex(initialIndex);
  });
}

document.addEventListener("DOMContentLoaded", initSlideNavtabsSwiper);

var swiperIndices = null;

function initIndicesSwiper() {
  if (window.innerWidth < 1200) {
    if (!swiperIndices) {
      swiperIndices = new Swiper(".indices-swiper", {
        spaceBetween: 0,
        slidesPerView: 1,
        // autoplay: {
        //   delay: 3000,
        // },
        loop: true,
      });
    }
  } else {
    if (swiperIndices) {
      swiperIndices.destroy(true, true);
      swiperIndices = null;
    }
  }
}

initIndicesSwiper();

window.addEventListener("resize", function () {
  initIndicesSwiper();
});