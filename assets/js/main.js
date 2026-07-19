
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  setActiveNav();
  initScrollAnimations();
});

let cart = JSON.parse(localStorage.getItem('frgmnt_cart') || '[]');

function saveCart() {
  localStorage.setItem('frgmnt_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const total = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function addToCart(id, name, price, image, size = 'M', color = 'Default') {
  const key = `${id}_${size}_${color}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, id, name, price, image, size, color, qty: 1 });
  }
  saveCart();
  toast(`"${name}" added to cart!`);
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
}

function getCartTotal() {
  return cart.reduce((s, i) => s + (i.price * i.qty), 0);
}

let wishlist = JSON.parse(localStorage.getItem('frgmnt_wishlist') || '[]');

function saveWishlist() {
  localStorage.setItem('frgmnt_wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(id, name, price, image) {
  const idx = wishlist.findIndex(i => i.id === id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    toast(`"${name}" removed from wishlist`);
  } else {
    wishlist.push({ id, name, price, image });
    toast(`"${name}" added to wishlist!`);
  }
  saveWishlist();
  const btn = document.querySelector(`[data-wishlist="${id}"]`);
  if (btn) {
    const inWL = wishlist.some(i => i.id === id);
    btn.style.color = inWL ? '#8B0000' : '';
    btn.innerHTML = inWL ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
  }
}

function isInWishlist(id) {
  return wishlist.some(i => i.id === id);
}

function toast(msg) {
  let el = document.getElementById('frgmnt-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'frgmnt-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.transform = 'translateY(0)';
  el.style.opacity = '1';
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.style.transform = 'translateY(20px)';
    el.style.opacity = '0';
  }, 2800);
}

function initNavbar() {
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.innerHTML = navLinks.classList.contains('open')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }
  updateCartBadge();
}

function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const linkPage = (a.getAttribute('href') || '').split('/').pop();
    if (linkPage === page) a.classList.add('active');
  });
}

function initSearch() {
  const overlay  = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('searchClose');
  const triggers = document.querySelectorAll('.search-trigger');
  if (!overlay) return;
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('open');
      overlay.querySelector('input')?.focus();
    });
  });
  closeBtn?.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.classList.remove('open'); });
}

function initCart() { updateCartBadge(); }

function initScrollAnimations() {
  const els = document.querySelectorAll('[data-anim]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('anim-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}
