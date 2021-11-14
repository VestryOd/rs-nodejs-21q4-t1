const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const { alphabet } = require('./constants');
const { minLowercase, maxLowercase, minUppercase, maxUppercase } = alphabet;

class Cipher extends Transform {
    constructor(props) {
        super(props);
        this._sign = props.action === 'encode' ? 1 : -1;
        this._decoder = new StringDecoder('utf-8');
    }

    _transform(chunk, encoding, callback) {
        // super._transform(chunk, encoding, callback);
        if (encoding === 'buffer') {
            chunk = this._decoder.write(chunk);
        }
        callback(null, chunk);
    }
}

module.exports = Cipher;