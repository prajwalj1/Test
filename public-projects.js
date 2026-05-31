document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('public-projects-grid');
    if (!grid) return;

    // DATA IS FETCHED FORM THE LOCOL STORGE
    let projects = localStorage.getItem('portfolio_projects');
    
    // DEFAULT DUMMY PROJECTS IF LOCAL STORAGE IS EMPTY
    if (!projects) {
        const defaultProjects = [
            {
                id: '1',
                title: 'E-commerce Platform',
                category: 'Web App',
                image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60',
                description: 'A responsive e-commerce web application built with modern JavaScript and best practices.'
            },
            {
                id: '2',
                title: 'Brand Redesign',
                category: 'Design',
                image: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=60',
                description: 'UI/UX focused project with accessibility-first approach.'
            },
            {
                id: '3',
                title: 'Fitness Tracker',
                category: 'Mobile',
                image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60',
                description: 'Cross-platform mobile prototype built with React Native.'
            }
        ];
        localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
        projects = JSON.stringify(defaultProjects);
    }

    const parsedProjects = JSON.parse(projects);

    if (parsedProjects.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1 / -1; padding: 2rem;">No projects to display yet. Add some from the admin dashboard!</p>';
        return;
    }

    grid.innerHTML = '';
    
    parsedProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'">
            <div class="card-body">
                <h3>${project.title}</h3>
                <p class="category">${project.category}</p>
                <p class="card-desc">${project.description}</p>
            </div>
        `;
        grid.appendChild(card);
    });
});
