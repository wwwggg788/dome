/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";
  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  // const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  // function mobileNavToogle() {
  //   document.querySelector('body').classList.toggle('mobile-nav-active');
  //   // mobileNavToggleBtn.classList.toggle('bi-list');
  //   // mobileNavToggleBtn.classList.toggle('bi-x');
  // }
  // console.log(mobileNavToggleBtn)
  // if (mobileNavToggleBtn) {
  //   mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  // }

  /**
   * Hide mobile nav on same-page/hash links
   */
  // document.querySelectorAll('#navmenu a').forEach(navmenu => {
  //   navmenu.addEventListener('click', () => {
  //     if (document.querySelector('.mobile-nav-active')) {
  //       mobileNavToogle();
  //     }
  //   });

  // });

  /**
   * Toggle mobile nav dropdowns
   */
  // document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
  //   navmenu.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     this.parentNode.classList.toggle('active');
  //     this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
  //     e.stopImmediatePropagation();
  //   });
  // });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  // document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
  //   faqItem.addEventListener('click', () => {
  //     console.log(1)
  //     faqItem.parentNode.classList.toggle('faq-active');
  //   });
  // });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

function goBack() {
  window.history.back();
  // 等效于 history.go(-1);
}

const header = document.getElementById('header')
const headerBox = document.getElementById('header-box')
const headerContent = document.getElementById('header-content')
const dropdowns = document.querySelectorAll('.dropdown-ul')
window.addEventListener('scroll', () => {
  // if (window.innerWidth < 1240) return
  if (window.scrollY > 24 && window.innerWidth > 1240) {
    header.classList.add('fixed-top-hover')
    headerContent.classList.add('fixed-top-content-hover')
    headerBox.style.setProperty('padding', '0 80px', 'important');
    dropdowns.forEach(item => {
      item.classList.add('ul-hover')
    })
  } else {
    header.classList.remove('fixed-top-hover')
    headerBox.style.setProperty('padding', '0', 'important');
    headerContent.classList.remove('fixed-top-content-hover')
    dropdowns.forEach(item => {
      item.classList.remove('ul-hover')
    })
  }
})
// 加载页脚
fetch('../footer.html')
  .then(response => response.text())
  .then(data => {
    if (document.getElementById('footer')) {
      document.getElementById('footer').innerHTML = data;
      const selectCountry = document.getElementById('selectCountry');
      const countrys = document.getElementById('countrys');
      const options = countrys.querySelectorAll('div');

      // 设置默认选中第一个选项
      if (options.length > 0) {
        const firstOption = options[0];
        const image = firstOption.querySelector('img').src;
        const text = firstOption.querySelector('span').textContent;

        selectCountry.innerHTML = `
        <div style="display: flex; align-items: center;">
          <img src="${image}" alt="${text}" class="selected-image">
          <span>${text}</span>
        </div>
        <div></div>
      `;

        firstOption.classList.add('same-as-selected');
      }

      // 切换下拉列表显示状态
      selectCountry.addEventListener('click', function (e) {
        e.stopPropagation();
        countrys.classList.toggle('select-hide');
        selectCountry.classList.toggle('select-arrow-active');
      });

      // 点击选项处理
      options.forEach(option => {
        option.addEventListener('click', function (e) {
          e.stopPropagation();

          // 获取选项中的图文信息
          const image = this.querySelector('img').src;
          const text = this.querySelector('span').textContent;

          // 更新选中项显示
          selectCountry.innerHTML = `
          <div style="display: flex; align-items: center;">
            <img src="${image}" alt="${text}" class="selected-image">
            <span>${text}</span>
          </div>
          <div></div>
        `;

          // 隐藏下拉列表
          countrys.classList.add('select-hide');
          selectCountry.classList.remove('select-arrow-active');

          // 移除之前的选中状态
          options.forEach(opt => opt.classList.remove('same-as-selected'));
          // 添加新的选中状态
          this.classList.add('same-as-selected');
        });
      });

      // 点击外部关闭下拉列表
      document.addEventListener('click', function () {
        countrys.classList.add('select-hide');
        selectCountry.classList.remove('select-arrow-active');
      });
      //初始化页脚语言包
      const initialLang = getLanguageFromUrl();
      switchLanguage(initialLang);
      //

      const footerBtn = document.getElementById('footerBtn')
      const selectInput = document.getElementById('footer-select-input')
      footerBtn.addEventListener('click', () => {
        const whatsApp = document.getElementById('footer-whatsApp')
        const email = document.getElementById('footer-email')
        selectInput.style.borderColor = '#D4D8E9'
        email.style.borderColor = '#D4D8E9'
        if (!whatsApp.value) {
          selectInput.style.borderColor = 'red'
          return
        }
        if (!email.value) {
          email.style.borderColor = 'red'
          return
        }
        post('/tf/website/dynamic/send_info', {
          whatsApp: whatsApp.value,
          email: email.value,
        }).then(res => {
          if (res.success) {
            this.$message.success(res.message.replace('_', ''))
          } else {
            this.$message.error(res.message.replace('_', ''))

          }
        })
      })
    }

  });


//移动端 汉堡按钮
const bold = document.getElementById('list-bold')
const xBold = document.getElementById('x-bold')
const navList = document.getElementById('nav-list')
bold.addEventListener('click', () => {
  navList.classList.add('show-nav-list')
  bold.style.display = 'none'
  xBold.style.display = 'block'
})
xBold.addEventListener('click', () => {
  navList.classList.remove('show-nav-list')
  bold.style.display = 'block'
  xBold.style.display = 'none'
})

window.addEventListener('load', updateWidthInfo);

// 窗口大小改变时执行
window.addEventListener('resize', updateWidthInfo);

// 为了确保准确性，在页面缩放时也执行
window.addEventListener('zoom', updateWidthInfo);

function updateWidthInfo() {
  const width = document.documentElement.clientWidth;
  if (width > 1240) {
    navList.classList.remove('show-nav-list')
    bold.style.display = 'block'
    xBold.style.display = 'none'
  } else {
    // navList.classList.add('show-nav-list')
    bold.style.display = 'block'
    xBold.style.display = 'none'
  }
}


//message
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#409EFF',
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
        info: '#909399',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    // 禁用preflight插件（移除默认标签样式）
    preflight: false
  }
}
class Message {
  constructor() {
    this.container = document.getElementById('messageContainer');
    this.messages = [];
    this.zIndex = 9999;
  }

  // 创建消息实例
  create(options) {
    // 处理参数
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }

    // 设置默认值
    const defaults = {
      message: '默认消息',
      type: 'info',
      duration: 3000,
      showClose: false,
      offset: 100,
      onClose: null
    };

    const config = { ...defaults, ...options };

    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = 'bg-white rounded-md shadow-lg py-3 px-4 flex items-center transition-all duration-300 message-enter';

    // 设置消息类型样式
    const typeClasses = {
      info: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-danger/10 text-danger'
    };

    messageEl.classList.add(...typeClasses[config.type].split(' '));

    // 设置图标
    const iconClasses = {
      info: 'fa-info-circle text-primary',
      success: 'fa-check-circle text-success',
      warning: 'fa-exclamation-circle text-warning',
      error: 'fa-times-circle text-danger'
    };

    messageEl.innerHTML = `
          <i class="fa ${iconClasses[config.type]} mr-3"></i>
          <span class="flex-1">${config.message}</span>
          ${config.showClose ? '<button class="ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"><i class="fa fa-times"></i></button>' : ''}
        `;

    // 添加到容器
    this.container.appendChild(messageEl);

    // 记录消息
    const message = {
      el: messageEl,
      timer: null
    };

    this.messages.push(message);

    // 触发动画
    setTimeout(() => {
      messageEl.classList.remove('message-enter');
      messageEl.classList.add('message-enter-active');
    }, 10);

    // 设置定时器
    if (config.duration > 0) {
      message.timer = setTimeout(() => {
        this.close(messageEl, config.onClose);
      }, config.duration);
    }

    // 关闭按钮事件
    const closeBtn = messageEl.querySelector('button');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.close(messageEl, config.onClose);
      });
    }

    return messageEl;
  }

  // 关闭消息
  close(messageEl, callback) {
    // 找到消息
    const index = this.messages.findIndex(m => m.el === messageEl);
    if (index === -1) return;

    const message = this.messages[index];

    // 清除定时器
    if (message.timer) {
      clearTimeout(message.timer);
    }

    // 触发离开动画
    messageEl.classList.remove('message-enter-active');
    messageEl.classList.add('message-exit-active');

    // 动画结束后移除元素
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }

      // 从数组中移除
      this.messages.splice(index, 1);

      // 执行回调
      if (typeof callback === 'function') {
        callback();
      }
    }, 300);
  }

  // 关闭所有消息
  closeAll() {
    this.messages.forEach(message => {
      this.close(message.el);
    });
  }

  // 快捷方法
  info(message, duration = 3000, showClose = false, onClose = null) {
    return this.create({
      message,
      type: 'info',
      duration,
      showClose,
      onClose,
      offset: 100,
    });
  }

  success(message, duration = 3000, showClose = false, onClose = null) {
    return this.create({
      message,
      type: 'success',
      duration,
      showClose,
      onClose,
      offset: 100,
    });
  }

  warning(message, duration = 3000, showClose = false, onClose = null) {
    return this.create({
      message,
      type: 'warning',
      duration,
      showClose,
      onClose,
      offset: 100,
    });
  }

  error(message, duration = 3000, showClose = false, onClose = null) {
    return this.create({
      message,
      type: 'error',
      duration,
      showClose,
      onClose,
      offset: 100,
    });
  }
}

// 注册全局消息组件
const $message = new Message();
// 暴露给全局使用
window.$message = $message;

function goUrl(targetPath) {
  // 获取当前URL的路径部分
  const currentPath = window.location.pathname;

  // 匹配语言前缀（如 /zh/ 或 /en/）
  const langMatch = currentPath.match(/^\/([a-z]{2})\//);
  const langPrefix = langMatch ? langMatch[0] : '/zh/'; // 默认使用中文

  // 处理目标路径（确保以斜杠开头）
  const normalizedTargetPath = targetPath.startsWith('/')
    ? targetPath
    : `/${targetPath}`;

  // 构建新URL（语言前缀 + 目标路径）
  const newPath = langPrefix + normalizedTargetPath.replace(/^\//, '');

  // 保留查询参数和哈希
  const search = window.location.search;
  const hash = window.location.hash;

  // 跳转到新URL
  window.location.href = newPath + search + hash;
}
