/**
 * 验证邮箱格式
 * @param {*} str 
 */
export const isEmail = str => /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(str);
