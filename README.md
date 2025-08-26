# Sistema de Onboarding - Botia.tech

## Descripción del Proyecto
Sistema web completo para automatizar el proceso de onboarding de nuevos clientes de Botia.tech, especializada en chatbots inteligentes para e-commerce y servicios profesionales.

## Objetivo Principal
Reducir el tiempo de incorporación de nuevos clientes de 3 días a 30 minutos mediante formularios inteligentes y un dashboard de gestión centralizado.

## Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3, JavaScript ES6+ (Vanilla)
- **Framework CSS:** CSS personalizado + Outfit font
- **Gráficos:** Chart.js
- **Persistencia:** LocalStorage API
- **Compatibilidad:** Chrome 90+, Firefox 88+, Safari 14+

## Estructura del Proyecto

```
proyecto/
├── index.html              # Landing page principal
├── ecommerce.html          # Formulario onboarding E-commerce
├── servicio.html          # Formulario onboarding Servicios
├── dashboard.html         # Panel administrativo
├── css/
│   ├── styles.css         # Estilos landing page
│   ├── ecommerce.css      # Estilos formulario e-commerce
│   └── servicio.css       # Estilos formulario servicios
├── javascript/
│   ├── ecommerce.js       # Lógica formulario e-commerce
│   └── servicio.js        # Lógica formulario servicios
├── img/                   # Imágenes del proyecto
└── README.md
```

## Características Principales

### Landing Page (index.html)
- Presentación principal con hero section
- Tarjetas interactivas con efecto flip 3D
- Navegación hacia formularios específicos
- Diseño responsive y accesible

### Formularios de Onboarding
- **E-commerce:** Captura información específica de tiendas online
- **Servicios:** Recolecta datos para empresas de servicios profesionales
- Validación en tiempo real
- Guardado automático en localStorage
- Generación de códigos de referencia únicos

### Dashboard Administrativo
- Vista consolidada de todos los clientes
- Métricas en tiempo real (total, completados, por tipo)
- Filtros avanzados por tipo, estado y búsqueda
- Gráficos interactivos (distribución y estados)
- Modal con detalles completos del cliente
- Exportación de datos en JSON

## Flujo de Datos

### 1. Captura de Información
```javascript
// Estructura unificada para ambos tipos
const clienteCompleto = {
  id: "único_generado",
  codigo: "BOT-2024-XXXX",
  tipo: "ecommerce" | "servicios",
  empresa: "nombre_empresa",
  contacto: "persona_contacto", 
  email: "generado@automatico.com",
  telefono: "999XXXXXX",
  timestamp: "ISO_date",
  estado: "completado",
  datosOriginales: { /* todos los campos del formulario */ }
}
```

### 2. Persistencia
- **Clave principal:** `botiaSubmissions` (para dashboard)
- **Clave compatible:** `onboardingSubmissions` (mantenida)
- Datos almacenados en JSON en localStorage

### 3. Dashboard
- Lectura automática desde localStorage
- Actualización de métricas en tiempo real
- Generación de datos demo si no hay registros

## JavaScript Reescrito

### Cambios Implementados

**ecommerce.js:**
- Reescritura completa manteniendo estructura original
- Doble guardado para compatibilidad
- Funciones auxiliares modulares
- Generación automática de datos faltantes

**servicio.js:** 
- Misma filosofía de reescritura
- Compatibilidad con estructura previa
- Unificación de datos para dashboard

### Funciones Principales
- `generarIdUnico()`: Crea identificadores únicos
- `generarCodigoReferencia()`: Códigos BOT-YYYY-XXXX
- `generarEmailTemporal()`: Emails basados en empresa
- `generarTelefonoTemporal()`: Teléfonos de prueba

## Instalación y Uso

### Requisitos Previos
- Navegador moderno con soporte ES6+
- Servidor web local (recomendado Live Server)

### Pasos de Instalación
1. Clonar o descargar el proyecto
2. Asegurar que la estructura de carpetas esté intacta
3. Abrir `index.html` en un servidor local
4. Navegar entre las páginas usando los enlaces

### Flujo de Usuario
1. **Inicio:** `index.html` → Seleccionar tipo de servicio
2. **Formulario:** `ecommerce.html` o `servicio.html` → Completar datos
3. **Confirmación:** Recibir código de referencia
4. **Gestión:** `dashboard.html` → Ver todos los registros

## Integración Técnica

### Compatibilidad con Código Previo
- Mantiene toda la funcionalidad original
- Conserva event listeners y DOM manipulation
- Preserva console.log y comentarios originales
- Añade funcionalidad sin romper estructura

### Datos del Dashboard
- Métricas automáticas por tipo de cliente
- Filtros dinámicos con JavaScript vanilla
- Gráficos responsivos con Chart.js
- Modal con detalles específicos por tipo

## Personalización

### Colores del Sistema
- **E-commerce:** `#005fdd` (azul)  
- **Servicios:** `#DA17E8` (magenta)
- **Éxito:** `#4CAF50` (verde)
- **Info:** `#2196F3` (azul claro)

### Extensibilidad
- Fácil adición de nuevos tipos de formulario
- Sistema modular de funciones JavaScript
- CSS organizado por página
- Estructura de datos flexible

## Consideraciones Técnicas

### Limitaciones
- Datos almacenados localmente (no persistentes entre dispositivos)
- Sin autenticación de usuarios
- Diseñado para demostración/prototipo

### Mejoras Futuras Sugeridas
- Backend para persistencia real
- Sistema de autenticación
- API REST para integración
- Notificaciones por email
- Exportación a Excel/PDF

## Equipo de Desarrollo
- **Frontend & Integración:** [Tu nombre]
- **Diseño & UX:** [Compañero 1]
- **Formularios & Styling:** [Compañero 2]

## Metodología
- Desarrollo colaborativo con Git
- Integración progresiva de componentes
- Respeto por código existente
- Enfoque en compatibilidad y extensibilidad

## Licencia
Proyecto académico - Uso educativo

---

**Nota:** Este README refleja la integración completa del sistema con JavaScript reescrito manteniendo compatibilidad con el código original del equipo.