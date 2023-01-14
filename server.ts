const config = require('./webpack.config.dev.ts');
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import path from 'path';
const compiler = webpack(config);
const server = new webpackDevServer({

    client: {
        logging: 'info', 
    },
    static : {
        directory:path.join(__dirname,'public'),
    },
    
    hot: true,
}, compiler);

(async () => {
    server.options = {
        port: 3500,
        open: false,
        proxy : {
            '/api' : {
                target : 'http://192.168.14.184:5000',
                changeOrigin : true,
                pathRewrite: { '^/api': '/chat/api' },
            }
        },
    }
    await server.start();
    console.log('dev server is running');
})();