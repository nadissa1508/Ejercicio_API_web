/*
 * Referencias de la conexión a la base de datos
 * https://blogs.perficient.com/2023/08/03/how-to-connect-node-js-with-mysql-database/
 * https://www.w3schools.com/nodejs/nodejs_mysql.asp 
 */


const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001; 

app.use(express.static('public'));

//traer la db
const { pool, startDB, checkDBStatus } = require('./tickets_incidents_db');

startDB();

app.use(async (req, res, next) => {
    if (!await checkDBStatus()) {
        return res.status(503).json({ error: 'Servicio no disponible. Base de datos no conectada' });
    }
    next();
});

app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});


//crear un reporte

app.post('/incidents', async (req, res) => {
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

    try {
        const [result] = await pool.query("insert into Incident (employee_id, equipment_id, description) values(?,?,?)", [employee_id, equipment_id, description]);
        
        res.status(201).json({ success: true, message: "Incidente creado exitosamente"});
    } catch (err) {
        console.error('Error al crear incidente:', err);
        res.status(500).json({ error: err.message });
    }
}
);

//obtener todos los incidentes

app.get('/incidents', async (req, res) => {

    try {
        const [incidents] = await pool.query(`SELECT  i.id, CONCAT(e.name, ' ', e.lastname) AS reporter, eq.equipment, i.description, i.status, i.created_at FROM Incident AS i JOIN Employee AS e ON i.employee_id = e.id JOIN Equipment AS eq ON i.equipment_id = eq.id ORDER BY i.created_at DESC`);       
        res.json({ incidents });
    } catch (err) {
        console.error('Error al obtener incidentes:', err);
        res.status(404).json({ error: err.message });
    }
});

//obtener incidente por id

app.get('/incidents/:id', async (req, res) => {
    const incident_id = req.params.id;

    if (isNaN(incident_id)) {
        return res.status(400).json({ error: 'El ID debe ser un número' });
    }

    try {
        const [rows] = await pool.query("SELECT  i.id, CONCAT(e.name, ' ', e.lastname) AS reporter, eq.equipment, i.description, i.status, i.created_at FROM Incident AS i JOIN Employee AS e ON i.employee_id = e.id JOIN Equipment AS eq ON i.equipment_id = eq.id WHERE i.id = ?", [incident_id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Incidente no encontrado' });
        }
        
        res.json({ incident: rows[0] });
    } catch (err) {
        console.error('Error al obtener incidente:', err);
        res.status(500).json({ error: err.message });
    }
});

// actualizar el estado de un incidente

app.put('/incidents/:id', async (req, res)  =>{
    const { status } = req.body;
    const incident_id = req.params.id;

    if (status !== 'PENDIENTE' && status !== 'EN PROCESO' && status !== 'RESUELTO') {
        res.status(400).json({ error: 'Estatus del reporte invalido'})
        return
    }

    try {
        const [result] = await pool.query("UPDATE Incident set status = ?  WHERE id = ?",[status, incident_id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Incidente no encontrado' });
        }
        
        res.json({ success: true, message: "Estado actualizado correctamente",});
    } catch (err) {
        console.error('Error al actualizar incidente:', err);
        res.status(500).json({ error: err.message });
    }
})

// eliminar un incidente por id

app.delete('/incidents/:id', async (req, res)  =>{
    const incident_id = req.params.id;

    try {
        const [result] = await pool.query("DELETE FROM Incident WHERE id = ?",[incident_id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Incidente no encontrado' });
        }
        
        res.json({ success: true, message: "Incidente eliminado correctamente"});
    } catch (err) {
        console.error('Error al eliminar incidente:', err);
        res.status(500).json({ error: err.message });
    }

})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
