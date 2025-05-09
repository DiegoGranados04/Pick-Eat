document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("usuarioActivo"));
  const metodos = document.getElementById("metodosPago");

  if (!user || user.role !== "cliente") {
    window.location.href = "/pages/login.html";
    return;
  }

  const tarjetas = [
    { tipo: "Visa", terminacion: "1234" },
    { tipo: "MasterCard", terminacion: "5678" }
  ];

contenedor.innerHTML = tarjetas.map(t =>
  `<div class="tarjeta">
     <i>💳</i> ${t.tipo} - **** **** **** ${t.terminacion}
   </div>`
).join("");
});
