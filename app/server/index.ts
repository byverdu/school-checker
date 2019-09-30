import { getPaginatedFlats, BASE_API_URL } from "./Utils/index";
import {Request} from 'express';
const express = require('express')
const app = express()
const port = 3000
const moment = require('moment');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.config');

const devServerEnabled = true;

app.use(express.json());

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

app.post('/flats', (req: Request, res) => {
  const lastUpdated = moment().subtract(40, 'days').utc().unix();
  const requestValues = Object.keys(req.body).map(value => `${value}=${req.body[value]}`).join('&');
  const tempUrl = `${BASE_API_URL}&page=${1}&number_of_results=50&sort=newest&updated_min=${lastUpdated}&${requestValues}`;

  console.log(tempUrl);

  new Promise((resolve, reject) => {
    getPaginatedFlats(tempUrl, [], resolve, reject)
  })
    .then(response => {
      res.jsonp({
        flats: response,
        length: (response as any).length
      })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));