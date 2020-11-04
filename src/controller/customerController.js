const controller = {};

controller.list = (req,res)=>{
req.getConnection((err, conn)=>{
    conn.query('SELECT * FROM customers',(err, customers)=>{
        if(err){
            res.json(err)
        }

    
        res.render('customers',{
          data:customers
        })
        
    })
})
}

controller.save = (req, res) =>{
const data = req.body
console.log(req.body);

req.getConnection((err, conn)=>{
    conn.query('INSERT INTO customers set ?', [data], (err, customer)=>{
       
     console.log(customer);   
     res.redirect('/')
    })
})
}





controller.update = (req, res) =>{
    var id = req.params.id;
    console.log(id);
    req.getConnection((err, conn)=>{
    
        conn.query('SELECT * FROM customers where id =?', [id], (err, customer)=>{
      
            console.log(customer);

         res.render('edit_customer',{
             data:customer[0]
         });
        
        })
    })
    }

    controller.saveUpdate = (req, res) =>{
        var id = req.params.id;
       const  newCustomer = req.body
   
        req.getConnection((err, conn)=>{
        
            conn.query('UPDATE customers set ? where id =?',[newCustomer,id], (err, customer)=>{
          
                
    res.redirect("/");
            
            })
        })
        }
















controller.delete = (req, res) =>{
      
        req.getConnection((err, conn)=>{
            conn.query('DELETE FROM customers where id =?', [req.params.id], (err, rows)=>{
               
               
             res.redirect('/')
            })
        })
        }




module.exports = controller;