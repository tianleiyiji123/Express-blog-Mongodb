/**
 * Created by wanglei on 2016/8/30.
 * mongodb实现用户数据保存
 */
var mongodb = require('./db');

function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

User.prototype.save = function(callback){//存储用户信息
    //要存入数据库的用户文档
    var user = {
        name : this.name,
        password : this.password,
        email : this.email
    };

    mongodb.open(function(err,db) {
        if (err) {
            return callback(err);
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //将用户数据插入users集合
            collection.insert(user, {safe: true}, function (err, user) {
                mongodb.close();
                if(err){
                    return callback(err);//错误，返回err信息
                }
                callback(null, user[0]);//成功返回插入的用户信息
            })
        })
    })
};
User.get = function(name,callback){//读取用户信息
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
    //    读取user集合
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
        //    查找用户名name值为name文档
            collection.findOne({
                name : name
            },function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);//失败！返回err信息
                    //var user = new User(doc);
                    //callback(err,user);         //成功，返回查询的用户信息
                }else{

                    callback(null,user);         //成功，返回查询的用户信息
                }
            })
        })
    })

};