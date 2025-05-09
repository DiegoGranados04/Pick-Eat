document.addEventListener("DOMContentLoaded", () => {
  cargarComponentes();

  // Cliente - pedidos
  const clienteNombre = document.getElementById("clienteNombre");
  const clienteRol = document.getElementById("clienteRol");
  const contenedor = document.getElementById("contenedorProductos");

  if (clienteNombre && clienteRol && contenedor) {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || usuario.role !== "cliente") {
      window.location.href = "/pages/login.html";
      return;
    }

    clienteNombre.textContent = usuario.username;
    clienteRol.textContent = usuario.role;

    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      mostrarProductos(contenedor);
    }, 1200);
  }

  // Repartidor - entregas
  const repNombre = document.getElementById("repartidorNombre");
  const repRol = document.getElementById("repartidorRol");
  const entregas = document.getElementById("entregasPendientes");

  if (repNombre && repRol && entregas) {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || usuario.role !== "repartidor") {
      window.location.href = "/pages/login.html";
      return;
    }

    repNombre.textContent = usuario.username;
    repRol.textContent = usuario.role;

    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      cargarEntregas(entregas);
    }, 1000);
  }

  // Perfil
  const perfilNombre = document.getElementById("perfilNombre");
  const perfilRol = document.getElementById("perfilRol");

  if (perfilNombre && perfilRol) {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
      window.location.href = "/pages/login.html";
      return;
    }

    perfilNombre.textContent = usuario.username;
    perfilRol.textContent = usuario.role;
  }

  // Tiendas
  const contenedorTiendas = document.getElementById("contenedorTiendas");

  if (contenedorTiendas) {
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      cargarTiendas(contenedorTiendas);
    }, 1000);
  }
});

// ✅ Cargar navbar y footer con personalización incluida
function cargarComponentes() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (header) {
    fetch("/components/navbar.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;

        // Esperamos a que el DOM esté listo para evitar conflictos
        setTimeout(() => {
          if (typeof configurarNavbar === "function") {
            configurarNavbar();
          }
        }, 50);
      });
  }

  if (footer) {
    fetch("/components/footer.html")
      .then(res => res.text())
      .then(html => footer.innerHTML = html);
  }
}


// ✅ Personaliza dinámicamente la barra de navegación
function configurarNavbar() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const navLinks = document.getElementById("navLinks");
  const hamburguesaBtn = document.getElementById("hamburguesaBtn");
  const usuarioInfo = document.getElementById("usuarioInfo");

  if (!navLinks) return;

  let links = `
    <li><a href="/index.html">Inicio</a></li>
    <li><a href="/pages/tiendas.html">Cafeterías</a></li>
  `;

  if (usuario) {
    if (usuario.role === "cliente") {
      links += `
        <li><a href="/pages/pedidos.html">Pedidos</a></li>
        <li><a href="/pages/favoritos.html">Favoritos</a></li>
        <li class="dropdown">
          <a href="#">Perfil ▾</a>
          <ul class="dropdown-menu">
            <li><a href="/pages/perfil.html">Información</a></li>
            <li><a href="/pages/direcciones.html">Dirección/es</a></li>
            <li><a href="/pages/metodos-pago.html">Métodos de Pago</a></li>
          </ul>
        </li>
        <li><a href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
      `;
    } else if (usuario.role === "repartidor") {
      links += `
        <li><a href="/pages/entregas.html">Entregas</a></li>
        <li class="dropdown">
          <a href="#">Perfil ▾</a>
          <ul class="dropdown-menu">
            <li><a href="/pages/perfil.html">Información</a></li>
          </ul>
        </li>
        <li><a href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
      `;
    }

    if (usuarioInfo) {
      usuarioInfo.innerHTML = `<span class="nombre-usuario">👤 ${usuario.username}</span>`;
    }
  } else {
    links += `
      <li class="dropdown">
        <a href="#">Usuario ▾</a>
        <ul class="dropdown-menu">
          <li><a href="/pages/login.html">Iniciar Sesión</a></li>
          <li><a href="/pages/register.html">Registrarse</a></li>
        </ul>
      </li>
    `;
  }

  navLinks.innerHTML = links;

  // ✅ Menú hamburguesa solo en mobile
  if (hamburguesaBtn) {
    hamburguesaBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("mobile-visible");
    });

    document.addEventListener("click", (e) => {
      const clickedOutside = !navLinks.contains(e.target) && !hamburguesaBtn.contains(e.target);
      if (clickedOutside) {
        navLinks.classList.remove("mobile-visible");
      }
    });
  }
}



// Otras funciones sin cambios
function mostrarProductos(contenedor) {
  const productos = [
    { nombre: "Torta de jamón", precio: "$30" },
    { nombre: "Pizza individual", precio: "$45" },
    { nombre: "Ensalada fresca", precio: "$35" },
  ];

  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto-card slideIn";
    card.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>${p.precio}</p>
      <button class="btn waiting-pulse" onclick="realizarPedido('${p.nombre}')">Pedir</button>
    `;
    contenedor.appendChild(card);
  });
}

function realizarPedido(nombre) {
  const confirmacion = document.getElementById("pedidoConfirmado");
  confirmacion.textContent = `✅ Pedido de "${nombre}" realizado con éxito.`;
  confirmacion.style.display = "block";

  setTimeout(() => {
    confirmacion.style.display = "none";
  }, 3000);
}

function cargarEntregas(container) {
  const pedidos = [
    { cliente: "Juan", producto: "Torta de jamón", ubicacion: "Edificio C", hora: "12:30" },
    { cliente: "Ana", producto: "Pizza", ubicacion: "Biblioteca", hora: "12:45" },
    { cliente: "Luis", producto: "Ensalada", ubicacion: "Laboratorio 3", hora: "13:00" },
  ];

  pedidos.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto-card slideIn";
    card.innerHTML = `
    <h3>Pedido de ${p.cliente}</h3>
    <p><strong>Producto:</strong> ${p.producto}</p>
    <p><strong>Ubicación:</strong> ${p.ubicacion}</p>
    <p><strong>Hora:</strong> 🕒 ${p.hora}</p>
    <button class="btn waiting-pulse" onclick="entregarPedido(this)">Tomar pedido</button>
  `;
  
    container.appendChild(card);
  });
}

function entregarPedido(button) {
  const card = button.parentElement;
  button.remove(); // Eliminar el botón una vez presionado

  const estado = document.createElement("div");
  estado.className = "barra-estado";
  estado.innerHTML = `
    <div class="paso activo" id="paso1">
      <span>📥</span>
      <p>Aceptado</p>
    </div>
    <div class="paso" id="paso2">
      <span>👨‍🍳</span>
      <p>Ve a la tienda</p>
    </div>
    <div class="paso" id="paso3">
      <span>🍽️</span>
      <p>Recoge</p>
    </div>
    <div class="paso" id="paso4">
      <span>🚚</span>
      <p>Lleva pedido</p>
    </div>
    <div class="paso" id="paso5">
      <span>✅</span>
      <p>Entregado</p>
    </div>
  `;
  card.appendChild(estado);

  const pasos = estado.querySelectorAll(".paso");

  let index = 0;
  const interval = setInterval(() => {
    if (index > 0) pasos[index - 1].classList.remove("activo");
    if (index < pasos.length) {
      pasos[index].classList.add("activo");
      index++;
    } else {
      clearInterval(interval);
      document.getElementById("entregaConfirmada").style.display = "block";
      setTimeout(() => {
        document.getElementById("entregaConfirmada").style.display = "none";
      }, 2500);
    }
  }, 1500);
}


function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "/index.html";
}

function cargarTiendas(container) {
  const tiendas = [
    {
      nombre: "Cafetería Central",
      ubicacion: "Campus Central",
      horario: "7:00am - 3:00pm",
      imagen: "/images/img-central.jpg",
      link: "./menu-cafeteria-central.html"
    },
    {
      nombre: "Café Telemática",
      ubicacion: "Campus Central",
      horario: "8:00am - 2:30pm",
      imagen: "https://via.placeholder.com/400x250?text=Caf%C3%A9+Telem%C3%A1tica",
      link: "./menu-cafe-telematica.html"
    },
    {
      nombre: "Snack Plaza",
      ubicacion: "Campus Central",
      horario: "9:00am - 4:00pm",
      imagen: "https://via.placeholder.com/400x250?text=Snack+Plaza",
      link: "./menu-snack-plaza.html"
    }
  ];
  

  tiendas.forEach(t => {
    const card = document.createElement("div");
    card.className = "producto-card slideIn";
    card.innerHTML = `
      <img src="${t.imagen}" alt="${t.nombre}" style="width: 100%; border-radius: 8px;" />
      <h3>${t.nombre}</h3>
      <p><strong>Ubicación:</strong> ${t.ubicacion}</p>
      <p><strong>Horario:</strong> ${t.horario}</p>
      <button class="btn btn-secundario" onclick="window.location.href='${t.link}'">Ver menú</button>
    `;
    container.appendChild(card);
  });
}
;