//conexion a mysql

const mysql = require ('mysql');

const cn = mysql.createConnection({
    // host: 'localhost', -> este era el original, verificar
    host: 3000,
    user: 'root',
    password: '$Buho$3002!',
    database: 'tickets_incidents'
});

//conexion a la db

function startDB() {
    cn.connect((error)=>{
        if(error){
        console.error('Error conectando a mysql :(', error);
        }else{
        console.log('Conectado a MySQL! :)');
    
        const sql = `
        CREATE TABLE Employee (
        id serial PRIMARY KEY NOT NULL,
        name varchar(50) NOT NULL,
        lastname varchar(50) NOT NULL
        );
    
        CREATE TABLE Equipment (
        id serial PRIMARY KEY NOT NULL,
        equipment varchar(20) NOT NULL
        );
    
        CREATE TABLE Incident (
        id serial PRIMARY KEY NOT NULL,
        employee_id int NOT NULL,
        equipment_id int,
        description varchar(255) NOT NULL,
        status ENUM(PENDIENTE,EN PROCESO,RESUELTO),
        created_at timestamp NOT NULL DEFAULT (now())
        );
    
        ALTER TABLE Incident ADD FOREIGN KEY (employee_id) REFERENCES Employee (id);
    
        ALTER TABLE Incident ADD FOREIGN KEY (equipment_id) REFERENCES Equipment (id);
        `;
    
    
        cn.query(sql, (err, result) => {
            if (err) throw err;
            console.log('Tablas creadas');
        })
    
        }
        cn.end();
    
    });
    
    
}


