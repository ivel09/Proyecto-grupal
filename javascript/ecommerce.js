document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("onboardingForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar todos los datos del formulario
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value.trim();
    }

    // Guardar en localStorage (opcional, para persistencia)
    const submissions = JSON.parse(localStorage.getItem("onboardingSubmissions") || "[]");
    submissions.push({ id: Date.now(), date: new Date().toLocaleString(), data });
    localStorage.setItem("onboardingSubmissions", JSON.stringify(submissions));

    // Mostrar en consola (para revisión)
    console.log("✅ Respuesta guardada:", data);

    // Ocultar formulario y mostrar mensaje de éxito
    form.style.display = "none";
    successMessage.style.display = "block";

    // Opcional: redirigir o enviar a servidor
    // Aquí puedes llamar a fetch() para enviar a un backend
  });
});