/**
 * Utility Functions for KickVibe
 */

/**
 * Format price to currency
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

/**
 * Format date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Debounce function for search
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Validate email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone
 */
function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Get initials from name
 */
function getInitials(firstName, lastName) {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Create element with class
 */
function createElement(tag, className = '', html = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (html) element.innerHTML = html;
  return element;
}

/**
 * Add animation to element
 */
function animateElement(element, animationName, duration = 600) {
  element.style.animation = `${animationName} ${duration}ms ease`;
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}

/**
 * Get random items from array
 */
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Render notification
 */
function showNotification(message, type = 'info') {
  const notificationContainer = document.getElementById('notifications');
  if (!notificationContainer) return;

  const notification = createElement('div', `notification notification-${type}`, message);
  notificationContainer.appendChild(notification);

  animateElement(notification, 'slideIn');

  setTimeout(() => {
    animateElement(notification, 'slideOut');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Format currency for input
 */
function formatCurrencyInput(value) {
  return parseFloat(value).toFixed(2);
}

/**
 * Get product image with bulletproof cross-browser path resolution
 * Works on all modern browsers with proper relative path conversion
 */
function getProductImage(product) {
  if (!product.image) {
    return `https://via.placeholder.com/300?text=${encodeURIComponent(product.name)}`;
  }

  let imagePath = product.image;
  
  // Ensure we're working with a consistent path format
  // Original paths are like: /assets/images/run1.jpg
  
  // Get current location info
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  
  // Check if we're in a subdirectory (pages/) by looking for .html in path
  const isSubdir = pathname.includes('/pages/');
  
  // Remove leading slash if present
  let cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Build final path
  let finalPath;
  if (isSubdir) {
    // We're in /pages/something.html, go up one directory
    finalPath = '../' + cleanPath;
  } else {
    // We're at root, add ./
    finalPath = './' + cleanPath;
  }
  
  // Log for debugging (visible in browser console)
  if (typeof console !== 'undefined' && console.log) {
    console.log(`[ImagePath] ${product.name}: ${imagePath} → ${finalPath}`);
  }
  
  return finalPath;
}

/**
 * Star rating HTML
 */
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let html = '';

  for (let i = 0; i < fullStars; i++) {
    html += '<span class="star full">★</span>';
  }

  if (hasHalfStar) {
    html += '<span class="star half">★</span>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    html += '<span class="star empty">☆</span>';
  }

  return html;
}

/**
 * Local storage helper
 */
const storageHelper = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};

/**
 * Lazy load images
 */
function lazyLoadImages() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

/**
 * Copy to clipboard
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    stateManager.showNotification('Copied to clipboard!', 'success');
  });
}

/**
 * Get current URL parameters
 */
function getUrlParam(param) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}

/**
 * Set loading state on button
 */
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.innerText;
    button.innerText = 'Loading...';
  } else {
    button.disabled = false;
    button.innerText = button.dataset.originalText || 'Submit';
  }
}
