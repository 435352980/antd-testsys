import express from 'express';
import bodyParser from 'body-parser';

let server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(3000, err => (err ? console.log(err) : console.log(`项目启动完毕，监听端口${3000}`)));
