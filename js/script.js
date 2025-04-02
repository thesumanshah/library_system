// Main JavaScript functionality for Library Management System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    initTooltips();
    
    // Initialize form validation
    setupFormValidation();
    
    // Initialize table search functionality
    setupTableSearch();
    
    // Initialize records per page functionality
    setupRecordsPerPage();
    
    // Initialize action buttons
    setupActionButtons();
    
    // Initialize tab functionality
    setupTabs();
});

// Initialize Bootstrap tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Setup form validation
function setupFormValidation() {
    // Add Book Form
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate ISBN format
            const isbn = document.getElementById('isbn').value;
            if (isbn && !validateISBN(isbn)) {
                showAlert('Please enter a valid ISBN number.', 'danger');
                return;
            }
            
            // In a real system, this would submit data to the backend
            showAlert('Book added successfully!', 'success');
            
            // Reset form
            addBookForm.reset();
        });
    }
    
    // Add Category Form
    const addCategoryForm = document.getElementById('addCategoryForm');
    if (addCategoryForm) {
        addCategoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real system, this would submit data to the backend
            showAlert('Category added successfully!', 'success');
            
            // Reset form
            addCategoryForm.reset();
        });
    }
    
    // Add Publication Form
    const addPublicationForm = document.getElementById('addPublicationForm');
    if (addPublicationForm) {
        addPublicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real system, this would submit data to the backend
            showAlert('Publication added successfully!', 'success');
            
            // Reset form
            addPublicationForm.reset();
        });
    }
    
    // Issue Book Form
    const issueBookForm = document.getElementById('issueBookForm');
    if (issueBookForm) {
        issueBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate return date is after issue date
            const issueDate = new Date(document.getElementById('issueDate').value);
            const returnDate = new Date(document.getElementById('returnDate').value);
            
            if (returnDate <= issueDate) {
                showAlert('Return date must be after issue date.', 'danger');
                return;
            }
            
            // In a real system, this would submit data to the backend
            showAlert('Book issued successfully!', 'success');
            
            // Reset form
            issueBookForm.reset();
        });
    }
    
    // Change Password Form
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate password strength
            if (!validatePasswordStrength(newPassword)) {
                showAlert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.', 'danger');
                return;
            }
            
            // Validate passwords match
            if (newPassword !== confirmPassword) {
                showAlert('New password and confirm password do not match.', 'danger');
                return;
            }
            
            // In a real system, this would submit data to the backend
            showAlert('Password changed successfully!', 'success');
            
            // Reset form
            changePasswordForm.reset();
        });
    }
    
    // Request Book Form
    const requestBookForm = document.getElementById('requestBookForm');
    if (requestBookForm) {
        requestBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real system, this would submit data to the backend
            showAlert('Book requested successfully!', 'success');
            
            // Reset form
            requestBookForm.reset();
        });
    }
}

// Setup table search functionality
function setupTableSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.card-body').querySelector('table');
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Update showing entries text
            updateShowingEntries();
        });
    }
}

// Setup records per page functionality
function setupRecordsPerPage() {
    const recordsPerPage = document.getElementById('recordsPerPage');
    if (recordsPerPage) {
        recordsPerPage.addEventListener('change', function() {
            // In a real system, this would update the table with the selected number of records
            // For demo purposes, we'll just show an alert
            showAlert(`Showing ${this.value} records per page.`, 'info');
        });
    }
}

// Setup action buttons
function setupActionButtons() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            // In a real system, this would open an edit form or redirect to an edit page
            showAlert(`Editing item with ID: ${id}`, 'info');
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            
            // Confirm deletion
            if (confirm('Are you sure you want to delete this item?')) {
                // In a real system, this would send a delete request to the backend
                showAlert(`Item with ID: ${id} deleted successfully!`, 'success');
            }
        });
    });
    
    // Return buttons
    const returnButtons = document.querySelectorAll('.btn-return');
    returnButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            
            // In a real system, this would process the book return
            showAlert(`Book with ID: ${id} returned successfully!`, 'success');
        });
    });
    
    // Approve buttons
    const approveButtons = document.querySelectorAll('.btn-approve');
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            
            // In a real system, this would approve the request
            showAlert(`Request with ID: ${id} approved successfully!`, 'success');
        });
    });
    
    // Reject buttons
    const rejectButtons = document.querySelectorAll('.btn-reject');
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            
            // In a real system, this would reject the request
            showAlert(`Request with ID: ${id} rejected successfully!`, 'success');
        });
    });
    
    // Request buttons
    const requestButtons = document.querySelectorAll('.btn-request');
    requestButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            
            // In a real system, this would process the book request
            showAlert(`Book with ID: ${id} requested successfully!`, 'success');
        });
    });
}

// Setup tab functionality
function setupTabs() {
    const reportTabs = document.getElementById('reportTabs');
    if (reportTabs) {
        const tabs = reportTabs.querySelectorAll('.nav-link');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding tab content
                const tabId = this.getAttribute('data-bs-target');
                const tabContent = document.querySelector(tabId);
                
                // Hide all tab content
                const allTabContent = document.querySelectorAll('.tab-pane');
                allTabContent.forEach(content => {
                    content.classList.remove('show', 'active');
                });
                
                // Show selected tab content
                tabContent.classList.add('show', 'active');
            });
        });
    }
}

// Update showing entries text
function updateShowingEntries() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
        
        const showingText = table.closest('.card-body').querySelector('p');
        if (showingText) {
            showingText.textContent = `Showing ${visibleRows.length} of ${rows.length} entries`;
        }
    });
}

// Validate ISBN format
function validateISBN(isbn) {
    // Remove hyphens and spaces
    isbn = isbn.replace(/[-\s]/g, '');
    
    // Check if it's a valid ISBN-10 or ISBN-13
    return /^(\d{10}|\d{13})$/.test(isbn);
}

// Validate password strength
function validatePasswordStrength(password) {
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Show alert message (if not defined in auth.js)
if (typeof showAlert !== 'function') {
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
}
