document.getElementById("onboardingForm").addEventListener("submit", function (e) {
      e.preventDefault();

      // Opcional: guardar datos en consola
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      console.log("Respuestas del cliente:", data);

      // Ocultar formulario y mostrar mensaje
      document.querySelector("form").style.display = "none";
      document.getElementById("successMessage").style.display = "block";

      // Aquí puedes agregar envío a Google Sheets, email, etc.
    });