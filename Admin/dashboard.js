document.addEventListener('DOMContentLoaded', () => {
    
    const statMessages = document.getElementById('stat-messages');
    const statProjects = document.getElementById('stat-projects');
    const activityList = document.getElementById('recent-activity-list');

    // Retrieve data from localStorage
    const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');

    // Update Stats
    if (statMessages) statMessages.textContent = messages.length;
    if (statProjects) statProjects.textContent = projects.length;

    // Combine and sort recent activity
    // We will simulate activity based on the actual items in localStorage
    let activities = [];

    projects.forEach(project => {
        // Projects don't have a date currently, so we simulate recent addition
        // In a real app, you'd save a timestamp when adding the project
        activities.push({
            type: 'project',
            text: `Added new project: ${project.title}`,
            time: 'Recently',
            icon: 'fa-briefcase',
            color: 'var(--accent)'
        });
    });

    // Map messages to activity items
    messages.forEach(msg => {
        activities.push({
            type: 'message',
            text: `New message from ${msg.name}`,
            time: msg.date || 'Recently',
            icon: 'fa-envelope',
            color: 'var(--secondary)'
        });
    });

    // If no activity, show a fallback message
    if (activities.length === 0) {
        if (activityList) {
            activityList.innerHTML = '<p style="color: var(--text-muted); padding: 1rem;">No recent activity to display.</p>';
        }
        return;
    }

    // Since we don't have exact timestamps for everything, we just limit to the latest 5 items total
    // (Assuming they were added somewhat chronologically recently based on how we shift arrays)
    const recentActivities = activities.slice(0, 5);

    // Render activity list
    if (activityList) {
        activityList.innerHTML = ''; // Clear fallback
        
        recentActivities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <i class="fas ${activity.icon}" style="color: ${activity.color};"></i>
                <div class="activity-details">
                    <p>${activity.text}</p>
                    <span>${activity.time}</span>
                </div>
            `;
            activityList.appendChild(item);
        });
    }
});
