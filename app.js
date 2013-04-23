"use strict";

var config  = require('./config.mine.js')

var express = require('express')
var seneca  = require('seneca')()


seneca.use('user')
seneca.use('auth',config.auth)
seneca.use('./well')



var u = seneca.pin({role:'user',cmd:'*'})
u.register({nick:'u1',name:'nu1',password:'u1',active:true})
u.register({nick:'u2',name:'nu2',password:'u2',active:true})
u.register({nick:'u3',name:'nu3',password:'u3',active:true})
u.register({nick:'u4',name:'nu4',password:'u4',active:false})

var w = seneca.pin({role:'well',cmd:'*'})
w.createevent({name:'foo'})



if( !module.parent ) {

  var app = express()

  //app.use( express.logger() )
  app.use( express.cookieParser() )
  app.use( express.query() )
  app.use( express.bodyParser() )
  app.use( express.methodOverride() )
  app.use( express.json() )
  app.use( express.session({ secret: 'waterford' }) )

  app.use( seneca.service() )

  app.use( express.static(__dirname+'/front') )  

  app.listen(3333)
}
