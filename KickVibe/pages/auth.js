/**
 * Authentication Page - Login/Register Handler
 */

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector('[name="email"]').value;
  const password = form.querySelector('[name="password"]').value;

  try {
    const user = authManager.login(email, password);
    stateManager.setUser(user);
    stateManager.showNotification(`Welcome back, ${user.firstName}!`, 'success');
    
    // Redirect based on role
    setTimeout(() => {
      if (user.role === 'admin') {
        window.location.href = './admin.html';
      } else {
        window.location.href = './shop.html';
      }
    }, 1500);
  } catch (error) {
    showFormError(form, 'email', error.message);
    stateManager.showNotification(error.message, 'error');
  }
});

// Register form handler
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const firstName = form.querySelector('[name="firstName"]').value.trim();
  const lastName = form.querySelector('[name="lastName"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const password = form.querySelector('[name="password"]').value;
  const confirmPassword = form.querySelector('[name="confirmPassword"]').value;

  // Clear previous errors
  clearFormErrors(form);

  // Validate
  let hasErrors = false;

  if (!firstName) {
    showFormError(form, 'firstName', 'First name is required');
    hasErrors = true;
  }

  if (!isValidEmail(email)) {
    showFormError(form, 'email', 'Please enter a valid email');
    hasErrors = true;
  }

  if (password.length < 6) {
    showFormError(form, 'password', 'Password must be at least 6 characters');
    hasErrors = true;
  }

  if (password !== confirmPassword) {
    showFormError(form, 'confirmPassword', 'Passwords do not match');
    hasErrors = true;
  }

  if (hasErrors) return;

  try {
    const user = authManager.register({
      firstName,
      lastName,
      email,
      password
    });

    stateManager.setUser(user);
    stateManager.showNotification(`Welcome to KickVibe, ${user.firstName}!`, 'success');
    
    setTimeout(() => {
      window.location.href = './shop.html';
    }, 1500);
  } catch (error) {
    showFormError(form, 'email', error.message);
    stateManager.showNotification(error.message, 'error');
  }
});

/**
 * Helper function to show form error
 */
function showFormError(form, fieldName, message) {
  const input = form.querySelector(`[name="${fieldName}"]`);
  if (!input) return;

  const formGroup = input.closest('.form-group');
  formGroup.classList.add('has-error');
  input.classList.add('error');
  
  const errorDiv = formGroup.querySelector('.form-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
}

/**
 * Helper function to clear form errors
 */
function clearFormErrors(form) {
  form.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('has-error');
    const input = group.querySelector('input, textarea, select');
    if (input) input.classList.remove('error');
    const errorDiv = group.querySelector('.form-error');
    if (errorDiv) {
      errorDiv.textContent = '';
      errorDiv.style.display = 'none';
    }
  });
}

// Check if already logged in
window.addEventListener('load', () => {
  if (isLoggedIn()) {
    const user = stateManager.getUser();
    if (user.role === 'admin') {
      window.location.href = './admin.html';
    } else {
      window.location.href = './shop.html';
    }
  }
});
