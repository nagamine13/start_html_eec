// JavaScript Document

/*----------------------------------------
  onload event
------------------------------------------*/
const onloads = document.querySelectorAll('[data-onload="main"]');
const onloadsquick = document.querySelectorAll('[data-onload="quick"]');
const onloadsdelay = document.querySelectorAll('[data-onload="delay"]');
window.addEventListener('load', () => {
  document.querySelector("body").classList.add("scroll_on");
  onloadsquick. forEach ( onloadquick => {
    onloadquick.classList.add('load_open');
  });
  setTimeout( () => {
    onloads. forEach ( onload => {
      onload.classList.add('load_open');
    });
	},400);
  setTimeout( () => {
    onloadsdelay. forEach ( onloaddelay => {
      onloaddelay.classList.add('load_open');
    });
	},600);
});

/*----------------------------------------
  global nav
------------------------------------------*/
const navTriggers = document.querySelectorAll('[data-nav="nav_trigger"]');
const globalNavs = document.querySelectorAll('[data-nav="global_nav"]');
const globalNavOverlay = document.querySelector('[data-nav="global_nav_overlay"]');
navTriggers.forEach((navTrigger) => {
  navTrigger.addEventListener('click' , () => {
    navTriggers.forEach((navTrigger) => {
      navTrigger.classList.toggle('active');
    });
    globalNavs.forEach((globalNav) => {
      globalNav.classList.toggle("active");
    });
    document.querySelector('body').classList.toggle("scroll_on");
    if (globalNavOverlay) {
      globalNavOverlay.classList.toggle("active");
    };
  });
});
globalNavs.forEach((globalNav) => {
  globalNav.addEventListener('click' , () => {
    globalNav.classList.remove('active');
    navTriggers.forEach((navTrigger) => {
      navTrigger.classList.remove('active');
    });
    document.querySelector("body").classList.add("scroll_on");
  });
});
if (globalNavOverlay) {
  globalNavOverlay.addEventListener('click' , () => {
    globalNavs.forEach((globalNav) => {
      globalNav.classList.remove('active');
    });
    navTriggers.forEach((navTrigger) => {
      navTrigger.classList.remove('active');
    });
    document.querySelector("body").classList.add("scroll_on");
    globalNavOverlay.classList.remove("active");
  });
};

const subNavOpens = document.querySelectorAll('[data-nav="sub_nav_open"]');
subNavOpens.forEach(function (subNavOpen) {
  subNavOpen.addEventListener("mouseover", () => {
      subNavOpen.firstElementChild.classList.add("active");
      subNavOpen.lastElementChild.classList.add("active");
    },false
  );
  subNavOpen.addEventListener("mouseout", () => {
    subNavOpen.firstElementChild.classList.remove("active");
    subNavOpen.lastElementChild.classList.remove("active");
  },false
  );
});

/*----------------------------------------
  scroll reveal
------------------------------------------*/
let scrollRevealTargets = document.querySelectorAll('[data-scroll="reveal"]');
let scrollRevealOffset = window.innerHeight*0.3;
function scrollReveal() {
  let scroll = window.scrollY;
  let h = window.innerHeight;
  scrollRevealTargets.forEach(target => {
    let pos = target.getBoundingClientRect().top + scroll;
    if (scroll > pos - h + scrollRevealOffset) {
      target.classList.add('scroll_in');
    };
  });
};
window.addEventListener('scroll', function() {
  scrollReveal();
});
window.addEventListener('load', function() {
  scrollReveal();
});

/*-- fvHiddenElements --*/
const fvHiddenElements = document.querySelectorAll('[data-scroll="fv_scroll_hide"]');
window.addEventListener('scroll', function() {
  let scrollAmount = window.scrollY;
  if (scrollAmount > 0) {
    fvHiddenElements.forEach(fvHiddenElement => {
      fvHiddenElement.classList.add("fv_scroll_show");
    });
  } else {
    fvHiddenElements.forEach(fvHiddenElement => {
      fvHiddenElement.classList.remove("fv_scroll_show");
    });
  }
});

/*-- headerLogoScrollResizeElements --*/
const headerLogoScrollResizeElements = document.querySelectorAll('[data-scroll="header_scroll_resize"]');
window.addEventListener('scroll', function() {
  let scrollAmount = window.scrollY;
  if (scrollAmount > 0) {
    headerLogoScrollResizeElements.forEach(headerLogoScrollResizeElement => {
      headerLogoScrollResizeElement.classList.add("size_small");
    });
  } else {
    headerLogoScrollResizeElements.forEach(headerLogoScrollResizeElement => {
      headerLogoScrollResizeElement.classList.remove("size_small");
    });
  }
});

/*----------------------------------------
  tab change
------------------------------------------*/
const tabSwitchBoxes = document.querySelectorAll('[data-tab="switch"]');
tabSwitchBoxes.forEach((tabSwitchBox) => {
  const tabSwitchTargetId = tabSwitchBox.getAttribute('data-tab_id');
  const tabSwitchTarget = document.querySelector(`[data-tab="target"][data-tab_id="${tabSwitchTargetId}"]`);
  const tabSwitchContents = Array.from(tabSwitchTarget.children);
  const tabSwitches = Array.from(tabSwitchBox.children);
  const autoSwitchInterval = 5000; // 自動切り替えの間隔（ミリ秒）
  let currentIndex = 0;
  let autoTimer = null;
  const switchTo = (index) => {
    tabSwitches.forEach(sw => sw.classList.remove('active'));
    tabSwitchContents.forEach(content => content.classList.remove('active'));
    tabSwitches[index].classList.add('active');
    tabSwitchContents[index].classList.add('active');
    currentIndex = index;
  };
  const startAutoPlay = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % tabSwitches.length;
      switchTo(nextIndex);
    }, autoSwitchInterval);
  };
  tabSwitches.forEach((tabSwitch, index) => {
    tabSwitch.addEventListener('click', () => {
      switchTo(index);
      if (tabSwitchBox.getAttribute('data-tabAutoplay') === 'true') {
        startAutoPlay();
      }
    });
  });
  if (tabSwitchBox.getAttribute('data-tabAutoplay') === 'true') {
    startAutoPlay();
  }
});

/*----------------------------------------
  accordion
------------------------------------------*/
const accordionSlideDown = (el) => {
  el.style.display = 'block';
  el.style.height = 'auto';
  let h = el.offsetHeight; 
  el.style.height = h + 'px';
  el.animate([{ height: 0 },{ height: h + 'px' }], {duration: 400, easing: 'cubic-bezier(.63,.08,.47,.99)',});
  el.style.height = 'auto';
};
const accordionSlideUp = (el) => {
  let h = el.offsetHeight;
  el.style.height = h + 'px';
  el.animate([{ height: h + 'px' },{ height: 0 }], {duration: 400, easing: 'cubic-bezier(.63,.08,.47,.99)',});
  el.style.height = 0;
};
const accordionSlideToggle = (el) => {
  if (el.classList.contains('accordion_open') == true) {
    return accordionSlideUp(el);
  } else {
    return accordionSlideDown(el);
  }
};
const accordionBoxes = document.querySelectorAll('[data-accordion="box"]');
accordionBoxes.forEach((accordion) => {
  const accordionTriggers = accordion.querySelectorAll('[data-accordion="trigger"]');
  const accordionContents = accordion.querySelectorAll('[data-accordion="content"]');
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      accordionTriggers.forEach((trigger) => {
        trigger.classList.toggle("accordion_active");
      });
      accordionContents.forEach((content) => {
        accordionSlideToggle(content);
        content.classList.toggle("accordion_open");
      });
    });
  });
});

/*----------------------------------------
  ios style
------------------------------------------*/
window.addEventListener("load", () => {
  const iosStyles = document.querySelectorAll('[data-style="ios_style_point"]');
  const linkBtns = document.querySelectorAll(".link_btn:not(.jp)");
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  if (isIOS) {
    iosStyles.forEach(iosStyle => {
      iosStyle.classList.add("ios_style");
    });
    linkBtns.forEach(linkBtn => {
      linkBtn.classList.add("ios_style");
    });
  }
});

/*----------------------------------------
  iframe youtube
------------------------------------------*/
const iframes = document.querySelectorAll('iframe');
if (iframes) {
  iframes.forEach(iframe => {
    if (iframe.title.includes('YouTube')) {
      iframe.classList.add('mod_youtube_iframe_size');
    }
  });
}

/*----------------------------------------
  vh vw
------------------------------------------*/
const setFillHeightWidth = () => {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  document.documentElement.style.setProperty('--vh', `${vh}`);
  document.documentElement.style.setProperty('--vw', `${vw}`);
  document.documentElement.style.setProperty('--vh_px', `${vh}px`);
  document.documentElement.style.setProperty('--vw_px', `${vw}px`);
}
setFillHeightWidth();
let previousWindowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  let currentWindowWidth = window.innerWidth;
  let threshold = 100;
  if ( Math.abs(currentWindowWidth - previousWindowWidth) > threshold ) {
    setFillHeightWidth();
    previousWindowWidth = currentWindowWidth;
  }
});
const setEvenNumHeightWidth = () => {
  let vh_even = Math.ceil(window.window.innerHeight / 2) * 2;
  let vw_even = Math.ceil(window.innerWidth / 2) * 2;
  document.documentElement.style.setProperty('--vh_px_even', `${vh_even}px`);
  document.documentElement.style.setProperty('--vw_px_even', `${vw_even}px`);
}
setEvenNumHeightWidth();
window.addEventListener('resize', () => {
  setEvenNumHeightWidth();
});

/*----------------------------------------
  # scroll
------------------------------------------*/
const smoothScrollTriggers = document.querySelectorAll('a[href^="#"]');
smoothScrollTriggers.forEach((smoothScrollTrigger) => {
  smoothScrollTrigger.addEventListener('click' , (e) => {
    e.preventDefault();
    let href = smoothScrollTrigger.getAttribute('href');
    let targetElement = document.getElementById(href.replace('#', ''));
    const rect = targetElement.getBoundingClientRect().top;
    const offset = window.scrollY;
    const gap = 60;
    const target = rect + offset - gap;
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });
  });
});

/* # link
-------------------------------*/
const id_links = document.querySelectorAll('a[data-hash]');
if (id_links) {
  id_links.forEach((id_link) => {
    id_link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = id_link.getAttribute('data-hash');
      sessionStorage.setItem('scrollToHash', hash);
      window.location.href = id_link.href;
    });
  });
}
window.addEventListener('load', () => {
  const storedHash = sessionStorage.getItem('scrollToHash');
  if (storedHash) {
    const targetElement = document.querySelector(`#${storedHash}`);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const offset = window.scrollY;
      const gap = window.innerHeight * 0.3;
      const distanceFromTop = rect.top + offset - gap;
      window.scrollTo({
        top: distanceFromTop,
        behavior: 'smooth',
      });
      sessionStorage.removeItem('scrollToHash');
    }
  }
});
/* #idのリンク先とは違うページから#idにリンクさせる場合、urlではなくdata-hash属性にリンク先のidを入れる。 */

/*----------------------------------------
  x scroll
------------------------------------------*/
const xScrollElements = document.querySelectorAll('[data-scroll="x_scroll_area"]');
if ( xScrollElements ) {
  xScrollElements.forEach((xScrollElement) => {
    xScrollElement.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      xScrollElement.scrollLeft += e.deltaY*0.4;
    });
  });
}

/*----------------------------------------
  swiper
------------------------------------------*/

/*------- swiper master code -------*/
function createSwiper(className, customOptions = {}) {
  // Swiperの存在チェック
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper is not loaded. Skipping Swiper initialization.');
    return null;
  }
  // デフォルト設定
  const defaultOptions = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    loopAdditionalSlides: 2,
    effect: 'slide',
    pagination: {
      el: `.${className}-swiper-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `.${className}-swiper-button-next`,
      prevEl: `.${className}-swiper-button-prev`,
    },
    spaceBetween: window.innerWidth * 0.02,
    roundLengths: true,
    watchOverflow: true,
    speed: 500,
    autoplay: { delay: 6000, },
  };
  // スライド数をチェック
  const slides = document.querySelectorAll(`.${className} .swiper-slide`);
  const swiperContainer = document.querySelector(`.${className}`);
  if (!swiperContainer) {
    console.warn(`Swiper container .${className} not found`);
    return null;
  }
  let finalOptions;
  if (slides.length <= 1) {
    // 単一スライドの場合の設定
    finalOptions = {
      ...defaultOptions,
      loop: false,
      pagination: false,
      navigation: false,
      ...customOptions
    };
    swiperContainer.classList.add('no_controller');
  } else {
    // 複数スライドの場合
    finalOptions = {
      ...defaultOptions,
      ...customOptions
    };
  }
  // Swiperインスタンスを作成して返す
  return new Swiper(`.${className}`, finalOptions);
}
// 複数のSwiperを一括初期化する場合
function initializeMultipleSwipers(swiperConfigs) {
  const instances = {};
  swiperConfigs.forEach(config => {
    const { name, options = {} } = config;
    instances[name] = createSwiper(name, options);
  });
  return instances;
}
/*------- swiper master code -------*/

// シンプルな使用 (swiper-containerに独自classを付け、そのclass名を"swiper1"の所に入力する)
/* const swiper1 = createSwiper('swiper1'); */

// カスタム設定での使用
/* const swiper2 = createSwiper('swiper2', {
  slidesPerView: 3,
  autoplay: { delay: 3000 }
}); */

// 複数のSwiperを一度に作成
/* const allSwipers = initializeMultipleSwipers([
  { name: 'hero' },
  { name: 'gallery', options: { slidesPerView: 2 } }
]); */


/*----------------------------------------
  modal
------------------------------------------*/
/*-- youtube replace --*/
function ImageToYoutubeReplace(ytImage) {
  let youtubeId = ytImage.getAttribute('youtubeid');
  let youtubeVideo = '<iframe class="youtube_player" youtubeid="'+ youtubeId +'" src="https://www.youtube.com/embed/'+ youtubeId +'?playsinline=1&enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe>'
  ytImage.innerHTML = youtubeVideo;
  ytImage.classList.add('play');
};
function YoutubeToImageReplace(ytIframe) {
  let youtubeId = ytIframe.getAttribute('youtubeid');
  let youtubeImage = '<img src="https://img.youtube.com/vi/'+ youtubeId +'/maxresdefault.jpg" alt="thumbs">'
  ytIframe.innerHTML = youtubeImage;
  ytIframe.classList.remove('play');
};
/*-- youtube replace --*/
/*-- mono modal open --*/
const monoModalOpens = document.querySelectorAll ('[data-modal="mono_modal_open"]');
monoModalOpens.forEach((monoModalOpen) => {
  monoModalOpen.addEventListener('click' , () => {
    let modalTargetId = monoModalOpen.getAttribute('data-mono_modal_target_id');
    let monoModalOpenTarget = document.querySelector(`[data-mono_modal_id="${modalTargetId}"]`);
    if(monoModalOpenTarget) {
      monoModalOpenTarget.classList.add('visible');
    }
  });
});
/*-- mono modal --*/
/*-- image_mono_modal_trigger --*/
const imageMonoModals = document.querySelectorAll('[data-modal="img_mono_modal_trigger"]');
imageMonoModals.forEach((image) => {
  const imageSrc = image.getAttribute('src');
  const newHTML = `
    <div data-modal="img_mono_modal_open" class="cmn_img_mono_modal_trigger"><img src="${imageSrc}" alt="modal open"></div>
    <!----- modal ------>
    <div class="cmn_modal_layer">
      <div class="modal_bg" data-modal="modal_close_element"></div>
      <div class="modal_inner">
        <!----- modal content ------>
        <img src="${imageSrc}" class="img_mono_modal_content" alt="">
        <!----- modal content ------>
      </div>
      <div class="modal_close_btn" data-modal="modal_close_element"></div>
    </div>
    <!----- modal ------>
  `;
  image.parentNode.replaceChild(document.createRange().createContextualFragment(newHTML), image);
});
const imgMonoModalOpens = document.querySelectorAll ('[data-modal="img_mono_modal_open"]');
imgMonoModalOpens.forEach((imgMonoModalOpen) => {
  imgMonoModalOpen.addEventListener('click' , () => {
    let imgMonoModalOpenTarget = imgMonoModalOpen.nextElementSibling;
    if(imgMonoModalOpenTarget) {
      imgMonoModalOpenTarget.classList.add('visible');
    }
  });
});
/*-- image_mono_modal_trigger --*/
/*-- youtube modal --*/
const youtubeMonoModalOpens = document.querySelectorAll ('[data-modal="youtube_mono_modal_open"]');
youtubeMonoModalOpens.forEach((youtubeMonoModalOpen) => {
  youtubeMonoModalOpen.addEventListener('click' , () => {
    let youtubeModalTargetId = youtubeMonoModalOpen.getAttribute('data-youtube_modal_target_id');
    let youtubeMonoModalOpenTarget = document.querySelector(`[data-youtube_modal_id="${youtubeModalTargetId}"]`);
    if(youtubeMonoModalOpenTarget) {
      youtubeMonoModalOpenTarget.classList.add('visible');
      let youtubeMonoModalOpenTargetYtVideoBox = youtubeMonoModalOpenTarget.querySelector('.modal_youtube_video_box');
      ImageToYoutubeReplace(youtubeMonoModalOpenTargetYtVideoBox);
    }
  });
});
/*-- youtube modal --*/
/*-- slide modal --*/
const slideModalOpenBox = document.querySelectorAll ('[data-modal="slide_modal_open_box"]');
slideModalOpenBox.forEach((slideModalOpenBox) => {
  let slideModalTargetId = slideModalOpenBox.getAttribute('data-slide_modal_target_id');
  let slideModalLayer = document.querySelector(`[data-slide_modal_id="${slideModalTargetId}"]`);
  let slideModalOpens = slideModalOpenBox.querySelectorAll('[data-modal="slide_modal_open"]');
  let slideModalOpensArray = [].slice.call(slideModalOpens);
  let slideModalContents = slideModalLayer.querySelectorAll('[data-modal="slide_modal_content"]');
  let slideModalContentsArray = [].slice.call(slideModalContents);
  let slideModalContentsLength = slideModalContents.length;
  let images = slideModalLayer.querySelectorAll('img[data-src]');
  slideModalOpens.forEach((slideModalOpen) => {
    slideModalOpen.addEventListener('click', () => {
      images.forEach((image) => {image.setAttribute('src', image.getAttribute('data-src'));});
      slideModalLayer.classList.add('visible');
      slideModalContents.forEach((slideModalContent) => {slideModalContent.classList.remove('slide_visible');});
      let slideModalOpenIndex = slideModalOpensArray.indexOf(slideModalOpen);
      slideModalContents[slideModalOpenIndex].classList.add('slide_visible');
    });
  });
  function slideModalMoveRight() {
    if ( slideModalLayer.querySelector('.slide_visible') ) {
      let visibleContent = slideModalLayer.querySelector('.slide_visible');
      let visibleContentIndex = slideModalContentsArray.indexOf(visibleContent);
      slideModalContents.forEach((slideModalContent) => {slideModalContent.classList.remove('slide_visible');});
      if (visibleContentIndex == (slideModalContentsLength - 1) ) {
        slideModalContents[0].classList.add('slide_visible');
      } else {
        slideModalContents[visibleContentIndex].nextElementSibling.classList.add('slide_visible');
      }
    }
  }
  function slideModalMoveLeft() {
    if ( slideModalLayer.querySelector('.slide_visible') ) {
      let visibleContent = slideModalLayer.querySelector('.slide_visible');
      let visibleContentIndex = slideModalContentsArray.indexOf(visibleContent);
      slideModalContents.forEach((slideModalContent) => {slideModalContent.classList.remove('slide_visible');});
      if (visibleContentIndex == (0) ) {
        slideModalContents[(slideModalContentsLength - 1)].classList.add('slide_visible');
      } else {
        slideModalContents[visibleContentIndex].previousElementSibling.classList.add('slide_visible');
      }
    }
  }
  let modalPrevBtn = slideModalLayer.querySelector('[data-modal="modal_prev_element"]');
  modalPrevBtn.addEventListener('click' , () => { slideModalMoveLeft(); });
  let modalNextBtn = slideModalLayer.querySelector('[data-modal="modal_next_element"]');
  modalNextBtn.addEventListener('click' , () => { slideModalMoveRight(); });
  document.addEventListener('keydown', (e) => {
    if(e.code == 'ArrowLeft'){
      slideModalMoveLeft();
    } else if (e.code == 'ArrowRight') {
      slideModalMoveRight();
    }
  });
});
/*-- slide modal --*/
/*-- modal close --*/
const modalCloseElements = document.querySelectorAll('[data-modal="modal_close_element"]');
const modalLayers = document.querySelectorAll('.cmn_modal_layer');
modalCloseElements.forEach((modalCloseElement) => {
  modalCloseElement.addEventListener('click' , () => {
    modalLayers.forEach((modalLayer) => {
      modalLayer.classList.remove('visible');
    });
    const slideModalContents = document.querySelectorAll('[data-modal="slide_modal_content"]');
    slideModalContents.forEach((slideModalContent) => {slideModalContent.classList.remove('slide_visible');});
    const modal_youtube_video_boxs = document.querySelectorAll('.modal_youtube_video_box');
    modal_youtube_video_boxs.forEach((modal_youtube_video_box) => {
      YoutubeToImageReplace(modal_youtube_video_box);
    });
  });
  return false;
});
/*-- modal close --*/

/*----------------------------------------
  web storage
------------------------------------------*/
/* const webStorage = function(){
  const loadingAnims = document.querySelectorAll('#loading');
  const onloads = document.querySelectorAll('.onload');
  const onloadsdelay = document.querySelectorAll('.onload_delay');
  if(sessionStorage.getItem('access_opanimst')){
    loadingAnims.forEach ( loadingAnim => {
      loadingAnim.classList.remove('is_not_loaded');
      loadingAnim.classList.add('is_loaded');
    });
    onloads. forEach ( onload => {
      onload.classList.add('open');
    });
    onloadsdelay. forEach ( onloaddelay => {
      onloaddelay.classList.add('open');
    });
  } else {
    loadingAnims.forEach ( loadingAnim => {
      loadingAnim.classList.add('is_not_loaded');
      loadingAnim.classList.remove('is_loaded');
    });
    sessionStorage.setItem('access_opanimst', 0);
  }
}
webStorage(); */