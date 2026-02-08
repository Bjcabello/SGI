# Guía de Despliegue con Docker

## 📦 Archivos Docker Creados

- ✅ `backend/Dockerfile` - Imagen del backend Django
- ✅ `backend/.dockerignore` - Archivos a ignorar
- ✅ `frontend/Dockerfile` - Imagen del frontend Angular
- ✅ `frontend/.dockerignore` - Archivos a ignorar
- ✅ `frontend/nginx.conf` - Configuración de nginx
- ✅ `docker-compose.yml` - Orquestación de servicios

## 🚀 Comandos para Desplegar

### 1. Construir y levantar todos los servicios
```bash
docker-compose up --build
```

### 2. Ejecutar en segundo plano (detached)
```bash
docker-compose up -d --build
```

### 3. Ver logs
```bash
# Todos los servicios
docker-compose logs -f

# Solo backend
docker-compose logs -f backend

# Solo frontend
docker-compose logs -f frontend

# Solo base de datos
docker-compose logs -f db
```

### 4. Detener servicios
```bash
docker-compose down
```

### 5. Detener y eliminar volúmenes (borra datos)
```bash
docker-compose down -v
```

## 🔧 Comandos Útiles

### Crear superusuario en Django
```bash
docker-compose exec backend python manage.py createsuperuser
```

### Ejecutar migraciones manualmente
```bash
docker-compose exec backend python manage.py migrate
```

### Ver contenedores en ejecución
```bash
docker-compose ps
```

### Entrar al contenedor backend
```bash
docker-compose exec backend bash
```

### Entrar a PostgreSQL
```bash
docker-compose exec db psql -U sgi_user -d sgi_db
```

### Reiniciar un servicio específico
```bash
docker-compose restart backend
docker-compose restart frontend
```

## 🌐 Acceso a la Aplicación

Una vez levantado:

- **Frontend**: http://localhost (puerto 80)
- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/
- **PostgreSQL**: localhost:5432

## 📝 Configuración de Producción

### Cambiar contraseñas y secretos

Edita `docker-compose.yml` y cambia:

```yaml
environment:
  SECRET_KEY: "TU-CLAVE-SUPER-SEGURA-AQUI"
  POSTGRES_PASSWORD: "TU-PASSWORD-SEGURA"
  DB_PASSWORD: "TU-PASSWORD-SEGURA"
```

### Agregar dominio propio

En `docker-compose.yml`, agrega tu dominio:

```yaml
environment:
  ALLOWED_HOSTS: "localhost,127.0.0.1,tudominio.com,www.tudominio.com"
```

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
```bash
# Espera a que PostgreSQL esté listo
docker-compose logs db
```

### Frontend no encuentra backend
Verifica que `nginx.conf` tenga:
```
proxy_pass http://backend:8000/api/;
```

### Permisos de archivos
```bash
docker-compose exec backend chmod -R 755 /app/media
docker-compose exec backend chmod -R 755 /app/staticfiles
```

### Reconstruir todo desde cero
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Arquitectura de Contenedores

```
┌─────────────────┐
│   Frontend      │  Puerto 80
│   (Angular +    │  
│    Nginx)       │  
└────────┬────────┘
         │
         │ API calls
         ▼
┌─────────────────┐
│   Backend       │  Puerto 8000
│   (Django +     │
│   Gunicorn)     │
└────────┬────────┘
         │
         │ SQL
         ▼
┌─────────────────┐
│   Database      │  Puerto 5432
│   (PostgreSQL)  │
└─────────────────┘
```

## 🔒 Volúmenes Persistentes

- `postgres_data` - Datos de PostgreSQL
- `static_volume` - Archivos estáticos de Django
- `media_volume` - Archivos subidos por usuarios

## ⚡ Producción en la Nube

Para desplegar en un servidor:

1. **Copia el proyecto al servidor**
2. **Instala Docker y Docker Compose**
3. **Configura variables de entorno**
4. **Ejecuta**: `docker-compose up -d --build`
5. **Configura nginx/caddy como reverse proxy** (opcional)
6. **Configura SSL con Let's Encrypt** (recomendado)

## 🎯 Siguiente Paso

Ejecuta en tu terminal:

```bash
cd C:\Users\bryan\Desktop\sgi
docker-compose up --build
```

Espera 2-3 minutos mientras se construyen las imágenes y se levantan los servicios.
