var bcrypt = require('bcrypt-node');
var jwt = require('../services/jwt');

const controller = {};


controller.home =(req, res)=>{
    res.render('index')
}

controller.registro =(req, res)=>{
    res.render('registro')
}

controller.login =(req, res)=>{
    res.render('login')
}

controller.crear_vacante =(req, res)=>{
    res.render('crear_vacante')
}





controller.list = (req,res)=>{
req.getConnection((err, conn)=>{
    conn.query('SELECT * FROM usuarios',(err, usuario)=>{
        if(err){
            res.json(err)
        }

    
        res.render('usuarios',{
          data:usuario
        })
        
    })
})
}

controller.save = (req, res) =>{
  const data = req.body
  console.log(req.body);

  req.getConnection((err, conn)=>{

    conn.query('SELECT COUNT(*) AS emailRepetido FROM usuarios where correo =?', [data.correo], (err, issetUsuario)=>{
      if(err){
        return res.status(500).send({
          message: "Error al comprobar duplicidad de usuario"
        });
      }
    
      if(issetUsuario && issetUsuario[0].emailRepetido == 0){
        if(data.password == data.password_confirm){

          delete data.password_confirm;

          bcrypt.hash(data.password, null, null, (err, hash) => {
            data.password = hash;

            conn.query('INSERT INTO usuarios set ?', [data], (err, usuario)=>{
              console.log(usuario);
              console.log(err);
              res.redirect('/');
            });

          });
        }
        else{
          return res.status(500).send({
            message: "las contraseñas no coinciden"
          });
        }
          

      }
     else{
        return res.status(500).send({
          message: "El usuario ya esta registrado"
        });

      }
        

    })
      
  })
}

controller.update = (req, res) =>{
    var id = req.params.id;
    console.log(id);
    req.getConnection((err, conn)=>{
    
        conn.query('SELECT * FROM usuarios where id =?', [id], (err, usuario)=>{
      
            console.log(usuario);

         res.render('edit_usuario',{
             data:usuario[0]
         });
        
        })
    })
    }

    controller.saveUpdate = (req, res) =>{
        var id = req.params.id;
       const  newUsuario = req.body
   
        req.getConnection((err, conn)=>{
        
            conn.query('UPDATE usuarios set ? where id =?',[newUsuario,id], (err, usuario)=>{
          
                
    res.redirect("/");
            
            })
        })
        }
















controller.delete = (req, res) =>{
      
  req.getConnection((err, conn)=>{
      conn.query('DELETE FROM usuarios where id =?', [req.params.id], (err, rows)=>{
         
         
       res.redirect('/')
      })
  })
}




module.exports = controller;




controller.signIn = (req, res) => {
    // Recoger los parametros de la peticion
    var params = req.body;
    req.getConnection((err, conn)=>{
      // Buscar usuarios que coincidan con el email
      conn.query('SELECT * FROM usuarios where correo =?', [params.correo], (err, usuario)=>{

        if(err){
          return res.status(500).send({
            message: "Error al intentar identificarse"
          });
        }

        if(!usuario){
          return res.status(404).send({
            message: "El usario no existe"
          });
        }

        // Si lo encuentra,
        // Comprobar la contraseña (coincidencia de email y password / bcrypt)
        bcrypt.compare(params.password, usuario[0].password, (err, check) => {

          // Si es correcta
          if(check){

            // Generar token de JWT y devolverlo
            // if(params.gettoken){
              // Devolver los datos

              return res.status(200).send({
                token: jwt.createToken(usuario[0])
              });
              // localStorage.setItem('token', jwt.createToken(usuario[0]));
              // localStorage.setItem('identity', JSON.stringify(this.identity));
            // }

            // Limpiar el objeto
            // usuario.password = undefined;
            // Devolver los datos

            return res.status(200).send({
              status: "success",
              message: "Usuario logeado correctamente",
              check
            });
            // res.redirect('/');
          }
          else {
            return res.status(200).send({
              message: "Las credenciales no son correctas"
            });
          }
                
        });
      });
        
    });
      
  }