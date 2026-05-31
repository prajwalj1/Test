Project Name: Prajwal Gautam Portfolio & Admin Dashboard

========================================
HOW TO RUN THE PROJECT
========================================
1. Extract or download the project folder.
2. No local server or backend is required! 
3. To view the public portfolio, simply double-click "index.html" to open it in any modern web browser (Chrome, Firefox, Edge, etc.).
4. To view the Admin Dashboard, navigate to the "Admin" folder and double-click "dashboard.html".

Note: The dynamic functionality (saving projects, receiving messages) relies on the browser's "localStorage". This means everything works perfectly offline, but data is saved only in your current browser.

========================================
DUMMY LOGIN DETAILS
========================================
The login system is currently a frontend prototype. 

Username / Email: (Can be created directly from the login form)
Password:         (Can be created directly from the login form)

Because there is no backend server, any username and password you enter in the admin login page will generate an active session and let you in.

========================================
DYNAMIC DATA & LOCAL STORAGE
========================================
- Projects: The public portfolio page dynamically fetches all projects from the Admin Dashboard using your browser's "localStorage". 
  **Note:** If you have not created any projects in the Admin Dashboard yet (or if your localStorage is empty), the portfolio will automatically load 3 dummy placeholder projects so the design doesn't look empty. 
- Contact Form: Messages sent from the public site instantly appear in the Admin Messages Inbox.

========================================
FEATURES
========================================
- Responsive Mobile & Desktop Views
- Modular Components (Header, Footer, Sidebar) loaded dynamically without CORS issues.
- Dynamic Projects Grid: Add projects from the Admin Panel, and they automatically appear on the public portfolio.
- Live Contact Form: Messages sent from the public site instantly appear in the Admin Messages Inbox.
- Real-time search/filtering for both Projects and Messages inside the Admin dashboard.
