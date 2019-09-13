import { getPaginatedFlats, BASE_API_URL } from "UtilsServer/index";

const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.config');

const devServerEnabled = true;

if (devServerEnabled) {
    config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');

    //Add HMR plugin
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"
    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    }));

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.post('/flats', (req, res) => {
  new Promise((resolve, reject) => {
    getPaginatedFlats(`${BASE_API_URL}&page=${1}&place_name=putney&listing_type=rent&number_of_results=50`, [], resolve, reject)
  })
    .then(response => {
      res.jsonp({
        flats: response,
        length: response
      })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));