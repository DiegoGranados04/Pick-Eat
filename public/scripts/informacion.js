document.addEventListener("DOMContentLoaded", () => {
  const info = document.getElementById("infoUsuario");
  const editarBtn = document.getElementById("editarBtn");
  const guardarBtn = document.getElementById("guardarBtn");
  const eliminarBtn = document.getElementById("eliminarBtn");

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (!usuario) {
    window.location.href = "/pages/login.html";
    return;
  }

  renderUsuario(usuario);

  editarBtn.addEventListener("click", () => {
    renderUsuarioEditable(usuario);
    editarBtn.style.display = "none";
    guardarBtn.style.display = "inline-block";
  });

  guardarBtn.addEventListener("click", () => {
    const nuevoNombre = document.getElementById("edit-nombre").value;
    const nuevoCorreo = document.getElementById("edit-correo").value;

    // Actualizar activo
    usuario.username = nuevoNombre;
    usuario.email = nuevoCorreo;
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Actualizar lista
    const index = usuarios.findIndex(u => u.email === usuario.email || u.username === usuario.username);
    if (index !== -1) {
      usuarios[index] = usuario;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    renderUsuario(usuario);
    guardarBtn.style.display = "none";
    editarBtn.style.display = "inline-block";
  });

  eliminarBtn.addEventListener("click", () => {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar tu cuenta?");
    if (!confirmacion) return;

    const nuevosUsuarios = usuarios.filter(u => u.username !== usuario.username);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    localStorage.removeItem("usuarioActivo");
    alert("Cuenta eliminada");
    window.location.href = "/index.html";
  });

  function renderUsuario(usuario) {
    info.innerHTML = `
      <div class="info-contenido">
        <img src="../images/user.jpg" alt="Foto de perfil" class="foto-perfil" onerror="this.style.display='none'">
        <div class="info-datos">
          <p><strong>Nombre:</strong> ${usuario.username}</p>
          <p><strong>Correo:</strong> ${usuario.email || "correo@ejemplo.com"}</p>
          <p><strong>Rol:</strong> ${usuario.role}</p>
        </div>
      </div>
    `;
  }

  function renderUsuarioEditable(usuario) {
    info.innerHTML = `
      <div class="info-contenido">
        <img src="../images/user.jpg" alt="Foto de perfil" class="foto-perfil" onerror="this.style.display='none'">
        <div class="info-datos">
          <label><strong>Nombre:</strong></label>
          <input type="text" id="edit-nombre" value="${usuario.username}" />
          <label><strong>Correo:</strong></label>
          <input type="email" id="edit-correo" value="${usuario.email || ""}" />
          <p><strong>Rol:</strong> ${usuario.role}</p>
        </div>
      </div>
    `;
  }
});
