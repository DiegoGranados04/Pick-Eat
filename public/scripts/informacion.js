document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  const info = document.getElementById("infoUsuario");

  if (!user) {
    window.location.href = "/pages/login.html";
    return;
  }

  info.innerHTML = `
    <p><strong>Usuario:</strong> ${user.username}</p>
    <p><strong>Correo:</strong> ${user.email || "correo@ejemplo.com"}</p>
    <p><strong>Rol:</strong> ${user.role}</p>
  `;
});
