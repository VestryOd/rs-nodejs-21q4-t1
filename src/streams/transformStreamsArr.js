const CipherStream = require('./CipherStream');

const transformStreamsArr = config => {
    const steps = !config || typeof config !== 'string' || config?.length <= 0
        ? []
        : config.split('-');
    return steps.map((cipher) => new CipherStream({ config: cipher }))
};

module.exports = transformStreamsArr;