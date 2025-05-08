document.addEventListener("DOMContentLoaded", () => {
  setupRegister();
  setupLogin();
});

function setupRegister() {
  const registerForm = document.getElementById("registerForm");
  const message = document.getElementById("message");

  if (!registerForm) return;

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("regUser").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value;
    const confirmPass = document.getElementById("regConfirmPass").value;
    const role = document.getElementById("regRole").value;

    if (!username || !email || !password || !confirmPass || !role) {
      message.innerText = "Todos los campos son obligatorios.";
      message.style.color = "var(--color-alerta)";
      return;
    }

    if (password !== confirmPass) {
      message.innerText = "Las contraseñas no coinciden.";
      message.style.color = "var(--color-alerta)";
      return;
    }

    const users = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (users.find(u => u.username === username)) {
      message.innerText = "Ese usuario ya está registrado.";
      message.style.color = "var(--color-alerta)";
      return;
    }

    if (users.find(u => u.email === email)) {
      message.innerText = "Ese correo ya está en uso.";
      message.style.color = "var(--color-alerta)";
      return;
    }

    users.push({ username, email, password, role });
    localStorage.setItem("usuarios", JSON.stringify(users));

    message.innerText = "Registro exitoso. Puedes iniciar sesión.";
    message.style.color = "var(--color-exito)";
    registerForm.reset();
  });
}

function setupLogin() {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;

    const users = JSON.parse(localStorage.getItem("usuarios")) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      loginMessage.innerText = "Usuario o contraseña incorrectos.";
      loginMessage.style.color = "var(--color-alerta)";
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(user));

    if (user.role === "cliente") {
      window.location.href = "pedidos.html";
    } else if (user.role === "repartidor") {
      window.location.href = "entregas.html";
    } else {
      loginMessage.innerText = "Rol no reconocido.";
      loginMessage.style.color = "var(--color-alerta)";
    }
  });
}
