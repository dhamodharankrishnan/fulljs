import config, {nodeEnv} from './config';
import https from 'https';
import http from 'http';
import express from 'express';
import fs from 'fs';

function consoleLog() {
  console.log(config, nodeEnv);
}

/**
 * Get lynda https call sample.
 */
function getLyndaData() {

  https.get('https://www.lynda.com', res => {
    console.log('Response Status Code', res.statusCode);
      
    res.on('data', chunk => {
      console.log(chunk.toString());
    });
  });
}

/**
 * Start HttpServer
 * @returns HttpServer
 */
function startHttpServer() {
  const server = http.createServer();
  server.listen(8080);
  return server;
}

/**
 * Http Server
 */
function startServing(server){
  server.on('request', (req, res)=> {
    res.write('Hello Http!');
    setTimeout(() =>{
      res.write('\n I can stream\n');
      res.end();
    }, 3000);
  });
}

/////////////////////////
function createExpress() {
  const expressServer = express();
  return expressServer;
}
/////////////////////////
function serveExpressDefault(expressServer) {
  expressServer.get('/', (req, res) => {
    res.send('Hello Express');
  });
}

function serveExpressGreeting(expressServer) {
  expressServer.get('/greet', (req, res) => {
    res.send('Hello Express - Hello Dhamo....');
  });
}

function serveExpressAddUser(expressServer) {
  expressServer.get('/addUser', (req, res) => {
    res.send('Express Add user....');
  });
}

//About
function serverExpressAbout(expressServer){
  expressServer.get('/about.html', (req, res) => {
    fs.readFile('./about.html', (err, data) => {
      res.send(data.toString());
    });
  });  
}

//Express static assets.
function serverExpressStatic(expressServer){
  expressServer.use(express.static('public'));
}

function listenExpress(expressServer) {
  expressServer.listen(config.port, () => {
    console.log('Express server listening on ', config.port);
  });
}
//Http Use cases
/*
  //1. Test case
  getLyndaData();

  //2. Start Http Server
  const server = startHttpServer();
  startServing(server);
*/

//3. Express Use cases.
const expressServer = createExpress();
serveExpressDefault(expressServer);
serveExpressGreeting(expressServer);
serveExpressAddUser(expressServer);
serverExpressAbout(expressServer);
serverExpressStatic(expressServer);
listenExpress(expressServer);
