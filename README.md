# Ejercicio_API_web
API de Gestión de incidentes (tickets)

Las tecnologías que estoy utilizando para el laboratorio:

API -> Node.js
DB -> MYSQL

instrucciones para ejecutar la API

npm install
node incident.js

control + click para abrir el url

Para probar el get

curl "http://localhost:3000/incidents"

Para probar el post

 curl -Uri "http://localhost:3000/incidents" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"nombre":"Nadissa"}' 