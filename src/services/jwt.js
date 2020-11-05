'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(user){

	var payload = {
		id: user.id,
		name: user.nombre,
		apellido: user.apellido,
		correo: user.correo,
		role: user.role,
		logo: user.logo,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	}

	return jwt.encode(payload, 'clave-secreta-workly-para-generar-el-token-123999');
	
};