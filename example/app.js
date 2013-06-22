#!/usr/bin/env node

var connect = require('connect')
  , FileStore = require('../lib/connect-file-store')(connect);

connect(
  connect.cookieParser(),
  connect.session({
    secret:'session file',
    store: new FileStore({
      path:'.',
      useAsync:true,
      reapInterval: 5000,
      maxAge: 10000
    })
  }),
  connect.favicon(),
  function (req, res, next) {
    var sess = req.session;
    console.log('+ begin ' + req.url );

    if (sess.views) {
      sess.views++;
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: ' + sess.views + '</p>');
      res.write('<p>session cookie expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
      res.end();
    } else {
      sess.views = 1;
      res.end('welcome to the file session demo. refresh!');
    }
  }
).listen(8080);

