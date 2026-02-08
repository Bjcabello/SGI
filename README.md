# 🚀 Sistema de Gestión de Inventario (SGI)

Sistema completo de gestión de inventario con autenticación, desarrollado con **Django REST Framework** + **Angular 19** + **PostgreSQL** + **Bootstrap 5**.

## 📋 Características

### Backend (Django + DRF)
- ✅ API REST completa
- ✅ Autenticación JWT
- ✅ CRUD de Productos, Categorías, Proveedores
- ✅ Control de stock y alertas de stock bajo
- ✅ Panel de administración de Django
- ✅ PostgreSQL como base de datos

### Frontend (Angular 19)
- ✅ Componentes standalone (sin módulos)
- ✅ Bootstrap 5 para UI
- ✅ Dashboard con estadísticas
- ✅ Login y Registro de usuarios
- ✅ Guards de autenticación
- ✅ Interceptors JWT automático
- ✅ CRUD completo de todas las entidades

## 🛠️ Tecnologías

**Backend:**
- Python 3.13
- Django 6.0
- Django REST Framework 3.16
- PostgreSQL 17
- JWT Authentication

**Frontend:**
- Angular 19
- Bootstrap 5
- TypeScript
- RxJS

**DevOps:**
- Docker & Docker Compose
- Nginx
- Gunicorn

## 📦 Instalación

### Opción 1: Con Docker (Recomendado)

```bash
# Clonar o navegar al proyecto
cd C:\Users\bryan\Desktop\sgi

# Levantar todos los servicios
docker-compose up --build

# En otra terminal, crear superusuario
docker-compose exec backend python manage.py createsuperuser

# Acceder a:
# - Frontend: http://localhost
# - Backend API: http://localhost:8000/api/
# - Admin: http://localhost:8000/admin/
```

Ver guía completa en [DOCKER_DEPLOY.md](DOCKER_DEPLOY.md)

### Opción 2: Desarrollo Local

#### Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Configurar .env (ver ejemplo abajo)

# Migraciones
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver
```

**Archivo .env del backend:**
```env
DEBUG=True
SECRET_KEY=tu-clave-secreta-aqui
DB_NAME=sgi_db
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432
ALLOWED_HOSTS=localhost,127.0.0.1
```

#### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
ng serve

# Acceder a: http://localhost:4200
```

## 📁 Estructura del Proyecto

```
sgi/
├── backend/
│   ├── sgi/                 # Configuración del proyecto
│   ├── users/               # App de usuarios
│   ├── inventory/           # App de inventario (productos, movimientos)
│   ├── categories/          # App de categorías
│   ├── suppliers/           # App de proveedores
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/        # Servicios, guards, interceptors, models
│   │   │   ├── features/    # Componentes de funcionalidades
│   │   │   │   ├── auth/    # Login, Register
│   │   │   │   ├── dashboard/
│   │   │   │   ├── products/
│   │   │   │   ├── categories/
│   │   │   │   └── suppliers/
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   └── styles.scss
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
├── DOCKER_DEPLOY.md
└── README.md
```

## 🔐 Credenciales por Defecto (Docker)

**PostgreSQL:**
- Database: `sgi_db`
- User: `sgi_user`
- Password: `sgi_password_2024`

**Django Admin:**
Crear con: `docker-compose exec backend python manage.py createsuperuser`

## 🚀 Uso del Sistema

1. **Registrarse o Iniciar Sesión**
2. **Crear Categorías** (Ej: Electrónica, Ropa, Alimentos)
3. **Crear Proveedores** (Empresas que suministran productos)
4. **Crear Productos** (Asignando categoría y proveedor)
5. **Dashboard** mostrará estadísticas y alertas de stock bajo

## 📊 Endpoints de la API

### Autenticación
- `POST /api/auth/register/` - Registrar usuario
- `POST /api/auth/login/` - Login (devuelve JWT tokens)
- `POST /api/auth/token/refresh/` - Refrescar token
- `GET /api/auth/profile/` - Perfil del usuario actual

### Productos
- `GET /api/products/` - Listar productos
- `POST /api/products/` - Crear producto
- `GET /api/products/{id}/` - Detalle de producto
- `PUT /api/products/{id}/` - Actualizar producto
- `DELETE /api/products/{id}/` - Eliminar producto
- `GET /api/products/low_stock/` - Productos con stock bajo

### Categorías
- `GET /api/categories/` - Listar categorías
- `POST /api/categories/` - Crear categoría
- `GET /api/categories/{id}/` - Detalle
- `PUT /api/categories/{id}/` - Actualizar
- `DELETE /api/categories/{id}/` - Eliminar

### Proveedores
- `GET /api/suppliers/` - Listar proveedores
- `POST /api/suppliers/` - Crear proveedor
- `GET /api/suppliers/{id}/` - Detalle
- `PUT /api/suppliers/{id}/` - Actualizar
- `DELETE /api/suppliers/{id}/` - Eliminar

### Movimientos de Stock
- `GET /api/stock-movements/` - Listar movimientos
- `POST /api/stock-movements/` - Registrar movimiento

## 🐛 Solución de Problemas

### Backend no conecta a PostgreSQL
```bash
# Verificar que PostgreSQL esté corriendo
# En Docker:
docker-compose logs db

# Local:
# Verificar servicio de PostgreSQL en Windows
```

### Frontend no se comunica con Backend
```bash
# Verificar CORS en backend/sgi/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "http://localhost",
]
```

### Error de migraciones
```bash
# Eliminar migraciones conflictivas
rm backend/*/migrations/0*.py

# Recrear migraciones
python manage.py makemigrations
python manage.py migrate
```

## 📝 Scripts Útiles

```bash
# Backend: Resetear base de datos
python manage.py flush

# Backend: Crear datos de ejemplo
python manage.py shell < seed_data.py

# Frontend: Build de producción
ng build --configuration production

# Docker: Ver logs en tiempo real
docker-compose logs -f

# Docker: Reiniciar servicios
docker-compose restart
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

## 👨‍💻 Desarrollador

Bryan Cabello - Sistema de Gestión de Inventario

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**
