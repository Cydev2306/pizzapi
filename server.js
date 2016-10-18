var express = require('express')
var app = express()
var compression = require('compression')
var port = process.env.PORT || 8000

if(process.env.NODE_ENV !== 'production'){
    var webpack = require('webpack')
    var webpackDevMiddleware = require('webpack-dev-middleware')
    var webpackHotMiddleware = require('webpack-hot-middleware')
    var config = require('./webpack.config')

    var compiler = webpack(config)
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
    app.use(webpackHotMiddleware(compiler))
}else {
    //alias dist folder as /static
    app.use('/static', express.static('./static'))
}

app.use(compression())
app.use(function(req, res){
    res.sendFile(__dirname+'/index.html')
})

app.listen(port, function(err){
    if(err){
        console.error(err)
    }else{
        console.log('App listenning on port : '+port)
    }
})
