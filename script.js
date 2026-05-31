// when mouse is moved it will glow in bg 
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});

document.addEventListener('DOMContentLoaded', () => {

    if (typeof loadHeader === 'function') {
        loadHeader();
    }
    
    if (typeof loadFooter === 'function') {
        loadFooter();
    }
  
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();


    const contactForm = document.getElementById('contact-form');
    if(contactForm){
        contactForm.addEventListener('submit', (e)=>{
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            const newMessage = {
                id: Date.now().toString(),
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleString()
            };

            let messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            messages.unshift(newMessage);
            localStorage.setItem('portfolio_messages', JSON.stringify(messages));

            // redirect to message viewer which will display the submitted message
            window.location.href = 'message.html';
        });
    }
});
