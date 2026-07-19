
(function () {
  'use strict';
  const inPages = location.pathname.replace(/\\/g, '/').includes('/pages/');
  const ROOT = inPages ? '../' : './';

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  function active(href) {
    return href.split('/').pop() === currentPage ? ' class="active"' : '';
  }

  const SEARCH_HTML = `
<div class="search-overlay" id="searchOverlay">
  <div class="search-overlay-inner">
    <button class="search-close-btn" id="searchClose">&times;</button>
    <input type="text" id="searchInput" placeholder="Search FRGMNT..." autocomplete="off">
    <div class="search-suggestions" id="searchSuggestions"></div>
  </div>
</div>`;

  const NAV_HTML = `
<nav class="frgmnt-nav">
  <div class="container">
    <div class="nav-inner">

    <a href="${ROOT}index.html" class="nav-logo">
      <img src="${ROOT}assets/images/logo_up.png" alt="FRGMNT Logo">
    </a>

      <!-- Home dropdown -->
<div class="nav-links" id="navLinks">

  <div class="nav-menu-header">
    <span class="nav-menu-brand">FRGMNT</span>
    <span class="nav-menu-tagline">CLOTHING</span>
  </div>

  <!-- Home dropdown -->
  <div class="nav-dropdown">
    <a href="#" class="nav-dropdown-toggle${ ['about.html','story.html'].includes(currentPage) ? ' active' : '' }" data-dropdown-only="true">
      Home <i class="fas fa-chevron-down nav-chevron"></i>
    </a>

    <div class="nav-dropdown-menu">
      <a href="${ROOT}pages/about.html">About Us</a>
      <a href="${ROOT}pages/story.html">Story</a>
    </div>
  </div>

  <!-- Collection dropdown -->
  <div class="nav-dropdown">
    <a href="${ROOT}pages/collection.html" class="nav-dropdown-toggle${ ['collection.html','lookbook.html','frgmnt.html'].includes(currentPage) ? ' active' : '' }">
      Collection <i class="fas fa-chevron-down nav-chevron"></i>
    </a>

    <div class="nav-dropdown-menu">
      <a href="${ROOT}pages/lookbook.html">Lookbook</a>
      <a href="${ROOT}pages/frgmnt.html">Frgmnt</a>
    </div>
  </div>

  <a href="${ROOT}pages/shop.html"${active('shop.html')}>Shop</a>
  <a href="${ROOT}pages/wishlist.html"${active('wishlist.html')}>Wishlist</a>

</div>

      <div class="nav-actions">
        <button class="icon-btn" onclick="location.href='${ROOT}pages/cart.html'" title="Cart">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-badge" id="cartBadge" style="display:none">0</span>
        </button>
        <button class="icon-btn search-trigger" title="Search">
          <i class="fas fa-search"></i>
        </button>
        <button class="search-txt search-trigger">Search</button>
        <div id="nav-user-area" class="ms-1"></div>
        <button class="nav-hamburger" id="navHamburger">
          <i class="fas fa-bars"></i>
        </button>
      </div>

    </div>
  </div>
</nav>`;

  const CTA_HTML = `
<section class="cta-section">
  <div class="container">
    <h2 class="cta-title">Perfectly Incomplete</h2>
    <div class="cta-form">
      <input class="cta-input" type="email" placeholder="Enter Email">
      <button class="cta-btn" onclick="subscribeCTA(this)">Frgmnt.com</button>
    </div>
    <p class="cta-tagline">FRGMNT was built on the idea that nothing needs to be perfect to be real</p>
  </div>
</section>`;

  const FOOTER_HTML = `
<footer class="frgmnt-footer">
  <div class="container">
    <div class="row g-4">

      <div class="col-12 col-md-3">
        <a href="${ROOT}index.html" class="footer-logo">
          <img src="${ROOT}assets/images/logo_down.png" alt="FRGMNT Logo">
        </a>
        <p class="footer-connect">Please connect with</p>
        <div class="social-icons">
          <a href="#" class="si si-fb" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="si si-ig" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" class="si si-tk" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
        </div>
      </div>

      <div class="col-6 col-md-3">
        <h6 class="footer-col-title">Address</h6>
        <ul class="footer-list">
          <li>234/12 Hoan Kiem, Ha Noi</li>
          <li>36/14 Ha Tay, Ha Noi</li>
          <li>78/3 Dien Bien</li>
          <li>56/78 Tan Phu, Da Nang</li>
          <li>45/222 Nha Trang</li>
          <li>18/34 Tan Thang, BRVT</li>
          <li>69/39 Binh Tan, HCM</li>
          <li>56 Ninh Kieu, Can Tho</li>
          <li>78/256 Ly Thai To, LX</li>
        </ul>
      </div>

      <div class="col-6 col-md-3">
        <h6 class="footer-col-title">Produced by</h6>
        <ul class="footer-list">
          <li>Jennifer Truong</li>
          <li>Alex Do</li>
          <li>Jessica Ho</li>
          <li>Join Phan</li>
          <li>Adomai Nguyen</li>
          <li>Butter Nguyen</li>
        </ul>
      </div>

      <div class="col-12 col-md-3">
        <h6 class="footer-col-title">Contact</h6>
        <ul class="footer-list">
          <li>(+84) 0967 699 399</li>
          <li><a href="http://www.frgmnt.com" target="_blank">www.frgmnt.com</a></li>
          <li><a href="mailto:frgmnt.fashion@gmail.com">frgmnt.fashion@gmail.com</a></li>
        </ul>
      </div>

    </div>
  </div>
</footer>`;

  function inject() {
    var navEl = document.getElementById('nav-root');
    var ctaEl = document.getElementById('cta-root');
    var footerEl = document.getElementById('footer-root');

    if (navEl) navEl.innerHTML = SEARCH_HTML + NAV_HTML;
    if (ctaEl) ctaEl.innerHTML = CTA_HTML;
    if (footerEl) footerEl.innerHTML = FOOTER_HTML;

    if (!document.getElementById('globalScrollTopBtn')) {
      var stBtn = document.createElement('button');
      stBtn.id = 'globalScrollTopBtn';
      stBtn.title = 'Scroll to top';
      stBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
      stBtn.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
      document.body.appendChild(stBtn);
      window.addEventListener('scroll', function() {
        stBtn.classList.toggle('visible', window.scrollY > 250);
      });
    }

    if (!document.getElementById('globalChatBtn')) {
      var chatBtn = document.createElement('button');
      chatBtn.id = 'globalChatBtn';
      chatBtn.title = 'Chat with us';
      chatBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
      chatBtn.onclick = function() {
        alert('Chat feature coming soon!');
      };
      document.body.appendChild(chatBtn);
      window.addEventListener('scroll', function() {
        chatBtn.classList.toggle('visible', window.scrollY > 250);
      });
    }

    initDropdowns();
    initHamburger();
    initSearch();
    setActiveDropdown();
    updateCartBadge();
    updateLoginState();
  }

  function updateLoginState() {
    var area = document.getElementById('nav-user-area');
    if (!area) return;
    var user = null;
    try { user = JSON.parse(localStorage.getItem('frgmnt_user')); } catch(e) {}

    if (user && user.email) {

      var initials = user.email.charAt(0).toUpperCase();
      area.innerHTML = `
        <div class="nav-user-avatar" id="navAvatarMenu" onclick="toggleAvatarMenu(event)" title="${user.email}">
          ${initials}
          <div class="nav-avatar-dropdown" id="navAvatarDropdown">
            <span class="nav-avatar-email">${user.email}</span>
            <button onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </div>`;
    } else {
      area.innerHTML = `<a href="${ROOT}pages/login.html" class="btn-nav-login">Login</a>`;
    }
  }

  window.toggleAvatarMenu = function(e) {
    e.stopPropagation();
    var dd = document.getElementById('navAvatarDropdown');
    if (dd) dd.classList.toggle('open');
    document.addEventListener('click', function closeDd() {
      if (dd) dd.classList.remove('open');
      document.removeEventListener('click', closeDd);
    });
  };

  window.logoutUser = function() {
    localStorage.removeItem('frgmnt_user');
    updateLoginState();
    if (typeof toast === 'function') toast('Logged out successfully.');
  };

  function initDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(function (drop) {
      var toggle = drop.querySelector('.nav-dropdown-toggle');
      var menu = drop.querySelector('.nav-dropdown-menu');
      if (!toggle || !menu) return;

      toggle.addEventListener('click', function (e) {
        var dropdownOnly = toggle.getAttribute('data-dropdown-only') === 'true';

        var hamburger = document.getElementById('navHamburger');
        if (!hamburger || getComputedStyle(hamburger).display === 'none') {
          if (dropdownOnly) e.preventDefault();
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        var isOpen = drop.classList.contains('open');

        if (isOpen) {
          if (dropdownOnly) {
            drop.classList.remove('open');
            menu.classList.remove('open');
            var homeChevron = toggle.querySelector('.nav-chevron');
            if (homeChevron) homeChevron.style.transform = '';
            return;
          }
          var href = toggle.getAttribute('href');
          if (href) window.location.href = href;
          return;
        }

        document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
          d.classList.remove('open');
          var m = d.querySelector('.nav-dropdown-menu');
          if (m) m.classList.remove('open');
          var ch = d.querySelector('.nav-chevron');
          if (ch) ch.style.transform = '';
        });

        if (!isOpen) {
          drop.classList.add('open');
          menu.classList.add('open');
          var chevron = toggle.querySelector('.nav-chevron');
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

  function initHamburger() {
    var btn = document.getElementById('navHamburger');
    var links = document.getElementById('navLinks');
    if (!btn || !links) return;

    function closeMenu() {
      links.classList.remove('open');
      btn.classList.remove('menu-open');
      btn.innerHTML = '<i class="fas fa-bars"></i>';

      document.querySelectorAll('.nav-dropdown.open').forEach(function(d) {
        d.classList.remove('open');
        var m = d.querySelector('.nav-dropdown-menu');
        if (m) m.classList.remove('open');
        var ch = d.querySelector('.nav-chevron');
        if (ch) ch.style.transform = '';
      });
    }

    function openMenu() {
      links.classList.add('open');
      btn.classList.add('menu-open');
      btn.innerHTML = '<i class="fas fa-times"></i>';
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      links.classList.contains('open') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', function(e) {
      if (!links.contains(e.target) && e.target !== btn) {
        closeMenu();
      }
    });

    setTimeout(function() {
      links.querySelectorAll('.nav-dropdown-menu a').forEach(function(a) {
        a.addEventListener('click', closeMenu);
      });
      links.querySelectorAll(':scope > a:not(.nav-dropdown-toggle)').forEach(function(a) {
        a.addEventListener('click', closeMenu);
      });
    }, 100);
  }



  var SEARCH_PRODUCTS = [
    { id: 'p01', name: 'FORM TANK',     sub: 'In 5 colors', price: 50,  img: ROOT + 'assets/images/shop/product/FORM_TANK.png' },
    { id: 'p02', name: 'TETHER VEST',   sub: 'In 5 colors', price: 50,  img: ROOT + 'assets/images/shop/product/TETHER_VEST.png' },
    { id: 'p03', name: 'ROUGE BLOUSE',  sub: 'In 5 colors', price: 50,  img: ROOT + 'assets/images/shop/product/ROUGE_BLOUSE.png' },
    { id: 'p04', name: 'ECHO SHIRT',    sub: 'In 5 colors', price: 100, img: ROOT + 'assets/images/shop/product/ECHO_SHIRT.png' },
    { id: 'p05', name: 'SHADOW KNIT',   sub: 'In 5 colors', price: 100, img: ROOT + 'assets/images/shop/product/SHADOW_KNIT.png' },
    { id: 'p06', name: 'MOTION BLOUSE', sub: 'In 5 colors', price: 100, img: ROOT + 'assets/images/shop/product/MOTION_BLOUSE.jpg' },
    { id: 'p07', name: 'OBLIQUE DRESS', sub: 'In 5 colors', price: 150, img: ROOT + 'assets/images/shop/product/OBLIQUE_DRESS.jpg' },
    { id: 'p08', name: 'AURA DRESS',    sub: 'In 5 colors', price: 150, img: ROOT + 'assets/images/shop/product/AURA_DRESS.png' },
    { id: 'p09', name: 'VEIL DRESS',    sub: 'In 5 colors', price: 150, img: ROOT + 'assets/images/shop/product/VEIL_DRESS.png' },
    { id: 'p10', name: 'DRIFT JACKET',  sub: 'In 5 colors', price: 200, img: ROOT + 'assets/images/shop/product/DRIFT_JACKET.jpg' },
    { id: 'p11', name: 'CORE BOMBER',   sub: 'In 5 colors', price: 200, img: ROOT + 'assets/images/shop/product/CORE_BOMBER.png' },
    { id: 'p12', name: 'RIVET JACKET',  sub: 'In 5 colors', price: 200, img: ROOT + 'assets/images/shop/product/RIVET_JACKET.png' },
  ];

  function initSearch() {
    var overlay = document.getElementById('searchOverlay');
    var closeBtn = document.getElementById('searchClose');
    var searchInput = document.getElementById('searchInput');
    var suggestions = document.getElementById('searchSuggestions');
    if (!overlay) return;

    document.querySelectorAll('.search-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        overlay.classList.add('open');
        if (searchInput) { searchInput.focus(); searchInput.value = ''; }
        renderSuggestions('');
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', function () { overlay.classList.remove('open'); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') overlay.classList.remove('open'); });

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        renderSuggestions(this.value.trim());
      });
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          var q = this.value.trim();
          var shopUrl = ROOT + 'pages/shop.html';
          if (q) {
            var match = SEARCH_PRODUCTS.find(function(p) {
              return p.name.toLowerCase().includes(q.toLowerCase());
            });
            if (match) window.location.href = shopUrl + '#' + match.id;
            else window.location.href = shopUrl;
          } else {
            window.location.href = shopUrl + '#p01';
          }
          overlay.classList.remove('open');
        }
      });
    }

    function renderSuggestions(q) {
      if (!suggestions) return;
      var list = q
        ? SEARCH_PRODUCTS.filter(function(p) { return p.name.toLowerCase().includes(q.toLowerCase()); })
        : SEARCH_PRODUCTS.slice(0, 5);

      if (!list.length) {
        suggestions.innerHTML = '<div class="search-no-result">No products found</div>';
        suggestions.classList.add('open');
        return;
      }

      suggestions.innerHTML = list.map(function(p) {
        var shopUrl = ROOT + 'pages/shop.html#' + p.id;
        return '<a href="' + shopUrl + '" class="search-suggestion-item" onclick="document.getElementById(\'searchOverlay\').classList.remove(\'open\')">' +
          '<img src="' + p.img + '" alt="' + p.name + '">' +
          '<div class="search-sug-info">' +
            '<span class="search-sug-name">' + p.name + '</span>' +
            '<span class="search-sug-sub">' + p.sub + ' · $' + p.price + '</span>' +
          '</div>' +
          '<i class="fas fa-arrow-right search-sug-arrow"></i>' +
        '</a>';
      }).join('');
      suggestions.classList.add('open');
    }
  }

  function setActiveDropdown() {
    var dropPages = ['collection.html', 'lookbook.html', 'frgmnt.html'];
    if (dropPages.includes(currentPage)) {
      var toggles = document.querySelectorAll('.nav-dropdown-toggle');

      if (toggles[1]) toggles[1].classList.add('active');
    }
  }

  window.subscribeCTA = function (btn) {
    var input = btn.previousElementSibling;
    if (input && input.value && input.value.includes('@')) {
      toast('Subscribed successfully!');
      input.value = '';
    } else {
      toast('Please enter a valid email address.');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
