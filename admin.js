// Admin Panel JavaScript
(function() {
  'use strict';

  // Check if user is admin
  async function checkAdminAccess() {
    try {
      const response = await fetch('/api/me');
      const data = await response.json();
      
      console.log('Auth check:', data); // Debug log
      
      if (!data.authenticated) {
        window.location.href = 'login.html';
        return false;
      }
      
      // Check both role field and isAdmin flag for backward compatibility
      const isAdmin = data.user.role === 'admin' || data.user.isAdmin === 1 || data.user.isAdmin === true;
      
      if (!isAdmin) {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'dashboard.html';
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Auth check failed:', error);
      window.location.href = 'login.html';
      return false;
    }
  }

  // Tab switching
  function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    const contents = document.querySelectorAll('.admin-tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(targetTab + '-tab').classList.add('active');
      });
    });
  }

  // Load all users
  async function loadUsers() {
    try {
      const tbody = document.getElementById('users-tbody');
      tbody.innerHTML = '<tr><td colspan="8" class="loading-cell"><i class="fas fa-spinner fa-spin"></i> Loading users...</td></tr>';
      
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load users');
      }
      
      displayUsers(data.users || []);
      updateAnalytics(data.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
      const tbody = document.getElementById('users-tbody');
      tbody.innerHTML = '<tr><td colspan="8" class="error-cell"><i class="fas fa-exclamation-triangle"></i> Error loading users</td></tr>';
    }
  }

  // Display users in table
  function displayUsers(users) {
    const tbody = document.getElementById('users-tbody');
    
    if (users.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="empty-cell">No users found</td></tr>';
      return;
    }
    
    tbody.innerHTML = users.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${escapeHtml(user.full_name)}</td>
        <td>${escapeHtml(user.email)}</td>
        <td>
          <span class="badge badge-${user.role || 'user'}">
            ${user.role || 'user'}
          </span>
        </td>
        <td>
          ${user.email_verified ? 
            '<span class="badge badge-success"><i class="fas fa-check"></i> Yes</span>' : 
            '<span class="badge badge-warning"><i class="fas fa-times"></i> No</span>'}
        </td>
        <td>${formatDate(user.created_at)}</td>
        <td>${user.last_login ? formatDate(user.last_login) : 'Never'}</td>
        <td class="action-cell">
          <button class="btn-icon btn-edit" onclick="editUser(${user.id})" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon btn-delete" onclick="deleteUser(${user.id}, '${escapeHtml(user.email)}')" title="Delete">
            <i class="fas fa-trash-alt"></i>
          </button>
          ${!user.email_verified ? 
            `<button class="btn-icon btn-verify" onclick="verifyUser(${user.id})" title="Verify Email">
              <i class="fas fa-check-circle"></i>
            </button>` : ''}
        </td>
      </tr>
    `).join('');
  }

  // Edit user
  window.editUser = async function(userId) {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load user');
      }
      
      const user = data.user;
      document.getElementById('edit-user-id').value = user.id;
      document.getElementById('edit-fullname').value = user.full_name;
      document.getElementById('edit-email').value = user.email;
      document.getElementById('edit-role').value = user.role || 'user';
      document.getElementById('edit-verified').checked = user.email_verified;
      
      document.getElementById('edit-user-modal').style.display = 'flex';
    } catch (error) {
      console.error('Error loading user:', error);
      alert('Failed to load user details');
    }
  };

  // Close edit modal
  window.closeEditModal = function() {
    document.getElementById('edit-user-modal').style.display = 'none';
  };

  // Save user changes
  document.getElementById('edit-user-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const userId = document.getElementById('edit-user-id').value;
    const userData = {
      full_name: document.getElementById('edit-fullname').value,
      email: document.getElementById('edit-email').value,
      role: document.getElementById('edit-role').value,
      email_verified: document.getElementById('edit-verified').checked
    };
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user');
      }
      
      alert('User updated successfully');
      closeEditModal();
      loadUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user: ' + error.message);
    }
  });

  // Delete user
  window.deleteUser = async function(userId, email) {
    if (!confirm(`Are you sure you want to delete user: ${email}?\n\nThis action cannot be undone.`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }
      
      alert('User deleted successfully');
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user: ' + error.message);
    }
  };

  // Verify user email
  window.verifyUser = async function(userId) {
    try {
      const response = await fetch(`/api/admin/users/${userId}/verify`, {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify user');
      }
      
      alert('User email verified successfully');
      loadUsers();
    } catch (error) {
      console.error('Error verifying user:', error);
      alert('Failed to verify user: ' + error.message);
    }
  };

  // Update analytics
  function updateAnalytics(users) {
    const totalUsers = users.length;
    const verifiedUsers = users.filter(u => u.email_verified).length;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeToday = users.filter(u => {
      if (!u.last_login) return false;
      const loginDate = new Date(u.last_login);
      return loginDate >= today;
    }).length;
    
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const newThisMonth = users.filter(u => {
      const createdDate = new Date(u.created_at);
      return createdDate >= firstDayOfMonth;
    }).length;
    
    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('verified-users').textContent = verifiedUsers;
    document.getElementById('active-today').textContent = activeToday;
    document.getElementById('new-this-month').textContent = newThisMonth;
  }

  // Search users
  document.getElementById('user-search')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#users-tbody tr');
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });

  // Refresh users button
  document.getElementById('refresh-users')?.addEventListener('click', loadUsers);

  // Utility functions
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    const modal = document.getElementById('edit-user-modal');
    if (e.target === modal) {
      closeEditModal();
    }
  });

  // Initialize admin panel
  async function init() {
    const isAdmin = await checkAdminAccess();
    if (!isAdmin) return;
    
    initTabs();
    loadUsers();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
