document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("catalogoTiendas");

  if (contenedor) {
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
          <button class="btn" onclick="mostrarDetallePedido('${tienda.nombre}')">Ver detalles</button>
        </div>
      `;
      contenedor.appendChild(card);
    });
  }
});

function mostrarDetallePedido(nombre) {
  document.getElementById("detallePedido").style.display = "block";
  document.getElementById("cafeteriaNombre").textContent = nombre;

  const metodo = Math.random() < 0.5 ? "Recolección" : "Entrega a domicilio"; // Simulado
  document.getElementById("metodoElegido").textContent = metodo;

  const precio = 45;
  const envio = metodo === "Entrega a domicilio" ? 10 : 0;
  const total = precio + envio;

  document.getElementById("precioProducto").textContent = precio;
  document.getElementById("costoEnvio").textContent = envio;
  document.getElementById("totalPedido").textContent = total;

  // Icono y texto para el paso 4 según método
  document.getElementById("iconoPaso4").textContent = metodo === "Entrega a domicilio" ? "🚚" : "🏃‍♂️";
  document.getElementById("etiquetaPaso4").textContent = metodo === "Entrega a domicilio" ? "En camino" : "Recolectando";

  const pasos = [
    document.getElementById("paso1"),
    document.getElementById("paso2"),
    document.getElementById("paso3"),
    document.getElementById("paso4"),
    document.getElementById("paso5")
  ];

  const barra = document.querySelector(".barra-estado");
  const clasesEstado = [
    "estado-aceptado",
    "estado-preparando",
    "estado-listo",
    metodo === "Entrega a domicilio" ? "estado-en-camino" : "estado-recolectado",
    "estado-entregado"
  ];

  // Reset visual
  pasos.forEach(p => p.classList.remove("activo"));
  barra.className = "barra-estado " + clasesEstado[0];
  pasos[0].classList.add("activo");

  // Avance por intervalos
  let index = 0;
  const intervalo = setInterval(() => {
    if (index < pasos.length - 1) {
      pasos[++index].classList.add("activo");
      barra.className = "barra-estado " + clasesEstado[index];
    } else {
      clearInterval(intervalo);
    }
  }, 10000);
}

function cerrarDetallePedido() {
  document.getElementById("detallePedido").style.display = "none";
}
