document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario || usuario.role !== "cliente") {
    window.location.href = "/pages/login.html";
    return;
  }

  const favRest = document.getElementById("favRestaurante");
  const favComida = document.getElementById("favComida");

  const historial = JSON.parse(localStorage.getItem("historialPedidos_" + usuario.username)) || [];

  const conteoRestaurantes = {};
  const conteoComidas = {};

  historial.forEach(p => {
    conteoRestaurantes[p.restaurante] = (conteoRestaurantes[p.restaurante] || 0) + 1;
    conteoComidas[p.comida] = (conteoComidas[p.comida] || 0) + 1;
  });

  const topRest = Object.entries(conteoRestaurantes).sort((a, b) => b[1] - a[1])[0];
  const topComida = Object.entries(conteoComidas).sort((a, b) => b[1] - a[1])[0];

  favRest.textContent = topRest ? `${topRest[0]} (${topRest[1]} pedidos)` : "Sin datos";
  favComida.textContent = topComida ? `${topComida[0]} (${topComida[1]} veces)` : "Sin datos";
});

// Función global para registrar pedidos
function registrarEnHistorial(restaurante, comida) {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario) return;

  const clave = `historialPedidos_${usuario.username}`;
  const historial = JSON.parse(localStorage.getItem(clave)) || [];

  historial.push({ restaurante, comida });
  localStorage.setItem(clave, JSON.stringify(historial));
}
