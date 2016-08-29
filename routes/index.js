
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};
module.exports = function(app){
  app.get('/',function(req,res){
    console.log(res)
    res.render('index',{title:'WangLei'});
  });

//注册模块
  app.get('/reg',function(req,res){
    res.render('reg',{title:"注册"});
  })

};