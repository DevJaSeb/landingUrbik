// ==== MENÚ HAMBURGUESA ====
const menu = document.querySelector("#mobile-menu");
const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// ==== SCROLL SUAVE ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
    // Cierra el menú al hacer clic en móvil
    navLinks.classList.remove("active");
    menu.classList.remove("active");
  });
});

// ==== SCROLL REVEAL CASERO ====
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
});
