document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("catalogoTiendas");
  
    if (container) {
      const cafeterias = [
        { nombre: "Cafetería Central", tiempo: "20-30 min", imagen: "central.jpg" },
        { nombre: "Snack Zona C", tiempo: "15-25 min", imagen: "snack.jpg" },
        { nombre: "Coffee Telemática", tiempo: "10-20 min", imagen: "telematica.jpg" }
      ];
  
      cafeterias.forEach(tienda => {
        const card = document.createElement("div");
        card.className = "card-tienda";
        card.innerHTML = `
          <img src="/images/${tienda.imagen}" alt="${tienda.nombre}">
          <div class="contenido">
            <h3>${tienda.nombre}</h3>
            <p>Tiempo estimado: ${tienda.tiempo}</p>
          </div>
        `;
        container.appendChild(card);
      });
    }
  });
  