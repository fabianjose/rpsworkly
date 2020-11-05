'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave-secreta-para-generar-el-token-9999";

exports.authenticated = function(req, res, next){

	// Comprobar si llegala autorización
	if(!req.headers.authorization){
		return res.status(403).send({
			message: "La petición no tiene la cabecera de autorización"
		});
	}

	// Recoger el token, limpiarlo y quitar comillas (si las trae)
	var token = req.headers.authorization.replace(/['"]+/g, '');

	try{
		// Decodificar token
		var payload = jwt.decode(token, secret);

		// Comprobar si el token ha expirado
		if(payload.exp <= moment().unix()){
			return res.status(403).send({
				message: "El token ha expirado"
			});
		}

	}catch(ex){
		return res.status(403).send({
			message: "El token no es válido"
		});
	}

	// Adjuntar usuario identificado a la request
	req.user = payload;

	// Pasar a la acción
	next();

};