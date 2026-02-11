/**
 * Admin Dashboard JavaScript
 */

// Check admin access
if (!requireAdmin()) {
  window.location.href = '../index.html';
}

let editingProductId = null;
let revenueChart = null;
let topProductsChart = null;
let inventoryChart = null;
let categoryChart = null;

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
  stateManager.logout();
  window.location.href = '../index.html';
});

// Tab switching
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active from all links
  document.querySelectorAll('.admin-nav-link').forEach(link => {
    link.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');

  // Render tab content
  if (tabName === 'dashboard') {
    renderDashboard();
  } else if (tabName === 'products') {
    renderProductsTable();
  } else if (tabName === 'orders') {
    renderOrdersTable();
  } else if (tabName === 'users') {
    renderUsersTable();
  } else if (tabName === 'analytics') {
    renderAnalytics();
  }
}

/**
 * Render Dashboard
 */
function renderDashboard() {
  const stats = stateManager.getSalesStats();
  
  document.getElementById('totalRevenue').textContent = formatPrice(stats.totalRevenue);
  document.getElementById('totalOrders').textContent = stats.totalOrders;
  document.getElementById('totalProducts').textContent = stats.totalProducts;
  document.getElementById('avgOrder').textContent = formatPrice(stats.averageOrderValue);

  // Revenue Chart
  const orders = stateManager.getAllOrders();
  const last7Days = getLast7Days();
  const dailyRevenue = last7Days.map(date => {
    const dayOrders = orders.filter(o => new Date(o.date).toDateString() === date.toDateString());
    return dayOrders.reduce((sum, o) => sum + o.total, 0);
  });

  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  if (revenueChart) revenueChart.destroy();
  revenueChart = new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: last7Days.map(d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [{
        label: 'Revenue ($)',
        data: dailyRevenue,
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Top Products Chart
  const topProducts = stateManager.getTopProducts();
  const topProductsCtx = document.getElementById('topProductsChart').getContext('2d');
  if (topProductsChart) topProductsChart.destroy();
  topProductsChart = new Chart(topProductsCtx, {
    type: 'bar',
    data: {
      labels: topProducts.map(p => p.product.name),
      datasets: [{
        label: 'Units Sold',
        data: topProducts.map(p => p.views),
        backgroundColor: '#004E89'
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { beginAtZero: true }
      }
    }
  });
}

/**
 * Render Products Table
 */
function renderProductsTable() {
  const products = stateManager.getProducts();
  const tbody = document.getElementById('productsTableBody');

  tbody.innerHTML = products.map(product => `
    <tr>
      <td>${product.name}</td>
      <td><span style="background-color: var(--light); padding: 4px 8px; border-radius: 4px;">${product.category}</span></td>
      <td>${formatPrice(product.price)}</td>
      <td>${product.stock} units</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-small btn-outline" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn btn-small btn-outline" style="color: var(--danger);" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/**
 * Render Orders Table
 */
function renderOrdersTable() {
  const orders = stateManager.getAllOrders();
  const tbody = document.getElementById('ordersTableBody');

  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>#${order.id}</td>
      <td>${order.shippingInfo.firstName} ${order.shippingInfo.lastName}</td>
      <td>${order.items.length} item(s)</td>
      <td>${formatPrice(order.total)}</td>
      <td><span style="background-color: var(--light); padding: 4px 8px; border-radius: 4px;">${order.status}</span></td>
      <td>${formatDate(order.date)}</td>
    </tr>
  `).join('');
}

/**
 * Render Users Table
 */
function renderUsersTable() {
  const users = authManager.getAllUsers();
  const tbody = document.getElementById('usersTableBody');

  tbody.innerHTML = users.map(user => `
    <tr>
      <td>${user.email}</td>
      <td>${user.firstName} ${user.lastName}</td>
      <td><span style="background-color: ${user.role === 'admin' ? 'var(--danger)' : 'var(--info)'}; color: white; padding: 4px 8px; border-radius: 4px;">${user.role}</span></td>
      <td>${formatDate(user.createdAt)}</td>
    </tr>
  `).join('');
}

/**
 * Render Analytics
 */
function renderAnalytics() {
  // Inventory Chart
  const products = stateManager.getProducts();
  const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
  if (inventoryChart) inventoryChart.destroy();
  inventoryChart = new Chart(inventoryCtx, {
    type: 'bar',
    data: {
      labels: products.slice(0, 6).map(p => p.name),
      datasets: [{
        label: 'Stock Level',
        data: products.slice(0, 6).map(p => p.stock),
        backgroundColor: products.slice(0, 6).map(p => p.stock > 20 ? '#28a745' : p.stock > 10 ? '#ffc107' : '#dc3545')
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Category Sales Chart
  const orders = stateManager.getAllOrders();
  const categorySales = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      const category = item.category;
      categorySales[category] = (categorySales[category] || 0) + item.quantity;
    });
  });

  const categoryCtx = document.getElementById('categoryChart').getContext('2d');
  if (categoryChart) categoryChart.destroy();
  categoryChart = new Chart(categoryCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categorySales),
      datasets: [{
        data: Object.values(categorySales),
        backgroundColor: ['#FF6B35', '#004E89', '#F7B801']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

/**
 * Open Add Product Form
 */
function openAddProductForm() {
  editingProductId = null;
  document.getElementById('formTitle').textContent = 'Add New Product';
  document.getElementById('productForm').reset();
  document.getElementById('productFormContainer').style.display = 'block';
  document.getElementById('productForm').onsubmit = handleAddProduct;
}

/**
 * Close Product Form
 */
function closeProductForm() {
  document.getElementById('productFormContainer').style.display = 'none';
  editingProductId = null;
}

/**
 * Edit Product
 */
function editProduct(productId) {
  const product = stateManager.getProductById(productId);
  if (!product) return;

  editingProductId = productId;
  document.getElementById('formTitle').textContent = 'Edit Product';

  const form = document.getElementById('productForm');
  form.querySelector('[name="name"]').value = product.name;
  form.querySelector('[name="price"]').value = product.price;
  form.querySelector('[name="category"]').value = product.category;
  form.querySelector('[name="stock"]').value = product.stock;
  form.querySelector('[name="description"]').value = product.description;
  form.querySelector('[name="sizes"]').value = product.sizes.join(',');
  form.querySelector('[name="weight"]').value = product.specs.weight;
  form.querySelector('[name="drop"]').value = product.specs.drop;
  form.querySelector('[name="cushioning"]').value = product.specs.cushioning;

  document.getElementById('productFormContainer').style.display = 'block';
  form.onsubmit = handleUpdateProduct;
  window.scrollTo(0, 0);
}

/**
 * Handle Add Product
 */
function handleAddProduct(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    stateManager.createProduct({
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      category: formData.get('category'),
      stock: parseInt(formData.get('stock')),
      description: formData.get('description'),
      sizes: formData.get('sizes').split(',').map(s => s.trim()),
      image: '/assets/images/shoe-placeholder.jpg',
      specs: {
        weight: formData.get('weight'),
        drop: formData.get('drop'),
        cushioning: formData.get('cushioning')
      }
    });

    closeProductForm();
    renderProductsTable();
  } catch (error) {
    stateManager.showNotification(error.message, 'error');
  }
}

/**
 * Handle Update Product
 */
function handleUpdateProduct(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    stateManager.updateProduct(editingProductId, {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      category: formData.get('category'),
      stock: parseInt(formData.get('stock')),
      description: formData.get('description'),
      sizes: formData.get('sizes').split(',').map(s => s.trim()),
      specs: {
        weight: formData.get('weight'),
        drop: formData.get('drop'),
        cushioning: formData.get('cushioning')
      }
    });

    closeProductForm();
    renderProductsTable();
  } catch (error) {
    stateManager.showNotification(error.message, 'error');
  }
}

/**
 * Delete Product
 */
function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    stateManager.deleteProduct(productId);
    renderProductsTable();
  }
}

/**
 * Get last 7 days
 */
function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date);
  }
  return days;
}

// Initialize
window.addEventListener('load', () => {
  renderDashboard();
});
