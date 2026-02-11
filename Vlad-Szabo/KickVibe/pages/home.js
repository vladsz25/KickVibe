/**
 * Home Page JavaScript
 */

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  stateManager.toggleDarkMode();
  document.body.classList.toggle('dark-mode');
});

// Initialize dark mode from state
if (stateManager.isDarkMode()) {
  document.body.classList.add('dark-mode');
}

// Subscribe to state changes
stateManager.subscribe((state) => {
  updateCartCount(state.cart.length);
  updateUserNav(state.user);
});

// Update cart count
function updateCartCount(count) {
  const cartCount = document.getElementById('cartCount');
  if (count > 0) {
    cartCount.textContent = count;
    cartCount.style.display = 'flex';
  } else {
    cartCount.style.display = 'none';
  }
}

// Update user navigation
function updateUserNav(user) {
  const userBtn = document.getElementById('userBtn');
  const adminLink = document.getElementById('adminLink');

  if (user) {
    userBtn.textContent = getInitials(user.firstName, user.lastName) || 'Account';
    if (authManager.isAdmin(user)) {
      adminLink.style.display = 'block';
    }
  } else {
    userBtn.textContent = 'Account';
    adminLink.style.display = 'none';
  }
}

// Search functionality
document.getElementById('searchToggle').addEventListener('click', () => {
  const searchBar = document.getElementById('searchBar');
  searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
  if (searchBar.style.display === 'block') {
    document.getElementById('searchInput').focus();
  }
});

// Search input
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', debounce((e) => {
    const searchTerm = e.target.value.trim();
    stateManager.setFilters({ searchTerm });
    // Could navigate to shop or display results
  }, 300));
}

// Cart button
document.getElementById('cartBtn').addEventListener('click', () => {
  window.location.href = './cart.html';
});

// Wishlist button
document.getElementById('wishlistBtn').addEventListener('click', () => {
  window.location.href = './wishlist.html';
});

// User button
document.getElementById('userBtn').addEventListener('click', () => {
  const user = stateManager.getUser();
  if (user) {
    window.location.href = './profile.html';
  } else {
    window.location.href = './login.html';
  }
});

// Old user button code (unused)
// const oldUserCode = () => {
  // if (user) {
    // stateManager.showNotification('Welcome, ' + (user.firstName || 'User') + '!', 'success');
  // } else {
    stateManager.showNotification('Please login to access your profile', 'info');
  }
  // Keep user on page
});

// Newsletter form
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  if (isValidEmail(email)) {
    localStorage.setItem('newsletter_email', email);
    stateManager.showNotification('Successfully subscribed! Check your email.', 'success');
    e.target.reset();
  } else {
    stateManager.showNotification('Please enter a valid email', 'error');
  }
});

// Render featured products (first 3)
function renderFeaturedProducts() {
  const featured = stateManager.getProducts().slice(0, 3);
  const container = document.getElementById('featuredProducts');
  
  container.innerHTML = featured.map(product => `
    <div class="product-card" onclick="window.location.href='./pages/product.html?id=${product.id}'">
      <div class="product-image">
        <img src="${getProductImage(product)}" alt="${product.name}">
        <span class="product-badge">New</span>
        <button class="product-wishlist-btn ${stateManager.isInWishlist(product.id) ? 'active' : ''}" 
                onclick="event.stopPropagation(); toggleWishlist(${product.id})">
          ${stateManager.isInWishlist(product.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          ${renderStars(product.rating)}
          <span>(${product.reviews})</span>
        </div>
        <div class="product-price">${formatPrice(product.price)}</div>
      </div>
    </div>
  `).join('');
}

// Render trending products (random selection)
function renderTrendingProducts() {
  const trending = getRandomItems(stateManager.getProducts(), 8);
  const container = document.getElementById('trendingProducts');
  
  container.innerHTML = trending.map(product => `
    <div class="product-card" onclick="window.location.href='./pages/product.html?id=${product.id}'">
      <div class="product-image">
        <img src="${getProductImage(product)}" alt="${product.name}">
        <button class="product-wishlist-btn ${stateManager.isInWishlist(product.id) ? 'active' : ''}"
                onclick="event.stopPropagation(); toggleWishlist(${product.id})">
          ${stateManager.isInWishlist(product.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          ${renderStars(product.rating)}
        </div>
        <div class="product-price">${formatPrice(product.price)}</div>
      </div>
    </div>
  `).join('');
}

// Toggle wishlist
function toggleWishlist(productId) {
  if (!isLoggedIn()) {
    stateManager.showNotification('Please login to add to wishlist', 'warning');
    window.location.href = './pages/login.html';
    return;
  }

  const product = stateManager.getProductById(productId);
  
  if (stateManager.isInWishlist(productId)) {
    stateManager.removeFromWishlist(productId);
  } else {
    stateManager.addToWishlist(product);
  }
}

// Initialize
function init() {
  updateCartCount(stateManager.getCart().length);
  updateUserNav(stateManager.getUser());
  renderFeaturedProducts();
  renderTrendingProducts();
}

// Run initialization
init();
