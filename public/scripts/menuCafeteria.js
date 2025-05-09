document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const cafeteria = CAFETERIAS.find(c => c.id === id);
  const productos = PRODUCTOS_CAFETERIA[id] || [];

  const info = document.getElementById("infoCafeteria");
  const contenedor = document.getElementById("menuProductos");

  if (cafeteria && info && contenedor) {
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
          <button class="btn" onclick="alert('Pedido realizado')">Pedir</button>
        </div>
      `;
      contenedor.appendChild(card);
    });
  }
});
