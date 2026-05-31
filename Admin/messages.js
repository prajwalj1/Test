// Retrieve messages from localStorage
function getMessages() {
    const messages = localStorage.getItem('portfolio_messages');
    return messages ? JSON.parse(messages) : [];
}

// Save messages to localStorage
function saveMessages(messages) {
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));
}

// Render messages in the Admin table
function renderAdminMessages(searchQuery = '') {
    const tableBody = document.getElementById('admin-messages-list');
    if (!tableBody) return;

    let messages = getMessages();
    
    // Filter messages if there's a search query
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        messages = messages.filter(msg => 
            msg.name.toLowerCase().includes(query) || 
            msg.email.toLowerCase().includes(query) ||
            msg.message.toLowerCase().includes(query)
        );
    }

    tableBody.innerHTML = '';

    if (messages.length === 0) {
        if (searchQuery !== '') {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No messages found matching your search.</td></tr>';
        } else {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No messages received yet.</td></tr>';
        }
        return;
    }

    messages.forEach(msg => {
        const row = document.createElement('tr');
        
        // Truncate long messages for the table view
        const shortMessage = msg.message.length > 50 ? msg.message.substring(0, 50) + '...' : msg.message;
        
        row.innerHTML = `
            <td style="white-space: nowrap; font-size: 0.9rem;">${msg.date || 'Unknown Date'}</td>
            <td><strong>${msg.name}</strong></td>
            <td><a href="mailto:${msg.email}" style="color: var(--primary); text-decoration: none;">${msg.email}</a></td>
            <td title="${msg.message}">${shortMessage}</td>
            <td>
                <button class="btn-delete" onclick="deleteMessage('${msg.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Delete a message
window.deleteMessage = function(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        let messages = getMessages();
        messages = messages.filter(m => m.id !== id);
        saveMessages(messages);
        renderAdminMessages();
    }
};

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderAdminMessages();

    // Attach Search Listener
    const searchInput = document.getElementById('message-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderAdminMessages(e.target.value);
        });
    }
});
