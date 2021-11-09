const { paramsErrors } = require('constants');

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
            const field = validateFlag(item);
            if (field in result) {
                error = paramsErrors.duplicate;
            }
            if (field) {
                keys.push(item);
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

    arr.forEach(el => {
        const value = options[el];
        if (!value) handleError(paramsErrors[el]);
    })
    return true;
};

module.exports = {
    validateOptions,
};