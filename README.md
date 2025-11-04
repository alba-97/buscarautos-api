# BuscarAutos - Backend API

## Instrucciones para correr el proyecto

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar MySQL con Docker:
```bash
docker-compose up -d
```
Esto iniciará un contenedor de MySQL y creará automáticamente la base de datos `buscarautos`.

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con:
```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=buscarautos
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Seedear la base de datos:
```bash
npm run seed
```
Esto creará las tablas necesarias e insertará los datos iniciales de los autos.

El servidor estará disponible en `http://localhost:8000`

### Requisitos previos
- Docker y Docker Compose instalados
- Node.js 18 o superior

## Decisiones técnicas

### Framework y Herramientas
- **Node.js con Express**: Framework web rápido y minimalista
- **TypeScript**: Para type safety y mejor experiencia de desarrollo
- **MySQL2**: Driver de MySQL con soporte para Promises y connection pooling
- **ts-node-dev**: Para desarrollo con hot-reload

### Arquitectura y Organización
- **Estructura modular**:
  - `/routes`: Endpoints de la API
  - `/database`: Conexión y operaciones de base de datos
  - `/uploads`: Archivos estáticos (imágenes)

### Características Implementadas
**Base de datos**:
   - Connection pool para mejor rendimiento
   - Inicialización automática de tablas
   - Script de seed para datos iniciales

**Endpoints**:
   - GET `/api/cars`: Lista de autos con filtros
     - Búsqueda por texto
     - Filtro por marca
     - Rango de precios
     - Paginación (6 items por página)
   - GET `/api/cars/:id`: Detalle de auto
   - GET `/api/cars/brands`: Lista de marcas únicas
   - GET `/api/cars/max-price`: Precio máximo disponible
