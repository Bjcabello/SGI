# Backend Dockerfile
FROM python:3.13-slim

# Variables de entorno
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    postgresql-client \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .

# Instalar dependencias Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Crear directorios para archivos
RUN mkdir -p /app/media /app/staticfiles

# Exponer puerto
EXPOSE 8000

# Script de inicio
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "sgi.wsgi:application"]
