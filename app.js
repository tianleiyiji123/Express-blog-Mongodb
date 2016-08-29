
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3002);                //设置站点
app.set('views', path.join(__dirname, 'views'));          //设置视图层文件目录
app.set('view engine', 'jade');                           //设置模板引擎
app.use(express.favicon());                               //设置favicon
app.use(express.logger('dev'));                           //开发模式下log日志
app.use(express.json());                                  //请求体
app.use(express.urlencoded());                            //url编码
app.use(express.methodOverride());
app.use(app.router);                                      //调用路由解析规则
app.use(express.static(path.join(__dirname, 'public')));  //设置public为存放静态文件目录，站点可以访问

// development only     输出错误信息
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);
//app.get('/', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
