document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
  <footer class="footer">
    <div class="footer-inner container">
      <div class="footer-brand">
        <div class="footer-logo-wrap">
          <img src="img/Logo.png" alt="Envision Philippines" class="footer-logo-img" />
        </div>

        <p class="footer-tagline">Transforming Lives,<br>Empowering the Nation!</p>
        <p class="footer-desc">A community-based movement building visionary leaders and empowering local communities
          across the Philippines.</p>
      </div>

      <div class="footer-divider-v"></div>

      <div class="footer-contact">
        <h4 class="footer-contact-title">Get in Touch</h4>
        <div class="footer-contact-list">
          <div class="footer-contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <p>Lingap Baste Center, Brgy. San Isidro,<br>Tarlac City, Tarlac, Philippines 2300</p>
          </div>

          <div class="footer-contact-item">
            <i class="fas fa-phone-alt"></i>
            <p>+63 965 396 8800</p>
          </div>

          <div class="footer-contact-item">
            <i class="fas fa-envelope"></i>
            <p><a href="mailto:weenvisionphilippines@gmail.com">weenvisionphilippines@gmail.com</a></p>
          </div>

          <div class="footer-contact-item">
            <i class="fab fa-facebook-f"></i>
            <p>Envision Philippines</p>
          </div>

          <div class="footer-contact-item">
            <i class="fab fa-instagram"></i>
            <p>@weenvisionph</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">&copy; 2025 Envision Philippines. All rights reserved.</p>
    </div>
  </footer>
  `;

  document.getElementById("footer-container").innerHTML = footerHTML;
});
