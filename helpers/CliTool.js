const { pipeline } = require('stream');
const fs = require('fs');
const { checkForExistence, handleError } = require('./index');
const transformStreamsArr = require('../streams/transformStreamsArr');

class CliTool {
    constructor(props) {
        this.checkProps(props);
        this.config = props.config;
        this.input = props.input;
        this.output = props.output;
    }

    checkProps(props) {
        console.log('--here is Checking props!', props);
    }

    runTool() {
        Promise.all([
            checkForExistence(this.input),
            checkForExistence(this.output, 'output'),
        ]).then(() => {
            pipeline(
                this.input ? fs.createReadStream(this.input) : process.stdin,
                ...transformStreamsArr(this.config),
                this.output ? fs.createWriteStream(this.output) : process.stdout,
                err => {
                    if (err) {
                        throw new Error(err);
                    }
                }
            )
        })
            .catch(err => {
                handleError(`Encryption stopped, reason: ${err}`);
            })
    }
}

module.exports = CliTool;