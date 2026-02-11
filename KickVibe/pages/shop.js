/**
 * Shop Page - Product Listing with Filters
 */

// Initialize dark mode
if (stateManager.isDarkMode()) {
  document.body.classList.add('dark-mode');
}

document.getElementById('darkModeToggle').addEventListener('click', () => {
  stateManager.toggleDarkMode();
  document.body.classList.toggle('dark-mode');
});

// Update cart and user nav
function updateNav() {
  const cartCount = stateManager.getCart().length;
  const cartCountEl = document.getElementById('cartCount');
  if (cartCount > 0) {
    cartCountEl.textContent = cartCount;
    cartCountEl.style.display = 'flex';
  }

  const user = stateManager.getUser();
  const adminLink = document.getElementById('adminLink');
  if (user && authManager.isAdmin(user)) {
    adminLink.style.display = 'block';
  }
}

document.getElementById('cartBtn').addEventListener('click', () => {
  window.location.href = './cart.html';
});

document.getElementById('userBtn').addEventListener('click', () => {
  const user = stateManager.getUser();
  if (user) {
    window.location.href = './profile.html';
  } else {
    window.location.href = './login.html';
  }
});

document.getElementById('wishlistBtn').addEventListener('click', () => {
  window.location.href = './wishlist.html';
});

// Category filter
document.querySelectorAll('[name="category"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    stateManager.setFilters({ category: e.target.value });
    renderProducts();
  });
});

// Search filter
document.getElementById('searchInput').addEventListener('input', debounce((e) => {
  stateManager.setFilters({ searchTerm: e.target.value });
  renderProducts();
}, 300));

// Price filter
document.getElementById('applyPriceBtn').addEventListener('click', () => {
  const min = parseFloat(document.getElementById('priceMin').value) || 0;
  const max = parseFloat(document.getElementById('priceMax').value) || 500;
  
  if (min > max) {
    stateManager.showNotification('Min price must be less than max', 'error');
    return;
  }

  stateManager.setFilters({ priceRange: { min, max } });
  renderProducts();
});

// Sort
document.getElementById('sortSelect').addEventListener('change', (e) => {
  stateManager.setFilters({ sortBy: e.target.value });
  renderProducts();
});

// Reset filters
document.getElementById('resetFiltersBtn').addEventListener('click', () => {
  stateManager.setFilters({
    searchTerm: '',
    category: 'all',
    priceRange: { min: 0, max: 500 },
    sortBy: 'newest'
  });

  // Reset form
  document.getElementById('searchInput').value = '';
  document.getElementById('priceMin').value = '0';
  document.getElementById('priceMax').value = '500';
  document.getElementById('sortSelect').value = 'newest';
  document.getElementById('cat-all').checked = true;

  renderProducts();
});

// Subscribe to state changes
stateManager.subscribe((state) => {
  updateNav();
});

/**
 * Render products based on filters
 */
function renderProducts() {
  const products = stateManager.getFilteredProducts();
  const container = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  resultsCount.textContent = `${products.length} result${products.length !== 1 ? 's' : ''} found`;

  if (products.length === 0) {
    container.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  container.innerHTML = products.map(product => `
    <div class="product-card" onclick="goToProduct(${product.id})">
      <div class="product-image">
        <img src="${getProductImage(product)}" alt="${product.name}">
        ${product.stock < 10 ? '<span class="product-badge">Limited Stock</span>' : ''}
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
        <button class="btn btn-primary btn-small" style="width: 100%; margin-top: var(--spacing-md);">
          View Details
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Go to product details page
 */
function goToProduct(productId) {
  window.location.href = `./product.html?id=${productId}`;
}

/**
 * Toggle wishlist
 */
function toggleWishlist(productId) {
  if (!isLoggedIn()) {
    stateManager.showNotification('Please login to add to wishlist', 'warning');
    window.location.href = './login.html';
    return;
  }

  const product = stateManager.getProductById(productId);
  
  if (stateManager.isInWishlist(productId)) {
    stateManager.removeFromWishlist(productId);
  } else {
    stateManager.addToWishlist(product);
  }

  renderProducts();
}

/**
 * Check URL parameters for pre-set filters
 */
function applyUrlFilters() {
  const category = getUrlParam('category');
  if (category) {
    document.getElementById(`cat-${category}`)?.click();
    stateManager.setFilters({ category });
  }
}

// Initialize
window.addEventListener('load', () => {
  updateNav();
  applyUrlFilters();
  renderProducts();
});
