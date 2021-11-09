const paramsErrors = {
    config: 'Config is not correct, use it like {XY(-)}n, where X is a cipher mark and Y is flag of encoding or decoding',
    input: 'Input file path is not correct or file not exist. Please, input correct path to input file',
    output: 'Output file path is not correct or file not exist. Please, input correct path to output file',
    empty: 'No params passed! Please give correct config, input and output params',
    duplicate: 'Some params are duplicated'
};

const filesErrors = {
    input: 'Please, input correct path to existing input file or give to the file relevant permissions',
    output: 'Please, input correct path to existing output file or give to the file relevant permissions',
};

const alphabet = {
    maxUppercase: 122,
    minUppercase: 97,
    maxLowercase: 91,
    minLowercase: 65,
    length: 26,
};

module.exports = {
    paramsErrors,
    filesErrors,
    alphabet,
};