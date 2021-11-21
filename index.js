process.on('exit', code => {
    return console.log(`Exit with code ${code}`);
});

process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});

const params = process.argv.slice(2);
const { validateOptions } = require('./src/helpers');
const CliTool = require('./src/helpers/CliTool');

const { config, input, output } = validateOptions(params);
const tool = new CliTool({ config, input, output });
tool.runTool();