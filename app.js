
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');


var app = express();

// all environments
app.set('port', process.env.PORT || 3002);                //����վ��
app.set('views', path.join(__dirname, 'views'));          //
app.set('view engine', 'jade');                           //使用jade模板引擎
app.use(flash());                                         //使用flash
app.use(express.favicon());                               //设置favicon
app.use(express.logger('dev'));                           //使用log打印
app.use(express.json());                                  //设置请求头
app.use(express.urlencoded());                            //url编码
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db
    //host: settings.host,
    //port: settings.port,
    //url: 'mongodb://localhost'+settings.db,
    //autoRemove:'native'
  })
}));

app.use(app.router);                                      //使用路由
app.use(express.static(path.join(__dirname, 'public')));  //设置静态文件

// development only     开发模式
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);
//app.get('/', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
