function loadHeader() {
    const html = `
<header class="header" id="header">
    <div class="logo">Developer<span>.</span></div>
    <nav class="nav">
        <ul class="nav-list">
            <li><a href="#home" class="nav-link active">Home</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#projects" class="nav-link">Projects</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
    </nav>
    <div class="menu-toggle" id="mobile-menu">
        <i class="fas fa-bars"></i>
    </div>
</header>
    `;
    
    document.getElementById('header-placeholder').innerHTML = html;
    initHeaderLogic();
}

function initHeaderLogic() {
    const mobileMenu = document.querySelector('#mobile-menu');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuIcon = mobileMenu.querySelector('i');
    const header = document.querySelector('#header');

    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', () => {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            });
        });
    }

    // Header Background on Scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.8)';
                header.style.boxShadow = 'none';
            }

            // Active Link tracking
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
}
