// Protect Admin Pages
if (!localStorage.getItem('adminSession')) {
    window.location.href = 'admin.html';
}

function loadSidebar() {
    // Injecting HTML directly via JS string so it works flawlessly WITHOUT a local web server (no CORS errors).
    const html = `
<aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
        <div class="admin-logo">
            <h2>Admin</h2>
        </div>
        <i class="fas fa-bars" id="sidebar-toggle"></i>
    </div>
    <ul class="sidebar-menu">
        <li><a href="dashboard.html"><i class="fas fa-home"></i> <span>Overview</span></a></li>
        <li><a href="projects.html"><i class="fas fa-project-diagram"></i> <span>Projects</span></a></li>
        <li><a href="messages.html"><i class="fas fa-envelope"></i> <span>Messages</span></a></li>
    </ul>
    <div class="sidebar-footer">
        <a href="#" onclick="handleLogout(event)" class="logout-btn"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a>
    </div>
</aside>
    `;
    document.getElementById('sidebar-placeholder').innerHTML = html;
    initSidebarLogic();
}

window.handleLogout = function(event) {
    event.preventDefault();
    // Clear user session data used by admin.js
    localStorage.removeItem('adminSession');
    // Redirect back to the public portfolio site
    window.location.href = '../index.html';
};

function initSidebarLogic() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('mobile-active');
            } else {
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    // Set active menu item dynamically based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    
    // Automatically hide the sidebar on mobile when ANY link inside it is clicked
    const allLinks = document.querySelectorAll('.sidebar a');
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('mobile-active')) {
                sidebar.classList.remove('mobile-active');
            }
        });
    });

    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath === href) {
            item.parentElement.classList.add('active');
        } else {
            item.parentElement.classList.remove('active');
        }
    });
}

// Automatically load sidebar on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
});
