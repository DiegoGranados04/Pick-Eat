document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const cafeteria = typeof CAFETERIAS !== "undefined" ? CAFETERIAS.find(c => c.id === id) : null;
  const productos = typeof PRODUCTOS_CAFETERIA !== "undefined" ? PRODUCTOS_CAFETERIA[id] || [] : [];

  const info = document.getElementById("infoCafeteria");
  const contenedor = document.getElementById("menuProductos");

  // Validación básica para mostrar error si no hay ID válido
  if (!id || !cafeteria) {
    if (info) {
      info.innerHTML = `
        <div style="padding: 1rem; color: var(--color-error); font-weight: bold;">
          ❌ Cafetería no encontrada. Verifica el enlace o selecciona una cafetería válida.
        </div>
      `;
    }
    return;
  }

  // Mostrar información general de la cafetería
  info.innerHTML = `
    <div class="header-cafeteria">
      <img src="${cafeteria.imagen}" alt="${cafeteria.nombre}">
      <div>
        <h2>${cafeteria.nombre}</h2>
        <p>${cafeteria.ubicacion}</p>
        <p><strong>Horario:</strong> ${cafeteria.horario}</p>
      </div>
    </div>
    <img src="${cafeteria.mapa}" alt="Mapa" class="mapa-cafeteria" />
  `;

  // Mostrar productos
  if (contenedor && productos.length > 0) {
    productos.forEach(p => {
      const card = document.createElement("div");
      card.className = "producto-card";
      card.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <h4>${p.nombre}</h4>
        <p>${p.descripcion}</p>
        <p><strong>$${p.precio.toFixed(2)}</strong></p>
        <div class="cantidad">
          <input type="number" value="1" min="1" />
          <button class="btn" onclick="alert('Pedido de ${p.nombre} realizado')">Pedir</button>
        </div>
      `;
      contenedor.appendChild(card);
    });
  } else if (contenedor) {
    contenedor.innerHTML = `<p style="padding:1rem; color: var(--color-texto);">No hay productos disponibles para esta cafetería.</p>`;
  }
});
