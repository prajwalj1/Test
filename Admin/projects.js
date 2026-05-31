// Retrieve projects from localStorage
function getProjects() {
    const projects = localStorage.getItem('portfolio_projects');
    return projects ? JSON.parse(projects) : [];
}

// Save projects to localStorage
function saveProjects(projects) {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
}

// Render projects in the Admin table
function renderAdminProjects(searchQuery = '') {
    const tableBody = document.getElementById('admin-projects-list');
    if (!tableBody) return;

    let projects = getProjects();
    
    // Filter projects if there's a search query
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        projects = projects.filter(project => 
            project.title.toLowerCase().includes(query) || 
            project.category.toLowerCase().includes(query)
        );
    }

    tableBody.innerHTML = '';

    if (projects.length === 0) {
        if (searchQuery !== '') {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 2rem; color: var(--text-muted);">No projects found matching your search.</td></tr>';
        } else {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 2rem; color: var(--text-muted);">No projects added yet.</td></tr>';
        }
        return;
    }

    projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'">
            </td>
            <td><strong>${project.title}</strong></td>
            <td><span style="background: rgba(99, 102, 241, 0.1); color: var(--primary); padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.85rem;">${project.category}</span></td>
            <td>
                <button class="btn-delete" onclick="deleteProject('${project.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add a new project
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-project-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const newProject = {
                id: Date.now().toString(), // Unique ID based on timestamp
                title: document.getElementById('project-title').value,
                category: document.getElementById('project-category').value,
                image: document.getElementById('project-image').value,
                description: document.getElementById('project-desc').value
            };

            const projects = getProjects();
            projects.unshift(newProject); // Add to the beginning of the list
            saveProjects(projects);

            form.reset();
            renderAdminProjects();
            
            alert('Project added successfully! It is now visible on your main portfolio site.');
        });
    }

    // Initial render
    renderAdminProjects();

    // Attach Search Listener
    const searchInput = document.getElementById('project-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderAdminProjects(e.target.value);
        });
    }
});

// Delete a project
window.deleteProject = function(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        let projects = getProjects();
        projects = projects.filter(p => p.id !== id);
        saveProjects(projects);
        renderAdminProjects();
    }
};
