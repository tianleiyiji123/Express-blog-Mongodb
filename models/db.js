/**
 * Created by wanglei on 2016/8/29.
 *
 *
 */
var settings = require("../settings"),
    Db = require("mongodb").Db,
    Connection = require('mongodb').Connection,
    Server = require("mongodb").Server;
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));

