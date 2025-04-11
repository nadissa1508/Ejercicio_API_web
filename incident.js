/*
 * Referencias de la conexión a la base de datos
 * https://blogs.perficient.com/2023/08/03/how-to-connect-node-js-with-mysql-database/
 * https://www.w3schools.com/nodejs/nodejs_mysql.asp 
 */


const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 

app.use(express.static('public'));

//traer la db
const db = require ('./tickets_incidents_db');
db.startDB();

app.use(cors());
app.use(bodyParser.json());


//crear un reporte

app.post('/incidents', (req, res) => {
    let { employee_id, equipment_id, description} = req.body;

    //logica para verificar que description sea minimo de 10 caracteres
    if (description.trim().length < 10 || !description ) {
        res.status(400).json({ error: 'La descripción debe tener al menos 10 caracteres' });
        return
    }

    if (employee_id === undefined) {
        res.status(400).json({ error: 'Debe ingresar el ID del empleado que hace el reporte' });
        return
    }

    if (equipment_id === undefined) {
        res.status(400).json({ error: 'Debe ingresar el ID del equipo del que se hace el reporte' });
        return
    }

    db.cn.query("insert into Incident (employee_id, equipment_id, description) values(?,?,?)", [employee_id, equipment_id, description], function (err, result) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true, message: "Incidente creado exitosamente"});
    });
}
);

//obtener todos los incidentes

app.get('/incidents', (req, res) => {

    db.cn.query("SELECT  i.id, CONCAT(e.name, ' ', e.lastname) AS reporter, eq.equipment, i.description, i.status, i.created_at FROM Incident AS i JOIN Employee AS e ON i.employee_id = e.id JOIN Equipment AS eq ON i.equipment_id = eq.id", (err, rows) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.json({ incidents: rows });
    });
});

//obtener incidente por id

app.get('/incidents/:id', (req, res) => {
    const incident_id = req.params.id;

    if (isNaN(incident_id)) {
        return res.status(400).json({ error: 'El ID debe ser un número' });
    }
    
    db.cn.query("SELECT  i.id, CONCAT(e.name, ' ', e.lastname) AS reporter, eq.equipment, i.description, i.status, i.created_at FROM Incident AS i JOIN Employee AS e ON i.employee_id = e.id JOIN Equipment AS eq ON i.equipment_id = eq.id WHERE i.id = ?", [incident_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Incidente no encontrado' });
        }
        res.json({ incidents: rows });
    });
});

// actualizar el estado de un incidente

app.put('/incidents/:id', (req, res) =>{
    const { status } = req.body;
    const incident_id = req.params.id;

    if (status !== 'PENDIENTE' && status !== 'EN PROCESO' && status !== 'RESUELTO') {
        res.status(400).json({ error: 'Estatus del reporte invalido'})
        return
    }
    db.cn.query("UPDATE Incident set status = ?  WHERE id = ?", [status, incident_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Incidente no encontrado' });
        }
        res.json({ success: true, message: "Estado actualizado correctamente" });
    });
})

// eliminar un incidente por id

app.delete('/incidents/:id', (req, res) =>{
    const incident_id = req.params.id;
    db.cn.query("DELETE FROM Incident WHERE id = ?", [incident_id],  (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Incidente no encontrado' });
        }
        res.json({ success: true, message: "Incidente eliminado correctamente" });
    });
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
