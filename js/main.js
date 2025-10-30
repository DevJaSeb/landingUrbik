// ==== MENÚ HAMBURGUESA ====
const menu = document.querySelector("#mobile-menu");
const navLinks = document.querySelector(".nav-links");
// ==== CAMBIO AUTOMÁTICO DE PALABRAS EN HERO ====
const palabras = ["negocio", "tienda online", "empresa"];
let indice = 0;
const palabraSpan = document.getElementById("cambio-palabra");

setInterval(() => {
  indice = (indice + 1) % palabras.length;
  palabraSpan.style.opacity = 0;
  setTimeout(() => {
    palabraSpan.textContent = palabras[indice];
    palabraSpan.style.opacity = 1;
  }, 400);
}, 2500);

// Crear fondo overlay
const overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Cerrar menú al tocar fuera
overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
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

// === SWITCH MODO CLARO/OSCURO ===
const switchToggle = document.getElementById('switch');

switchToggle.addEventListener('change', () => {
  document.body.classList.toggle('light-mode');
});
