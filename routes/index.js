
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};
var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports = function(app){
  app.get('/',function(req,res){
    console.log(res)
    res.render('index',{title:'WangLei'});
  });


//注册模块
  app.get('/reg',function(req,res){
    res.render('reg',{title:"注册"});
  });
  app.post('/reg',function(req,res){
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    //检查用户两次输入的密码是否一致
    if(password != password_re){
      req.flash('error',"两次输入的密码不一致~!");
      return res.redirect('/reg');
    }
  //  生成密码的散列值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
      name : req.body.name,
      password : password,
      email : req.body.email
    });
  //  检查用户名是否存在
    User.get(newUser.name,function(err,user){
      if(user){
        err = "用户名存在!";
      }
      if(err){
        req.flash('error',err);
        return res.redirect('/reg');
      }
    //  如果不存在就新增用户
      newUser.save(function(err){
          if(err){
            req.flash('error',err);
            return res.redirect('/reg');
          }
        req.session.user = newUser;//用户信息存入session
        req.flash('success','注册成功!');
        res.redirect('/')
      })
    })
  });
  //登录模块
  app.get('/login',function(req,res){
    res.render('login',{title:"登录"});
  });
  app.post('/login',function(req,res){

  })

};