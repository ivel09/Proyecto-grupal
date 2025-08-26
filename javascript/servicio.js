document.getElementById("onboardingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Capturar datos del formulario (estructura original)
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  // Crear objeto cliente completo para dashboard
  const clienteCompleto = {
    // Información base para dashboard
    id: generarIdUnico(),
    codigo: generarCodigoReferencia(), 
    tipo: 'servicios',
    empresa: data.nombreEmpresa || 'Sin nombre',
    contacto: 'Cliente Servicios',
    email: generarEmailTemporal(data.nombreEmpresa),
    telefono: generarTelefonoTemporal(),
    timestamp: new Date().toISOString(),
    estado: 'completado',
    
    // Datos específicos del servicio
    tipoServicio: data.tipoServicio,
    publicoObjetivo: data.publicoObjetivo,
    clientesMensuales: data.clientesMensuales,
    gestionReservas: data.gestionReservas,
    canalesAtencion: data.canalesAtencion,
    
    // Datos completos originales
    datosOriginales: data
  };

  // Guardar en localStorage para dashboard
  const submissions = JSON.parse(localStorage.getItem("botiaSubmissions") || "[]");
  submissions.push(clienteCompleto);
  localStorage.setItem("botiaSubmissions", JSON.stringify(submissions));

  // Mostrar código de referencia
  const codeElement = document.getElementById('referenceCode');
  if (codeElement) {
    codeElement.textContent = clienteCompleto.codigo;
  }

  // Mostrar datos en consola (manteniendo línea original)
  console.log("Respuestas del cliente:", data);
  console.log("Datos para dashboard:", clienteCompleto);

  // Ocultar formulario y mostrar mensaje (estructura original)
  document.querySelector("form").style.display = "none";
  document.getElementById("successMessage").style.display = "block";

  // Aquí puedes agregar envío a Google Sheets, email, etc. (comentario original)

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
    if (!nombreEmpresa) return 'cliente@servicios.com';
    const empresa = nombreEmpresa.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 10);
    return `${empresa}@servicios.com`;
  }

  function generarTelefonoTemporal() {
    return '999' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  }
});