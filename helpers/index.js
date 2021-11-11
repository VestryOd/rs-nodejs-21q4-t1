const { paramsErrors } = require('./constants');

const paramSubstitution = param => {
    switch (param) {
        case 'c': return 'config';
        case 'config': return 'config';
        case 'i': return 'input';
        case 'input': return 'input';
        case 'o': return 'output';
        case 'output': return 'output';
        default: return '';
    }
};

const validateFlag = param => {
    if (!param) return null;
    const str = String(param);
    if (str.substring(0,2) === '--') {
        return str.substring(2);
    }

    if (str.substring(0,1) === '-') {
        return str.substring(1);
    }

    return null;
}

const formatOptions = (arr) => {
    const result = {};
    const keys = [];
    let error = '';
    arr.forEach((item, index) => {
        if (item) {
            const field = paramSubstitution(validateFlag(item));
            if (field in result) {
                error = paramsErrors.duplicate;
            } else if (field){
                keys.push(field);
                result[field] = arr[index + 1];
            }
        }
    });
    result.keys = keys;
    result.error = error;
    return result;
};

const handleError = (message = 'An error appeared', code = 9) => {
    console.error('\x1b[31m%s\x1b[0m', message);
    // process.stderr.write(message);
    process.exit(code);
};

const validateOptions = arr => {
    const options = formatOptions(arr);
    const { keys, error } = options;
    if (!keys?.length || !Array.isArray(arr)) {
        handleError(paramsErrors.empty);
    }

    if (error) {
        handleError(error);
    }

    keys.forEach(el => {
        const value = options[el];
        if (!value) handleError(paramsErrors?.[el]);
    })

    if (!('config' in options)) {
        handleError(paramsErrors.mandatory);
    }

    return true;
};

module.exports = {
    validateOptions,
    handleError,
};