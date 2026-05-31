function loadFooter() {
    const html = `
<footer class="footer">
    <div class="footer-content">
        <div class="footer-logo">Prajwal Gautam</div>
         <p>Software Developer — Building responsive, accessible web experiences.</p>
        <div class="social-links">
            <a href="https://github.com/prajwalj1"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/prajwal-gautam-692037301/"><i class="fab fa-linkedin"></i></a>
            <a href="https://x.com/Prajwal85158181"><i class="fab fa-twitter"></i></a>
        </div>
    </div>
    <div class="footer-bottom"
        <p>&copy; <span id="year"></span> Prajwal Gautam. All Rights Reserved.</p>
    </div>
</footer>
    `;
    
    document.getElementById('footer-placeholder').innerHTML = html;
}
