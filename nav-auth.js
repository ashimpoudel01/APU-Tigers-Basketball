// Navigation Authentication Handler
// This script updates the navigation bar based on user login status

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavAuth);
  } else {
    initNavAuth();
  }
  
  function initNavAuth() {
    // Give nav.html time to load if using nav-placeholder
    setTimeout(checkAuthAndUpdateNav, 100);
  }
  
  function checkAuthAndUpdateNav() {
    console.log('🔍 Checking authentication status...');
    fetch('/api/me')
      .then(function(res) {
        console.log('📡 Response status:', res.status);
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then(function(data) {
        console.log('✅ User data received:', data);
        updateNavWithProfile(data);
      })
      .catch(function(err) {
        console.log('ℹ️ User not logged in:', err.message);
        // User not logged in - default login/signup buttons already shown
      });
  }
  
  function updateNavWithProfile(data) {
    var desktopAuth = document.getElementById('nav-auth-desktop');
    var mobileAuth = document.getElementById('nav-auth-mobile');
    
    if (!data || !data.user || !data.user.fullName) {
      console.error('❌ Invalid user data:', data);
      return;
    }
    
    var fullName = data.user.fullName || 'User';
    var nameParts = fullName.split(' ');
    var initials = nameParts.map(function(n) { return n && n[0] ? n[0] : ''; }).join('').toUpperCase().substring(0, 2) || 'U';
    var firstName = nameParts[0] || 'User';
    console.log('👤 Creating profile for:', firstName, '(' + initials + ')');
    
    // Check if user is admin
    var isAdmin = data.user.role === 'admin' || data.user.isAdmin;
    
    // Build admin link HTML if user is admin
    var adminLinkDesktop = isAdmin ? '<a href="admin.html" class="dropdown-item"><i class="fas fa-shield-alt"></i> Admin Panel</a>' : '';
    var adminLinkMobile = isAdmin ? '<a href="admin.html" class="mobile-nav-link"><i class="fas fa-shield-alt"></i> Admin Panel</a>' : '';
    
    // Update desktop navigation
    if (desktopAuth) {
      desktopAuth.innerHTML = 
        '<div class="nav-profile-dropdown">' +
          '<button class="nav-profile-btn" onclick="toggleProfileDropdown(event)">' +
            '<span class="profile-avatar">' + initials + '</span>' +
            '<span class="profile-name">' + firstName + '</span>' +
            '<i class="fas fa-chevron-down"></i>' +
          '</button>' +
          '<div class="profile-dropdown-menu" id="profile-dropdown">' +
            '<a href="dashboard.html" class="dropdown-item"><i class="fas fa-tachometer-alt"></i> Dashboard</a>' +
            '<a href="register.html" class="dropdown-item"><i class="fas fa-user-edit"></i> My Profile</a>' +
            adminLinkDesktop +
            '<div class="dropdown-divider"></div>' +
            '<a href="#" onclick="handleLogout(event)" class="dropdown-item logout"><i class="fas fa-sign-out-alt"></i> Logout</a>' +
          '</div>' +
        '</div>';
      console.log('✅ Desktop navigation updated' + (isAdmin ? ' (Admin)' : ''));
    }
    
    // Update mobile navigation
    if (mobileAuth) {
      mobileAuth.innerHTML = 
        '<div class="mobile-profile-section">' +
          '<div class="mobile-profile-info">' +
            '<span class="mobile-avatar">' + initials + '</span>' +
            '<span class="mobile-name">' + fullName + '</span>' +
          '</div>' +
          '<a href="dashboard.html" class="mobile-nav-link"><i class="fas fa-tachometer-alt"></i> Dashboard</a>' +
          '<a href="register.html" class="mobile-nav-link"><i class="fas fa-user-edit"></i> My Profile</a>' +
          adminLinkMobile +
          '<a href="#" class="mobile-nav-link logout-link" onclick="handleLogout(event)"><i class="fas fa-sign-out-alt"></i> Logout</a>' +
        '</div>';
      console.log('✅ Mobile navigation updated' + (isAdmin ? ' (Admin)' : ''));
    }
  }
  
  // Make functions global so they can be called from onclick handlers
  window.toggleProfileDropdown = function(e) {
    e.preventDefault();
    e.stopPropagation();
    var dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
      console.log('🔽 Dropdown toggled');
    }
  };
  
  window.handleLogout = function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
      fetch('/api/logout', { method: 'POST' })
        .then(function() {
          window.location.href = 'index.html';
        })
        .catch(function() {
          window.location.href = 'index.html';
        });
    }
  };
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    var dropdown = document.getElementById('profile-dropdown');
    if (dropdown && !e.target.closest('.nav-profile-dropdown')) {
      dropdown.classList.remove('show');
    }
  });
  
})();
