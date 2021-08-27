class DataBase {
  constructor (project, username, password) {
    this.project = project;
    this.username = username;
    this.password = password;
    this.req = require("request");
    this.cheerio = require("cheerio");
  }
  strf(text, vars) {
    let t = text;
    for (var i in vars) {
      t = t.replace("|"+i+"|", vars[i]);
    }
    return t
  }
  getitem(key, handler) {
    const url = this.strf('https://jdb.amoghthecool.repl.co/data/|username|/|project|/|password|', {
      "username": this.username,
      "project": this.project,
      "password": this.password
    }); 
    const ch = this.cheerio;
    this.req(url, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = ch.load(html);
        handler(JSON.parse($.text())[key])
      }
    });
  }
  setitem(key, value) {
    const url = this.strf('https://jdb.amoghthecool.repl.co/set/|username|/|project|/|key|/|value|/|password|', {
      "username": this.username,
      "project": this.project,
      "password": this.password,
      "key": key,
      "value":value
    });

    this.req(url, function (error, response, html) {});
  }
}

exports.DataBase = DataBase
