// Authentication System for Library Management System

// User roles and credentials (in a real system, this would be handled by the backend)
const users = [
    { email: 'admin@library.com', password: 'admin123', role: 'admin' },
    { email: 'student@library.com', password: 'student123', role: 'student' }
];

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // If not on login or register page, redirect to login
        if (!window.location.href.includes('login.html') && 
            !window.location.href.includes('register.html') && 
            !window.location.href.includes('index.html')) {
            window.location.href = 'login.html';
        }
    } else {
        // If logged in and on login page, redirect to appropriate dashboard
        if (window.location.href.includes('login.html') || window.location.href.includes('register.html')) {
            redirectToDashboard();
        }
        
        // Update UI based on user role
        updateUIForRole();
    }
}

// Handle login form submission
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Find user with matching credentials
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Store user info in localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    email: user.email,
                    role: user.role
                }));
                
                // Show success message
                showAlert('Login successful! Redirecting...', 'success');
                
                // Redirect to appropriate dashboard
                setTimeout(() => {
                    redirectToDashboard();
                }, 1500);
            } else {
                showAlert('Invalid email or password. Please try again.', 'danger');
            }
        });
    }
}

// Handle registration form submission
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                showAlert('Passwords do not match. Please try again.', 'danger');
                return;
            }
            
            // Check if email already exists
            if (users.some(u => u.email === email)) {
                showAlert('Email already registered. Please use a different email.', 'danger');
                return;
            }
            
            // In a real system, this would send data to the backend
            // For demo purposes, we'll just show success and redirect
            showAlert('Registration successful! Redirecting to login...', 'success');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
}

// Redirect to appropriate dashboard based on user role
function redirectToDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        if (currentUser.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else if (currentUser.role === 'student') {
            window.location.href = 'student-dashboard.html';
        }
    }
}

// Update UI elements based on user role
function updateUIForRole() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Update logout button text
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.textContent = 'LOG ME OUT';
    }
    
    // Hide elements not relevant to current user role
    if (currentUser.role === 'admin') {
        // Hide student-only elements
        const studentElements = document.querySelectorAll('.student-only');
        studentElements.forEach(el => el.style.display = 'none');
    } else if (currentUser.role === 'student') {
        // Hide admin-only elements
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => el.style.display = 'none');
    }
}

// Handle logout
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear user data from localStorage
            localStorage.removeItem('currentUser');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
}

// Show alert message
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find alert container or create one
    let alertContainer = document.querySelector('.alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container';
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '20px';
        alertContainer.style.right = '20px';
        alertContainer.style.zIndex = '9999';
        document.body.appendChild(alertContainer);
    }
    
    // Add alert to container
    alertContainer.appendChild(alertDiv);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 5000);
}

// Initialize authentication system
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setupLoginForm();
    setupRegisterForm();
    setupLogout();
});
