let fs = require('fs');

const targetPath = './model';

const formatImport = name => `import ${name} from './${name}'`;
const formatExport = names => {
	let result = 'export {';
	for (let name of names) {
		result += ` ${name},`;
	}
	result = result.substring(0, result.lastIndexOf(','));
	result += ' }';
	return result;
};

let files = fs
	.readdirSync(targetPath, { encoding: 'utf-8' })
	.filter(value => value !== 'index.js')
	.map(filename => filename.split('.')[0]);

let result = '';
for (let name of files) {
	result += formatImport(name) + '\n';
}
result += formatExport(files);

fs.writeFileSync(`${targetPath}/index.js`, result);
