const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const { alphabet } = require('../helpers/constants');
const { minLowercase, maxLowercase, minUppercase, maxUppercase } = alphabet;

class CipherStream extends Transform {
    constructor(props) {
        super(props);
        this._config = props.config;
        this._decoder = new StringDecoder('utf-8');
    }

    _atbashCipher = code => {
        const min = code >= minLowercase && code <= maxLowercase ? minLowercase : minUppercase;
        const max = code >= minLowercase && code <= maxLowercase ? maxLowercase : maxUppercase;
        const pos = code - min;
        return max - pos;
    }

    _evaluateShift = config => {
        const name = config[0].toLowerCase();
        return (name === 'c' ? 1 : 8) * (config[1] === '1' ? 1 : -1);
    }

    _recalculateFromBorders = (max, min, code, shift) => {
        const newCode = code + shift;

        if (newCode >= min && newCode <= max) {
            return newCode;
        } else {
            return newCode > max ? min + Math.abs(max + 1 - newCode) : max - Math.abs(min - 1 - newCode);
        }
    }

    _cipherCharByCode(max, min, code, config) {
        let encoded = 0;
        if (config[0].toLowerCase() === 'a') {
            encoded = this._atbashCipher(code);
        } else {
            const shift = this._evaluateShift(config);
            encoded = this._recalculateFromBorders(max, min, code, shift);
        }
        return String.fromCharCode(encoded);
    }

    checkChar(char, config) {
        if (typeof char !== 'string') return char;
        const code = char.charCodeAt(0);
        if (code < minUppercase || code > maxUppercase && code < minLowercase || code > maxLowercase) {
            return char;
        } else {
            return code >= minUppercase && code <= maxUppercase
                ? this._cipherCharByCode(maxUppercase, minUppercase, code, config)
                : this._cipherCharByCode(maxLowercase, minLowercase, code, config);
        }
    }

    _doTransform = (chunk, config) => {
        const inData = chunk.split('');
        const result = inData.map((chr) => this.checkChar(chr, config));
        return result.join('');
    }

    _transform(chunk, encoding, callback) {
        if (encoding === 'buffer') {
            chunk = this._decoder.write(chunk);
        }
        try {
            const result = this._doTransform(chunk, this._config);
            callback(null, result);
        } catch (e) {
            callback(e);
        }
    }
}

module.exports = CipherStream;