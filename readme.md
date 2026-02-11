# KickVibe - Premium Sneaker E-Commerce Platform

## 🎯 Key Features

### ✅ User Authentication
- **Sign Up & Register**: New user account creation with validation
- **Login System**: Secure authentication with simulated password hashing
- **Session Management**: Persistent user sessions via localStorage
- **Role-Based Access**: Admin and Customer role separation
- **Auth Guards**: Protected pages requiring authentication

### ✅ Product Management (Admin)
- **CRUD Operations**: Create, Read, Update, Delete sneakers
- **Product Details**: Name, price, category, sizes, stock, description, specs
- **Image Support**: Product image management
- **Category Management**: Running, Basketball, Casual categories
- **Inventory Tracking**: Real-time stock levels

### ✅ Shopping Experience
- **Product Catalog**: Grid display with hover effects
- **Search Functionality**: Real-time search by product name
- **Advanced Filtering**: By category, price range
- **Sorting Options**: By newest, price (low/high), rating
- **Product Details Page**: Large images, size selection, specs display
- **Add to Cart**: Smooth shopping cart management
- **Wishlist**: Save favorite products (login required)
- **Shopping Cart**: Update quantities, remove items, calculate totals
- **Checkout**: Multi-step checkout with form validation

### ✅ Admin Dashboard
- **Sales Analytics**: Revenue charts, order metrics
- **Top Products**: Visual representation of best-selling items
- **Inventory Dashboard**: Stock level visualization
- **Product Management**: Full CRUD interface
- **Order Management**: View all customer orders
- **User Management**: View registered customers
- **Data Visualization**: Chart.js integration for visual analytics

### ✅ State Management
- **Global State**: Centralized state management for cart, wishlist, products
- **localStorage Persistence**: All data stored locally
- **Subscriber Pattern**: Real-time updates across components
- **Product Data**: Full product catalog with filtering
- **User Management**: Authentication and profile data

### ✅ User Accounts
- **Profile Management**: Update personal information
- **Order History**: View past purchases with details
- **Address Management**: Shipping address storage
- **Account Settings**: Email preferences, security options

### ✅ Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Tablet Support**: Full functionality on tablets
- **Desktop Experience**: Premium desktop interface
- **Smooth Animations**: CSS transitions and JS effects
- **Loading States**: Visual feedback for user actions

### ✅ Form Handling
- **Validation**: Client-side validation for all forms
- **Error Messages**: Clear, helpful error displays
- **Success Notifications**: Toast notifications for actions
- **Data Persistence**: Forms save to localStorage
- **Auto-fill**: Smart form population from user data

### ✅ Additional Features
- **Dark Mode**: Toggle between light and dark themes
- **Toast Notifications**: System-wide notification system
- **Lazy Loading**: Image lazy loading support
- **Keyboard Accessibility**: Full keyboard navigation
- **Search Optimization**: Debounced search for performance

## 📁 Project Structure

```
KickVibe/
├── index.html                      # Home page
├── css/
│   └── main.css                   # Global styles (1000+ lines)
├── js/
│   ├── state.js                   # State management (500+ lines)
│   ├── auth.js                    # Authentication system (300+ lines)
│   └── utils.js                   # Utility functions (400+ lines)
├── pages/
│   ├── home.js                    # Home page logic
│   ├── shop.html & shop.js        # Product listing with filters
│   ├── product.html               # Product details
│   ├── cart.html                  # Shopping cart
│   ├── checkout.html              # Checkout process
│   ├── login.html & auth.js       # Authentication pages
│   ├── profile.html               # User profile
│   ├── admin.html & admin.js      # Admin dashboard
│   ├── contact.html               # Contact form
│   ├── order-confirmation.html    # Order confirmation
│   └── wishlist.html              # Wishlist page
├── assets/
│   └── images/                    # Product images
└── data/
    └── (All data stored in localStorage)
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No dependencies required - vanilla JavaScript only

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/kickvibe.git
   cd kickvibe
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     ```
   - Visit `http://localhost:8000`

3. **Demo Credentials**
   - **Email**: admin@kickvibe.com
   - **Password**: admin123

## 🎨 Design System

### Color Palette
```css
--primary: #FF6B35      /* Orange/Red - Main accent */
--secondary: #004E89    /* Deep Blue - Secondary */
--accent: #F7B801       /* Gold - Highlights */
--dark: #1a1a1a         /* Dark background */
--light: #f8f9fa        /* Light background */
--success: #28a745      /* Green */
--danger: #dc3545       /* Red */
```

### Typography
- **Font Family**: Poppins, Inter, Montserrat (fallback to sans-serif)
- **Base Size**: 16px
- **Responsive**: Scales down on mobile devices

### Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

## 💾 Data Management

### localStorage Structure
```javascript
// Users
kickvibe_users: [{ id, email, password, role, ... }]

// Authentication
kickvibe_user: { id, email, firstName, lastName, role }

// Products
kickvibe_products: [{ id, name, price, category, ... }]

// Cart
kickvibe_cart: [{ id, name, size, quantity, ... }]

// Wishlist
kickvibe_wishlist: [{ id, name, price, ... }]

// Orders
kickvibe_orders: [{ id, userId, items, total, status, ... }]

// Theme
kickvibe_darkMode: boolean
```

## 🔐 Authentication System

### Password Hashing
```javascript
// Simple simulation (for demo purposes only)
hashPassword(password) {
  return btoa(password.split('').reverse().join(''));
}
```

**Note**: In production, use real cryptographic libraries like bcrypt.

### Default Admin Account
- **Username**: admin
- **Email**: admin@kickvibe.com
- **Password**: admin123

## 📊 State Management

### StateManager Class
Centralized state management using the Observer pattern:

```javascript
// Initialize
const stateManager = new StateManager();

// Subscribe to changes
stateManager.subscribe((state) => {
  console.log('State changed:', state);
});

// Modify state
stateManager.addToCart(product, size);
stateManager.setFilters({ category: 'running' });

// Access state
const cart = stateManager.getCart();
const products = stateManager.getFilteredProducts();
```

## 🛒 Shopping Flow

1. **Browse** → Visit shop page with products
2. **Filter** → Use category, price, search filters
3. **View Details** → Click product to see full details
4. **Select Size** → Choose available sizes
5. **Add to Cart** → Item added with quantity
6. **Review Cart** → Check items and quantities
7. **Checkout** → Enter shipping and payment info
8. **Confirm** → Order confirmation page
9. **Track** → View order in account profile

## 📱 Responsive Breakpoints

```css
Desktop: 1200px+
Tablet:  768px - 1199px
Mobile:  480px - 767px
Small:   < 480px
```

## 🔧 Key JavaScript Classes

### StateManager
- Manages global application state
- Handles cart, wishlist, products, orders
- Implements observer pattern for reactivity

### AuthManager
- User registration and login
- Password hashing (simulated)
- User profile management

### Utility Functions
- `formatPrice()`: Currency formatting
- `debounce()`: Debouncing search input
- `isValidEmail()`: Email validation
- `getFilteredProducts()`: Advanced filtering

## 📈 Admin Dashboard Features

### Sales Analytics
- Revenue chart (last 7 days)
- Total revenue, orders, products
- Average order value
- Top-selling products

### Inventory Management
- Stock level visualization
- Low-stock alerts
- Category distribution

### Product Management
- Add new products
- Edit existing products
- Delete products
- Update inventory

## 🎯 Usage Examples

### Add Product to Cart
```javascript
const product = stateManager.getProductById(1);
stateManager.addToCart(product, '10');
```

### Create Order
```javascript
const order = stateManager.createOrder({
  userId: user.id,
  shippingInfo: { ... },
  paymentInfo: { ... }
});
```

### Filter Products
```javascript
stateManager.setFilters({
  searchTerm: 'Air Max',
  category: 'running',
  priceRange: { min: 80, max: 150 },
  sortBy: 'price-low'
});
const filtered = stateManager.getFilteredProducts();
```

### Login User
```javascript
try {
  const user = authManager.login('user@example.com', 'password123');
  stateManager.setUser(user);
} catch (error) {
  console.error(error.message);
}
```

## 🎓 Learning Points

This project demonstrates:
- **Vanilla JavaScript**: No frameworks, pure JS
- **State Management**: Observer pattern implementation
- **Responsive Design**: Mobile-first CSS approach
- **Form Validation**: Client-side validation
- **localStorage**: Persistent data storage
- **DOM Manipulation**: Dynamic content generation
- **CSS Grid & Flexbox**: Modern CSS layouts
- **Event Handling**: User interaction management
- **Performance**: Lazy loading, debouncing
- **Accessibility**: Keyboard navigation, ARIA labels

## 🚀 Performance Optimizations

1. **Debounced Search**: Prevents excessive filtering
2. **Lazy Loading**: Images load on viewport entry
3. **CSS Animations**: GPU-accelerated transitions
4. **Minimized Reflows**: Batch DOM updates
5. **Efficient Selectors**: Optimized DOM queries

## 🌐 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📝 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real user authentication (Node.js backend)
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Inventory sync with suppliers
- [ ] Advanced analytics and reporting
- [ ] Social media integration
- [ ] Product reviews and ratings
- [ ] Coupon codes and discounts
- [ ] Multi-language support

## 📄 License

This project is for educational purposes. Feel free to use it as a learning resource or starting point for your own e-commerce platform.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make improvements
4. Submit a pull request

## 📞 Support

For questions, issues, or suggestions, please open an issue on GitHub or contact the development team.

---

**Built with 🔥 by Vlad Szabo** | KickVibe © 2024 | All Rights Reserved

## Recent visual changes (concise)
- Primary color: Formula Red applied (`--primary`)
- Navbar: high-contrast styles and dark-mode fixes; icons strengthened
- Cart badge: added `.cart-count` styling
- Cards: elevated shadows and hover lift
- Footer: forced pure black in dark mode
- Action: update `css/main.css` and verify in browser
