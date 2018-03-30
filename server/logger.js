import bunyan from 'bunyan';
import bunyantcp from 'bunyan-logstash-tcp';
import dotenv from 'dotenv';

dotenv.config();
const { LOG_URL, LOG_PORT } = process.env;

let logger = bunyan.createLogger({
	name: 'worksys_server',
	streams: [
		{ level: 'debug', stream: process.stdout },
		// {
		// 	level: 'error',
		// 	stream: bunyantcp
		// 		.createStream({
		// 			type: 'raw',
		// 			host: LOG_URL,
		// 			port: LOG_PORT
		// 		})
		// 		.on('error', console.log)
		// }
	]
});

export default logger;
