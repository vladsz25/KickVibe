/**
 * Authentication System for KickVibe
 * Handles user registration, login, and session management
 * Note: Password hashing is simulated for demo purposes
 */

class AuthManager {
  constructor() {
    this.users = this.loadUsers();
  }

  /**
   * Load users from localStorage
   */
  loadUsers() {
    const saved = localStorage.getItem('kickvibe_users');
    return saved ? JSON.parse(saved) : this.getInitialUsers();
  }

  /**
   * Get initial admin user
   */
  getInitialUsers() {
    return [
      {
        id: 1,
        username: 'admin',
        email: 'admin@kickvibe.com',
        password: this.hashPassword('admin123'),
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        createdAt: new Date().toISOString()
      }
    ];
  }

  /**
   * Simple password hashing (simulated - for demo only)
   * In production, use proper bcrypt or similar
   */
  hashPassword(password) {
    // Simple simulation: base64 encode + reverse
    return btoa(password.split('').reverse().join(''));
  }

  /**
   * Verify password
   */
  verifyPassword(password, hash) {
    return this.hashPassword(password) === hash;
  }

  /**
   * Save users to localStorage
   */
  saveUsers() {
    localStorage.setItem('kickvibe_users', JSON.stringify(this.users));
  }

  /**
   * Register new user
   */
  register(userData) {
    // Validation
    if (!userData.email || !userData.password || !userData.firstName) {
      throw new Error('Please fill in all required fields');
    }

    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check if email exists
    if (this.users.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    // Check if username exists
    if (userData.username && this.users.some(u => u.username === userData.username)) {
      throw new Error('Username already taken');
    }

    // Create new user
    const newUser = {
      id: Math.max(...this.users.map(u => u.id), 0) + 1,
      username: userData.username || userData.email.split('@')[0],
      email: userData.email,
      password: this.hashPassword(userData.password),
      role: 'customer',
      firstName: userData.firstName,
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      address: userData.address || '',
      city: userData.city || '',
      zipCode: userData.zipCode || '',
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();

    return {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role
    };
  }

  /**
   * Login user
   */
  login(email, password) {
    // Validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user by email
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    if (!this.verifyPassword(password, user.password)) {
      throw new Error('Invalid password');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      username: user.username
    };
  }

  /**
   * Get user by ID
   */
  getUserById(id) {
    const user = this.users.find(u => u.id === id);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      username: user.username,
      phone: user.phone,
      address: user.address,
      city: user.city,
      zipCode: user.zipCode
    };
  }

  /**
   * Update user profile
   */
  updateProfile(userId, updates) {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    // Don't allow role changes
    delete updates.role;
    delete updates.id;

    Object.assign(user, updates);
    this.saveUsers();

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      address: user.address,
      city: user.city,
      zipCode: user.zipCode
    };
  }

  /**
   * Check if user is admin
   */
  isAdmin(user) {
    return user && user.role === 'admin';
  }

  /**
   * Get all users (admin only)
   */
  getAllUsers() {
    return this.users.map(u => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      createdAt: u.createdAt
    }));
  }
}

// Create global auth instance
const authManager = new AuthManager();

// ============ AUTH HELPER FUNCTIONS ============

/**
 * Check if user is logged in
 */
function isLoggedIn() {
  return stateManager.getUser() !== null;
}

/**
 * Check if current user is admin
 */
function isAdmin() {
  const user = stateManager.getUser();
  return user && user.role === 'admin';
}

/**
 * Guard against unauthorized access
 */
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = './pages/login.html';
    return false;
  }
  return true;
}

/**
 * Guard against non-admin access
 */
function requireAdmin() {
  if (!isAdmin()) {
    window.location.href = './index.html';
    return false;
  }
  return true;
}
