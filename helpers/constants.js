const paramsErrors = {
    config: 'Config is not correct, use it like {XY(-)}n, where X is a cipher mark and Y is flag of encoding or decoding',
    input: 'Input file path is not correct or file not exist. Please, input correct path to input file',
    output: 'Output file path is not correct or file not exist. Please, input correct path to output file',
    empty: 'No params passed! Please give correct config, input and output params',
    duplicate: 'Some params are duplicated',
    mandatory: 'Config is mandatory param',
    wrong: 'Wrong config! Latin letters and numbers only, format: {XY(-)}n, where X is a cipher mark and Y is flag of encoding or decoding',
};

const filesErrors = {
    input: 'Please, input correct path to existing input file or give to the file relevant permissions',
    output: 'Please, input correct path to existing output file or give to the file relevant permissions',
};

const alphabet = {
    maxLowercase: 122,
    minLowercase: 97,
    maxUppercase: 90,
    minUppercase: 65,
    length: 26,
};

module.exports = {
    paramsErrors,
    filesErrors,
    alphabet,
};