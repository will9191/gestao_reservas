import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "7420061234567rafael",
    database: "booking_db",
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;