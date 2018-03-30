import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphiqlExpress, graphqlExpress, graphiqlConnect } from 'graphql-server-express';
import passport from 'passport';
import cors from 'cors';

import schema from './schema';
import setPassport from './passport';
import bluebird from 'bluebird';
import client from './redis';
import userRouter from './router/user';

import { MONGO_URL, API_PORT } from './config';

setPassport();

mongoose.connect(
	MONGO_URL,
	{
		auto_reconnect: true,
		keepAlive: 1,
		connectTimeoutMS: 30000,
		reconnectTries: 30,
		reconnectInterval: 3000
	},
	err => {
		if (err) {
			console.log(err);
		} else {
			console.log(`${MONGO_URL}数据库链接成功!`);
		}
	}
);

let server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/api', passport.authenticate('jwtlogin', { session: false }), graphqlExpress({ schema }));
server.use('/apidoc', graphiqlExpress({ endpointURL: '/api' }));

server.use('/user', userRouter);

server.use('/jwt2h', passport.authenticate('jwtlogin', { session: false }), (req, res, next) => {
	console.log('jwt2h测试通过,打印用户信息');
	console.log(req.user);
	res.end();
});

//过期测试
server.use('/jwt6s', passport.authenticate('jwtunauthtest', { session: false }), (req, res, next) => {
	console.log('jwt6s测试通过,打印用户信息');
	console.log(req.user);
	res.end();
});

server.post('/common', passport.authenticate('jwtlogin', { session: false }), async (req, res) => {
	const param = req.body;
	// const dep = await Department.find({ ...param })
	// const wh = await Warehouse.find({ ...param })
	// const inv = await Inventory.find({ ...param })
	// res.json({
	// 	dep: await Department.find({ ...param }, { _id: 0 }),
	// 	wh: await Warehouse.find({ ...param }, { _id: 0 }),
	// 	inv: await Inventory.find({ invtype: 'CP', ...param }, { _id: 0 })
	// });
});

server.listen(API_PORT, err => (err ? console.log(err) : console.log(`项目启动完毕，监听端口${API_PORT}`)));
