import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import client from './redis';
import { User } from './model';
import { JWT_SECRET } from './config';

const setPassport = () => {
	passport.use(
		'login',
		new LocalStrategy(async (username, password, done) => {
			try {
				let user = await User.findOne({ username });
				if (!user) {
					return done(null, false, '用户不存在!');
				}
				const isMatch = await bcrypt.compare(password, user.password);
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, '密码不匹配');
				}
			} catch (error) {
				return done(error);
			}
		})
	);

	passport.use(
		'jwtlogin',
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
				passReqToCallback: true,
				secretOrKey: JWT_SECRET
			},
			async (req, payload, done) => {
				const { username, nickname, email } = payload;
				try {
					const token = ExtractJwt.fromAuthHeaderWithScheme('JWT')(req);
					const clientToken = await client.getAsync(username);
					if (clientToken && clientToken === token) {
						//设置过期时间
						//await client.setAsync(username, token, 'ex', 6);
						await client.setAsync(username, token, 'ex', 60 * 60 * 2);
						return done(null, { username, nickname, email });
					} else {
						return done(null, false);
					}
				} catch (error) {
					return done(error, false);
				}
			}
		)
	);

	passport.use(
		'jwtunauthtest',
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
				passReqToCallback: true,
				secretOrKey: JWT_SECRET
			},
			async (req, payload, done) => {
				const { username, nickname, email } = payload;
				try {
					const token = ExtractJwt.fromAuthHeaderWithScheme('JWT')(req);
					const clientToken = await client.getAsync(username);
					if (clientToken && clientToken === token) {
						//设置过期时间
						await client.setAsync(username, token, 'ex', 6);
						return done(null, { username, nickname, email });
					} else {
						return done(null, false);
					}
				} catch (error) {
					return done(error, false);
				}
			}
		)
	);
};

export default setPassport;
