document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("onboardingForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar todos los datos del formulario (manteniendo estructura original)
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value.trim();
    }

    // Crear objeto cliente con estructura para dashboard
    const clienteCompleto = {
      // Datos base para dashboard
      id: generarIdUnico(),
      codigo: generarCodigoReferencia(),
      tipo: 'ecommerce',
      empresa: data.nombreEmpresa || 'Sin nombre',
      contacto: 'Cliente E-commerce',
      email: generarEmailTemporal(data.nombreEmpresa),
      telefono: generarTelefonoTemporal(),
      timestamp: new Date().toISOString(),
      estado: 'completado',
      
      // Datos originales del formulario (sin cambios)
      datosOriginales: data
    };

    // Guardar en localStorage para dashboard (clave unificada)
    const submissions = JSON.parse(localStorage.getItem("botiaSubmissions") || "[]");
    submissions.push(clienteCompleto);
    localStorage.setItem("botiaSubmissions", JSON.stringify(submissions));

    // Mantener también el localStorage original (para compatibilidad)
    const submissionsOriginal = JSON.parse(localStorage.getItem("onboardingSubmissions") || "[]");
    submissionsOriginal.push({ 
      id: Date.now(), 
      date: new Date().toLocaleString(), 
      data: data 
    });
    localStorage.setItem("onboardingSubmissions", JSON.stringify(submissionsOriginal));

    // Mostrar código de referencia en mensaje de éxito
    const codeElement = document.getElementById('referenceCode');
    if (codeElement) {
      codeElement.textContent = clienteCompleto.codigo;
    }

    // Mostrar en consola (manteniendo línea original)
    console.log("✅ Respuesta guardada:", data);
    console.log("📊 Datos para dashboard:", clienteCompleto);

    // Ocultar formulario y mostrar mensaje de éxito (original)
    form.style.display = "none";
    successMessage.style.display = "block";

    // Opcional: redirigir o enviar a servidor (comentario original mantenido)
    // Aquí puedes llamar a fetch() para enviar a un backend
  });

  // Funciones auxiliares
  function generarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  function generarCodigoReferencia() {
    const año = new Date().getFullYear();
    const numero = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `BOT-${año}-${numero}`;
  }

  function generarEmailTemporal(nombreEmpresa) {
    if (!nombreEmpresa) return 'cliente@ecommerce.com';
    const empresa = nombreEmpresa.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 10);
    return `${empresa}@ecommerce.com`;
  }

  function generarTelefonoTemporal() {
    return '999' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  }
});