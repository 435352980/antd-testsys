export const isUndefined = obj => obj === void 0;
export const isNull = obj => obj === null;
export const isObj = obj => Object.prototype.toString.call(obj) === '[object Object]';
export const isBoolean = obj => Object.prototype.toString.call(obj) === '[object Boolean]';
export const isNumber = obj => Object.prototype.toString.call(obj) === '[object Number]';
export const isString = obj => Object.prototype.toString.call(obj) === '[object String]';
export const isNaN = obj => obj !== obj;
export const isFunction = obj => typeof obj === 'function';

export const jsonField = (name, value) => {
	if (!name) {
		return null;
	}
	if (value == null || (isObj(value) && Object.keys(value).length === 0)) {
		return null;
	}
	return { [name]: value };
};

export const toJsDate = date => (date ? new Date(date) : null);
