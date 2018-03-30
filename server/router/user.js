import express from 'express';
import passport from 'passport';
import client from '../redis';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import { jsonField } from '../lib/util';
import { JWT_SECRET } from '../config';
import getSeqCode from '../lib/getSeqCode';

let Router = express.Router();

/**
 * 注册
 */
Router.post('/signin', async (req, res, next) => {
	const { nickname, username, password, email } = req.body;
	if (!nickname || !username || !password || !email) {
		return res.send({ error: true, message: '参数错误!' });
	}
	try {
		//防止postman等工具直接调用注册
		if ((await User.count().or([ { nickname }, { username }, { email } ])) > 0) {
			return res.json({ error: true, message: '注册失败!' });
		}
		const no = await getSeqCode('user');
		await new User({ no, nickname, username, password, email }).save();
		res.json({ error: false, message: '' });
	} catch (error) {
		console.log(error);
		res.json({ error: true, message: '注册失败' });
	}
});

/**
 * 注册用户名、昵称及邮箱验证
 */
Router.post('/valisignparam', async (req, res, next) => {
	const { nickname, username, email } = req.body;
	//一次只允许验证用户名、昵称及邮箱中的一项
	if (Object.keys(req.body).length !== 1 || (!nickname && !username && !email)) {
		return res.json({ error: true, message: '参数错误!' });
	}

	try {
		let count = await User.count({
			...jsonField('nickname', nickname),
			...jsonField('username', username),
			...jsonField('email', email)
		});
		if (count > 0) {
			let message = nickname ? '该昵称已经被使用' : username ? '该用户名已被注册' : email ? '该邮箱已被注册' : '未知错误';
			return res.json({ error: true, message });
		}
		return res.json({ error: false, message: '' });
	} catch (error) {
		console.log(error);
		res.json({ error: true, message: '验证失败!' });
	}
});

Router.post('/login', (req, res, next) => {
	passport.authenticate('login', { session: false }, (err, user, message) => {
		if (err) {
			return res.json({ login: false, message: '登录失败!' });
		}
		if (!user) {
			return res.json({ login: false, message });
		}
		//redis错误会导致程序退出
		try {
			user = user._doc;
			const { password, username, ...rest } = user;
			const token = jwt.sign({ username, ...rest }, JWT_SECRET);
			client.set(username, token, 'ex', 60 * 60 * 2);
			res.json({ login: true, message: '', token });
		} catch (error) {
			console.log(error);
			res.json({ login: false, message: '登录失败!' });
		}
	})(req, res, next);
});

export default Router;
