//conexion a mysql

const mysql = require ('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'api_user',
    password: process.env.DB_PASSWORD || 'ApiPass123',
    database: process.env.DB_NAME || 'tickets_incidents',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// creo todas las tablas de la db

async function startDB() {
    let connection;
    try {
        connection = await pool.getConnection();    
        console.log('Conectado a MySQL! :)');
        await connection.beginTransaction();

        try {
            // Tabla Employee
            await connection.query(`
                CREATE TABLE IF NOT EXISTS Employee (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) NOT NULL,
                    lastname VARCHAR(50) NOT NULL
                )`);
            console.log('Tabla empleados creada/verificada!');

            // Tabla Equipment
            await connection.query(`
                CREATE TABLE IF NOT EXISTS Equipment (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    equipment VARCHAR(20) NOT NULL
                )`);
            console.log('Tabla equipo creada/verificada!');

            // Tabla Incident
            await connection.query(`
                CREATE TABLE IF NOT EXISTS Incident (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    employee_id INT NOT NULL,
                    equipment_id INT NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    status ENUM('PENDIENTE', 'EN PROCESO', 'RESUELTO') NOT NULL DEFAULT 'PENDIENTE',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (employee_id) REFERENCES Employee (id),
                    FOREIGN KEY (equipment_id) REFERENCES Equipment (id)
                )`);
            console.log('Tabla incidentes creada/verificada!');

            // Insertar datos iniciales
            const [employees] = await connection.query('SELECT COUNT(*) as count FROM Employee');
            if (employees[0].count === 0) {
                await connection.query(`
                    INSERT INTO Employee (name, lastname) VALUES 
                    ('Angie', 'Vela'),
                    ('Sarah', 'Alvarado'),
                    ('Siona', 'Castro')
                `);
                console.log('Datos de empleados insertados!');
            }

            const [equipments] = await connection.query('SELECT COUNT(*) as count FROM Equipment');
            if (equipments[0].count === 0) {
                await connection.query(`
                    INSERT INTO Equipment (equipment) VALUES 
                    ('Computadora HP'),
                    ('Laptop Victus')
                `);
                console.log('Datos de equipos insertados!');
            }

            await connection.commit();
            console.log('Base de datos inicializada correctamente!');
        } catch (err) {
            await connection.rollback();
            console.error('Error durante la inicialización de la base de datos:', err);
            throw err;
        }
    } catch (error) {
        console.error('Error conectando a MySQL:', error);
        console.log('Reintentando conexión en 5 segundos...');
        setTimeout(startDB, 5000);
    } finally {
        if (connection) connection.release(); 
    }
}

async function checkDBStatus() {
    try {
        const [rows] = await pool.query('SELECT 1');
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = { pool, startDB, checkDBStatus };

