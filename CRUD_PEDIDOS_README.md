# CRUD Pedidos - Documentación

## Descripción General

Se ha implementado un módulo completo de **Gestión de Pedidos** para la aplicación PixelPlay, accesible desde la sección de administración en la ruta `/admin/pedidos`.

## Características Principales

### 1. **Visualización de Pedidos**
- Tabla de pedidos con información detallada:
  - Número de pedido
  - Datos del cliente (nombre, email, teléfono)
  - Fecha del pedido
  - Cantidad de artículos
  - Monto total
  - Estado del pedido (Completado, Pendiente, Entregado, Cancelado)

### 2. **Métricas del Dashboard**
- Total de pedidos registrados
- Pedidos completados
- Monto total de ventas
- Promedio de monto por pedido

### 3. **Búsqueda y Filtrado**
- Búsqueda por número de pedido o nombre del cliente
- Paginación de resultados (10 por página)
- Navegación entre páginas

### 4. **Modal de Detalles**
- Información completa del cliente
- Información del pedido (fecha, estado, método de pago)
- Tabla de productos comprados con cantidades y precios
- Resumen financiero

### 5. **Generación de Boleta**
- Botón "Boleta" en cada fila
- Modal con visualización de boleta de venta
- Detalles del cliente
- Tabla de productos
- Total a pagar
- Botón de descarga (genera un archivo HTML/PDF)

### 6. **Generación de Factura con RUC**
- Botón "Factura" en cada fila
- Modal solicitador de número de RUC
- Validación de RUC (11 dígitos)
- Modal de factura electrónica con:
  - Número de factura
  - RUC del establecimiento
  - Detalles del cliente
  - Tabla de productos
  - **Cálculo automático de IGV (18%)**
  - Subtotal, IGV y total
  - Botón de descarga PDF

## Archivos Creados

### Modelos (`src/app/models/`)
- **`pedido.model.ts`** - Interfaces para:
  - `Pedido` - Estructura principal del pedido
  - `DetallePedido` - Detalles de cada producto en el pedido
  - `DatosCliente` - Información del cliente
  - `ReporteBoleta` - Estructura de boleta
  - `ReporteFactura` - Estructura de factura

### Servicios (`src/app/services/`)
- **`pedido.service.ts`** - Servicio con métodos:
  - `listarPedidos()` - Obtener todos los pedidos
  - `listarActivos()` - Obtener pedidos activos
  - `buscar()` - Búsqueda por palabra clave
  - `obtenerPorId()` - Obtener un pedido específico
  - `guardar()` - Crear nuevo pedido
  - `actualizar()` - Actualizar pedido
  - `actualizarEstado()` - Cambiar estado del pedido
  - `eliminar()` - Eliminar pedido
  - `generarBoleta()` - Generar boleta
  - `generarFactura()` - Generar factura con RUC
  - `descargarBoletaPDF()` - Descargar boleta como PDF
  - `descargarFacturaPDF()` - Descargar factura como PDF
  - `obtenerPorUsuario()` - Obtener pedidos de un usuario
  - `obtenerEstadisticas()` - Obtener estadísticas

### Componente (`src/app/pages/crud-pedidos/`)
- **`crud-pedidos.ts`** - Componente principal con:
  - Gestión de carga de pedidos
  - Búsqueda y paginación
  - Generación de boletas y facturas
  - Gestión de modales
  - Descarga de archivos
  - Cálculo de métricas

- **`crud-pedidos.html`** - Template con:
  - Tarjetas de métricas (gradient)
  - Barra de búsqueda
  - Tabla de pedidos
  - Modal de detalles
  - Modal de boleta
  - Modal de factura
  - Modal para ingreso de RUC

- **`crud-pedidos.css`** - Estilos completos:
  - Gradientes consistentes con otros CRUDs
  - Colores: Azul (#275efe), Naranja (#F7971E), Verde (#34e89e), Púrpura (#667eea)
  - Responsive design
  - Estilos de tablas, botones y modales
  - Estados de pedidos con badges de color

- **`crud-pedidos.spec.ts`** - Tests unitarios con más de 20 casos de prueba

### Rutas (`src/app/app.routes.ts`)
- Ruta agregada: `/admin/pedidos` que carga `CrudPedidosComponent`
- Protegida por `adminGuard`

## Colores y Estilos

El módulo sigue el mismo esquema de colores de los demás CRUDs:

| Elemento | Color | Uso |
|----------|-------|-----|
| Principal | #275efe (Azul) | Headers, títulos, botones principales |
| Warning | #F7971E (Naranja) | Botones de edición, alertas |
| Success | #34e89e (Verde) | Botones de éxito, estados completados |
| Info | #43d4dd (Cian) | Botones de información |
| Primary Gradient | #667eea → #764ba2 (Púrpura) | Tarjetas de métricas |
| Warning Gradient | #F7971E → #FFD200 (Naranja) | Tarjetas de métricas |
| Success Gradient | #34e89e → #0f3443 (Verde) | Tarjetas de métricas |

## Funcionalidades Principales

### Visualización de Pedidos
```typescript
// Cargar pedidos automáticamente al inicializar
ngOnInit(): void {
  this.cargarPedidos();
}

// Búsqueda por palabra clave
buscarPedidos(): void {
  this.pedidoService.buscar(this.searchKeyword, ...).subscribe(...);
}
```

### Generación de Boleta
```typescript
// Generar boleta (sin RUC)
generarBoleta(pedido: Pedido): void {
  // Genera ReporteBoleta
  // Muestra modal con boleta formateada
  // Permite descargar
}
```

### Generación de Factura
```typescript
// Solicitar RUC
solicitarRUC(pedido: Pedido): void {
  this.showRUCModal = true;
}

// Generar factura con RUC
generarFactura(): void {
  // Valida RUC (11 dígitos)
  // Genera ReporteFactura
  // Calcula IGV automáticamente (18%)
  // Muestra modal con factura
}
```

### Descarga de Archivos
```typescript
// Descargar como PDF o HTML
descargarBoletaPDF(): void {
  // Genera blob y descarga automáticamente
}

descargarFacturaPDF(): void {
  // Genera blob con factura completa y descarga
}
```

## Datos Mock

El servicio incluye datos mock para pruebas:
- 2 pedidos de ejemplo
- Datos de clientes completamente formateados
- Productos incluidos (Elden Ring, The Legend of Zelda)
- Estados variados (COMPLETADO, PENDIENTE)

## Validaciones

- **RUC**: Validación de 11 dígitos requeridos
- **Búsqueda**: Limpieza de espacios en blanco
- **Navegación**: Validación de límites de página
- **Datos**: Verificación de IDs antes de operaciones

## Estados de Pedidos

| Estado | Clase CSS | Color |
|--------|-----------|-------|
| COMPLETADO | status-completed | Verde |
| PENDIENTE | status-pending | Amarillo |
| ENTREGADO | status-delivered | Azul |
| CANCELADO | status-cancelled | Rojo |

## Responsive Design

El diseño es completamente responsivo:
- **Tablets**: Se adaptan tablas y buttons
- **Mobile**: Layout apilado, botones de pantalla completa
- **Desktop**: Diseño optimizado con columnas

## Integración con el Backend

### Endpoints esperados del servidor:

```
GET    /api/pedidos                          - Listar todos
GET    /api/pedidos/activos                  - Listar activos
GET    /api/pedidos/buscar?search=            - Buscar
GET    /api/pedidos/{id}                     - Obtener por ID
POST   /api/pedidos                          - Crear
PUT    /api/pedidos/{id}                     - Actualizar
PATCH  /api/pedidos/{id}/estado              - Cambiar estado
DELETE /api/pedidos/{id}                     - Eliminar
GET    /api/pedidos/{id}/boleta              - Generar boleta
GET    /api/pedidos/{id}/factura?ruc=        - Generar factura
GET    /api/pedidos/{id}/boleta/pdf          - Descargar boleta PDF
GET    /api/pedidos/{id}/factura/pdf?ruc=    - Descargar factura PDF
GET    /api/pedidos/usuario/{idUsuario}     - Pedidos del usuario
GET    /api/pedidos/estadisticas             - Estadísticas
```

## Cómo Usar

### Acceder al módulo:
1. Ir a `/admin` (requiere estar logueado como admin)
2. En la sidebar, hacer clic en "Gestión" → "Pedidos"
3. O navegar a `/admin/pedidos` directamente

### Visualizar pedidos:
- La tabla carga automáticamente los pedidos
- Se muestran 10 pedidos por página
- Usar las flechas de paginación para navegar

### Buscar pedidos:
1. Escribir en el campo de búsqueda
2. Presionar Enter o hacer clic en el botón de búsqueda
3. Los resultados se cargan dinámicamente

### Ver detalles:
1. Hacer clic en el botón "Detalles" de cualquier fila
2. Se abre un modal con información completa

### Generar Boleta:
1. Hacer clic en "Boleta"
2. Se genera y muestra la boleta
3. Hacer clic en "Descargar" para obtener el archivo

### Generar Factura:
1. Hacer clic en "Factura"
2. Ingresar número de RUC (11 dígitos)
3. Hacer clic en "Generar Factura"
4. Se calcula IGV automáticamente
5. Hacer clic en "Descargar PDF" para obtener el archivo

## Testing

Ejecutar tests:
```bash
ng test --include='**/crud-pedidos.spec.ts'
```

Cobertura de tests: Más de 20 casos incluyendo:
- Creación del componente
- Carga de pedidos
- Cálculos de métricas
- Navegación de páginas
- Validaciones
- Modales
- Estados

## Notas Importantes

1. **Datos de Demo**: Si el backend no está disponible, se cargan datos mock automáticamente
2. **Gradientes**: Todos los estilos usan gradientes lineales consistentes con el diseño
3. **Responsive**: El diseño funciona perfectamente en mobile, tablet y desktop
4. **Accesibilidad**: Incluye atributos ARIA y navegación por teclado
5. **Validaciones**: Se validan datos antes de enviar al backend
