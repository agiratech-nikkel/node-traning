
const User = require('./model');

module.exports = {
    createUser:  function(req,res){
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
          });
          newUser.save()
         .then(data => {res.json({ state: true, msg: "data inserted successully", data: data })})
         .catch(err => 
        {  
              return res.json({ state: false, msg: "data inserted Faild", error:["Email already exist"] }) ;
            });
    },
    
    getUser:function (req, res) {
        User.find().then(data => {
          res.json({ status: 200, message: 'User data fetched Successfully', data: data });
        });
    },

    updateUser: function(req, res, next){
    const newuser = { _id: req.params.id };
    User.updateOne(newuser, {
    name: req.body.name,
    email: req.body.email
     }).then(data => {
    if (!data) {
      return res.json({ status: 200, message: 'User not found ', data:req.params.id });
    }
    return res.json({ status: 200, message: 'User Updated Successfully', data:  req.params.id });
  })
    .catch(err =>{
    let error = err.message.split(' ')
    let errocode = error[0]
    if(errocode == "E11000"){
        res.json({ status: 400, message: 'User Updated Failed', error:'Email already exsist' })
    }
    else{
        res.json({ status: 400, message: 'User Updated Failed', error:'User Not Found' })
    }
       
    });
    },

    getUserById:function (req, res)  {
        User.findById(req.params.id).then(documents => {
          if (!!documents) {
            res.status(200).json(documents);
          } 
          if(!documents){
            res.json({ status: 400, message: 'User data retrive  failed', error:'User Not Found' })

          }
          
        }).catch(err => { 
            res.json({ status: 400, message: 'User data retrive  failed', error:'User Not Found' })
            
        });
      },

      deleteUser: function  (req, res, next)  {
        User.deleteOne({ _id: req.params.id }).then(data => {
            res.json({ status: 200, message: 'Users data deleted Successfully'});
        })
        .catch(err => {
            res.json({ status: 400, message: 'Users data deleted failed', error:"User Not Found" });
        });
      },

    searchUser: async function(req, res,){
        const perPage = parseInt(req.query.perPage, 10) || 10
        const page = parseInt(req.query.page, 10) || 1
        var regexp = new RegExp(req.body.search)
        const query ={name:{$regex:regexp}}
        const limit = perPage  * page
        console.log(perPage,page,perPage*page)
        User.find(query).sort({createdAt:-1})
      .skip(page).limit(limit)
        .then(data=>{
            res.json({ status: 200, message: 'User data fetched Successfully', data: data });
        }).catch(error=>{
            res.json({ status: 400, message: 'User data fetched Failed', data: error });
        });
    }
}