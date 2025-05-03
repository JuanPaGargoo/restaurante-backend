# Restaurante Backend

Este es el backend para la gestión de un restaurante. Incluye funcionalidades para manejar categorías, platillos, mesas, cuentas, pedidos y pagos.

## Requisitos previos

Antes de iniciar el proyecto, asegúrate de tener instalado lo siguiente:

- **PostgreSQL**: Para la base de datos.
- **Node.js**: Versión 22.14 o superior.
- **npm**: Incluido con Node.js.

## Configuración inicial

1. **Clona el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd restaurante-backend

## Crea la base de datos:
Abre tu cliente de PostgreSQL y crea una base de datos llamada restaurante:

CREATE DATABASE restaurante;

## Crea el archivo .env:
En la raíz del proyecto, crea un archivo llamado .env con la siguiente configuración:

DB_NAME=restaurante
DB_USER=tu_usuario por defecto postgres
DB_PASS=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
PORT=3000

## Instala las dependecias:
Abre la consola con ctrl + j
ingresa el siguiente comando:
npm install

## Inicia el servidor
igresa el siguiete comando:
npm run dev

## Para detener el servidor:
Presiona ctrl + c en consola