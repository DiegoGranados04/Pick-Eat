document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  const lista = document.getElementById("listaDirecciones");

  if (!user || user.role !== "cliente") {
    window.location.href = "/pages/login.html";
    return;
  }

const direcciones = [
  "Av. Universidad #123, Colima, Col.",
  "Calle Palma #56, Villa de Álvarez"
];

contenedor.innerHTML = direcciones.map(d =>
  `<div class="direccion-card">
     <i>📍</i> ${d}
   </div>`
).join("");
});
