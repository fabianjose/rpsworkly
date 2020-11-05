const controller = {};

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

controller.register = (req,res)=>{
  res.render('registro');
}

controller.save = (req, res) =>{
  const data = req.body
  console.log(req.body);

  req.getConnection((err, conn)=>{

    conn.query('SELECT * FROM usuarios where email =?', [data.correo], (err, issetUsuario)=>{
      if(err){
        return res.status(500).send({
          message: "Error al comprobar duplicidad de usuario"
        });
      }
    
      if(!issetUser){

        bcrypt.hash(data.password, null, null, (err, hash) => {
          data.password = hash;

          conn.query('INSERT INTO usuarios set ?', [data], (err, usuario)=>{
            console.log(usuario);   
            res.redirect('/');
          });

        });

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