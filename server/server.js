import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphiqlExpress, graphqlExpress, graphiqlConnect } from 'graphql-server-express';
import schema from './schema';
import { MONGO_URL, API_PORT } from './config';
import cors from 'cors';

mongoose.connect(MONGO_URL, err => {
	if (err) {
		console.log(err);
	} else {
		console.log(`${MONGO_URL}数据库链接成功!`);
	}
});

let server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/api', graphqlExpress({ schema }));
server.use('/apidoc', graphiqlExpress({ endpointURL: '/api' }));

server.listen(API_PORT, err => (err ? console.log(err) : console.log(`项目启动完毕，监听端口${API_PORT}`)));
