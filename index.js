const params = process.argv.slice(2);
const { validateOptions } = require('./helpers');

console.log('--params', validateOptions(params));

console.log('--end');