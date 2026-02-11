# KickVibe - Quick Start Guide

## 🚀 Getting Started

### Step 1: Open the Application
Open `/KickVibe/index.html` in your web browser. The home page will load with featured sneakers and navigation.

### Step 2: Navigate the Site
Use the navigation bar to:
- **Home**: Return to home page
- **Shop**: Browse all sneakers
- **Contact**: Send a message
- **Admin**: View admin dashboard (admin only)

### Step 3: Account Management
- **Login**: Click 👤 icon → Use admin@kickvibe.com / admin123
- **Register**: Click login 👤 → Switch to register form
- **Logout**: Click user menu → Logout

---

## 🛍️ Shopping Workflow

### 1. Browse Products
```
Home Page → Click "View All" 
→ Taken to Shop Page
```

### 2. Filter Products
**Price Filter**:
- Set minimum price in left sidebar
- Set maximum price
- Results update instantly

**Category Filter**:
- Select Running, Basketball, or Casual
- Grid updates to show selected category

**Sort Options**:
- Newest: Latest products first
- Price Low to High
- Price High to Low
- By Rating

**Search**:
- Click search icon 🔍 in header
- Type product name
- Results filter in real-time

### 3. View Product Details
```
1. Click any product card
2. See large images and specs
3. Read description
4. View available sizes
```

### 4. Add to Cart
```
1. Select size from grid
2. Click "Add to Cart" button
3. See notification "Added to cart!"
4. Item appears in cart count 🛒
```

### 5. Add to Wishlist
```
1. On product page, click ❤️ button
2. Product saved to wishlist
3. Access via ❤️ in header
```

### 6. View Cart
```
1. Click 🛒 in header
2. See all cart items
3. Adjust quantities with +/- buttons
4. Remove items with trash icon
5. See order total
6. Click "Proceed to Checkout"
```

### 7. Complete Checkout
```
1. Fill shipping address form
2. Enter payment information
3. Review order summary
4. Click "Place Order"
5. See order confirmation page
```

### 8. View Order History
```
1. Click 👤 in header
2. Go to Profile
3. See all past orders
4. Click order to view details
```

---

## 🔐 Admin Features

### Login as Admin
```
1. Go to login page
2. Email: admin@kickvibe.com
3. Password: admin123
4. Click Admin in navigation
```

### Add New Product
```
1. In Admin Dashboard, fill product form:
   - Name: Product name
   - Price: Cost
   - Category: Select type
   - Stock: Quantity available
   - Description: Product details
   - Sizes: Comma-separated (e.g., 6,7,8,9,10,11,12)
   - Specs:
     - Weight: e.g., 220g
     - Drop: e.g., 10mm
     - Cushioning: e.g., React
2. Click "Add Product"
3. See in products table
```

### Edit Product
```
1. In Admin Dashboard, find product in table
2. Click "Edit" button
3. Modify fields
4. Click "Update Product"
```

### Delete Product
```
1. In Admin Dashboard, find product in table
2. Click "Delete" button
3. Confirm deletion
4. Product removed
```

### View Analytics
**Revenue Chart**: Last 7 days of sales
**Top Products**: Most-ordered items
**Inventory**: Current stock levels
**Category Sales**: Sales by category

### View Orders
```
1. Click "Orders" tab
2. See all customer orders
3. View order details
4. Check customer info
```

### View Users
```
1. Click "Users" tab
2. See all registered users
3. View user information
4. Check registration date
```

---

## 🌙 Dark Mode

### Toggle Dark Mode
```
1. Click 🌙 icon in header
2. Page switches to dark theme
3. Preference saved automatically
4. Persists on reload
```

---

## ❤️ Wishlist Management

### Add to Wishlist
```
1. On product page, click ❤️
2. Product saved
3. See notification
```

### View Wishlist
```
1. Click ❤️ in header
2. See all favorite products
3. Click to view details
4. Add from wishlist directly to cart
```

### Remove from Wishlist
```
1. On wishlist page, click ❤️ on item
2. Item removed
3. Update reflected instantly
```

---

## 📱 Mobile Experience

### Responsive Navigation
- On mobile, click hamburger menu ☰
- Navigation expands/collapses
- All features work on mobile

### Touch-Friendly
- Large tap targets
- Optimized for small screens
- Swipe-friendly interactions

### Mobile Features
- Filters collapse to save space
- Product grid adapts to screen size
- Checkout form optimized for mobile
- Touch keyboard support

---

## 🎨 Theme Customization

### Light Mode (Default)
- Clean white backgrounds
- Dark text for readability
- Orange/blue accent colors

### Dark Mode
- Dark backgrounds (comfortable for eyes)
- Light text
- Vibrant accent colors
- Reduces screen brightness

---

## 📧 Contact Form

### Send Message
```
1. Go to Contact page
2. Fill form:
   - Name
   - Email
   - Subject
   - Message
3. Click "Send Message"
4. See success notification
5. Message stored in localStorage
```

---

## 💾 Data Storage

### What's Saved?
- User accounts and login info
- Shopping cart contents
- Wishlist items
- Order history
- Product catalog
- Theme preference (dark mode)

### How Long?
- Data persists indefinitely
- Clears only if browser localStorage is cleared
- Each browser/device has separate data

### Clear Data
```
Browser Console: localStorage.clear()
(Warning: This clears all KickVibe data)
```

---

## 🔍 Search Tips

### Basic Search
- Type product name (case-insensitive)
- Partial matches work (e.g., "air" finds "Air Max")
- Search in product name

### Combine Filters
- Use search AND category together
- Use search AND price range
- Mix multiple filters

### Filter Combinations
- Category: Running + Price: $80-$150
- Category: Basketball + Sort: Price Low
- Any combination works

---

## 🛒 Cart Tips

### Update Quantities
- Use + button to add
- Use - button to subtract
- Or type number directly
- Cart total updates instantly

### Remove Items
- Click trash icon
- Item removed immediately
- Total recalculates

### Apply Coupon
- (Feature ready for future enhancement)
- Code field available in checkout

---

## 📊 Analytics Features

### Revenue Chart
- Last 7 days of sales
- Updated with each order
- Interactive tooltip on hover

### Top Products
- 5 most-ordered items
- Ranked by popularity
- Real-time updates

### Inventory
- Current stock by product
- Low-stock alerts
- Visual bar representation

### Category Sales
- Doughnut chart by category
- Percentage breakdown
- Color-coded categories

---

## 🔐 Security Notes

### Password Storage
- Passwords are hashed (demo: Base64 encoding)
- Never stored in plain text
- In production, use bcrypt/Argon2

### Session
- Stored in localStorage
- Expires when user logs out
- Not truly secure (localStorage is readable)
- For production, use secure HTTP-only cookies

### Data
- All data in localStorage is visible in browser DevTools
- For sensitive data, use encrypted storage or backend

---

## ⌨️ Keyboard Navigation

### Navigation
- `Tab`: Move between elements
- `Shift+Tab`: Move backward
- `Enter`: Click button/submit form
- `Escape`: Close modals/menus

### Forms
- `Tab`: Move to next field
- `Enter`: Submit form
- `Shift+Tab`: Move to previous field

---

## 🆘 Troubleshooting

### Cart Not Saving
- Check browser localStorage enabled
- Clear cache and reload
- Try different browser

### Orders Not Showing
- Login to correct account
- Check order history in profile
- Verify product was added to cart before checkout

### Filters Not Working
- Reload page
- Clear cache
- Try different filter

### Dark Mode Not Working
- Toggle 🌙 button twice
- Reload page
- Check browser supports localStorage

### Admin Dashboard Access
- Verify logged in as admin
- Use admin@kickvibe.com credentials
- Check admin role assigned in users table

---

## 💡 Tips & Tricks

### Quick Add to Cart
1. From shop, select size while hovering
2. Click "Add to Cart" immediately
3. Faster checkout process

### Bulk Orders
- Add multiple items to cart
- Review all in cart page
- Update quantities as needed
- Single checkout

### Compare Products
- Open products in separate tabs
- Compare prices, specs, sizes
- Add best option to cart

### Wishlist as Reminder
- Add items you like
- Don't want to buy now
- Review later
- Easy to add to cart

---

## 📞 Support

### Common Issues
- **Forgot password?** → Admin will reset (not implemented in demo)
- **Lost order?** → Check profile → order history
- **Product question?** → Contact page
- **Report bug?** → Contact page

### Contact Information
- Email: hello@kickvibe.com (displayed on contact page)
- Phone: Available on contact page
- Hours: Weekdays 9AM-5PM

---

## 🎯 Features Checklist

✅ User Registration & Login
✅ Admin Dashboard
✅ Product CRUD
✅ Shopping Cart
✅ Wishlist
✅ Search & Filters
✅ Sort Options
✅ Checkout with Validation
✅ Order Confirmation
✅ Order History
✅ User Profile
✅ Dark Mode
✅ Responsive Design
✅ Notifications
✅ Contact Form
✅ Analytics Charts
✅ Mobile Optimized

---

## 🚀 Next Steps

1. **Browse**: Explore the shop
2. **Add to Cart**: Test add/remove
3. **Checkout**: Complete order flow
4. **Login as Admin**: Test CRUD
5. **View Analytics**: Check charts
6. **Toggle Dark Mode**: Try theme
7. **Try Mobile**: Test responsiveness

---

**Enjoy shopping at KickVibe! 🔥**

*Premium sneakers, modern design, seamless experience*
