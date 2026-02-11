/**
 * Global State Management for KickVibe
 * Handles cart, wishlist, user data, and products
 * Cache version: 2026-01-18-v3-new-images
 */

class StateManager {
  constructor() {
    this.state = {
      user: null,
      cart: [],
      wishlist: [],
      products: [],
      orders: [],
      filters: {
        searchTerm: '',
        category: 'all',
        priceRange: { min: 0, max: 500 },
        sortBy: 'newest'
      },
      darkMode: false,
      notifications: []
    };

    this.listeners = [];
    this.initializeState();
  }

  /**
   * Initialize state from localStorage
   */
  initializeState() {
    const savedUser = localStorage.getItem('kickvibe_user');
    const savedCart = localStorage.getItem('kickvibe_cart');
    const savedWishlist = localStorage.getItem('kickvibe_wishlist');
    const savedOrders = localStorage.getItem('kickvibe_orders');
    const savedDarkMode = localStorage.getItem('kickvibe_darkMode');

    if (savedUser) this.state.user = JSON.parse(savedUser);
    if (savedCart) this.state.cart = JSON.parse(savedCart);
    if (savedWishlist) this.state.wishlist = JSON.parse(savedWishlist);
    if (savedOrders) this.state.orders = JSON.parse(savedOrders);
    if (savedDarkMode) this.state.darkMode = JSON.parse(savedDarkMode);

    // Always load fresh products from code (not from localStorage cache)
    // This ensures product updates are immediately visible
    this.loadInitialProducts();
    
    // Also clear old product cache to prevent stale data
    localStorage.removeItem('kickvibe_products');
  }

  /**
   * Load initial product data
   */
  loadInitialProducts() {
    const initialProducts = [
      {
        id: 1,
        name: 'Air Velocity Pro',
        category: 'running',
        price: 129.99,
        image: '/assets/images/run1.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 45,
        description: 'Lightweight running shoe with responsive cushioning',
        rating: 4.8,
        reviews: 234,
        specs: { weight: '220g', drop: '10mm', cushioning: 'React' }
      },
      {
        id: 2,
        name: 'Court Master Elite',
        category: 'basketball',
        price: 159.99,
        image: '/assets/images/basket1.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 32,
        description: 'High-performance basketball shoe with superior ankle support',
        rating: 4.9,
        reviews: 189,
        specs: { weight: '320g', drop: '9.5mm', cushioning: 'Air Max' }
      },
      {
        id: 3,
        name: 'Street Casual Classic',
        category: 'casual',
        price: 89.99,
        image: '/assets/images/casual1.jpg',
        sizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 78,
        description: 'Versatile casual sneaker for everyday wear',
        rating: 4.6,
        reviews: 456,
        specs: { weight: '250g', drop: '12mm', cushioning: 'EVA' }
      },
      {
        id: 4,
        name: 'Trail Blazer X',
        category: 'running',
        price: 149.99,
        image: '/assets/images/run2.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 28,
        description: 'All-terrain running shoe with aggressive tread',
        rating: 4.7,
        reviews: 123,
        specs: { weight: '280g', drop: '8mm', cushioning: 'Trail+ ' }
      },
      {
        id: 5,
        name: 'Sky Walker 360',
        category: 'basketball',
        price: 179.99,
        image: '/assets/images/basket2.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 19,
        description: 'Premium basketball shoe with 360-degree support',
        rating: 5.0,
        reviews: 98,
        specs: { weight: '310g', drop: '10mm', cushioning: 'Ultra Boost' }
      },
      {
        id: 6,
        name: 'Urban Flex',
        category: 'casual',
        price: 79.99,
        image: '/assets/images/casual2.jpg',
        sizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 95,
        description: 'Flexible everyday sneaker with modern design',
        rating: 4.5,
        reviews: 312,
        specs: { weight: '240g', drop: '13mm', cushioning: 'Flex' }
      },
      {
        id: 7,
        name: 'Lightning Dash Pro',
        category: 'running',
        price: 139.99,
        image: '/assets/images/run3.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 52,
        description: 'Speed-focused running shoe with aerodynamic design',
        rating: 4.9,
        reviews: 287,
        specs: { weight: '210g', drop: '9mm', cushioning: 'Speed Foam' }
      },
      {
        id: 8,
        name: 'Power Slam Dunk',
        category: 'basketball',
        price: 189.99,
        image: '/assets/images/basket3.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 24,
        description: 'Explosive basketball shoe designed for high jumpers',
        rating: 4.8,
        reviews: 156,
        specs: { weight: '315g', drop: '10.5mm', cushioning: 'Boost Max' }
      },
      {
        id: 9,
        name: 'Chill Vibes Low',
        category: 'casual',
        price: 69.99,
        image: '/assets/images/casual3.jpg',
        sizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 112,
        description: 'Relaxed casual sneaker with sleek minimalist design',
        rating: 4.4,
        reviews: 389,
        specs: { weight: '235g', drop: '14mm', cushioning: 'Soft EVA' }
      },
      {
        id: 10,
        name: 'Fire Runner',
        category: 'running',
        price: 144.99,
        image: '/assets/images/run4.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 38,
        description: 'Intense performance running shoe for marathons',
        rating: 4.7,
        reviews: 201,
        specs: { weight: '225g', drop: '10.5mm', cushioning: 'Thermal Boost' }
      },
      {
        id: 11,
        name: 'Ice Breaker Court',
        category: 'basketball',
        price: 169.99,
        image: '/assets/images/basket4.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 27,
        description: 'Cool-performance basketball shoe with temperature control',
        rating: 4.6,
        reviews: 142,
        specs: { weight: '318g', drop: '9mm', cushioning: 'Cool Gel' }
      },
      {
        id: 12,
        name: 'Golden Hour',
        category: 'casual',
        price: 99.99,
        image: '/assets/images/casual4.jpg',
        sizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 61,
        description: 'Stylish casual sneaker perfect for evening outings',
        rating: 4.7,
        reviews: 278,
        specs: { weight: '245g', drop: '12.5mm', cushioning: 'Premium EVA' }
      },
      {
        id: 13,
        name: 'Storm Chase',
        category: 'running',
        price: 154.99,
        image: '/assets/images/run5.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 33,
        description: 'Weather-resistant running shoe for any condition',
        rating: 4.8,
        reviews: 219,
        specs: { weight: '250g', drop: '8.5mm', cushioning: 'All-Weather Foam' }
      },
      {
        id: 14,
        name: 'Phantom Guard',
        category: 'basketball',
        price: 199.99,
        image: '/assets/images/basket5.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 15,
        description: 'Legendary basketball shoe with stealth technology',
        rating: 5.0,
        reviews: 87,
        specs: { weight: '312g', drop: '10mm', cushioning: 'Phantom Foam' }
      },
      {
        id: 15,
        name: 'Sonic Velocity',
        category: 'running',
        price: 159.99,
        image: '/assets/images/run6.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 44,
        description: 'Ultra-fast running shoe with turbo acceleration tech',
        rating: 4.9,
        reviews: 267,
        specs: { weight: '215g', drop: '9.5mm', cushioning: 'Sonic Boost' }
      },
      {
        id: 16,
        name: 'Dunk Master 2K',
        category: 'basketball',
        price: 179.99,
        image: '/assets/images/basket6.jpg',
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 29,
        description: 'Professional dunking shoe with precision landing system',
        rating: 4.7,
        reviews: 128,
        specs: { weight: '320g', drop: '9.5mm', cushioning: 'Precision Foam' }
      },
      {
        id: 17,
        name: 'Vintage Paradise',
        category: 'casual',
        price: 74.99,
        image: '/assets/images/casual5.jpg',
        sizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 88,
        description: 'Retro-inspired casual sneaker with timeless style',
        rating: 4.5,
        reviews: 345,
        specs: { weight: '240g', drop: '13mm', cushioning: 'Retro Comfort' }
      },
      {
        id: 20,
        name: 'Sunset Stroll',
        category: 'casual',
        price: 84.99,
        image: '/assets/images/casual6.jpg',
        sizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
        stock: 74,
        description: 'Comfortable casual shoe perfect for evening walks',
        rating: 4.6,
        reviews: 298,
        specs: { weight: '242g', drop: '12mm', cushioning: 'Sunset Cushion' }
      },

    ];

    this.state.products = initialProducts;
    this.saveToLocalStorage('kickvibe_products', this.state.products);
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Save to localStorage
   */
  saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // ============ USER MANAGEMENT ============

  /**
   * Set logged-in user
   */
  setUser(user) {
    this.state.user = user;
    this.saveToLocalStorage('kickvibe_user', user);
    this.notifyListeners();
  }

  /**
   * Get current user
   */
  getUser() {
    return this.state.user;
  }

  /**
   * Logout user
   */
  logout() {
    this.state.user = null;
    this.state.cart = [];
    this.state.wishlist = [];
    localStorage.removeItem('kickvibe_user');
    this.saveToLocalStorage('kickvibe_cart', []);
    this.saveToLocalStorage('kickvibe_wishlist', []);
    this.notifyListeners();
  }

  // ============ CART MANAGEMENT ============

  /**
   * Add item to cart
   */
  addToCart(product, size, quantity = 1) {
    const existingItem = this.state.cart.find(
      item => item.id === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      console.log(`Updated quantity for ${product.name}: ${quantity}`);
    } else {
      this.state.cart.push({
        ...product,
        size,
        quantity,
        cartItemId: Date.now()
      });
      console.log(`Added to cart: ${product.name} (Size: ${size}, Qty: ${quantity})`);
    }

    console.log(`Cart now has ${this.state.cart.length} items`);
    this.saveToLocalStorage('kickvibe_cart', this.state.cart);
    this.showNotification(`${product.name} added to cart!`, 'success');
    this.notifyListeners();
  }

  /**
   * Remove item from cart
   */
  removeFromCart(cartItemId) {
    this.state.cart = this.state.cart.filter(item => item.cartItemId !== cartItemId);
    this.saveToLocalStorage('kickvibe_cart', this.state.cart);
    this.notifyListeners();
  }

  /**
   * Update cart item quantity
   */
  updateCartQuantity(cartItemId, quantity) {
    const item = this.state.cart.find(item => item.cartItemId === cartItemId);
    if (item) {
      item.quantity = quantity;
      this.saveToLocalStorage('kickvibe_cart', this.state.cart);
      this.notifyListeners();
    }
  }

  /**
   * Get cart total
   */
  getCartTotal() {
    return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Clear cart
   */
  clearCart() {
    this.state.cart = [];
    this.saveToLocalStorage('kickvibe_cart', []);
    this.notifyListeners();
  }

  /**
   * Get cart items
   */
  getCart() {
    return this.state.cart;
  }

  // ============ WISHLIST MANAGEMENT ============

  /**
   * Add to wishlist
   */
  addToWishlist(product) {
    if (!this.state.wishlist.find(item => item.id === product.id)) {
      this.state.wishlist.push(product);
      this.saveToLocalStorage('kickvibe_wishlist', this.state.wishlist);
      this.showNotification(`${product.name} added to wishlist!`, 'success');
      this.notifyListeners();
    }
  }

  /**
   * Remove from wishlist
   */
  removeFromWishlist(productId) {
    this.state.wishlist = this.state.wishlist.filter(item => item.id !== productId);
    this.saveToLocalStorage('kickvibe_wishlist', this.state.wishlist);
    this.notifyListeners();
  }

  /**
   * Get wishlist
   */
  getWishlist() {
    return this.state.wishlist;
  }

  /**
   * Check if product is in wishlist
   */
  isInWishlist(productId) {
    return this.state.wishlist.some(item => item.id === productId);
  }

  // ============ PRODUCT MANAGEMENT ============

  /**
   * Get all products
   */
  getProducts() {
    return this.state.products;
  }

  /**
   * Get product by ID
   */
  getProductById(id) {
    return this.state.products.find(product => product.id === id);
  }

  /**
   * Create new product (admin)
   */
  createProduct(product) {
    const newProduct = {
      ...product,
      id: Math.max(...this.state.products.map(p => p.id), 0) + 1,
      rating: 0,
      reviews: 0
    };
    this.state.products.push(newProduct);
    this.saveToLocalStorage('kickvibe_products', this.state.products);
    this.showNotification('Product created successfully!', 'success');
    this.notifyListeners();
    return newProduct;
  }

  /**
   * Update product (admin)
   */
  updateProduct(id, updates) {
    const product = this.state.products.find(p => p.id === id);
    if (product) {
      Object.assign(product, updates);
      this.saveToLocalStorage('kickvibe_products', this.state.products);
      this.showNotification('Product updated successfully!', 'success');
      this.notifyListeners();
    }
  }

  /**
   * Delete product (admin)
   */
  deleteProduct(id) {
    this.state.products = this.state.products.filter(p => p.id !== id);
    this.saveToLocalStorage('kickvibe_products', this.state.products);
    this.showNotification('Product deleted successfully!', 'success');
    this.notifyListeners();
  }

  /**
   * Get filtered and sorted products
   */
  getFilteredProducts() {
    let filtered = this.state.products;

    // Search filter
    if (this.state.filters.searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.state.filters.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (this.state.filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === this.state.filters.category);
    }

    // Price filter
    filtered = filtered.filter(p =>
      p.price >= this.state.filters.priceRange.min &&
      p.price <= this.state.filters.priceRange.max
    );

    // Sorting
    switch (this.state.filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }

  // ============ FILTERS ============

  /**
   * Update filters
   */
  setFilters(filters) {
    this.state.filters = { ...this.state.filters, ...filters };
    this.notifyListeners();
  }

  /**
   * Get filters
   */
  getFilters() {
    return this.state.filters;
  }

  // ============ ORDERS ============

  /**
   * Create order from cart
   */
  createOrder(orderData) {
    const order = {
      id: Math.max(...this.state.orders.map(o => o.id || 0), 0) + 1,
      ...orderData,
      items: [...this.state.cart],
      total: this.getCartTotal(),
      date: new Date().toISOString(),
      status: 'pending'
    };

    this.state.orders.push(order);
    this.saveToLocalStorage('kickvibe_orders', this.state.orders);
    this.clearCart();
    this.showNotification('Order placed successfully!', 'success');
    this.notifyListeners();
    return order;
  }

  /**
   * Get user orders
   */
  getUserOrders() {
    if (!this.state.user) return [];
    return this.state.orders.filter(order => order.userId === this.state.user.id);
  }

  /**
   * Get all orders (admin)
   */
  getAllOrders() {
    return this.state.orders;
  }

  // ============ NOTIFICATIONS ============

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: Date.now()
    };

    this.state.notifications.push(notification);
    this.notifyListeners();

    // Auto-remove after 3 seconds
    setTimeout(() => {
      this.state.notifications = this.state.notifications.filter(
        n => n.id !== notification.id
      );
      this.notifyListeners();
    }, 3000);
  }

  /**
   * Get notifications
   */
  getNotifications() {
    return this.state.notifications;
  }

  // ============ THEME ============

  /**
   * Toggle dark mode
   */
  toggleDarkMode() {
    this.state.darkMode = !this.state.darkMode;
    this.saveToLocalStorage('kickvibe_darkMode', this.state.darkMode);
    this.notifyListeners();
  }

  /**
   * Get dark mode state
   */
  isDarkMode() {
    return this.state.darkMode;
  }

  // ============ ANALYTICS ============

  /**
   * Get sales statistics
   */
  getSalesStats() {
    const totalRevenue = this.state.orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = this.state.orders.length;
    const totalProducts = this.state.products.length;

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
    };
  }

  /**
   * Get top products by views (based on order frequency)
   */
  getTopProducts() {
    const productViews = {};

    this.state.orders.forEach(order => {
      order.items.forEach(item => {
        productViews[item.id] = (productViews[item.id] || 0) + item.quantity;
      });
    });

    return Object.entries(productViews)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, views]) => ({
        product: this.getProductById(parseInt(id)),
        views
      }));
  }
}

// Create global state instance
const stateManager = new StateManager();
