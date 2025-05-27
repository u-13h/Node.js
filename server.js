const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.post('/login',(req,res) => {
    const {usuario,contrasena} = req.body;
    console.log('Datos recibidos en registro:', usuario, contrasena);
    const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?';
    db.query(sql,[usuario,contrasena],(err,resultados)=>{
        if(err) throw err;
        if(resultados.length > 0){
            res.send('Inicio de sesión exitoso');
        }
        else{
            res.send('Credenciales incorrectas');
        }
    });
});
app.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body;
    console.log('Datos recibidos en registro:', usuario, contrasena);
    const sql = 'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)';
    db.query(sql, [usuario, contrasena], (err, resultado) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.send('El usuario ya existe');
            } else {
                throw err;
            }
        } else {
            res.send('Registro exitoso');
        }
    });
});
app.listen(3000,()=>{
    console.log('Servidor corriendo en http://localhost:3000');
});
