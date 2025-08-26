let clients = [];
let filteredClients = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateMetrics();
    renderTable();
    initCharts();
});

function loadData() {
    // Load from localStorage
    clients = JSON.parse(localStorage.getItem('botiaSubmissions') || '[]');
    
    // Add demo data if empty
    if (clients.length === 0) {
        clients = generateDemoData();
    }
    
    filteredClients = [...clients];
}

function generateDemoData() {
    const empresas = ['TechStore Pro', 'Consultores Lima', 'Fashion Boutique', 'Dr. Wellness', 'EduTech Solutions'];
    const tipos = ['ecommerce', 'servicios'];
    const estados = ['completado', 'iniciado'];
    const demo = [];
    
    for (let i = 0; i < 8; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 15));
        
        demo.push({
            codigo: `BOT-2024-${(1000 + i).toString()}`,
            empresa: empresas[Math.floor(Math.random() * empresas.length)],
            contacto: `Cliente ${i + 1}`,
            email: `cliente${i + 1}@example.com`,
            telefono: `999${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
            tipo: tipos[Math.floor(Math.random() * tipos.length)],
            estado: estados[Math.floor(Math.random() * estados.length)],
            timestamp: date.toISOString()
        });
    }
    return demo;
}

function updateMetrics() {
    const total = clients.length;
    const completados = clients.filter(c => c.estado === 'completado').length;
    const ecommerce = clients.filter(c => c.tipo === 'ecommerce').length;
    const servicios = clients.filter(c => c.tipo === 'servicios').length;

    document.getElementById('totalClientes').textContent = total;
    document.getElementById('completados').textContent = completados;
    document.getElementById('ecommerce').textContent = ecommerce;
    document.getElementById('servicios').textContent = servicios;
}

function renderTable() {
    const tbody = document.getElementById('clientsTable');
    tbody.innerHTML = '';

    filteredClients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.codigo}</td>
            <td>${client.empresa}</td>
            <td>${client.contacto}</td>
            <td>
                <span class="badge" style="background-color: ${client.tipo === 'ecommerce' ? 'var(--primary)' : 'var(--secondary)'};">
                    ${client.tipo === 'ecommerce' ? 'E-commerce' : 'Servicios'}
                </span>
            </td>
            <td>
                <span class="badge badge-${client.estado}">
                    ${client.estado === 'completado' ? 'Completado' : 'Iniciado'}
                </span>
            </td>
            <td>${new Date(client.timestamp).toLocaleDateString()}</td>
            <td>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" onclick="viewClient('${client.codigo}')" title="Ver detalles">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" onclick="editClient('${client.codigo}')" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteClient('${client.codigo}')" title="Eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterTable() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const type = document.getElementById('filterType').value;
    const status = document.getElementById('filterStatus').value;

    filteredClients = clients.filter(client => {
        const matchSearch = client.empresa.toLowerCase().includes(search) || 
                          client.contacto.toLowerCase().includes(search) ||
                          client.codigo.toLowerCase().includes(search);
        const matchType = !type || client.tipo === type;
        const matchStatus = !status || client.estado === status;
        
        return matchSearch && matchType && matchStatus;
    });

    renderTable();
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterType').value = '';
    document.getElementById('filterStatus').value = '';
    filteredClients = [...clients];
    renderTable();
}

function viewClient(codigo) {
    const client = clients.find(c => c.codigo === codigo);
    if (!client) return;

    const modal = new bootstrap.Modal(document.getElementById('clientModal'));
    const content = document.getElementById('modalContent');
    
    let specificInfo = '';
    if (client.tipo === 'ecommerce') {
        specificInfo = `
            <hr><h6>Información E-commerce:</h6>
            <p><strong>Rubro:</strong> ${client.rubro || 'N/A'}</p>
            <p><strong>Productos:</strong> ${client.cantidadProductos || 'N/A'}</p>
            <p><strong>Plataforma:</strong> ${client.plataforma || 'N/A'}</p>
        `;
    } else if (client.tipo === 'servicios') {
        specificInfo = `
            <hr><h6>Información Servicios:</h6>
            <p><strong>Tipo:</strong> ${client.tipoServicio || 'N/A'}</p>
            <p><strong>Clientes/mes:</strong> ${client.clientesMensuales || 'N/A'}</p>
            <p><strong>Reservas:</strong> ${client.gestionReservas || 'N/A'}</p>
        `;
    }
    
    content.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6">
                <strong>Código:</strong> ${client.codigo}
            </div>
            <div class="col-md-6">
                <strong>Empresa:</strong> ${client.empresa}
            </div>
            <div class="col-md-6">
                <strong>Contacto:</strong> ${client.contacto}
            </div>
            <div class="col-md-6">
                <strong>Email:</strong> ${client.email}
            </div>
            <div class="col-md-6">
                <strong>Teléfono:</strong> ${client.telefono}
            </div>
            <div class="col-md-6">
                <strong>Tipo:</strong> ${client.tipo}
            </div>
            <div class="col-md-6">
                <strong>Estado:</strong> ${client.estado}
            </div>
            <div class="col-md-6">
                <strong>Fecha:</strong> ${new Date(client.timestamp).toLocaleString()}
            </div>
        </div>
        ${specificInfo}
    `;
    
    document.querySelector('.modal-title').textContent = 'Detalle del Cliente';
    modal.show();
}

// EDITAR CLIENTE (Historia 1)
function editClient(codigo) {
    const client = clients.find(c => c.codigo === codigo);
    if (!client) return;

    const modal = new bootstrap.Modal(document.getElementById('clientModal'));
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <form id="editForm">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Empresa</label>
                    <input type="text" class="form-control" id="editEmpresa" value="${client.empresa}">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Contacto</label>
                    <input type="text" class="form-control" id="editContacto" value="${client.contacto}">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" id="editEmail" value="${client.email}">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Teléfono</label>
                    <input type="tel" class="form-control" id="editTelefono" value="${client.telefono}">
                </div>
            </div>
            <div class="mt-3">
                <button type="button" class="btn btn-success" onclick="saveEdit('${codigo}')">
                    <i class="bi bi-check"></i> Guardar Cambios
                </button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="bi bi-x"></i> Cancelar
                </button>
            </div>
        </form>
    `;
    
    document.querySelector('.modal-title').textContent = 'Editar Cliente';
    modal.show();
}

function saveEdit(codigo) {
    const clientIndex = clients.findIndex(c => c.codigo === codigo);
    if (clientIndex === -1) return;

    clients[clientIndex].empresa = document.getElementById('editEmpresa').value;
    clients[clientIndex].contacto = document.getElementById('editContacto').value;
    clients[clientIndex].email = document.getElementById('editEmail').value;
    clients[clientIndex].telefono = document.getElementById('editTelefono').value;
    clients[clientIndex].lastModified = new Date().toISOString();

    localStorage.setItem('botiaSubmissions', JSON.stringify(clients));
    filteredClients = [...clients];
    updateMetrics();
    renderTable();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('clientModal'));
    modal.hide();
    
    showNotification('Cliente actualizado correctamente', 'success');
}

// ELIMINAR CLIENTE (Historia 2)
function deleteClient(codigo) {
    if (!confirm('¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.')) return;
    
    const clienteName = clients.find(c => c.codigo === codigo)?.empresa || 'Cliente';
    
    clients = clients.filter(c => c.codigo !== codigo);
    filteredClients = filteredClients.filter(c => c.codigo !== codigo);
    
    localStorage.setItem('botiaSubmissions', JSON.stringify(clients));
    updateMetrics();
    renderTable();
    initCharts();
    
    showNotification(`${clienteName} eliminado correctamente`, 'warning');
}

// SISTEMA DE NOTIFICACIONES (Historia 3)
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification`;
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
    notification.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// SISTEMA DE BACKUP (Historia 4)
function createBackup() {
    const backup = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        data: clients,
        total: clients.length,
        metadata: {
            ecommerce: clients.filter(c => c.tipo === 'ecommerce').length,
            servicios: clients.filter(c => c.tipo === 'servicios').length,
            completados: clients.filter(c => c.estado === 'completado').length
        }
    };
    
    const dataStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `botia-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification(`Backup creado: ${backup.total} registros`, 'success');
}

function restoreBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const backup = JSON.parse(e.target.result);
                if (backup.data && Array.isArray(backup.data)) {
                    const confirmMsg = `¿Restaurar backup?\nFecha: ${new Date(backup.timestamp).toLocaleString()}\nRegistros: ${backup.total}\n\nEsto sobrescribirá todos los datos actuales.`;
                    
                    if (confirm(confirmMsg)) {
                        clients = backup.data;
                        filteredClients = [...clients];
                        localStorage.setItem('botiaSubmissions', JSON.stringify(clients));
                        updateMetrics();
                        renderTable();
                        initCharts();
                        showNotification(`Backup restaurado: ${backup.total} registros`, 'success');
                    }
                } else {
                    throw new Error('Formato de backup inválido');
                }
            } catch (error) {
                showNotification('Error al restaurar backup: archivo inválido', 'danger');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function initCharts() {
    // Type chart
    const typeCtx = document.getElementById('typeChart').getContext('2d');
    const ecommerce = clients.filter(c => c.tipo === 'ecommerce').length;
    const servicios = clients.filter(c => c.tipo === 'servicios').length;
    
    new Chart(typeCtx, {
        type: 'doughnut',
        data: {
            labels: ['E-commerce', 'Servicios'],
            datasets: [{
                data: [ecommerce, servicios],
                backgroundColor: ['#005fdd', '#DA17E8']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Status chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    const completado = clients.filter(c => c.estado === 'completado').length;
    const iniciado = clients.filter(c => c.estado === 'iniciado').length;
    
    new Chart(statusCtx, {
        type: 'bar',
        data: {
            labels: ['Completado', 'Iniciado'],
            datasets: [{
                label: 'Clientes',
                data: [completado, iniciado],
                backgroundColor: ['#4CAF50', '#2196F3']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function exportData() {
    const dataStr = JSON.stringify(clients, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `botia-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Datos exportados correctamente', 'success');
}