//conexion a mysql

const mysql = require ('mysql');

const cn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$Buho$3002!',
    database: 'tickets_incidents'
});

// creo todas las tablas de la db

function startDB() {

    //conexion a la db
    cn.connect((error)=>{
        if(error){
        console.error('Error conectando a mysql :(', error);
        }else{
        console.log('Conectado a MySQL! :)');
    
        const sql = `
        CREATE TABLE IF NOT EXISTS Employee (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Equipment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            equipment VARCHAR(20) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Incident (
            id INT AUTO_INCREMENT PRIMARY KEY,
            employee_id INT NOT NULL,
            equipment_id INT,
            description VARCHAR(255) NOT NULL,
            status ENUM('PENDIENTE', 'EN PROCESO', 'RESUELTO') NOT NULL DEFAULT 'PENDIENTE',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (employee_id) REFERENCES Employee (id),
            FOREIGN KEY (equipment_id) REFERENCES Equipment (id)
        );

        `;
    
    
        cn.query(sql, (err, result) => {
            if (err) {
                console.error('Error al crear las tablas:', err);
            } else {
                console.log('Tablas creadas correctamente');
            }
        })
    
        }
    
    });
    
}

module.exports = { cn, startDB };


