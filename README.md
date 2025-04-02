# Ejercicio_API_web
API de Gestión de incidentes (tickets)

Las tecnologías que estoy utilizando para el laboratorio:

API -> Node.js
DB -> MYSQL

Para ejecutar el programa se deben de tener instaladas
estas tecnologías en la pc.

Instrucciones para ejecutar la API

npm init -y
npm install express
npm install cors
npm install mysql2
node incident.js

control + click para abrir el url

¿Cómo probar la API? Ingresar lo siguiente en postman

POST

{
    "employee_id": 1,
    "equipment_id": 1,
    "description": "Descripcion del problema que presento el equipo"
}

PUT

{
    "status": "EN PROCESO"
}
