
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
app.set('views', path.join(__dirname, 'views'));          //������ͼ���ļ�Ŀ¼
app.set('view engine', 'jade');                           //����ģ������
app.use(flash());                                         //ʹ��flashģ��
app.use(express.favicon());                               //����favicon
app.use(express.logger('dev'));                           //����ģʽ��log��־
app.use(express.json());                                  //������
app.use(express.urlencoded());                            //url����
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db
  })
}));

app.use(app.router);                                      //����·�ɽ�������
app.use(express.static(path.join(__dirname, 'public')));  //����publicΪ��ž�̬�ļ�Ŀ¼��վ����Է���

// development only     ���������Ϣ
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);
//app.get('/', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
