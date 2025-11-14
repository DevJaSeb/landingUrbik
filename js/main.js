// ==== MENÚ HAMBURGUESA ====
const menu = document.querySelector("#mobile-menu");
const navLinks = document.querySelector(".nav-links");

// Crear overlay del menú
const overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

// Abrir / cerrar menú
menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Cerrar al tocar fuera del menú
overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
});


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


// ==== SCROLL SUAVE PARA ANCLAS ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute("href"));
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }

    // Cierra el menú en móvil
    navLinks.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
  });
});


// ==== SCROLL SUAVE OPTIMIZADO (SIN ERRORES) ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {

    const destino = this.getAttribute("href");

    // Evitar error cuando href="#" o vacío
    if (!destino || destino === "#") return;

    const elemento = document.querySelector(destino);

    // Si no existe ID, no hacer scroll
    if (!elemento) return;

    e.preventDefault();
    elemento.scrollIntoView({ behavior: "smooth" });

    // Cierra el menú móvil
    menu.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
  });
});


// ==== SCROLL REVEAL ====
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;

    if (revealTop < windowHeight - 150) {
      reveals[i].classList.add("active");
    }
  }
});


// ==== SWITCH MODO CLARO/OSCURO ====
const switchToggle = document.getElementById("switch");

switchToggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});


// ==== ENVÍO DEL FORMULARIO ====
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Estado inicial
  formStatus.textContent = "Enviando...";
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.6";
  submitBtn.style.cursor = "not-allowed";
  submitBtn.textContent = "Enviando...";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      form.reset();
      formStatus.textContent = "✅ ¡Gracias! Te contactaremos a la brevedad.";
      submitBtn.textContent = "Enviado ✔";
      submitBtn.style.backgroundColor = "#00e676";

      setTimeout(() => {
        submitBtn.textContent = "Solicitar cotización";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
        formStatus.textContent = "";
      }, 3000);
    } else {
      formStatus.textContent = "⚠️ Hubo un problema al enviar. Probá de nuevo.";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.textContent = "Solicitar cotización";
    }
  } catch (err) {
    formStatus.textContent = "❌ Error de conexión. Intentá nuevamente.";
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.textContent = "Solicitar cotización";
  }
});
