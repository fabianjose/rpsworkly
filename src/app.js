const express = require("express")
const path = require('path')
const app = express()
const morgan= require('morgan')
const mysql = require('mysql')
const myconnection = require('express-myconnection')

//importando rutas
const customerRoutes = require('./routes/usuarios')

// configuraciones
app.set('port', process.env.PORT || 3000)
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))



//middleware
app.use(morgan('dev'))
app.use(myconnection(mysql,{
    host:'localhost',
    user:"root",
    password:"",
    port: 3306,
    database:"workly"
},'single'))
app.use(express.urlencoded({extends:false}))

//routes

app.use ("/",customerRoutes)

//static files
app.use(express.static(path.join(__dirname,'public')))

//conexion


//iniciando el servidor
app.listen(app.get('port'), ()=> {
    console.log("server on port 3000");
})