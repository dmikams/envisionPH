document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
  <nav id="navbar">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="img/Logo.png" alt="Envision Philippines" class="nav-logo-img" />
      </a>

      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links" id="nav-links">
        <li><a href="index.html#home">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="team.html">Team</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </div>
  </nav>
  `;

  document.getElementById("navbar-container").innerHTML = navbarHTML;
  // Note: Hamburger menu functionality is handled in js/script.js
});