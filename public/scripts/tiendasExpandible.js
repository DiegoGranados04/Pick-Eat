document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("contenedorTiendas");

  const cafeterias = [
    {
      id: "central",
      nombre: "Cafetería Central",
      ubicacion: "Campus Central",
      horario: "7:00am - 3:00pm",
      descripcion: "Ofrece desayunos, tortas y bebidas calientes. Ideal para iniciar tu día.",
      imagen: "/images/central.jpg"
    },
    {
      id: "telematica",
      nombre: "Café Telemática",
      ubicacion: "Campus Central",
      horario: "8:00am - 2:30pm",
      descripcion: "Especialidad en snacks, frappés y bocadillos tech.",
      imagen: "/images/telematica.jpg"
    },
    {
      id: "snack",
      nombre: "Snack Plaza",
      ubicacion: "Campus Central",
      horario: "9:00am - 4:00pm",
      descripcion: "Comida rápida, antojitos y postres variados.",
      imagen: "/images/snack.jpg"
    }
  ];

  cafeterias.forEach((caf, index) => {
    const card = document.createElement("div");
    card.className = "tarjeta-tienda";
    card.innerHTML = `
      <div class="encabezado-tienda" onclick="toggleDetalle(${index})">
        <img src="${caf.imagen}" alt="${caf.nombre}">
        <div class="info">
          <h3>${caf.nombre}</h3>
          <p>${caf.ubicacion}</p>
          <p><small>${caf.horario}</small></p>
        </div>
        <span class="flecha">&#9662;</span>
      </div>
      <div class="detalle-tienda" id="detalle-${index}">
        <p>${caf.descripcion}</p>
        <button class="btn" onclick="window.location.href='./menu-cafeteria.html?id=${caf.id}'">Ver menú</button>
      </div>
    `;
    container.appendChild(card);
  });
});

function toggleDetalle(id) {
  const detalle = document.getElementById(`detalle-${id}`);
  detalle.classList.toggle("visible");
}
